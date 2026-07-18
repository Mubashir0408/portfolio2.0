import type { Metadata } from "next";
import { Download, GraduationCap, Mail, MapPin, Sparkles } from "lucide-react";

import { SITE_CONFIG, SKILLS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download the resume of ${SITE_CONFIG.name}, Full Stack Developer.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="container-custom flex flex-col gap-16 pb-28 pt-40 md:pt-44">
      <div className="flex flex-col items-center gap-6 text-center">
        <SectionHeading eyebrow="Resume" title="Experience & Education" />
        <Button asChild size="lg">
          <a href="/resume.pdf" download>
            <Download className="size-4" />
            Download PDF Resume
          </a>
        </Button>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-3xl border border-border bg-card/40 p-8">
        <h2 className="text-2xl font-bold text-foreground">{SITE_CONFIG.name}</h2>
        <p className="font-medium text-primary">{SITE_CONFIG.title}</p>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            {SITE_CONFIG.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="size-4" />
            {SITE_CONFIG.email}
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-4" />
            {SITE_CONFIG.currently}
          </span>
        </div>
        <Badge variant="accent" className="w-fit">
          <Sparkles className="size-3.5" />
          {SITE_CONFIG.status}
        </Badge>
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <h3 className="mb-6 text-2xl font-bold text-foreground">Timeline</h3>
        <Timeline />
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <h3 className="mb-6 text-2xl font-bold text-foreground">Skills Summary</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((category) => (
            <div
              key={category.category}
              className="rounded-2xl border border-border bg-card/40 p-5"
            >
              <p className="mb-3 text-sm font-semibold text-primary">
                {category.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="rounded-full bg-foreground/[0.04] px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
