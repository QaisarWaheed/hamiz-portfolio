import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  requirements: z.string().min(1).max(8000),
  references: z.string().max(8000).optional().default(""),
});

export async function POST(req: Request) {
  try {
    const json: unknown = await req.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your inputs." }, { status: 400 });
    }
    await connectDB();
    await ContactMessage.create(parsed.data);

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const { name, email, requirements, references } = parsed.data;

      await resend.emails.send({
        from: "contact@hamizkhan.com",
        to: ["contactkhanhamiz@gmail.com"],
        replyTo: email,
        subject: `New portfolio inquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          "",
          "Requirements:",
          requirements,
          "",
          "References:",
          references || "N/A",
        ].join("\n"),
      });
    } else {
      console.warn("RESEND_API_KEY is not set. Skipping contact email delivery.");
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
