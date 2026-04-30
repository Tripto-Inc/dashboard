import type { Metadata } from "next";
import { urbanist } from "./fonts";
import "./globals.css";
import { AppProviders } from "@/providers";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    template: "%s - Tripto Admin",
    default: "Tripto Admin",
  },
  description:
    "The core frontend experience for Tripto, built with Next.js. This repository houses the complete UI—including components, pages, and state management—that powers our streamlined accommodation booking platform. It transforms the complex process of search and comparison into a simple, fast, and delightful end-to-end user journey.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "font-sans", inter.variable)}
    >
      <body className={`${urbanist.className} min-h-full flex flex-col antialiased`}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
