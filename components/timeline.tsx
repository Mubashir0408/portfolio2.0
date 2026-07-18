"use client";

import { motion } from "framer-motion";
import { BookOpen, Briefcase, GraduationCap } from "lucide-react";

import { TIMELINE } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

const TYPE_ICON = {
  education: GraduationCap,
  experience: Briefcase,
  learning: BookOpen,
};

const TYPE_COLOR = {
  education: "bg-primary/15 text-primary",
  experience: "bg-accent/15 text-accent",
  learning: "bg-secondary/15 text-secondary",
};

export function Timeline() {
  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={staggerContainer(0.12)}
      className="relative mt-4 flex flex-col gap-8 border-l border-border pl-8"
    >
      {TIMELINE.map((item) => {
        const Icon = TYPE_ICON[item.type];
        return (
          <motion.li key={item.id} variants={fadeUp} className="relative">
            <span
              className={cn(
                "absolute -left-[42px] flex size-8 items-center justify-center rounded-full ring-4 ring-background",
                TYPE_COLOR[item.type]
              )}
            >
              <Icon className="size-4" />
            </span>

            <div className="rounded-2xl border border-border bg-card/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/70">
              <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <span className="text-xs font-medium text-muted-foreground">
                  {item.period}
                </span>
              </div>
              <p className="mb-2 text-sm font-medium text-primary">
                {item.organization}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
