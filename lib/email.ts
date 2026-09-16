/**
 * The notification email sent when someone submits the contact form.
 *
 * Written as table-based HTML with inline styles: email clients strip <style> blocks, flexbox and
 * grid, so this deliberately looks nothing like the rest of the codebase. Colours mirror the site's
 * Matte Lab palette, but as solid hex — rgba() over a dark background renders inconsistently in
 * Outlook. Every interpolated value is escaped, since the whole body is attacker-controlled.
 */

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INK_900 = "#0B0B0B";
const INK_800 = "#121212";
const INK_700 = "#181818";
const HAIRLINE = "#232221";
const BONE = "#EDE8E0";
const ASH = "#8C877F";
const DIM = "#57534D";
const SIGNAL = "#FFB547";

const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escaped message text with blank lines kept as paragraph breaks and single breaks as <br>. */
function formatMessage(message: string): string {
  return message
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => {
      const body = escapeHtml(paragraph.trim()).replace(/\n/g, "<br />");
      return `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.65;color:${BONE};">${body}</p>`;
    })
    .join("");
}

function label(text: string): string {
  return `<span style="font-family:${MONO};font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:${ASH};">${escapeHtml(text)}</span>`;
}

function formatReceivedAt(date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-PH", {
      timeZone: "Asia/Manila",
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  } catch {
    return date.toISOString();
  }
}

export function renderContactEmail(input: ContactMessage, receivedAt = new Date()) {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const subject = escapeHtml(input.subject);
  const stamp = escapeHtml(formatReceivedAt(receivedAt));

  const replyHref = `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(`Re: ${input.subject}`)}`;
  // Shown as the inbox preview line, then hidden inside the message itself.
  const preheader = escapeHtml(`${input.name} · ${input.subject}`);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark light" />
<meta name="supported-color-schemes" content="dark light" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:${INK_900};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">${preheader}</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${INK_900};padding:32px 16px;">
<tr>
<td align="center">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;">

<!-- header -->
<tr>
<td style="padding:0 4px 18px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
<td align="left" style="font-family:${MONO};font-size:13px;font-weight:600;color:${BONE};letter-spacing:0.02em;">jkcuadra<span style="color:${SIGNAL};">_</span></td>
<td align="right">
<span style="display:inline-block;padding:6px 11px;border:1px solid ${SIGNAL};border-radius:4px;font-family:${MONO};font-size:10px;font-weight:600;letter-spacing:0.16em;text-transform:uppercase;color:${SIGNAL};">New enquiry</span>
</td>
</tr>
</table>
</td>
</tr>

<!-- card -->
<tr>
<td style="background-color:${INK_800};border:1px solid ${HAIRLINE};border-radius:8px;padding:30px;">

<div style="margin:0 0 10px;">${label("Subject")}</div>
<h1 style="margin:0 0 26px;font-family:${SANS};font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.02em;color:${BONE};">${subject}</h1>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid ${HAIRLINE};">
<tr>
<td style="padding:20px 0 0;" width="50%" valign="top">
<div style="margin:0 0 7px;">${label("From")}</div>
<div style="font-family:${SANS};font-size:15px;font-weight:600;color:${BONE};">${name}</div>
</td>
<td style="padding:20px 0 0;" width="50%" valign="top">
<div style="margin:0 0 7px;">${label("Email")}</div>
<a href="mailto:${email}" style="font-family:${MONO};font-size:13px;color:${SIGNAL};text-decoration:none;word-break:break-all;">${email}</a>
</td>
</tr>
</table>

<div style="height:1px;background-color:${HAIRLINE};margin:22px 0;line-height:1px;font-size:0;">&nbsp;</div>

<div style="margin:0 0 12px;">${label("Message")}</div>
<div style="background-color:${INK_700};border:1px solid ${HAIRLINE};border-left:2px solid ${SIGNAL};border-radius:6px;padding:18px 20px 2px;">
${formatMessage(input.message)}
</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 0;">
<tr>
<td style="background-color:${SIGNAL};border-radius:4px;">
<a href="${replyHref}" style="display:inline-block;padding:14px 24px;font-family:${MONO};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${INK_900};text-decoration:none;">Reply to ${name} &rarr;</a>
</td>
</tr>
</table>

</td>
</tr>

<!-- footer -->
<tr>
<td style="padding:18px 4px 0;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
<tr>
<td align="left" style="font-family:${MONO};font-size:11px;line-height:1.6;color:${DIM};">Received ${stamp} &middot; GMT+8</td>
<td align="right" style="font-family:${MONO};font-size:11px;line-height:1.6;color:${DIM};">Contact form</td>
</tr>
</table>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;

  const text = [
    "NEW ENQUIRY — jkcuadra portfolio",
    "",
    `Subject: ${input.subject}`,
    `From:    ${input.name} <${input.email}>`,
    "",
    "Message:",
    input.message.trim(),
    "",
    "—",
    `Received ${formatReceivedAt(receivedAt)} GMT+8`,
    `Reply: ${input.email}`,
  ].join("\n");

  return { html, text, subject: `${input.subject} — ${input.name}` };
}
