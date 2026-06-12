import Link from "next/link";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#price", label: "Price" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export default function NewNav() {
  return (
    <nav className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
      {LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
