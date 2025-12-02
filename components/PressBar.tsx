"use client";

import { motion } from "framer-motion";

const pressLogos = [
  { name: "CNN", style: "font-bold" },
  { name: "Inc.", style: "font-serif italic" },
  { name: "Forbes", style: "font-serif" },
  { name: "yahoo!", sub: "finance", style: "font-bold" },
];

export function PressBar() {
  return (
    <section className="border-y border-brown-200/50 bg-cream-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20"
        >
          {pressLogos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`text-2xl text-brown-500 transition-colors hover:text-brown-700 ${logo.style}`}
            >
              {logo.name}
              {logo.sub && (
                <span className="ml-0.5 text-xs align-super">{logo.sub}</span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
