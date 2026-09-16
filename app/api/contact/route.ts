import { Resend } from "resend";
import { renderContactEmail, type ContactMessage } from "@/lib/email";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL ?? "cuadra.jkyle@gmail.com";
const FROM = process.env.CONTACT_FROM_EMAIL ?? "jkcuadra portfolio <noreply@portfolio.khayll-labs.com>";

/** Caps that match the form's own limits, so a normal message never trips them. */
const LIMITS: Record<keyof ContactMessage, number> = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort throttle. Serverless instances each keep their own map and lose it when they recycle,
// so this only blunts casual abuse — it is not a guarantee.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function bad(error: string, status = 400) {
  return Response.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set");
    return bad("Email is not configured on the server.", 503);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return bad("Expected a JSON body.");
  }
  if (typeof payload !== "object" || payload === null) return bad("Expected a JSON body.");
  const body = payload as Record<string, unknown>;

  // Honeypot: a real person never sees this field, so anything in it is a bot. Report success so the
  // bot does not learn it was caught.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const values = {} as ContactMessage;
  for (const field of Object.keys(LIMITS) as (keyof ContactMessage)[]) {
    const raw = body[field];
    if (typeof raw !== "string" || raw.trim() === "") return bad(`Missing ${field}.`);
    const trimmed = raw.trim();
    if (trimmed.length > LIMITS[field]) return bad(`${field} is too long.`);
    values[field] = trimmed;
  }
  if (!EMAIL_PATTERN.test(values.email)) return bad("Enter a valid email address.");

  if (rateLimited(clientIp(request))) {
    return bad("Too many messages from this address. Try again later.", 429);
  }

  const { html, text, subject } = renderContactEmail(values);

  try {
    const { data, error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM,
      to: [TO],
      replyTo: values.email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return bad("Could not send the message. Please email me directly.", 502);
    }
    console.info("[contact] sent", data?.id);
  } catch (cause) {
    console.error("[contact] send threw:", cause);
    return bad("Could not send the message. Please email me directly.", 502);
  }

  return Response.json({ ok: true });
}
