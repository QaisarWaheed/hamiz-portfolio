import AdminShell from "@/components/AdminShell";
import Link from "next/link";

const cards = [
  {
    title: "Projects",
    desc: "Manage portfolio pieces, thumbnails, and video URLs.",
    href: "/admin/projects",
  },
  {
    title: "Testimonials",
    desc: "Client quotes on the homepage grid.",
    href: "/admin/testimonials",
  },
  {
    title: "Services",
    desc: "Edit the three homepage service rows.",
    href: "/admin/services",
  },
  {
    title: "Pricing",
    desc: "Edit the three pricing tiers and feature lists.",
    href: "/admin/pricing",
  },
  {
    title: "About & contact copy",
    desc: "Edit headline, bio, and email for the about block and contact mailto.",
    href: "/admin/about",
  },
];

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <div>
        <h1 className="text-2xl font-semibold text-main">Dashboard</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Content is served from MongoDB. Thumbnail uploads go through Cloudinary.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-accent/35 hover:shadow-[var(--shadow-glow)]"
            >
              <h2 className="text-lg font-medium text-main group-hover:text-accent">{c.title}</h2>
              <p className="mt-2 text-sm text-muted">{c.desc}</p>
              <p className="mt-4 text-xs font-medium text-accent">Open →</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
