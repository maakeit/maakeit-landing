"use client";

import { motion } from "framer-motion";
import { CheckCircle, Image, LineChart, FileText } from "lucide-react";

const resources = [
  {
    icon: CheckCircle,
    title: "Intercom",
    subtitle: "$1,000 in credit button Plus plan",
    description: "Build better customer relationships with the Engagement OS.",
  },
  {
    icon: Image,
    title: "Stripe",
    subtitle: "50% OFF for 1st Year",
    description: "Financial infrastructure for the internet with customer discounts.",
  },
  {
    icon: LineChart,
    title: "Mercury",
    subtitle: "Spend $5,000 and get $50 cash back",
    description: "Powerful banking for startups with real rewards.",
  },
  {
    icon: FileText,
    title: "Intercom",
    subtitle: "100% OFF for 1st Year",
    description: "Build better customer relationships with the Engagement OS.",
  },
];

export function ResourcesShowcase() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 md:text-4xl lg:text-5xl">
            Everything you need to take your
            <br />
            Startup to the next level.
          </h2>
          <p className="mt-4 text-lg text-brown-600">
            Access our exclusive network with perks worth over $50,000 and boost your startup.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-brown-100 bg-cream-50 p-6 text-center shadow-warm-sm transition-all duration-300 hover:border-brown-200 hover:shadow-warm-md"
            >
              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-warm-sm ring-1 ring-brown-200">
                <resource.icon className="h-7 w-7 text-[#5A4634]" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-brown-900">
                {resource.title}
              </h3>
              <p className="text-sm text-brown-500">
                {resource.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
