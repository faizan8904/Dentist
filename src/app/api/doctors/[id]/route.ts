import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const doctor = await prisma.doctor.findUnique({
    where: { id: params.id },
    include: { user: true, services: true },
  });

  if (!doctor) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }

  return NextResponse.json(doctor);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();
  const { bio } = body;

  try {
    const updated = await prisma.doctor.update({
      where: { id: params.id },
      data: { bio },
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.doctor.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Doctor deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
