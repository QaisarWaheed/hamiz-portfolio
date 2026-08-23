import { connectDB } from "@/lib/db";
import { fallbackAbout } from "@/lib/landing-fallbacks";
import About, { getOrCreateAbout } from "@/models/About";

export type AboutContent = {
  headline: string;
  bio: string;
  email: string;
};

export async function getAboutRecord(): Promise<AboutContent> {
  try {
    const doc = await getOrCreateAbout();
    const obj = doc.toObject();
    return {
      headline: String(obj.headline ?? fallbackAbout.headline),
      bio: String(obj.bio ?? fallbackAbout.bio),
      email: String(obj.email ?? "hello@hamizkhan.com"),
    };
  } catch (e) {
    console.error("[data/about] getAboutRecord failed:", e);
    return {
      headline: fallbackAbout.headline,
      bio: fallbackAbout.bio,
      email: "hello@hamizkhan.com",
    };
  }
}

export async function getAboutForLanding(): Promise<{
  headline: string;
  bio: string;
}> {
  try {
    await connectDB();
    const doc = await About.findOne({ key: "main" }).lean();
    if (!doc || !(doc.bio ?? "").trim()) {
      return { ...fallbackAbout };
    }
    return {
      headline: String(doc.headline ?? fallbackAbout.headline),
      bio: String(doc.bio),
    };
  } catch (e) {
    console.error("[data/about] getAboutForLanding failed:", e);
    return { ...fallbackAbout };
  }
}

export async function seedAboutIfEmpty(): Promise<boolean> {
  await connectDB();
  const exists = await About.exists({ key: "main" });
  if (exists) return false;
  await About.create({ key: "main", ...fallbackAbout, email: "hello@hamizkhan.com" });
  return true;
}
