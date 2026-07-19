import type { Metadata } from "next";
import { Search } from "lucide-react";
import Link from "next/link";

import { ContactsTable } from "@/components/admin/contacts-table";
import { Pagination } from "@/components/admin/pagination";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contacts",
};

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

interface AdminContactsPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function AdminContactsPage({ searchParams }: AdminContactsPageProps) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const page = Math.max(1, Number(params.page) || 1);

  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
          { subject: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [contacts, totalCount] = await Promise.all([
    prisma.contact.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.contact.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Contacts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalCount} submission{totalCount === 1 ? "" : "s"} total.
        </p>
      </div>

      <form method="GET" className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by name, email, or subject..."
            className="pl-11"
          />
        </div>
        <button
          type="submit"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
        >
          Search
        </button>
        {query ? (
          <Link
            href="/admin/contacts"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Clear
          </Link>
        ) : null}
      </form>

      <ContactsTable contacts={contacts} />

      <Pagination currentPage={page} totalPages={totalPages} query={query} />
    </div>
  );
}
