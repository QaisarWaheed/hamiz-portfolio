import ProjectsGridClient from "@/components/landing/ProjectsGridClient";
import SectionReveal from "@/components/landing/SectionReveal";
import { getProjectsForLanding, PROJECTS_DISPLAY_LIMIT } from "@/lib/data/projects";

export default async function ProjectsSection() {
  const { items, total } = await getProjectsForLanding();

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <SectionReveal>
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Selected work</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Projects
          </h2>
        </SectionReveal>

        <ProjectsGridClient
          projects={items}
          total={total}
          displayLimit={PROJECTS_DISPLAY_LIMIT}
        />
      </div>
    </section>
  );
}
