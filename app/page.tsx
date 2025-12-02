import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PressBar } from "@/components/PressBar";
import { FeatureCardsGrid } from "@/components/FeatureCardsGrid";
import { PaymentsSection } from "@/components/PaymentsSection";
import { ResourcesShowcase } from "@/components/ResourcesShowcase";
import { FounderSection } from "@/components/FounderSection";
import { Testimonials } from "@/components/Testimonials";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern">
      <Header />
      <Hero />
      <PressBar />
      <FeatureCardsGrid />
      <PaymentsSection />
      <ResourcesShowcase />
      <FounderSection />
      <Testimonials />
      <FAQAccordion />
      <Footer />
    </main>
  );
}
