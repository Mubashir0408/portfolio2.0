"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Star } from "lucide-react";

import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/glow-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUS_LABEL: Record<Project["status"], string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  maintained: "Maintained",
};

const STATUS_VARIANT: Record<Project["status"], "accent" | "secondary" | "outline"> = {
  completed: "accent",
  "in-progress": "secondary",
  maintained: "outline",
};

export function ProjectCard({ project }: { project: Project }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="h-full transition-transform duration-300 ease-out"
    >
      <GlowCard className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {project.featured ? (
              <Badge variant="default">
                <Star className="size-3" />
                Featured
              </Badge>
            ) : null}
            <Badge variant={STATUS_VARIANT[project.status]}>
              {STATUS_LABEL[project.status]}
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-foreground/[0.03] px-2.5 py-1 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <Button asChild size="sm" variant="outline" className="flex-1">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`View ${project.title} source on GitHub`}
              >
                <Github className="size-4" />
                Code
              </a>
            </Button>

            {project.liveUrl ? (
              <Button asChild size="sm" variant="secondary" className="flex-1">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ArrowUpRight className="size-4" />
                  Live Demo
                </a>
              </Button>
            ) : null}

            <Button asChild size="sm" variant="ghost" className={cn(!project.liveUrl && "flex-1")}>
              <Link href={`/projects/${project.slug}`}>Read More</Link>
            </Button>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}
