import type { Metadata } from "next";
import { CalendarDays, Clock, Inbox, MailCheck } from "lucide-react";
import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { StatCard } from "@/components/admin/stat-card";

export const metadata: Metadata = {
  title: "Dashboard",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, todayCount, monthCount, latest] = await Promise.all([
    prisma.contact.count(),
    prisma.contact.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.contact.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.contact.findFirst({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of contact form activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Contacts" value={total} icon={Inbox} />
        <StatCard label="Today" value={todayCount} icon={Clock} />
        <StatCard label="This Month" value={monthCount} icon={CalendarDays} />
        <StatCard
          label="Latest Contact"
          value={latest ? latest.name : "—"}
          sub={latest?.email}
          icon={MailCheck}
        />
      </div>

      <Link
        href="/admin/contacts"
        className="w-fit rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
      >
        View all contacts →
      </Link>
    </div>
  );
}
