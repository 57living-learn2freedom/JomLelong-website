export const MALAYSIAN_STATES = [
  "All States",
  "Kuala Lumpur",
  "Selangor",
  "Johor",
  "Penang",
  "Perak",
  "Negeri Sembilan",
  "Melaka",
  "Pahang",
  "Kedah",
  "Sabah",
  "Sarawak",
] as const;

export const PROPERTY_TYPES = [
  "All Types",
  "Terrace",
  "Condo/Apartment",
  "Semi-D/Bungalow",
  "Commercial",
  "Land",
] as const;

export const PRICE_RANGES = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Below RM 300,000", min: 0, max: 300000 },
  { label: "RM 300,000 – RM 500,000", min: 300000, max: 500000 },
  { label: "RM 500,000 – RM 800,000", min: 500000, max: 800000 },
  { label: "RM 800,000 – RM 1,200,000", min: 800000, max: 1200000 },
  { label: "Above RM 1,200,000", min: 1200000, max: Infinity },
] as const;

/**
 * AGENT_PHONE_NUMBER — Replace with your WhatsApp number (country code, no + or spaces).
 * Used for consultation form links: https://wa.me/[AGENT_PHONE_NUMBER]?text=[ENCODED_TEXT]
 */
export const WHATSAPP_NUMBER = "60133346758";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Featured Auctions", href: "#listings" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact Us", href: "#contact" },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Select Property",
    description:
      "Browse our daily-updated listings and locate the property that fits your budget and location.",
  },
  {
    step: 2,
    title: "Prepare Deposit",
    description:
      "Prepare a 10% bank draft or deposit as required by the auctioneer before bidding day.",
  },
  {
    step: 3,
    title: "Register & Bid",
    description:
      "We assist you to register for online or on-site bidding with the appointed auctioneer.",
  },
  {
    step: 4,
    title: "Successful Purchase",
    description:
      "Upon winning, complete the balance payment within 90–120 days as per auction terms.",
  },
] as const;
