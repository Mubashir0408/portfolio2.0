import { Github, Linkedin, Mail } from "lucide-react";

import { SOCIAL_LINKS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.icon as keyof typeof ICONS];
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.icon !== "mail" ? "_blank" : undefined}
            rel={link.icon !== "mail" ? "noreferrer noopener" : undefined}
            aria-label={link.label}
            className="flex size-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-[0_0_16px_rgba(99,102,241,0.35)]"
          >
            <Icon className="size-[18px]" />
          </a>
        );
      })}
    </div>
  );
}
