import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { User, CreateUser} from '@/types'
import { error } from "console";
import { hash } from "bcryptjs";

export async function GET(){

    try {
        
        const users = await prisma.user.findMany({
            select:{
                id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        img: true
            }
        });

        
        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json(
            { error : "Failed to fetch users"},
            { status: 500}
        )
    }
}


export async function POST(request: Request) {
    try {
      const body: CreateUser = await request.json();
      
      // Validation
      if (!body.email || !body.phone) {
        return NextResponse.json(
          { error: "Email and phone are required" },
          { status: 400 }
        );
      }
  
      // Hash password if provided
      const hashedPassword = body.password 
        ? await hash(body.password, 10) 
        : undefined;
  
      const newUser = await prisma.user.create({
        data: {
          ...body,
          password: hashedPassword, // Store hashed password
          role: body.role || 'STAFF'
        },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          phone: true,
          role: true,
          img: true
          // Explicitly exclude password from response
        }
      });
  
      return NextResponse.json(newUser, { status: 201 });
      
    } catch (error: any) {
      console.error("Creation error:", error);
      
      // Handle duplicate email error
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
  
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }
  }