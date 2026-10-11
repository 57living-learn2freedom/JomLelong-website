import type { Metadata } from "next";
import MetaPixel from "@/components/MetaPixel";

export const metadata: Metadata = {
  title: "Free Bank Lelong Consultation | JomLelong",
  description:
    "Buy bank lelong condos and auction properties in Malaysia up to 40% below market value. Get a free consultation via WhatsApp.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MetaPixel />
      {children}
    </>
  );
}
