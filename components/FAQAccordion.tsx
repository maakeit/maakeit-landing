"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const faqs = [
  {
    question: "Do I need to pay creators before seeing content?",
    answer: "No. Brands pay upfront into escrow; funds are only released when you approve the content.",
  },
  {
    question: "Can I request edits or revisions?",
    answer: "Yes — your campaign brief can include revision rounds and quality expectations.",
  },
  {
    question: "What if no content meets our expectations?",
    answer: "You only pay when you approve. If nothing meets your standards, your funds remain safe.",
  },
  {
    question: "Can creators reuse the content?",
    answer: "Ownership and licensing rights are included in the campaign agreement based on your preference.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            Frequently Asked Questions
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
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="overflow-hidden rounded-xl border border-brown-200 bg-white"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-brown-50"
                  >
                    <span className="font-medium text-brown-800">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`h-5 w-5 text-brown-500 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`} 
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openIndex === index ? "auto" : 0,
                      opacity: openIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-brown-600">
                      {faq.answer}
                    </p>
                  </motion.div>
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
                Have more
                <br />
                questions?
              </h3>
              <p className="mb-6 text-sm text-brown-500">
                We&apos;re here to help you get started
              </p>
              <Button 
                className="w-full rounded-full"
                onClick={scrollToWaitlist}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
