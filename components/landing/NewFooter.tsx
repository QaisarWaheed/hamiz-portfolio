export default function NewFooter() {
  return (
    <footer
      id="contact"
      className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#0C0C0C] px-6 py-10 md:px-10"
    >
      <p className="text-sm text-[#D7E2EA] opacity-50">
        © 2025 Hamiz Khan. All rights reserved.
      </p>
      <div className="flex gap-6 text-sm uppercase tracking-wider text-[#D7E2EA] opacity-70">
        <a
          href="https://www.upwork.com/freelancers/hamizkhan1"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-100"
        >
          Upwork
        </a>
        <a
          href="https://www.youtube.com/@ntrovertsdiary"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-100"
        >
          YouTube
        </a>
      </div>
    </footer>
  );
}
