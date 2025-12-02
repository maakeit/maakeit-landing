"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Mark",
    role: "Content Manager",
    avatar: "M",
    color: "bg-[#6D5A4C]",
    content:
      "This is a write by rules, not formulas approach to professional marketing. I've used it and seen great results for my clients. This is a professional approach to marketing.",
  },
  {
    name: "Robert",
    role: "Head of Engineering",
    avatar: "R",
    color: "bg-[#5A4634]",
    content:
      "I'm not a writer by trade, but this tool has helped me create content that converts. It's a game-changer for my agency. The results speak for themselves.",
  },
  {
    name: "Melissa",
    role: "Head of Operations",
    avatar: "M",
    color: "bg-[#C7A689]",
    content:
      "This tool has made it easy to create content that converts. I've seen a 300% increase in engagement since I started using it. Highly recommended!",
  },
  {
    name: "Zoe",
    role: "Creative Director",
    avatar: "Z",
    color: "bg-[#4A392A]",
    content:
      "As a write by rules, not formulas approach to professional marketing. The platform has transformed how we approach creator partnerships.",
  },
  {
    name: "Ellen",
    role: "Startup Founder",
    avatar: "E",
    color: "bg-[#6D5A4C]",
    content:
      "I've tried many platforms but this one stands out. The ease of use and the quality of creators available is unmatched. Worth every penny.",
  },
  {
    name: "Jason",
    role: "Marketing Lead",
    avatar: "J",
    color: "bg-[#5A4634]",
    content:
      "This tool has made it easy to scale our content creation. The analytics alone have helped us optimize our campaigns significantly.",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 md:text-4xl">
            Testimonials
          </h2>
          <p className="mt-2 text-brown-500">
            Aliquet dolor sit amet ut fermentum dolor
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-2xl border border-brown-100 bg-cream-50 p-6 transition-all duration-300 hover:border-brown-200 hover:shadow-warm-md"
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white shadow-warm-sm ${testimonial.color}`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-brown-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-brown-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-brown-600">
                &ldquo;{testimonial.content}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
