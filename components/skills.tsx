"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Atom,
  Boxes,
  Cloud,
  Code2,
  Container,
  Database,
  FileCode2,
  GitBranch,
  Github,
  Hexagon,
  Layers,
  Leaf,
  Palette,
  Server,
  Terminal,
  Triangle,
  Waypoints,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { SKILLS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Progress } from "@/components/ui/progress";

const SKILL_ICON_MAP: Record<string, LucideIcon> = {
  react: Atom,
  nextjs: Triangle,
  typescript: FileCode2,
  tailwind: Wind,
  nodejs: Hexagon,
  express: Server,
  api: Waypoints,
  graphql: Boxes,
  postgresql: Database,
  mongodb: Leaf,
  prisma: Layers,
  redis: Zap,
  vercel: Triangle,
  aws: Cloud,
  cloudflare: Cloud,
  supabase: Database,
  docker: Container,
  cicd: GitBranch,
  githubactions: Github,
  nginx: Server,
  git: GitBranch,
  figma: Palette,
  postman: Waypoints,
  vscode: Terminal,
};

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  DevOps: Wrench,
  Tools: Terminal,
};

export function Skills() {
  const [active, setActive] = React.useState(SKILLS[0]?.category ?? "Frontend");
  const activeCategory = SKILLS.find((c) => c.category === active) ?? SKILLS[0];

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="container-custom flex flex-col gap-14">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="A snapshot of the tools and technologies I use to design, build, and ship full stack applications."
        />

        <div className="flex flex-wrap justify-center gap-2">
          {SKILLS.map((cat) => {
            const Icon = CATEGORY_ICON[cat.category] ?? Code2;
            const isActive = cat.category === active;
            return (
              <button
                key={cat.category}
                onClick={() => setActive(cat.category)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                    : "border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
                )}
                aria-pressed={isActive}
              >
                <Icon className="size-4" />
                {cat.category}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="grid gap-5 sm:grid-cols-2"
        >
          {activeCategory?.skills.map((skill) => {
            const Icon = SKILL_ICON_MAP[skill.icon] ?? Code2;
            return (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-card/40 p-6 transition-colors duration-300 hover:border-primary/30 hover:bg-card/70"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">{skill.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {skill.years} {skill.years === 1 ? "year" : "years"} experience
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {skill.level}%
                  </span>
                </div>
                <Progress value={skill.level} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
