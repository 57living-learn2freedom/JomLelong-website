export type SheetEvent = "PageView" | "Lead";

const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

const VISITOR_ID_KEY = "jl_visitor_id";
const PAGEVIEW_COOKIE = "jl_lp_pageview_logged";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** Anonymous random ID kept in localStorage so a visitor's PageView and Lead rows can be matched. */
export function getVisitorId(): string {
  try {
    const existing = window.localStorage.getItem(VISITOR_ID_KEY);
    if (existing) return existing;
    const id = generateId();
    window.localStorage.setItem(VISITOR_ID_KEY, id);
    return id;
  } catch {
    return generateId();
  }
}

/**
 * Returns true only for the first call in a browser session (shared across tabs).
 * Uses a session cookie (no expiry), which the browser clears when it is closed.
 */
export function claimSessionPageView(): boolean {
  if (document.cookie.split("; ").some((c) => c.startsWith(`${PAGEVIEW_COOKIE}=`))) {
    return false;
  }
  document.cookie = `${PAGEVIEW_COOKIE}=1; path=/; SameSite=Lax`;
  return true;
}

function getTrackingParams(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(
    TRACKING_PARAMS.map((key) => [key, params.get(key) ?? ""])
  );
}

/** Sends an event row to /api/lead, which forwards it to the n8n → Google Sheet workflow. */
export function sendSheetEvent(
  event: SheetEvent,
  fields: Record<string, string> = {}
): void {
  // keepalive lets the request finish even if the tab is backgrounded by WhatsApp.
  fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...fields,
      ...getTrackingParams(),
      event,
      visitorId: getVisitorId(),
      pageUrl: window.location.href,
    }),
    keepalive: true,
  }).catch((error) => console.error(`Failed to save ${event}`, error));
}
