"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

export function PaymentsSection() {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="bg-cream-100 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left side - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-4 rounded-2xl border-2 border-[#5A4634] bg-white px-6 py-5 shadow-warm-lg"
            >
              <span className="text-4xl font-bold text-[#4A392A]">$30,000</span>
              <div className="flex items-center gap-2 rounded-full bg-[#5A4634] px-4 py-2">
                <CheckCircle className="h-4 w-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  Invested!
                </span>
              </div>
            </motion.div>

            {/* Secondary stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-4 rounded-2xl border border-brown-200 bg-white px-6 py-5 shadow-warm-sm"
            >
              <span className="text-4xl font-bold text-brown-900">$100,000</span>
              <span className="rounded-full bg-cream-200 px-4 py-2 text-sm font-medium text-brown-600">
                Investing
              </span>
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold text-brown-900 md:text-4xl lg:text-5xl">
              Raise Funding for Your Startup
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brown-600">
              Launch a funding round through our online platform, allowing individuals 
              to invest smaller amounts. Tap into your friends and family network, 
              engage your brand&apos;s community, and connect with our global network of 
              individual investors eager to support your growth.
            </p>
            <Button 
              className="mt-8 rounded-full" 
              size="lg"
              onClick={scrollToWaitlist}
            >
              Learn more
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
