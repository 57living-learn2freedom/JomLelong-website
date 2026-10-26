"use client";

import { type KeyboardEvent } from "react";
import Image from "next/image";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { Property } from "@/lib/data";
import { formatPrice } from "@/lib/data";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export default function PropertyCard({
  property,
  onViewDetails,
}: PropertyCardProps) {
  function handleCardClick() {
    onViewDetails(property);
  }

  function handleCardKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onViewDetails(property);
    }
  }

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      aria-label={`View details for ${property.title}`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:border-red-200 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
    >
      <div className="relative aspect-[2/1] overflow-hidden bg-zinc-100">
        <Image
          src={property.images[0] ?? "/placeholder.jpg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white shadow">
          Lelong
        </span>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-700 opacity-0 shadow transition-opacity group-hover:opacity-100">
          View Details
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-zinc-900 sm:text-lg">{property.title}</h3>

        <div className="mt-2 flex items-start gap-1.5 text-sm text-zinc-600">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
          <address className="not-italic leading-snug">
            {property.address}, {property.postcode} {property.state}
          </address>
        </div>

        <p className="mt-3 text-lg font-bold text-red-700 sm:text-xl">
          Reserve Price: {formatPrice(property.reservePrice)}
        </p>

        <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
          <Calendar className="h-4 w-4 shrink-0" />
          Auction Date: {property.auctionDate}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-zinc-50 p-3 text-center text-xs">
          <div>
            <p className="font-semibold text-zinc-500">Land Area</p>
            <p className="mt-0.5 font-medium text-zinc-800">
              {property.landArea}
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-500">Built-up</p>
            <p className="mt-0.5 font-medium text-zinc-800">
              {property.builtUp}
            </p>
          </div>
          <div>
            <p className="font-semibold text-zinc-500">Tenure</p>
            <p className="mt-0.5 font-medium text-zinc-800">
              {property.tenure}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
