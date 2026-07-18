"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Sparkles } from "lucide-react";

import { SITE_CONFIG } from "@/lib/constants";
import { fadeLeft, fadeRight, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { Badge } from "@/components/ui/badge";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-custom flex flex-col gap-16">
        <SectionHeading
          eyebrow="About Me"
          title="The developer behind the code"
          description="A little about who I am, what I do, and how I got here."
        />

        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="gradient-border relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/profile.png"
                alt={`Portrait of ${SITE_CONFIG.name}`}
                fill
                sizes="(max-width: 1024px) 60vw, 400px"
                className="object-cover"
                priority={false}
              />
            </div>

            <div className="glass absolute -bottom-6 -right-6 flex items-center gap-3 rounded-2xl px-5 py-4 shadow-xl">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <MapPin className="size-4" />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-foreground">{SITE_CONFIG.location}</p>
                <p className="text-muted-foreground">Available remotely</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeRight}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">
                <GraduationCap className="size-3.5" />
                {SITE_CONFIG.currently}
              </Badge>
              <Badge variant="accent">
                <Sparkles className="size-3.5" />
                {SITE_CONFIG.status}
              </Badge>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground">
              I&apos;m a Full Stack Developer based in{" "}
              <span className="text-foreground">{SITE_CONFIG.location}</span>,
              currently studying Computer Science while building production
              web applications with React, Next.js, TypeScript, and Node.js.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              I care deeply about clean architecture, thoughtful UI, and
              writing code that scales. Outside of client work, I&apos;m
              constantly experimenting with new tools — from AI-driven
              interfaces to database design — and sharing what I learn along
              the way.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I&apos;m not coding, you&apos;ll find me exploring design
              systems, contributing to open source, or mentoring other
              students getting started with web development.
            </p>

            <Timeline />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
