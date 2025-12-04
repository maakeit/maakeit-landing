import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PressBar } from "@/components/PressBar";
import { FeatureCardsGrid } from "@/components/FeatureCardsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { PaymentsSection } from "@/components/PaymentsSection";
import { ResourcesShowcase } from "@/components/ResourcesShowcase";
import { FounderSection } from "@/components/FounderSection";
import { Testimonials } from "@/components/Testimonials";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Maakeit - Creators & Brands Collaborate, Create, and Get Paid",
  description:
    "Maakeit connects brands looking for high-impact user-generated content with talented creators. Post campaigns, accept submissions, and pay only when content is approved.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern">
      <Header />
      <Hero />
      {/* <PressBar /> */}
      <FeatureCardsGrid />
      <HowItWorks />
      {/* <PaymentsSection /> */}
      {/* <ResourcesShowcase /> */}
      {/* <FounderSection /> */}
      <Testimonials />
      <FAQAccordion />
      <CTASection />
      <Footer />
    </main>
  );
}
