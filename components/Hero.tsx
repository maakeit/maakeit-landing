"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { JoinModal } from "./JoinModal";

export function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="waitlist" className="relative overflow-hidden bg-pattern py-20 md:py-28">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-brown-200/30 blur-3xl" />
          <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-cream-400/40 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-brown-100 px-4 py-2 text-sm font-medium text-brown-700"
            >
              <span className="flex h-2 w-2 rounded-full bg-brown-500" />
              Connecting Brands & Creators
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl font-bold tracking-tight text-brown-900 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Where Brands Discover Creators.{" "}
              <span className="bg-gradient-to-r from-brown-700 via-amber-500 to-brown-600 bg-clip-text text-transparent">
                Build Together.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brown-600 md:text-xl"
            >
              Maakeit connects brands looking for high-impact user-generated content with 
              talented creators. Post campaigns, accept submissions, and pay only when 
              content is approved.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-10 max-w-lg"
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                className="h-14 rounded-full px-8"
                size="lg"
              >
                Join the Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Sub-text under CTA */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-sm text-brown-500"
            >
              No credit card needed. Get early access.
            </motion.p>

            {/* Social proof avatars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <div className="flex -space-x-3">
                {["#B89B74", "#9A7B52", "#7D5D3B", "#5D4427"].map((color, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="h-10 w-10 rounded-full border-2 border-white shadow-warm-sm"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm text-brown-600">
                <span className="font-semibold text-brown-800">100+</span> creators already joined
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Modal */}
      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
