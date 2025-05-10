// app/api/upload/route.ts
import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import prisma from '@/lib/db'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const userId = headersList.get('x-user-id')
    const role = headersList.get('x-user-role')

    if (!userId || !role) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create upload directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public/uploads', role.toLowerCase())
    
    try {
      // Create directory recursively if it doesn't exist
      await mkdir(uploadDir, { recursive: true })
    } catch (err) {
      console.error('Error creating directory:', err)
      return NextResponse.json(
        { error: 'Failed to create upload directory' },
        { status: 500 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExt = path.extname(file.name)
    const uniqueFilename = `${timestamp}-${Math.round(Math.random() * 1e9)}${fileExt}`
    const filePath = path.join(uploadDir, uniqueFilename)

    try {
      // Write file to disk
      await writeFile(filePath, buffer)
    } catch (err) {
      console.error('Error writing file:', err)
      return NextResponse.json(
        { error: 'Failed to save file' },
        { status: 500 }
      )
    }

    // Update user in database
    const imagePath = `/uploads/${role.toLowerCase()}/${uniqueFilename}`
    await prisma.user.update({
      where: { id: userId },
      data: { img: imagePath },
    })

    return NextResponse.json({ success: true, imagePath })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to process upload' },
      { status: 500 }
    )
  }
}