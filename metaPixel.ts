import type { ConsultationLead } from "@/components/ConsultationForm";

type Fbq = (
  command: "init" | "track" | "trackCustom",
  eventOrId: string,
  params?: Record<string, string>
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

const PIXEL_ID_PATTERN = /^\d+$/;

/** Returns the Pixel ID from NEXT_PUBLIC_META_PIXEL_ID, or null if unset/invalid. */
export function getMetaPixelId(): string | null {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  return id && PIXEL_ID_PATTERN.test(id) ? id : null;
}

/** Fires the standard Lead event. Name and phone are never sent to Meta. */
export function trackLead(lead: ConsultationLead): void {
  if (typeof window === "undefined" || !window.fbq) return;

  window.fbq("track", "Lead", {
    content_name: "Free Lelong Consultation",
    content_category: "Bank Lelong",
    preferred_location: lead.location,
    budget_range: lead.budget,
    property_type: lead.propertyType,
  });
}
