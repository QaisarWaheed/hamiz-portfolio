import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAuthToken, setAuthCookie } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const { email, password } = parsed.data;
    await connectDB();
    const admin = await Admin.findOne({ email: email.toLowerCase() }).lean();
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const ok = await bcrypt.compare(password, admin.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await signAuthToken({ email: admin.email });
    await setAuthCookie(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
