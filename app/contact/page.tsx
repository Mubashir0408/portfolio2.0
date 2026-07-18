import type { Metadata } from "next";

import { SITE_CONFIG } from "@/lib/constants";
import { Contact } from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE_CONFIG.name} for freelance work, internships, or collaboration opportunities.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-32 md:pt-36">
      <Contact />
    </div>
  );
}
