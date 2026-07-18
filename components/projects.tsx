"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { PROJECTS } from "@/lib/constants";
import { staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";

export function Projects() {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="container-custom flex flex-col gap-14">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I've built"
          description="A mix of full stack applications, from restaurant management systems to AI-powered chat apps."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>

        <div className="flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
