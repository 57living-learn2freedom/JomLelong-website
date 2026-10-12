"use client";

import { useEffect } from "react";
import { claimSessionPageView, sendSheetEvent } from "@/lib/leadTracking";

/** Records one PageView row in the Google Sheet per browser session. */
export default function PageViewLogger() {
  useEffect(() => {
    if (claimSessionPageView()) {
      sendSheetEvent("PageView");
    }
  }, []);

  return null;
}
