import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Stats } from "@/components/stats";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${SITE_CONFIG.name}, a Full Stack Developer based in ${SITE_CONFIG.location}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-8">
      <About />
      <Skills />
      <Stats />
    </div>
  );
}
