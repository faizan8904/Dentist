import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Find user
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true, password: true, role: true }
    });

    // 2. Verify user exists
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" }, 
        { status: 401 }
      );
    }

    // 3. Check password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // 5. Return token (exclude password)
    return NextResponse.json({ 
      token,
      user: { id: user.id, role: user.role } 
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}