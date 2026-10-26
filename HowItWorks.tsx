import {
  Search,
  Banknote,
  Gavel,
  KeyRound,
} from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

const STEP_ICONS = [Search, Banknote, Gavel, KeyRound];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
            How It Works
          </h2>
          <p className="mt-3 text-zinc-600">
            A simple 4-step guide to purchasing bank lelong properties in
            Malaysia with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <div key={step.step} className="relative text-center">
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-red-100 lg:block" />
                )}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-700 text-white shadow-lg shadow-red-700/20">
                  <Icon className="h-7 w-7" />
                </div>
                <span className="mt-4 inline-block rounded-full bg-red-50 px-3 py-0.5 text-xs font-bold text-red-700">
                  Step {step.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
