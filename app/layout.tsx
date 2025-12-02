import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maakeit - Where Brands Discover Creators. Create Content. Get Paid Fast.",
  description: "Maakeit connects brands posting campaigns with creators who apply, deliver content, and get paid instantly. Creators keep 100% of their earnings — brands pay a small 2% handling fee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

