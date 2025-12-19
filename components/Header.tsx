"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function Header({ 
  homePage = false }: { homePage?: boolean }) {
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
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Maakeit"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="hidden sm:block font-display text-2xl font-bold text-brown-900">Maakeit</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { name: "Blog", href: "/blog" },
            { name: "About Us", href: "/about" },
            // { name: "Pricing", href: "#pricing" },
            { name: homePage ?"Benefits" : null, href: homePage ? "#benefits" : "" },
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
