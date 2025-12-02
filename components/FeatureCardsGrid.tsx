"use client";

import { motion } from "framer-motion";
import {
  Layers,
  FileCheck,
  UserCheck,
  CreditCard,
  MessageSquare,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: Layers,
    title: "Campaign Marketplace",
    description:
      "Browse campaigns from top brands. Filter by niche, budget, and content type to find perfect matches.",
    accent: true,
  },
  {
    icon: FileCheck,
    title: "Automatic Content Licensing",
    description:
      "All content rights are automatically licensed to brands upon payment. Simple, transparent, legally sound.",
    accent: false,
  },
  {
    icon: UserCheck,
    title: "Simple Creator Applications",
    description:
      "One-click apply with your creator profile. Brands review applications and select the best fit.",
    accent: false,
  },
  {
    icon: CreditCard,
    title: "Paystack Payments",
    description:
      "Get paid instantly via Paystack once content is approved. No waiting periods, no hassle.",
    accent: true,
  },
  {
    icon: MessageSquare,
    title: "Built-in Messaging",
    description:
      "Collaborate directly with brands. Share drafts, get feedback, and finalize content—all in one place.",
    accent: false,
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track your earnings, engagement metrics, and campaign performance in real-time dashboards.",
    accent: true,
  },
];

export function FeatureCardsGrid() {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="benefits" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 md:text-4xl lg:text-5xl">
            Why Brands & Creators Use Maakeit?
          </h2>
          <p className="mt-4 text-lg text-brown-600">
            Experience the benefits of being part of a vibrant creator community that fosters
            collaboration and innovation.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-[#C7A689]/30 bg-white p-6 shadow-warm-sm transition-all duration-300 hover:border-[#5A4634] hover:bg-[#5A4634] hover:shadow-warm-xl"
            >
              {/* Decorative gradient on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#C7A689]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative mb-4 inline-flex rounded-xl bg-[#5A4634] p-3 shadow-warm-sm transition-all duration-300 group-hover:bg-white/20">
                <feature.icon className="h-6 w-6 text-white transition-colors duration-300" />
              </div>

              <h3 className="relative mb-2 text-lg font-semibold text-[#4A392A] transition-colors duration-300 group-hover:text-white">
                {feature.title}
              </h3>

              <p className="relative mb-5 text-sm leading-relaxed text-[#6D5A4C] transition-colors duration-300 group-hover:text-white/90">
                {feature.description}
              </p>

              <Button
                variant="outline"
                size="sm"
                className="relative rounded-full border-[#C7A689] text-[#5A4634] transition-all duration-300 hover:bg-white/10 group-hover:border-white group-hover:text-white group-hover:hover:bg-white/20"
                onClick={scrollToWaitlist}
              >
                Details
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
