"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Github, Linkedin, Menu, X } from "lucide-react";

import { NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[73px] z-50 glass"
          >
            <motion.nav
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="container-custom flex flex-col gap-2 py-8"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-lg font-medium text-foreground/90 transition-colors hover:bg-foreground/5 hover:text-primary",
                      pathname === item.href && "text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 flex items-center gap-3 px-4">
                <a
                  href="https://github.com/Mubashir0408"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="flex size-11 items-center justify-center rounded-full border border-border/80 text-muted-foreground hover:text-primary"
                >
                  <Github className="size-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mubashir-ijaz-2b03a9319/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="flex size-11 items-center justify-center rounded-full border border-border/80 text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="size-5" />
                </a>
              </div>

              <Button asChild size="lg" className="mx-4 mt-4">
                <a href="/resume">
                  <Download className="size-4" />
                  Download Resume
                </a>
              </Button>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
