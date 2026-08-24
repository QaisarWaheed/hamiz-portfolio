import FooterSection from "@/components/landing/FooterSection";
import NavSection from "@/components/landing/NavSection";
import ProjectsGridClient from "@/components/landing/ProjectsGridClient";
import SectionReveal from "@/components/landing/SectionReveal";
import { getAllProjectsForWorkIndex } from "@/lib/data/projects";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Work — Hamiz Khan",
  description:
    "Selected documentary and technical video edits by Hamiz Khan — full project index.",
};

export default async function WorkPage() {
  const projects = await getAllProjectsForWorkIndex();

  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <NavSection />
      <section className="border-b border-line pt-[100px] min-[810px]:pt-[120px]">
        <div className="section-container section-padding-tight-bottom">
          <SectionReveal>
            <h1 className="section-heading text-ink min-[810px]:text-[76px]">Work</h1>
          </SectionReveal>

          {projects.length === 0 ? (
            <p className="mt-12 text-[18px] font-normal leading-[1.55] tracking-[-0.04em] text-muted">
              No projects published yet.
            </p>
          ) : (
            <ProjectsGridClient
              projects={projects}
              total={projects.length}
              displayLimit={projects.length}
            />
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
