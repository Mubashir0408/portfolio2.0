import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { updateContactStatus } from "@/app/admin/contacts/actions";
import { DeleteContactButton } from "@/components/admin/delete-contact-button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Contact Details",
};

export const dynamic = "force-dynamic";

const STATUS_VARIANT = {
  UNREAD: "default",
  READ: "outline",
  REPLIED: "secondary",
} as const;

interface ContactDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
  const { id } = await params;
  const contact = await prisma.contact.findUnique({ where: { id } });

  if (!contact) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(contact.createdAt);

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/admin/contacts"
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to contacts
      </Link>

      <div className="rounded-3xl border border-border bg-card/40 p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">{contact.subject}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              From {contact.name} ·{" "}
              <a href={`mailto:${contact.email}`} className="hover:text-primary">
                {contact.email}
              </a>
            </p>
          </div>
          <Badge variant={STATUS_VARIANT[contact.status]}>{contact.status}</Badge>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">Received {formattedDate}</p>

        <div className="mt-6 rounded-2xl border border-border bg-background/40 p-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {contact.message}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {contact.status !== "READ" ? (
            <form action={updateContactStatus.bind(null, contact.id, "READ")}>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                Mark as Read
              </button>
            </form>
          ) : null}
          {contact.status !== "REPLIED" ? (
            <form action={updateContactStatus.bind(null, contact.id, "REPLIED")}>
              <button
                type="submit"
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
              >
                Mark as Replied
              </button>
            </form>
          ) : null}
          <DeleteContactButton id={contact.id} redirectTo="/admin/contacts" label="Delete" />
        </div>
      </div>
    </div>
  );
}
