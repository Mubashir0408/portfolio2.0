import Link from "next/link";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  query: string;
}

export function Pagination({ currentPage, totalPages, query }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function hrefFor(page: number) {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("page", String(page));
    return `/admin/contacts?${params.toString()}`;
  }

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <nav className="flex items-center justify-center gap-3" aria-label="Pagination">
      <Link
        href={hrefFor(Math.max(1, currentPage - 1))}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={cn(
          "rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5",
          isFirst && "pointer-events-none opacity-40"
        )}
      >
        Previous
      </Link>
      <span className="px-2 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={hrefFor(Math.min(totalPages, currentPage + 1))}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={cn(
          "rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5",
          isLast && "pointer-events-none opacity-40"
        )}
      >
        Next
      </Link>
    </nav>
  );
}
