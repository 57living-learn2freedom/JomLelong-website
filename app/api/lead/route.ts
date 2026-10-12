import { type NextRequest } from "next/server";

export const runtime = "nodejs";

const SHEET_EVENTS = ["PageView", "Lead"] as const;
type SheetEvent = (typeof SHEET_EVENTS)[number];

const LEAD_FIELDS = [
  "fullName",
  "whatsapp",
  "location",
  "budget",
  "propertyType",
] as const;

const TRACKING_FIELDS = [
  "visitorId",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "pageUrl",
] as const;

const MAX_FIELD_LENGTH = 500;

function pickString(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";
}

function pickEvent(body: Record<string, unknown>): SheetEvent | null {
  const value = body.event ?? "Lead";
  return SHEET_EVENTS.find((event) => event === value) ?? null;
}

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("N8N_LEAD_WEBHOOK_URL is not set; event was not stored.");
    return Response.json({ ok: false }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const event = pickEvent(body);
  if (!event) {
    return Response.json({ ok: false, error: "Unknown event" }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const key of TRACKING_FIELDS) {
    fields[key] = pickString(body, key);
  }
  for (const key of LEAD_FIELDS) {
    fields[key] = event === "Lead" ? pickString(body, key) : "";
  }

  if (event === "Lead" && (!fields.fullName || !fields.whatsapp)) {
    return Response.json(
      { ok: false, error: "Name and WhatsApp number are required" },
      { status: 400 }
    );
  }

  const payload = {
    event,
    submittedAt: new Date().toISOString(),
    ...fields,
    userAgent: request.headers.get("user-agent") ?? "",
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!upstream.ok) {
      console.error(`n8n webhook responded with ${upstream.status}`);
      return Response.json({ ok: false }, { status: 502 });
    }
  } catch (error) {
    console.error("Failed to reach n8n webhook", error);
    return Response.json({ ok: false }, { status: 502 });
  }

  return Response.json({ ok: true });
}
