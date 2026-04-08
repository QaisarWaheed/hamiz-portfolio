import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

function isAdminProtected(pathname: string) {
  if (!pathname.startsWith("/admin")) return false;
  if (pathname === "/admin" || pathname === "/admin/") return true;
  if (pathname.startsWith("/admin/login")) return false;
  return true;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isAdminProtected(pathname)) {
    return NextResponse.next();
  }
  if (!JWT_SECRET) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete("auth_token");
    return res;
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
