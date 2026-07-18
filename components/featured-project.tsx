"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

import type { Project } from "@/types/project";
import { fadeLeft, fadeRight, viewportOnce } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FeaturedProject({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "" : ""
      }`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={reverse ? fadeRight : fadeLeft}
        className={reverse ? "lg:order-2" : ""}
      >
        <div className="gradient-border group relative aspect-[16/10] overflow-hidden rounded-3xl">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={reverse ? fadeLeft : fadeRight}
        className={`flex flex-col gap-5 ${reverse ? "lg:order-1" : ""}`}
      >
        <Badge variant="default" className="w-fit">
          Featured Project
        </Badge>
        <h3 className="text-3xl font-bold text-foreground">{project.title}</h3>
        <p className="leading-relaxed text-muted-foreground">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild>
            <Link href={`/projects/${project.slug}`}>
              Read Case Study
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={project.githubUrl} target="_blank" rel="noreferrer noopener">
              <Github className="size-4" />
              Source
            </a>
          </Button>
          {project.liveUrl ? (
            <Button asChild variant="ghost">
              <a href={project.liveUrl} target="_blank" rel="noreferrer noopener">
                Live Demo
              </a>
            </Button>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
