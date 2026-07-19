import type { Contact } from "@prisma/client";
import { NextResponse } from "next/server";

import { SITE_CONFIG } from "@/lib/constants";
import { renderAdminNotificationEmail, renderAutoReplyEmail } from "@/lib/email-templates";
import { prisma } from "@/lib/prisma";
import { CONTACT_FROM_EMAIL, getResendClient } from "@/lib/resend";
import { contactSchema } from "@/lib/validations/contact";

// Email delivery is best-effort: the submission is already saved by the
// time this runs, so a failure here must not turn into a user-facing error.
async function sendContactEmails(contact: Contact): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn(
      "[contact] RESEND_API_KEY is not set — skipping email notifications."
    );
    return;
  }

  const [adminResult, autoReplyResult] = await Promise.allSettled([
    resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: SITE_CONFIG.email,
      replyTo: contact.email,
      subject: `New contact form submission: ${contact.subject}`,
      html: renderAdminNotificationEmail({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        submittedAt: contact.createdAt,
      }),
    }),
    resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: contact.email,
      subject: `Thanks for reaching out, ${contact.name}!`,
      html: renderAutoReplyEmail({ name: contact.name }),
    }),
  ]);

  if (adminResult.status === "rejected") {
    console.error("[contact] Admin notification email failed:", adminResult.reason);
  }
  if (autoReplyResult.status === "rejected") {
    console.error("[contact] Auto-reply email failed:", autoReplyResult.reason);
  }
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check the fields and try again",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  let contact: Contact;
  try {
    contact = await prisma.contact.create({
      data: { name, email, subject, message },
    });
  } catch (error) {
    console.error("[contact] Failed to save submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save your message. Please try again later.",
      },
      { status: 500 }
    );
  }

 try {
  await sendContactEmails(contact);
} catch (error) {
  console.error("EMAIL ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown email error",
    },
    { status: 500 }
  );
}

return NextResponse.json(
  { success: true, data: contact },
  { status: 201 }
);
}
