function TopRatedBadge({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={20}
      height={20}
      aria-hidden
      focusable="false"
    >
      <path
        fill="#2563eb"
        d="M16 2 28.4 9.2v13.6L16 30 3.6 22.8V9.2L16 2z"
      />
      <path
        fill="#fff"
        stroke="#1d4ed8"
        strokeWidth={0.35}
        d="m16 9.2 2.1 4.3 4.7.7-3.4 3.3.8 4.7-4.2-2.2-4.2 2.2.8-4.7-3.4-3.3 4.7-.7 2.1-4.3z"
      />
    </svg>
  );
}

export default function LandingFooter() {
  return (
    <footer className="site-footer">
      <div
        className="wrap"
        style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <div>© 2026 Hamiz Khan · Multan, PK</div>
        <div>
          <a href="#" className="footer-upwork">
            <TopRatedBadge />
            <span>Upwork</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
