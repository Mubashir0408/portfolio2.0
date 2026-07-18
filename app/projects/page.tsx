import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";
import { ProjectsGrid } from "@/components/projects-grid";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Projects",
  description: `A collection of full stack applications built by ${SITE_CONFIG.name}, including e-commerce platforms, AI chat apps, and management systems.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="container-custom flex flex-col gap-14 pb-28 pt-40 md:pt-44">
      <SectionHeading
        eyebrow="Portfolio"
        title="All Projects"
        description="Six full stack applications spanning restaurants, e-commerce, AI, and productivity tooling."
      />
      <ProjectsGrid />
    </div>
  );
}
