import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Github,
  Lightbulb,
  Puzzle,
  UserRound,
  Wrench,
} from "lucide-react";

import { PROJECTS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  const otherProjects = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <article className="pb-28 pt-40 md:pt-44">
      <div className="container-custom flex flex-col gap-16">
        <div>
          <Button asChild variant="ghost" size="sm" className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="size-4" />
              Back to Projects
            </Link>
          </Button>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="default">{project.role}</Badge>
              <Badge variant="outline">
                <Calendar className="size-3.5" />
                {project.timeline}
              </Badge>
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
              {project.title}
            </h1>

            <p className="max-w-3xl text-balance text-lg leading-relaxed text-muted-foreground">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <a href={project.githubUrl} target="_blank" rel="noreferrer noopener">
                  <Github className="size-4" />
                  View Source
                </a>
              </Button>
              {project.liveUrl ? (
                <Button asChild variant="outline">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer noopener">
                    <ArrowUpRight className="size-4" />
                    Live Demo
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="gradient-border relative aspect-[16/9] w-full overflow-hidden rounded-3xl">
          <Image
            src={project.image}
            alt={`${project.title} banner`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {project.gallery.length > 1 ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {project.gallery.map((image, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="flex flex-col gap-12">
            <section>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                <UserRound className="size-5 text-primary" />
                Key Features
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-border bg-card/40 p-5"
                  >
                    <h3 className="mb-2 font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
                <Wrench className="size-5 text-primary" />
                Architecture
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {project.architecture}
              </p>
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
                <Puzzle className="size-5 text-primary" />
                Challenges
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {project.challenges}
              </p>
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-foreground">
                <Lightbulb className="size-5 text-primary" />
                Lessons Learned
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {project.lessonsLearned}
              </p>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Tech Stack
              </h3>
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
            </div>

            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Timeline
              </h3>
              <p className="text-sm text-foreground">{project.timeline}</p>
            </div>
          </aside>
        </div>

        {otherProjects.length > 0 ? (
          <section>
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              More Projects
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
