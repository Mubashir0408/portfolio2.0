import Link from "next/link";

import { FOOTER_LINKS } from "@/lib/navigation";
import { SocialLinks } from "@/components/social-links";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-extrabold text-primary-foreground">
                MI
              </span>
              Mubashir Ijaz
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Full Stack Developer building modern, scalable web applications
              with React, Next.js, TypeScript and modern backend technologies.
            </p>
            <SocialLinks />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            {FOOTER_LINKS.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground">Resources</h3>
            {FOOTER_LINKS.resources.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} Mubashir Ijaz. All rights reserved.</p>
          <p>
            Built with{" "}
            <span className="text-foreground/80">Next.js</span>
            {" · "}
            <span className="text-foreground/80">Tailwind CSS</span>
            {" · "}
            <span className="text-foreground/80">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
