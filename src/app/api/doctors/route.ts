import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

// GET all doctors
export async function GET() {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      services: true,
    },
  });

  return NextResponse.json(doctors);
}

// CREATE a new doctor
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, bio } = body;

  try {
    const newDoctor = await prisma.doctor.create({
      data: {
        userId,
        bio,
      },
    });

    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
