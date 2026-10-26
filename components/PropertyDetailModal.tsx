"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Calendar,
  MessageCircle,
  Ruler,
  Home,
  FileText,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Property } from "@/lib/data";
import { formatPrice } from "@/lib/data";
import { buildWhatsAppUrl } from "@/lib/utils";
import LoanCalculator from "./LoanCalculator";
import ShareThisAd from "./ShareThisAd";

const SWIPE_THRESHOLD_PX = 50;

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
}: PropertyDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!property) return;

    setCurrentImageIndex(0);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  const imagesList =
    property.images && property.images.length > 0
      ? property.images
      : ["/placeholder.jpg"];

  const hasMultipleImages = imagesList.length > 1;

  function goToImage(index: number) {
    setCurrentImageIndex(index);
  }

  function nextImage(e?: React.MouseEvent) {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imagesList.length);
  }

  function prevImage(e?: React.MouseEvent) {
    e?.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + imagesList.length) % imagesList.length
    );
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || !hasMultipleImages) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) >= SWIPE_THRESHOLD_PX) {
      if (diff > 0) nextImage();
      else prevImage();
    }

    touchStartX.current = null;
  }

  const whatsappMessage = `Hi JomLelong, I'm interested in this property:\n\n${property.title}\n${property.address}, ${property.postcode} ${property.state}\nReserve Price: ${formatPrice(property.reservePrice)}\nAuction Date: ${property.auctionDate}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close property details"
      />

      <div className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[92vh] sm:rounded-2xl">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div
            className="relative aspect-[2/1] touch-pan-y bg-zinc-100"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={imagesList[currentImageIndex]}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-all duration-300"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
              draggable={false}
            />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95 sm:left-3 sm:p-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-md transition-all hover:bg-black/60 active:scale-95 sm:right-3 sm:p-2"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/20 px-2.5 py-1.5 backdrop-blur-md sm:bottom-4">
                  {imagesList.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToImage(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "w-4 bg-white"
                          : "w-1.5 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-md sm:bottom-4">
                  {currentImageIndex + 1} / {imagesList.length}
                </span>
              </>
            )}

            <button
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2.5 text-zinc-700 shadow-md transition-colors hover:bg-white sm:right-3 sm:top-3 sm:p-2"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="absolute left-2 top-2 z-10 rounded-full bg-red-700 px-3 py-1 text-xs font-semibold text-white shadow sm:left-3 sm:top-3">
              Bank Lelong
            </span>
          </div>

          {hasMultipleImages && (
            <div
              className="flex gap-2 overflow-x-auto border-b border-zinc-100 bg-zinc-50 px-3 py-3 sm:px-4"
              role="tablist"
              aria-label="Property photo thumbnails"
            >
              {imagesList.map((imageUrl, index) => {
                const isActive = index === currentImageIndex;
                return (
                  <button
                    key={`${imageUrl}-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View photo ${index + 1}`}
                    onClick={() => goToImage(index)}
                    className={`relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg transition-all sm:h-16 sm:w-20 ${
                      isActive
                        ? "ring-2 ring-red-700 ring-offset-1"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={`${property.title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                      draggable={false}
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div className="p-4 sm:p-8">
            <h2
              id="property-modal-title"
              className="text-xl font-bold text-zinc-900 sm:text-2xl"
            >
              {property.title}
            </h2>

            <div className="mt-2 flex items-start gap-1.5 text-sm text-zinc-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
              <address className="not-italic break-words">
                {property.address}, {property.postcode} {property.state}
              </address>
            </div>

            <p className="mt-4 text-xl font-bold text-red-700 sm:text-2xl">
              Reserve Price: {formatPrice(property.reservePrice)}
            </p>

            <div className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
              <Calendar className="h-4 w-4 shrink-0" />
              Auction Date: {property.auctionDate}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4">
                <Ruler className="h-5 w-5 shrink-0 text-red-700" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-zinc-500">
                    Land Area
                  </p>
                  <p className="font-medium text-zinc-800">{property.landArea}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4">
                <Home className="h-5 w-5 shrink-0 text-red-700" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-zinc-500">
                    Built-up
                  </p>
                  <p className="font-medium text-zinc-800">{property.builtUp}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4">
                <FileText className="h-5 w-5 shrink-0 text-red-700" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-zinc-500">
                    Tenure
                  </p>
                  <p className="font-medium text-zinc-800">{property.tenure}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4">
                <Building2 className="h-5 w-5 shrink-0 text-red-700" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-zinc-500">
                    Property Type
                  </p>
                  <p className="font-medium text-zinc-800">{property.type}</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-zinc-600">
              This bank lelong property in {property.area}, {property.state} is
              available for auction. Contact our specialist for bidding
              registration, deposit requirements, and a full due-diligence
              checklist before auction day.
            </p>

            <LoanCalculator reservePrice={property.reservePrice} />

            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-800"
            >
              <MessageCircle className="h-4 w-4" />
              Inquire on WhatsApp
            </a>

            <ShareThisAd property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
