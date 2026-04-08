import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "auth_token";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signAuthToken(payload: { email: string }) {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyAuthToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as { email?: string };
}

export async function setAuthCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getAuthFromCookies() {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (!token) return null;
  try {
    return await verifyAuthToken(token);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAuthFromCookies();
  if (!session?.email) {
    throw new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return session;
}
