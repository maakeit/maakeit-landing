"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { trackFormSubmission, trackCTAClick } from "@/lib/analytics";

export function Hero() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    setError("");
    
    // Track form start
    trackCTAClick("Waitlist Form", "Hero Section");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setEmail("");
        // Track successful submission
        trackFormSubmission("waitlist", true);
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong");
        // Track failed submission
        trackFormSubmission("waitlist", false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      // Track error
      trackFormSubmission("waitlist", false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative overflow-hidden bg-pattern py-20 md:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-brown-200/30 blur-3xl" />
        <div className="absolute -right-20 top-40 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-cream-400/40 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Floating avatar - top right */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-[8%] top-4 hidden lg:block"
          >
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-brown-300 to-brown-400 ring-4 ring-white shadow-warm-lg">
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white">
                A
              </div>
            </div>
          </motion.div> */}

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

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-10 max-w-lg"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#5A4634] px-6 py-4 text-white shadow-warm-lg"
              >
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">You&apos;re on the waitlist! We&apos;ll be in touch soon.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      className="h-14 w-full rounded-full border-[#C7A689]/50 bg-white pl-5 pr-5"
                    />
                    {/* Decorative avatar on input */}
                    {/* <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -left-4 top-1/2 hidden -translate-y-1/2 sm:block"
                    >
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-brown-400 to-brown-500 ring-2 ring-white shadow-warm-md">
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                          B
                        </div>
                      </div>
                    </motion.div> */}
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 rounded-full px-8"
                    size="lg"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Join the Waitlist
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 text-center text-sm text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
                {/* Decorative avatar on right */}
                {/* <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -right-4 top-1/2 hidden -translate-y-1/2 sm:block"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-amber-500 ring-2 ring-white shadow-warm-md">
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                      C
                    </div>
                  </div>
                </motion.div> */}
              </form>
            )}
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
              <span className="font-semibold text-brown-800">10+</span> creators already joined
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
