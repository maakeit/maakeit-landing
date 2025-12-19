import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Us - Maakeit",
  description:
    "Maakeit connects brands looking for high-impact user-generated content with talented creators. Post campaigns, accept submissions, and pay only when content is approved.",
  alternates: {
    canonical: "/about",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
