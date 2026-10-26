import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice, getPropertyById } from "@/lib/data";
import AdListing from "./AdListing";

type AdPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AdPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = getPropertyById(decodeURIComponent(id));
  if (!property) {
    return { title: "Listing not found" };
  }

  const description = `${formatPrice(property.reservePrice)} reserve · ${property.area}, ${property.state} · Auction ${property.auctionDate}`;

  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      images: property.images[0] ? [{ url: property.images[0] }] : undefined,
    },
  };
}

export default async function AdPage({ params }: AdPageProps) {
  const { id } = await params;
  const property = getPropertyById(decodeURIComponent(id));
  if (!property) notFound();
  return <AdListing property={property} />;
}
