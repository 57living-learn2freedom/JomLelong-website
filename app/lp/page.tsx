import Image from "next/image";
import { CheckCircle2, ChevronDown } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import LandingLeadForm from "@/components/LandingLeadForm";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const LANDING_BACKGROUND =
  "https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=1920&q=80";

const SELLING_POINTS = [
  "Condos & homes up to 40% below market value",
  "Bank lelong listings across Malaysia, updated daily",
  "Free guidance from deposit to bidding day",
] as const;

export default function LandingPage() {
  return (
    <main>
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <Image
          src={LANDING_BACKGROUND}
          alt="Condominium with swimming pool at dusk"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/80" />

        <div className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-4 py-4 sm:px-6 lg:px-8">
            <Image
              src="/jomlelong-logo.jpg"
              alt="JomLelong"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover shadow-sm ring-2 ring-white/20"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              JomLelong
            </span>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Own a Condo in Malaysia Up to 40% Below Market Value
            </h1>
            <p className="mt-4 text-base text-zinc-200 sm:text-xl">
              Bank Lelong &amp; auction properties, explained by licensed
              specialists. Tell us what you&apos;re looking for and get a free
              consultation on WhatsApp.
            </p>

            <ul className="mx-auto mt-8 inline-flex flex-col gap-3 text-left text-sm text-white sm:text-base">
              {SELLING_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-colors hover:bg-red-800"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Get Free Lelong Consultation
              </a>
            </div>
          </div>
        </div>

        <a
          href="#contact"
          aria-label="Scroll to consultation form"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white"
        >
          <ChevronDown className="h-8 w-8 animate-bounce" />
        </a>
      </section>

      <TrustBar />
      <LandingLeadForm />
    </main>
  );
}
