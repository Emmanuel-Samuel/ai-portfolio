import type { Metadata } from "next";
import WorkWithMeContent from "@/components/work-with-me/WorkWithMeContent";
import { siteConfig, ogLocale } from "@/lib/seo/site";

const title = `Work With Me — ${siteConfig.author}`;
const description =
  "Selectively available for short-term and contract projects: AI agents, voice agents, AIOps and full-stack product builds.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteConfig.siteUrl}/work-with-me`,
  },
  openGraph: {
    type: "website",
    locale: ogLocale,
    url: `${siteConfig.siteUrl}/work-with-me`,
    title,
    description,
    siteName: siteConfig.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function WorkWithMePage() {
  return <WorkWithMeContent />;
}
