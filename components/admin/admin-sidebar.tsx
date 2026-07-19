import { LayoutDashboard, LogOut, Mail } from "lucide-react";
import Link from "next/link";

import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Contacts", icon: Mail },
];

export function AdminSidebar({ email }: { email: string }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card/40 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-2 px-6 py-6">
        <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-extrabold text-white">
          MI
        </span>
        <span className="text-sm font-semibold text-foreground">Admin Panel</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4" aria-label="Admin navigation">
        {ADMIN_NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col gap-3 border-t border-border px-4 py-5">
        <p className="truncate px-2 text-xs text-muted-foreground" title={email}>
          {email}
        </p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button type="submit" variant="outline" size="sm" className="w-full justify-start">
            <LogOut className="size-4" />
            Sign out
          </Button>
        </form>
      </div>
    </aside>
  );
}
