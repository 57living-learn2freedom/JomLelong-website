"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import {
  MALAYSIAN_STATES,
  PROPERTY_TYPES,
  PRICE_RANGES,
} from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/utils";

const BUDGET_OPTIONS = PRICE_RANGES.filter((r) => r.label !== "Any Price");

export interface ConsultationLead {
  fullName: string;
  whatsapp: string;
  location: string;
  budget: string;
  propertyType: string;
}

interface ConsultationFormProps {
  /** Called synchronously on submit, before WhatsApp opens. */
  onLead?: (lead: ConsultationLead) => void;
}

export default function ConsultationForm({ onLead }: ConsultationFormProps = {}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ConsultationLead>({
    fullName: "",
    whatsapp: "",
    location: "All States",
    budget: BUDGET_OPTIONS[0]?.label ?? "",
    propertyType: "All Types",
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const message = [
      "Hello! I would like to get a free Lelong consultation. Here are my details:",
      `- Name: ${form.fullName}`,
      `- Contact No: ${form.whatsapp}`,
      `- Preferred Location: ${form.location}`,
      `- Budget Range: ${form.budget}`,
      `- Property Type: ${form.propertyType}`,
    ].join("\n");

    onLead?.(form);

    // Opens WhatsApp in a new tab: https://wa.me/[AGENT_PHONE_NUMBER]?text=[ENCODED_TEXT]
    // AGENT_PHONE_NUMBER is configured in lib/constants.ts → WHATSAPP_NUMBER
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-zinc-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/50">
          <div className="grid lg:grid-cols-2">
            <div className="bg-red-700 px-8 py-10 text-white sm:px-10 sm:py-12">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Get Free Lelong Consultation
              </h2>
              <p className="mt-4 leading-relaxed text-red-100">
                Not sure where to start? Our specialists will guide you through
                the entire bank lelong process — from property selection to
                bidding registration.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-red-50">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  No obligation, 100% free consultation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Personalized property recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Expert guidance on deposits &amp; bidding
                </li>
              </ul>
            </div>

            <div className="px-8 py-10 sm:px-10 sm:py-12">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-14 w-14 text-green-600" />
                  <h3 className="mt-4 text-xl font-bold text-zinc-900">
                    Thank You!
                  </h3>
                  <p className="mt-2 text-zinc-600">
                    Your consultation request has been sent via WhatsApp. Our
                    specialist will respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm font-medium text-red-700 hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-1.5 block text-sm font-medium text-zinc-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) =>
                        setForm({ ...form, fullName: e.target.value })
                      }
                      placeholder="Ahmad bin Abdullah"
                      className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="mb-1.5 block text-sm font-medium text-zinc-700"
                    >
                      WhatsApp Number
                    </label>
                    <input
                      id="whatsapp"
                      type="tel"
                      required
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm({ ...form, whatsapp: e.target.value })
                      }
                      placeholder="012-345 6789"
                      className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="location"
                        className="mb-1.5 block text-sm font-medium text-zinc-700"
                      >
                        Preferred Location
                      </label>
                      <select
                        id="location"
                        value={form.location}
                        onChange={(e) =>
                          setForm({ ...form, location: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                      >
                        {MALAYSIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="budget"
                        className="mb-1.5 block text-sm font-medium text-zinc-700"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        value={form.budget}
                        onChange={(e) =>
                          setForm({ ...form, budget: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                      >
                        {BUDGET_OPTIONS.map((range) => (
                          <option key={range.label} value={range.label}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="formPropertyType"
                      className="mb-1.5 block text-sm font-medium text-zinc-700"
                    >
                      Property Type
                    </label>
                    <select
                      id="formPropertyType"
                      value={form.propertyType}
                      onChange={(e) =>
                        setForm({ ...form, propertyType: e.target.value })
                      }
                      className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600/20"
                    >
                      {PROPERTY_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Get Free Lelong Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
