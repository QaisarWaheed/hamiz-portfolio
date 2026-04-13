import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="ed-footer">
      <div className="wrap flex w-full flex-wrap items-center justify-between gap-6">
        <div>© 2026 Hamiz Khan · Multan, PK</div>
        <div>
          <a href="#">Upwork</a>
          <Link href="/admin/login">CMS</Link>
        </div>
      </div>
    </footer>
  );
}
