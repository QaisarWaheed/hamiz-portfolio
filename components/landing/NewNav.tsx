import Link from "next/link";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#price", label: "Price" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

export default function NewNav() {
  return (
    <nav className="overflow-x-auto px-6 pt-6 md:px-10 md:pt-8">
      <div className="flex gap-4 whitespace-nowrap text-[0.65rem] sm:justify-between sm:gap-0 sm:text-sm md:text-lg lg:text-[1.4rem]">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
