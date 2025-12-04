"use client";

import { motion } from "framer-motion";
import {
  Search,
  FileCheck,
  Shield,
  Wallet,
  BarChart3,
  FolderOpen,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: Search,
    title: "Campaign Marketplace & Creator Discovery",
    description:
      "Easily browse and publish campaigns to a network of vetted creators. Skip the tedious outreach — let creativity come to you.",
    accent: true,
  },
  {
    icon: FileCheck,
    title: "Structured Submission & Approval Flow",
    description:
      "Creators submit content through a guided workflow. You review, approve, and only pay once you're satisfied.",
    accent: false,
  },
  {
    icon: Shield,
    title: "Risk-Free Payment Escrow",
    description:
      "Brands pay upfront + 2% handling fee — funds are held safely until content is approved.",
    accent: false,
  },
  {
    icon: Wallet,
    title: "Creators Keep 100% of Earnings",
    description:
      "No hidden fees or commissions. Transparent, fair, and creator-first.",
    accent: true,
  },
  {
    icon: BarChart3,
    title: "Built-in Attribution & Tracking",
    description:
      "Track which content drives results — from views to sales. Data-driven UGC starts here. Coming Soon.",
    accent: false,
  },
  {
    icon: FolderOpen,
    title: "UGC Library & Scalable Content",
    description:
      "Run multiple campaigns, collect creative assets, and reuse or scale across platforms — all in one place.",
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
            Why Brands & Creators Choose Maakeit
          </h2>
          <p className="mt-4 text-lg text-brown-600">
            Everything you need to run successful UGC campaigns — from discovery to payment.
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
