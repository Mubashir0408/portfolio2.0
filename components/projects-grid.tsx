"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { PROJECTS } from "@/lib/constants";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/project-card";

const FILTERS = ["All", "Featured", "Completed", "In Progress", "Maintained"] as const;

export function ProjectsGrid() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All");

  const filtered = PROJECTS.filter((project) => {
    if (filter === "All") return true;
    if (filter === "Featured") return project.featured;
    if (filter === "Completed") return project.status === "completed";
    if (filter === "In Progress") return project.status === "in-progress";
    if (filter === "Maintained") return project.status === "maintained";
    return true;
  });

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-medium transition-all duration-300",
              filter === f
                ? "border-primary/40 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div
        key={filter}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.08)}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </div>
  );
}
