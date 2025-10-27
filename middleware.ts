import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const { pathname } = request.nextUrl;

  // Check if the request is for a protected route
  if (pathname.startsWith("/dashboard")) {
    // In a real application, you would check for a valid JWT token
    // For this demo, we'll just check if the auth-token cookie exists
    const token = request.cookies.get("authToken");

    if (!token) {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
