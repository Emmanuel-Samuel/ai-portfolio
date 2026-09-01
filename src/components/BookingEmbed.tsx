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

type BookingEmbedProps = {
  className?: string;
  /** Tailwind height classes applied to the wrapper. Defaults to a bounded, scroll-inside height. */
  height?: string;
};

const DEFAULT_HEIGHT = "h-[480px] sm:h-[560px]";

const BookingEmbed = ({ className = "", height = DEFAULT_HEIGHT }: BookingEmbedProps) => {
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
        // column_view puts the calendar and time slots side by side instead of
        // stacking a full month grid above a long vertical slot list, so it fits
        // comfortably inside a bounded, scrollable container.
        layout: "column_view",
      });

      setIsReady(true);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className={`relative w-full ${height} rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 ${className}`}
      style={{ overflowY: "auto", overflowX: "hidden" }}
    >
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
        style={{ width: "100%", height: "100%", minHeight: "100%" }}
        config={{ theme: "dark", layout: "column_view" }}
      />
    </div>
  );
};

export default BookingEmbed;
