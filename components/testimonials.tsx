"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { SectionHeading } from "@/components/section-heading";
import { GlowCard } from "@/components/glow-card";

export function Testimonials() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-custom flex flex-col gap-14">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          description="Feedback from people I've collaborated with on real projects."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="grid gap-6 md:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeUp} className="h-full">
              <GlowCard className="flex h-full flex-col gap-5 p-7">
                <Quote className="size-8 text-primary/40" />
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-border pt-5">
                  <div className="relative size-11 overflow-hidden rounded-full border border-border">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
