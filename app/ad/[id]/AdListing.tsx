"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";
import PropertyDetailModal from "@/components/PropertyDetailModal";
import type { Property } from "@/lib/data";

export default function AdListing({ property }: { property: Property }) {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="min-h-[50vh] bg-zinc-50" />
      <Footer />
      <ChatbotWidget />
      <PropertyDetailModal
        property={property}
        onClose={() => router.push("/")}
      />
    </>
  );
}
