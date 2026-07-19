"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
}

const statusSchema = z.enum(["UNREAD", "READ", "REPLIED"]);

export async function updateContactStatus(id: string, status: string) {
  await requireAdmin();

  const parsed = statusSchema.safeParse(status);
  if (!parsed.success) {
    throw new Error("Invalid status");
  }

  await prisma.contact.update({
    where: { id },
    data: { status: parsed.data },
  });

  revalidatePath("/admin/contacts");
  revalidatePath(`/admin/contacts/${id}`);
  revalidatePath("/admin");
}

export async function deleteContact(id: string) {
  await requireAdmin();

  await prisma.contact.delete({ where: { id } });

  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}
