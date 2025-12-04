"use client";

import { motion } from "framer-motion";
import { FileText, Upload, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "Step 1",
    title: "Post a Campaign",
    description: "Set deliverables, price, brief, and timeline.",
  },
  {
    icon: Upload,
    step: "Step 2",
    title: "Creators Submit Content",
    description: "Pre-vetted creators apply and upload UGC based on your campaign brief.",
  },
  {
    icon: CheckCircle,
    step: "Step 3",
    title: "Approve & Pay",
    description: "Review submissions, select the winning entry, and release payment instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 md:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-brown-600">
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-brown-300 to-brown-200 md:block" />
              )}

              {/* Step number circle */}
              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#5A4634] shadow-warm-lg">
                <step.icon className="h-10 w-10 text-white" />
              </div>

              {/* Step label */}
              <span className="mb-2 inline-block rounded-full bg-brown-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brown-600">
                {step.step}
              </span>

              {/* Title */}
              <h3 className="mb-3 font-display text-xl font-semibold text-brown-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-brown-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center font-display text-2xl font-semibold text-brown-700"
        >
          Simple. Fast. Transparent.
        </motion.p>
      </div>
    </section>
  );
}

