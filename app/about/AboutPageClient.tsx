"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Target, Zap, Heart, Users, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { JoinModal } from "@/components/JoinModal";
import { useState } from "react";

export default function AboutPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollToWaitlist = () => {
    setIsModalOpen(true);
  };

  const values = [
    {
      icon: Heart,
      title: "Authentic Connections",
      description: "We believe in genuine partnerships between brands and creators that drive real results.",
    },
    {
      icon: Zap,
      title: "Speed & Simplicity",
      description: "No more endless back-and-forth. We make creator collaboration fast, efficient, and straightforward.",
    },
    {
      icon: Shield,
      title: "Transparency First",
      description: "Clear pricing, guaranteed deliverables, and honest communication at every step.",
    },
    {
      icon: TrendingUp,
      title: "Quality Over Quantity",
      description: "We focus on verified creators who consistently deliver high-quality content that converts.",
    },
  ];

  const stats = [
    { number: "100+", label: "Creators Ready" },
    { number: "10+", label: "Brands Waiting" },
    { number: "100%", label: "Quality Guaranteed" },
    { number: "2026", label: "Launching Soon" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-beige-100">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-brown-100 text-brown-700 rounded-full text-sm font-medium mb-6">
                About Maakeit
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brown-900 mb-6 leading-tight">
                We're Making Creator <br />Collaboration Simple
              </h1>
              <p className="text-lg sm:text-xl text-brown-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Maakeit is the platform that connects brands with verified creators who produce 
                high-quality UGC, without the friction, uncertainty, or inflated costs that usually 
                come with influencer marketing.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-brown-900 mb-4">
                  The Problem We're Solving
                </h2>
                <p className="text-brown-600 mb-4 leading-relaxed">
                  Working with creators shouldn't be complicated. But today, brands waste countless 
                  hours searching for the right creators, negotiating rates, and managing campaigns 
                  across scattered platforms.
                </p>
                <p className="text-brown-600 leading-relaxed">
                  Meanwhile, talented creators struggle to find quality brand partnerships and 
                  navigate unclear expectations. We knew there had to be a better way.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-brown-50 rounded-2xl p-8 border border-brown-100"
              >
                <Target className="w-12 h-12 text-brown-700 mb-4" />
                <h3 className="text-2xl font-semibold text-brown-900 mb-3">Our Mission</h3>
                <p className="text-brown-600 leading-relaxed">
                  To build the most trusted marketplace where brands discover creators who deliver 
                  results, and creators find partnerships that value their craft, all in one 
                  streamlined platform.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brown-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-lg text-brown-600 max-w-2xl mx-auto">
                Our values guide every decision we make and every feature we build.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-brown-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-brown-100 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-brown-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-brown-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-brown-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-brown-900">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-brown-600 mb-4">
                Building Something Big
              </h2>
              <p className="text-brown-200 text-lg">
                We're still in early build mode, but the momentum is real.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-brown-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-brown-300 text-sm sm:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How We're Different */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-brown-900 mb-4">
                How We're Different
              </h2>
              <p className="text-lg text-brown-600 max-w-2xl mx-auto">
                We're not just another marketplace. We're building something better.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Verified Quality",
                  description: "Every creator is vetted. No bots, no fake engagement—just real creators who deliver consistent results.",
                },
                {
                  title: "Transparent Workflow",
                  description: "Clear briefs, guaranteed deliverables, and automated payment protection. You always know what you're getting.",
                },
                {
                  title: "Fair Pricing",
                  description: "No hidden fees or inflated rates. Creators keep what they earn, and brands pay what's fair.",
                },
                {
                  title: "Built for Speed",
                  description: "Launch campaigns in minutes, not weeks. Get content faster without sacrificing quality.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 items-start p-6 rounded-2xl bg-beige-50 border border-brown-100"
                >
                  <div className="w-8 h-8 bg-brown-800 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-brown-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-brown-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team/Founder Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-brown-50 to-beige-100 rounded-3xl p-8 sm:p-12 text-center border border-brown-100">
              <Users className="w-16 h-16 text-brown-700 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-brown-900 mb-4">
                Meet the Team
              </h2>
              <p className="text-lg text-brown-600 mb-6 leading-relaxed max-w-2xl mx-auto">
                We're a small team of builders, marketers, and creators who believe there's a 
                better way to connect brands and talent. We've experienced the pain points from 
                both sides, and we're here to fix them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={scrollToWaitlist}
                  className="rounded-full shadow-lg"
                >
                  Join the Waitlist
                </Button>
                <Link href="/blog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-brown-300 text-brown-700 hover:bg-brown-50"
                  >
                    Read Our Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brown-900">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Be Part of the Story
              </h2>
              <p className="text-lg text-brown-200 mb-8 max-w-2xl mx-auto">
                We're launching soon, and we'd love to have you with us from day one. 
                Whether you're a brand or a creator, join the waitlist to get early access.
              </p>
              <Button
                size="lg"
                onClick={scrollToWaitlist}
                className="bg-white text-brown-900 hover:bg-beige-100 rounded-full shadow-lg px-8"
              >
                Get Early Access
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      <JoinModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
