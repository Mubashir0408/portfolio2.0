import {
  Atom,
  Boxes,
  Container,
  Database,
  FileCode2,
  GitBranch,
  Github,
  Hexagon,
  Leaf,
  Server,
  Triangle,
  Wind,
  type LucideIcon,
} from "lucide-react";

import { TECH_STACK } from "@/lib/constants";

export const TECH_ICON_MAP: Record<string, LucideIcon> = {
  React: Atom,
  "Next.js": Triangle,
  TypeScript: FileCode2,
  "Node.js": Hexagon,
  Express: Server,
  Prisma: Boxes,
  PostgreSQL: Database,
  MongoDB: Leaf,
  Docker: Container,
  Git: GitBranch,
  GitHub: Github,
  "Tailwind CSS": Wind,
};

function Badge({ name }: { name: string }) {
  const Icon = TECH_ICON_MAP[name] ?? Boxes;
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card/50 px-5 py-2.5 backdrop-blur-sm">
      <Icon className="size-[18px] text-primary" />
      <span className="text-sm font-medium text-foreground/90">{name}</span>
    </div>
  );
}

export function TechStack() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section
      aria-label="Technology stack"
      className="relative overflow-hidden border-y border-border py-8"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="flex w-max animate-marquee gap-4 [animation-play-state:running] hover:[animation-play-state:paused]">
        {items.map((name, i) => (
          <Badge key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </section>
  );
}
