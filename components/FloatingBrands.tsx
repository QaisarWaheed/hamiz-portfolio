"use client";

const BRANDS = [
  "Premiere Pro",
  "DaVinci Resolve",
  "After Effects",
  "Final Cut",
  "Avid Media Composer",
  "Nuke",
  "Blender",
  "Cinema 4D",
  "Pro Tools",
  "Frame.io",
  "Mocha Pro",
  "ACES",
  "Colour pipeline",
  "Offline / online",
  "RED RAW",
  "ARRI",
  "Sony FX",
  "Canon Log",
  "OFX plugins",
  "Edit suite",
  "Sound design",
  "Motion graphics",
];

function Strip({ id }: { id: string }) {
  return (
    <div className="flex shrink-0 items-center gap-x-10 md:gap-x-14">
      {BRANDS.map((name) => (
        <span
          key={`${id}-${name}`}
          className="whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-muted/75 md:text-xs"
        >
          {name}
        </span>
      ))}
    </div>
  );
}

function MarqueeRow({ reverse }: { reverse?: boolean }) {
  return (
    <div
      className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
    >
      <Strip id="a" />
      <Strip id="b" />
    </div>
  );
}

export default function FloatingBrands() {
  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.07] bg-gradient-to-b from-canvas via-white/[0.02] to-canvas py-6 md:py-8"
      aria-label="Tools and pipeline"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent md:w-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent md:w-32"
        aria-hidden
      />

      <div className="relative z-0 mb-5 text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-muted/90 md:text-xs">
          Pipeline &amp; tools
        </p>
        <p className="mt-1 text-[10px] text-muted/50 md:text-[11px]">
          Always in motion—like the timeline
        </p>
      </div>

      <div className="flex flex-col gap-4 overflow-hidden md:gap-5" aria-hidden>
        <div className="overflow-hidden py-1">
          <MarqueeRow />
        </div>
        <div className="overflow-hidden py-1 opacity-80">
          <MarqueeRow reverse />
        </div>
      </div>
    </section>
  );
}
