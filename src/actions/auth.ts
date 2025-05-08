"use server";

import prisma from "@/lib/db";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { hash } from "bcryptjs";



type LoginResponse = {
  success: boolean;
  message?: string;
  token?: string;
  user?: { id: string; role: string };
};

export async function login(prevState: any, formData: FormData): Promise<LoginResponse> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate inputs
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true, role: true },
    });

    if (!user || !user.password) {
      return { success: false, message: "Invalid credentials" };
    }

    // Check password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return { success: false, message: "Invalid credentials" };
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Set cookie
    (await
      // Set cookie
      cookies()).set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return { 
      success: true, 
      message: "Login successful",
      token,
      user: { id: user.id, role: user.role }
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}


type ResetPasswordResponse = {
  success: boolean;
  message?: string;
};

export async function resetPassword(
  prevState: any,
  formData: FormData
): Promise<ResetPasswordResponse> {
  try {
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const securityCode = formData.get("securityCode") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Validate inputs
    if (!email && !phone) {
      return { success: false, message: "Email or phone is required" };
    }

    if (!securityCode || securityCode.length !== 4) {
      return { success: false, message: "Valid 4-digit security code required" };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    if (newPassword.length < 8) {
      return { success: false, message: "Password must be at least 8 characters" };
    }

    // Find user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

   if( user.phone != phone && user.securityCode != securityCode){
     return { success: false, message: "Credential didnot matched" };
   }

    // Update password
    const hashedPassword = await hash(newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    return { 
      success: true,
      message: "Password reset successfully. You can now login with your new password."
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return { success: false, message: "An error occurred. Please try again." };
  }
}
