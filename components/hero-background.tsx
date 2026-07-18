"use client";

import { motion } from "framer-motion";

import { AnimatedGrid } from "@/components/animated-grid";
import { GradientBlur } from "@/components/gradient-blur";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  delay: (i % 8) * 0.4,
  duration: 6 + (i % 5),
}));

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <AnimatedGrid />

      <GradientBlur
        variant="primary"
        className="-left-40 top-[-10%] size-[520px] animate-glow"
      />
      <GradientBlur
        variant="secondary"
        className="right-[-15%] top-[10%] size-[480px] animate-glow"
      />
      <GradientBlur
        variant="accent"
        className="bottom-[-15%] left-[20%] size-[380px] opacity-70"
      />

      <div className="absolute inset-0" aria-hidden="true">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute size-1 rounded-full bg-primary/50"
            style={{ left: `${p.left}%`, top: `${p.top}%` }}
            animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -20, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
