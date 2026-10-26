"use client";

import Image from "next/image";
import Header from "@/components/Header";
import SearchFilterBar from "@/components/SearchFilterBar";
import type { FilterState } from "@/lib/filterState";

const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80";

interface HeroProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onSearch: () => void;
  resultCount: number;
}

export default function Hero({
  filters,
  onFilterChange,
  onSearch,
  resultCount,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[520px] items-center overflow-hidden sm:min-h-[600px] lg:min-h-[680px]"
    >
      <Image
        src={HERO_BACKGROUND}
        alt="Modern condominium and skyscraper skyline"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/55 to-black/75" />
      <div className="absolute inset-0 bg-black/30" />

      <Header overlay />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Unlock Below-Market-Value Properties in Malaysia
          </h1>
          <p className="mt-3 text-base text-zinc-200 sm:mt-4 sm:text-xl">
            Save up to 40% on Bank Lelong &amp; Auction properties. Updated
            daily.
          </p>
        </div>

        <div className="mx-auto mt-6 max-w-5xl sm:mt-10">
          <SearchFilterBar
            filters={filters}
            onFilterChange={onFilterChange}
            onSearch={onSearch}
            resultCount={resultCount}
            variant="hero"
            idPrefix="hero"
          />
        </div>
      </div>
    </section>
  );
}

// Re-export for backward compatibility
export type { FilterState } from "@/lib/filterState";
