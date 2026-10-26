import { Building2, Percent, ShieldCheck, Users } from "lucide-react";

const STATS = [
  {
    icon: Building2,
    value: "2000+",
    label: "Properties Listed",
  },
  {
    icon: Percent,
    value: "Up to 40%",
    label: "Below Market Value",
  },
  {
    icon: Users,
    value: "2,000+",
    label: "Happy Buyers Assisted",
  },
  {
    icon: ShieldCheck,
    value: "Licensed",
    label: "Registered REN Agency",
  },
] as const;

export default function TrustBar() {
  return (
    <section className="border-y border-zinc-200 bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 sm:gap-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-700 sm:h-12 sm:w-12">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-zinc-900 sm:text-xl">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500 sm:text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
