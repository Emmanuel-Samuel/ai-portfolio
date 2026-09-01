"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";

const CAL_LINK = "emmanuel-samuel-mayowa/30min";
const CAL_NAMESPACE = "30min";

// Brand accent (#29D6B9) applied to the embed's own theme, independent of site light/dark mode
const CAL_BRAND = {
  dark: {
    "cal-brand": "#29D6B9",
    "cal-text-emphasis": "#F5FBFA",
    "cal-brand-emphasis": "#20B89E",
    "cal-brand-text": "#0A1A17",
    "cal-border-emphasis": "#2A3B38",
    "cal-bg-emphasis": "#0F1D1A",
  },
  light: {
    "cal-brand": "#29D6B9",
    "cal-text-emphasis": "#0A1A17",
    "cal-brand-emphasis": "#20B89E",
    "cal-brand-text": "#F5FBFA",
  },
};

const BookingEmbed = () => {
  const [isReady, setIsReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    (async function initCal() {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (!isMounted) return;

      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: CAL_BRAND,
        styles: { branding: { brandColor: "#29D6B9" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      setIsReady(true);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full min-h-[560px] sm:min-h-[600px] rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
      {!isReady && (
        <div
          className={`absolute inset-0 flex flex-col gap-3 p-6 ${
            shouldReduceMotion ? "" : "animate-pulse motion-reduce:animate-none"
          }`}
          aria-hidden="true"
        >
          <div className="h-6 w-40 rounded-md bg-primary/10" />
          <div className="h-4 w-56 rounded-md bg-black/10 dark:bg-white/10" />
          <div className="mt-4 grid grid-cols-3 gap-3 flex-1">
            <div className="rounded-xl bg-black/10 dark:bg-white/10" />
            <div className="rounded-xl bg-black/10 dark:bg-white/10" />
            <div className="rounded-xl bg-black/10 dark:bg-white/10" />
          </div>
        </div>
      )}
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", minHeight: "560px", overflow: "scroll" }}
        config={{ theme: "dark" }}
      />
    </div>
  );
};

export default BookingEmbed;
