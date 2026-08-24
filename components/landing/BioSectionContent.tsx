import SectionReveal from "@/components/landing/SectionReveal";
import Link from "next/link";

type BioSectionContentProps = {
  headline: string;
  intro: string;
  bodyParagraphs: [string, string];
};

function BioGetStartedLink() {
  return (
    <Link
      href="#contact"
      className="group inline-flex items-center gap-3 text-[18px] font-normal tracking-[-0.04em] text-ink"
    >
      <span>Get Started</span>
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-ink transition-transform group-hover:translate-x-0.5"
        aria-hidden
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function BioSectionContent({
  headline,
  intro,
  bodyParagraphs,
}: BioSectionContentProps) {
  const [bodyFirst, bodySecond] = bodyParagraphs;

  return (
    // Centered 1180 shell like the hero portrait. No desktop horizontal padding at
    // ≥1280 — gutters come from mx-auto; px-50 only 810–1279; px-6 on mobile.
    <div className="mx-auto max-w-[1180px] px-6 pb-12 pt-12 min-[810px]:px-[50px] min-[810px]:pb-[69px] min-[810px]:pt-[421px] min-[1280px]:px-0">
      {/* Desktop — three columns; centre gap reserved for sticky hero portrait */}
      <div className="hidden min-[810px]:grid min-[810px]:grid-cols-[300px_90px_400px_30px_360px] min-[810px]:items-start">
        <SectionReveal className="flex min-h-[459px] max-w-[300px] flex-col justify-between">
          <h2 className="m-0 text-[56px] font-semibold leading-none tracking-[-0.02em] text-ink">
            {headline}
          </h2>
          {intro ? (
            <p className="m-0 text-[22px] font-semibold leading-[1.4] tracking-[-0.04em] text-ink">
              {intro}
            </p>
          ) : (
            <span aria-hidden />
          )}
        </SectionReveal>

        <span aria-hidden />

        <span className="block min-h-[456px] w-[400px]" aria-hidden />

        <span aria-hidden />

        <SectionReveal delay={0.1} className="flex min-h-[459px] max-w-[360px] flex-col justify-between">
          <div className="flex flex-col gap-[20px]">
            {bodyFirst ? (
              <p className="m-0 text-[18px] font-normal leading-[1.55] tracking-[-0.04em] text-muted">
                {bodyFirst}
              </p>
            ) : null}
            {bodySecond ? (
              <p className="m-0 text-[18px] font-normal leading-[1.55] tracking-[-0.04em] text-muted">
                {bodySecond}
              </p>
            ) : null}
          </div>
          <BioGetStartedLink />
        </SectionReveal>
      </div>

      {/* Mobile — single column, no centre reserve */}
      <div className="min-[810px]:hidden">
        <SectionReveal>
          <h2 className="section-heading max-w-[370px] text-ink">{headline}</h2>
          {intro ? (
            <p className="mt-8 max-w-[370px] text-[22px] font-semibold leading-[1.4] tracking-[-0.04em] text-ink">
              {intro}
            </p>
          ) : null}
        </SectionReveal>
        {(bodyFirst || bodySecond) && (
          <SectionReveal delay={0.1} className="mt-10">
            <div className="space-y-5">
              {bodyFirst ? (
                <p className="text-[18px] font-normal leading-[1.55] tracking-[-0.04em] text-muted">
                  {bodyFirst}
                </p>
              ) : null}
              {bodySecond ? (
                <p className="text-[18px] font-normal leading-[1.55] tracking-[-0.04em] text-muted">
                  {bodySecond}
                </p>
              ) : null}
            </div>
            <div className="mt-8">
              <BioGetStartedLink />
            </div>
          </SectionReveal>
        )}
      </div>
    </div>
  );
}
