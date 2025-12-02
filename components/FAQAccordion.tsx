"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const faqs = [
  "Quisque arcu lorem at, fermentum diam",
  "Quisque arcu lorem ut",
  "Quisque fermentum diam",
  "Quisque arcu lorem at",
  "Quisque arcu at, fermentum",
];

export function FAQAccordion() {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 md:text-4xl">
            Frequently Answered Questions
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="space-y-1">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex cursor-pointer items-center justify-between border-b border-brown-200 py-5 transition-colors hover:border-brown-400"
                >
                  <span className="font-medium text-brown-700 transition-colors group-hover:text-brown-900">
                    {faq}
                  </span>
                  <ChevronRight className="h-5 w-5 text-brown-400 transition-all group-hover:translate-x-1 group-hover:text-brown-600" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl bg-white p-8 shadow-warm-lg">
              <h3 className="mb-2 font-display text-2xl font-semibold text-brown-900">
                Wanna talk before
                <br />
                joining us?
              </h3>
              <p className="mb-6 text-sm text-brown-500">
                Schedule a call with our team
              </p>
              <Button 
                className="w-full rounded-full"
                onClick={scrollToWaitlist}
              >
                Book a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
