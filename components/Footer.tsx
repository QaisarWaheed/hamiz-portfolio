import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-muted sm:flex-row sm:text-left sm:px-6">
        <p>© {new Date().getFullYear()} Hamiz Khan. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#work" className="hover:text-main">
            Work
          </a>
          <a href="#contact" className="hover:text-main">
            Contact
          </a>
          <Link href="/admin/login" className="hover:text-main">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
