"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden border-t border-brown-200 bg-white py-10"
    >
      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-0 right-0 select-none">
        <span className="font-display text-[12rem] font-bold leading-none text-brown-100/50 md:text-[16rem]">
          Maakeit
        </span>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-8 text-sm">
            <Link
              href="#"
              className="font-medium text-brown-600 transition-colors hover:text-brown-900"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="font-medium text-brown-600 transition-colors hover:text-brown-900"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm text-brown-500">
            © {new Date().getFullYear()} Maakeit. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
