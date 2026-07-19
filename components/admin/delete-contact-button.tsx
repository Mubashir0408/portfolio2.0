"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { deleteContact } from "@/app/admin/contacts/actions";
import { cn } from "@/lib/utils";

interface DeleteContactButtonProps {
  id: string;
  redirectTo?: string;
  label?: string;
  className?: string;
}

export function DeleteContactButton({
  id,
  redirectTo,
  label,
  className,
}: DeleteContactButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Delete this contact submission? This cannot be undone.")) {
      return;
    }

    startTransition(async () => {
      await deleteContact(id);
      if (redirectTo) {
        router.push(redirectTo);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete contact"
      className={cn(
        label
          ? "flex items-center gap-2 rounded-full border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
          : "flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50",
        className
      )}
    >
      <Trash2 className="size-4" />
      {label ? (isPending ? "Deleting..." : label) : null}
    </button>
  );
}
