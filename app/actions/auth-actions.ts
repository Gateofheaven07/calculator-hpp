"use server";

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function register(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { success: false, error: "Missing required fields" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Something went wrong" };
  }
  
  
  redirect("/login");
}

import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Missing required fields" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { success: false, error: "Invalid credentials" };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return { success: false, error: "Invalid credentials" };
    }

    // Create JWT
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "default_secret_key_change_me"
    );
    
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    // Set cookie
    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Something went wrong" };
  }

  redirect("/dashboard");
}

export async function logout() {
  (await cookies()).delete("session");
  redirect("/");
}

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const image = formData.get("image") as string; // Base64 string

    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    
    if (!token) return { success: false, error: "Unauthorized" };

    const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "default_secret_key_change_me"
    );
    
    const { jwtVerify } = await import("jose");
    
    let userId: string;
    try {
        const { payload } = await jwtVerify(token, secret);
        userId = payload.userId as string;
    } catch {
        return { success: false, error: "Invalid session" };
    }

    if (!name) {
      return { success: false, error: "Name is required" };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name, phoneNumber, image },
    });

    // Revalidate dashboard layout to update sidebar
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/dashboard", "layout");
    
    return { success: true };

  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function changePassword(prevState: any, formData: FormData) {
    try {
        const newPassword = formData.get("newPassword") as string;
        
        if (!newPassword || newPassword.length < 6) {
            return { success: false, error: "Password must be at least 6 characters" };
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("session")?.value;
        if (!token) return { success: false, error: "Unauthorized" };

        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || "default_secret_key_change_me"
        );
        const { jwtVerify } = await import("jose");
        let userId: string;
        try {
            const { payload } = await jwtVerify(token, secret);
            userId = payload.userId as string;
        } catch {
            return { success: false, error: "Invalid session" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return { success: true };
    } catch (error) {
        console.error("Change password error:", error);
         return { success: false, error: "Failed to change password" };
    }
}
