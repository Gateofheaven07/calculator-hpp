import { getGoogleUser } from "@/lib/google-auth";
import { prisma } from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return redirect("/login?error=google_auth_failed_no_code");
  }

  try {
    console.log("Exchanging code for user info...");
    const googleUser = await getGoogleUser(code);
    console.log("Google user fetched:", googleUser.email);

    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    console.log("User found in DB:", user ? "Yes" : "No");

    if (!user) {
      console.log("Creating new user...");
      user = await prisma.user.create({
        data: {
          name: googleUser.name,
          email: googleUser.email,
          image: googleUser.picture,
        },
      });
    } else {
        // Optionally update user image if not set
        if (!user.image && googleUser.picture) {
            console.log("Updating user image...");
            await prisma.user.update({
                where: { id: user.id },
                data: { image: googleUser.picture }
            });
        }
    }

    // Create JWT (Session)
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "default_secret_key_change_me"
    );

    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);

    console.log("Setting session cookie...");
    (await cookies()).set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
  } catch (error: any) {
    console.error("Google auth callback error details:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return redirect(`/login?error=google_auth_error&details=${encodeURIComponent(errorMessage)}`);
  }

  return redirect("/dashboard");
}
