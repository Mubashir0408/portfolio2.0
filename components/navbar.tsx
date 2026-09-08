"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Github, Linkedin } from "lucide-react";

import { NAV_ITEMS } from "@/lib/navigation";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";

export function Navbar() {
  const { scrolled } = useScroll();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container-custom">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border transition-all duration-300",
            scrolled
              ? "border-border bg-background/70 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-transparent bg-transparent px-5 py-3"
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-extrabold text-primary-foreground">
              MI
            </span>
            <span className="hidden sm:inline">Mubashir Ijaz</span>
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  pathname === item.href && "text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
              <a
                href="https://github.com/Mubashir0408"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <Github className="size-[18px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/mubashir-ijaz-2b03a9319/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="size-[18px]" />
              </a>
            </div>

            <ThemeToggle />

            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="/resume">
                <Download className="size-4" />
                Resume
              </a>
            </Button>

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
