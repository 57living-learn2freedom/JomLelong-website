"use client";

import { useMemo, useState } from "react";
import { Building2 } from "lucide-react";
import PropertyCard from "./PropertyCard";
import PropertyDetailModal from "./PropertyDetailModal";
import Pagination from "./Pagination";
import type { Property } from "@/lib/data";
import { PROPERTIES } from "@/lib/data";
import { paginateItems } from "@/lib/pagination";

const FEATURED_PER_PAGE = 6;

export default function PropertyListings() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);

  const { items, totalPages, totalItems, currentPage: safePage } = useMemo(
    () => paginateItems(PROPERTIES, currentPage, FEATURED_PER_PAGE),
    [currentPage]
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <section id="listings" className="bg-zinc-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-red-700">
                <Building2 className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Featured Auctions
                </span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                Latest Bank Lelong Listings
              </h2>
              <p className="mt-2 text-zinc-600">
                Hand-picked properties with below-market reserve prices across
                Malaysia.
              </p>
            </div>
            <p className="text-sm font-medium text-zinc-500">
              {totalItems} listing{totalItems !== 1 ? "s" : ""} total
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={setSelectedProperty}
              />
            ))}
          </div>

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>

      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </>
  );
}
