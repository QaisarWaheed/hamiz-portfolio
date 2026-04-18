import Link from "next/link";

export default function V2Nav() {
  return (
    <header className="nav">
      <div className="v2-container nav__inner">
        <Link href="/" className="brand">
          Hamiz<span>.</span>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#proof">Clients</a>
          <a href="#about">About</a>
        </nav>
        <a href="#contact" className="btn btn--primary">
          See availability
        </a>
      </div>
    </header>
  );
}
