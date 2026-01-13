import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest) {
  // 1. Define protected routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const session = request.cookies.get("session")?.value;

    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. Verify the session
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "default_secret_key_change_me"
      );
      await jwtVerify(session, secret);
    } catch (error) {
      console.log("Invalid session:", error);
      // If verification fails, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
