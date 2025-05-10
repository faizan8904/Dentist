// actions/profile.ts
'use server'

import  prisma  from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(prevState: any, formData: FormData) {
  const userId = formData.get('userId') as string
  const data = {
    name: formData.get('name') as string,
    fatherName: formData.get('fatherName') as string | null,
    phone: formData.get('phone') as string,
    age: formData.get('age') ? parseInt(formData.get('age') as string) : null,
    address: formData.get('address') as string | null,
    img: formData.get('img') as string,
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    })

    revalidatePath('/dashboard')
    return { message: 'Profile updated successfully!', error: null }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { message: null, error: 'Failed to update profile' }
  }
}

export async function getProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      fatherName: true,
      email: true,
      phone: true,
      age: true,
      img: true,
      address: true,
      role: true,
    },
  })
}