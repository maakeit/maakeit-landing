"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function Header() {
  const scrollToWaitlist = () => {
    const element = document.getElementById("waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-brown-200/50 bg-cream-100/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          {/* <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5A4634] shadow-warm-md">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div> */}
          <span className="font-display text-2xl font-bold text-brown-900">Maakeit</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { name: "Blogs", href: "#" },
            { name: "About Us", href: "#about" },
            { name: "Pricing", href: "#pricing" },
            { name: "Benefits", href: "#benefits" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-brown-600 transition-colors hover:text-brown-900"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Button 
          size="sm" 
          className="rounded-full shadow-warm-md"
          onClick={scrollToWaitlist}
        >
          Get Started
        </Button>
      </div>
    </motion.header>
  );
}
