export default function LandingNav() {
  return (
    <nav className="ed-nav">
      <div className="wrap">
        <div className="logo">
          Hamiz<span>.</span>
        </div>
        <ul>
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
        </ul>
        <a href="#contact" className="cta">
          Book a call
        </a>
      </div>
    </nav>
  );
}
