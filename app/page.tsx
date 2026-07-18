import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";
import { Hero } from "@/components/hero";
import { TechStack } from "@/components/tech-stack";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Stats } from "@/components/stats";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="tech-stack">
        <TechStack />
      </div>
      <About />
      <Skills />
      <Projects />
      <Stats />
      <Testimonials />
      <Contact />
    </>
  );
}
