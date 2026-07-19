import type { Contact } from "@prisma/client";
import { Eye } from "lucide-react";
import Link from "next/link";

import { updateContactStatus } from "@/app/admin/contacts/actions";
import { DeleteContactButton } from "@/components/admin/delete-contact-button";
import { Badge } from "@/components/ui/badge";

const STATUS_VARIANT: Record<Contact["status"], "default" | "outline" | "secondary"> = {
  UNREAD: "default",
  READ: "outline",
  REPLIED: "secondary",
};

function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function ContactsTable({ contacts }: { contacts: Contact[] }) {
  if (contacts.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card/40 p-10 text-center text-sm text-muted-foreground">
        No contact submissions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-border bg-card/40">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-5 py-4 font-medium">Name</th>
            <th className="px-5 py-4 font-medium">Email</th>
            <th className="px-5 py-4 font-medium">Subject</th>
            <th className="px-5 py-4 font-medium">Status</th>
            <th className="px-5 py-4 font-medium">Received</th>
            <th className="px-5 py-4 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="border-b border-border/60 last:border-0">
              <td className="px-5 py-4 font-medium text-foreground">{contact.name}</td>
              <td className="px-5 py-4 text-muted-foreground">{contact.email}</td>
              <td className="max-w-[200px] truncate px-5 py-4 text-muted-foreground">
                {contact.subject}
              </td>
              <td className="px-5 py-4">
                <Badge variant={STATUS_VARIANT[contact.status]}>{contact.status}</Badge>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                {formatDateTime(contact.createdAt)}
              </td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/contacts/${contact.id}`}
                    className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                    aria-label="View details"
                  >
                    <Eye className="size-4" />
                  </Link>
                  {contact.status !== "READ" ? (
                    <form action={updateContactStatus.bind(null, contact.id, "READ")}>
                      <button
                        type="submit"
                        className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
                      >
                        Mark Read
                      </button>
                    </form>
                  ) : null}
                  {contact.status !== "REPLIED" ? (
                    <form action={updateContactStatus.bind(null, contact.id, "REPLIED")}>
                      <button
                        type="submit"
                        className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/5"
                      >
                        Mark Replied
                      </button>
                    </form>
                  ) : null}
                  <DeleteContactButton id={contact.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
