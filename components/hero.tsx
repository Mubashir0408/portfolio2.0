"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Sparkles } from "lucide-react";

import { SITE_CONFIG, TYPING_ROLES } from "@/lib/constants";
import { TECH_ICON_MAP } from "@/components/tech-stack";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { HeroBackground } from "@/components/hero-background";
import { MagneticButton } from "@/components/magnetic-button";
import { Button } from "@/components/ui/button";

function useTypingEffect(words: string[], speed = 70, pause = 1600) {
  const [text, setText] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentWord = words[wordIndex % words.length] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === currentWord) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? currentWord.slice(0, prev.length - 1)
              : currentWord.slice(0, prev.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

const FLOATING_ICONS = [
  { name: "React", top: "8%", left: "6%", delay: 0 },
  { name: "Next.js", top: "22%", left: "72%", delay: 0.6 },
  { name: "Node.js", top: "58%", left: "80%", delay: 1.2 },
  { name: "TypeScript", top: "72%", left: "10%", delay: 1.8 },
  { name: "PostgreSQL", top: "42%", left: "2%", delay: 2.4 },
  { name: "Prisma", top: "4%", left: "48%", delay: 3 },
];

export function Hero() {
  const typedText = useTypingEffect(TYPING_ROLES);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20"
    >
      <HeroBackground />

      <div className="container-custom grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12)}
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
          >
            <Sparkles className="size-3.5" />
            Hi, I&apos;m
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-balance text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-7xl"
          >
            {SITE_CONFIG.name}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="flex h-10 items-center text-2xl font-semibold text-muted-foreground sm:text-3xl"
          >
            <span className="gradient-text">{typedText}</span>
            <span className="ml-1 h-7 w-[2px] animate-pulse bg-primary sm:h-8" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            {SITE_CONFIG.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/projects">View Projects</Link>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button asChild variant="outline" size="lg">
                <a href="/resume">
                  <Download className="size-4" />
                  Download Resume
                </a>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button asChild variant="ghost" size="lg">
                <a
                  href="https://github.com/mubashirijaz"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 pt-4 text-sm text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {SITE_CONFIG.status}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <div className="gradient-border absolute inset-8 rounded-[2rem] shadow-[0_0_80px_rgba(99,102,241,0.25)]">
            <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-gradient-to-br from-card/80 to-background/40">
              <span className="text-8xl font-extrabold text-foreground/10">MI</span>
            </div>
          </div>

          {FLOATING_ICONS.map((icon) => {
            const Icon = TECH_ICON_MAP[icon.name];
            return (
              <motion.div
                key={icon.name}
                className="glass absolute flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-lg"
                style={{ top: icon.top, left: icon.left }}
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 4,
                  delay: icon.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {Icon ? <Icon className="size-4 text-primary" /> : null}
                <span className="text-xs font-medium text-foreground/90">
                  {icon.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.a
        href="#tech-stack"
        aria-label="Scroll to explore"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="size-4" />
      </motion.a>
    </section>
  );
}
