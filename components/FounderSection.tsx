"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function FounderSection() {
  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-8 font-display text-xl italic text-brown-700 md:text-2xl">
            &ldquo; Here&apos;s a Message from our Founder &rdquo;
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#C7A689] via-[#6D5A4C] to-[#5A4634] shadow-warm-xl"
          >
            {/* Video overlay pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            
            {/* Play button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-warm-lg transition-shadow hover:shadow-warm-xl"
            >
              <Play className="h-8 w-8 text-[#5A4634] ml-1" fill="currentColor" />
            </motion.button>

            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brown-900/30 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
