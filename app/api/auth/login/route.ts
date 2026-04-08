import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signAuthToken, setAuthCookie } from "@/lib/auth";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function isDevelopment() {
  return process.env.NODE_ENV === "development";
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const { email, password } = parsed.data;
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    if (!adminEmail) {
      return NextResponse.json(
        { error: "Admin credentials not configured on server" },
        { status: 500 }
      );
    }
    if (email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const plainPassword = process.env.ADMIN_PASSWORD?.trim();
    const adminHash = process.env.ADMIN_PASSWORD_HASH?.trim();

    let ok: boolean;
    if (isDevelopment() && plainPassword !== undefined && plainPassword !== "") {
      ok = password === plainPassword;
    } else {
      if (!adminHash) {
        return NextResponse.json(
          {
            error: isDevelopment()
              ? "Set ADMIN_PASSWORD (dev) or ADMIN_PASSWORD_HASH"
              : "Admin credentials not configured on server",
          },
          { status: 500 }
        );
      }
      ok = await bcrypt.compare(password, adminHash);
    }

    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = await signAuthToken({ email: adminEmail });
    await setAuthCookie(token);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
