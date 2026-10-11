"use client";

import ConsultationForm, {
  type ConsultationLead,
} from "@/components/ConsultationForm";
import { trackLead } from "@/lib/metaPixel";

const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

function saveLead(lead: ConsultationLead) {
  const params = new URLSearchParams(window.location.search);
  const tracking = Object.fromEntries(
    TRACKING_PARAMS.map((key) => [key, params.get(key) ?? ""])
  );

  // keepalive lets the request finish even if the tab is backgrounded by WhatsApp.
  fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...lead,
      ...tracking,
      pageUrl: window.location.href,
    }),
    keepalive: true,
  }).catch((error) => console.error("Failed to save lead", error));
}

function handleLead(lead: ConsultationLead) {
  trackLead(lead);
  saveLead(lead);
}

export default function LandingLeadForm() {
  return <ConsultationForm onLead={handleLead} />;
}
