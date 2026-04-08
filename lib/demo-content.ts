/** Placeholder portfolio + testimonials for local preview or `npm run seed:demo`. */

export function useDemoContentFallback(): boolean {
  return (
    process.env.NODE_ENV === "development" || process.env.SHOW_DEMO_CONTENT === "true"
  );
}

export const demoProjects = [
  {
    _id: "659000000000000000000001",
    title: "Nocturne — Fashion Film",
    description:
      "Rhythm-led cut for an evening wear drop: macro fabric, flash pops, and a tailored score.",
    category: "Fashion",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-a-bridge-in-a-park-43817-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80&auto=format&fit=crop",
    createdAt: "2025-01-10T12:00:00.000Z",
    updatedAt: "2025-01-10T12:00:00.000Z",
  },
  {
    _id: "659000000000000000000002",
    title: "Pulse — Artist Documentary",
    description:
      "Behind-the-studio portrait: handheld warmth, interview weave, and live performance energy.",
    category: "Documentary",
    videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    thumbnail:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80&auto=format&fit=crop",
    createdAt: "2025-01-18T12:00:00.000Z",
    updatedAt: "2025-01-18T12:00:00.000Z",
  },
  {
    _id: "659000000000000000000003",
    title: "Velocity — Automotive Spot",
    description:
      "30-second hero for a performance line: roto polish, dynamic typography, bass-heavy mix.",
    category: "Commercial",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-highway-at-night-from-a-moving-car-1630-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
    createdAt: "2025-02-02T12:00:00.000Z",
    updatedAt: "2025-02-02T12:00:00.000Z",
  },
  {
    _id: "659000000000000000000004",
    title: "Bloom — Skincare Launch",
    description: "Soft light, tactile macro, and sincere VO for a clean-beauty debut.",
    category: "Commercial",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1532-large.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80&auto=format&fit=crop",
    createdAt: "2025-02-20T12:00:00.000Z",
    updatedAt: "2025-02-20T12:00:00.000Z",
  },
];

export const demoTestimonials = [
  {
    _id: "659000000000000000000011",
    name: "Sana Malik",
    role: "Creative Director, Lumen Studio",
    message:
      "Hamiz took a mountain of rough cuts and shaped them into something that actually moves people. The pacing is surgical.",
    createdAt: "2025-01-05T12:00:00.000Z",
    updatedAt: "2025-01-05T12:00:00.000Z",
  },
  {
    _id: "659000000000000000000012",
    name: "Leo Alvarez",
    role: "Founder, Northbound Records",
    message:
      "Our release film finally feels like the music—tight, emotional, and cinematic without trying too hard.",
    createdAt: "2025-01-12T12:00:00.000Z",
    updatedAt: "2025-01-12T12:00:00.000Z",
  },
  {
    _id: "659000000000000000000013",
    name: "Amira Khan",
    role: "Head of Marketing, Vault Athletics",
    message:
      "Fast turnarounds, clear notes, and a finish that held up on every platform. We will be back for the next campaign.",
    createdAt: "2025-02-01T12:00:00.000Z",
    updatedAt: "2025-02-01T12:00:00.000Z",
  },
];
