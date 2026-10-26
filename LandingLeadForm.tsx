"use client";

import ConsultationForm, {
  type ConsultationLead,
} from "@/components/ConsultationForm";
import { trackLead } from "@/lib/metaPixel";
import { sendSheetEvent } from "@/lib/leadTracking";

function handleLead(lead: ConsultationLead) {
  trackLead(lead);
  sendSheetEvent("Lead", { ...lead });
}

export default function LandingLeadForm() {
  return <ConsultationForm onLead={handleLead} />;
}
