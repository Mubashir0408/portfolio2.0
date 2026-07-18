import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";
import { SectionHeading } from "@/components/section-heading";
import { BlogGrid } from "@/components/blog-grid";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles by ${SITE_CONFIG.name} on Next.js, TypeScript, backend architecture, and web development.`,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="container-custom flex flex-col gap-14 pb-28 pt-40 md:pt-44">
      <SectionHeading
        eyebrow="Blog"
        title="Writing on code & craft"
        description="Deep dives on Next.js, TypeScript, backend architecture, and building premium user interfaces."
      />
      <BlogGrid />
    </div>
  );
}
