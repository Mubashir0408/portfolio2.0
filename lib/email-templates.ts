import { SITE_CONFIG } from "@/lib/constants";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function layout(content: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(SITE_CONFIG.name)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background-color:#111827;padding:24px 32px;">
                <span style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:-0.02em;">${escapeHtml(
                  SITE_CONFIG.name
                )}</span>
                <div style="color:#9ca3af;font-size:13px;margin-top:2px;">${escapeHtml(
                  SITE_CONFIG.title ?? "Portfolio"
                )}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                ${content}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f9fafb;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">
                  Sent from the contact form at
                  <a href="${SITE_CONFIG.url}" style="color:#6366f1;text-decoration:none;">${escapeHtml(
    SITE_CONFIG.url.replace(/^https?:\/\//, "")
  )}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

interface AdminNotificationInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: Date;
}

export function renderAdminNotificationEmail({
  name,
  email,
  subject,
  message,
  submittedAt,
}: AdminNotificationInput): string {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(submittedAt);

  const content = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">New contact form submission</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#6b7280;width:110px;vertical-align:top;">Name</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;font-weight:600;">${escapeHtml(name)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#6b7280;vertical-align:top;">Email</td>
        <td style="padding:8px 0;font-size:14px;">
          <a href="mailto:${escapeHtml(email)}" style="color:#6366f1;text-decoration:none;">${escapeHtml(
    email
  )}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#6b7280;vertical-align:top;">Subject</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;">${escapeHtml(subject)}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#6b7280;vertical-align:top;">Submitted</td>
        <td style="padding:8px 0;font-size:14px;color:#111827;">${escapeHtml(formattedDate)}</td>
      </tr>
    </table>
    <div style="padding:16px;background-color:#f9fafb;border-radius:10px;border:1px solid #e5e7eb;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#111827;white-space:pre-wrap;">${escapeHtml(
        message
      )}</p>
    </div>
  `;

  return layout(content);
}

interface AutoReplyInput {
  name: string;
}

export function renderAutoReplyEmail({ name }: AutoReplyInput): string {
  const content = `
    <h1 style="margin:0 0 16px;font-size:20px;color:#111827;">Thanks for reaching out, ${escapeHtml(
      name
    )}!</h1>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
      I've received your message and appreciate you taking the time to get in touch.
      This is a quick confirmation that it landed safely in my inbox.
    </p>
    <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#374151;">
      I try to respond to every message personally and will get back to you as soon as possible,
      usually within a day or two.
    </p>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#374151;">
      In the meantime, feel free to take another look around my portfolio.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:8px;background-color:#111827;">
          <a href="${SITE_CONFIG.url}" style="display:inline-block;padding:10px 20px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">
            Visit ${escapeHtml(SITE_CONFIG.name.split(" ")[0] ?? SITE_CONFIG.name)}'s Portfolio
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:28px 0 0;font-size:14px;line-height:1.6;color:#374151;">
      Best,<br />
      ${escapeHtml(SITE_CONFIG.name)}
    </p>
  `;

  return layout(content);
}
