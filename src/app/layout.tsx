import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata, Viewport } from "next";

import Header from "@/layouts/header";
import { Footer } from "@/layouts/footer";
import { Toaster } from "@/components/ui/sonner";
import BackgroundNoise from "@/components/themes/Noise";
import { ReactNode } from "react";
import MochaScrollbar from "@/components/misc/RandomScrollbar";

export const viewport: Viewport = {
  themeColor: "#b4befe", // https://catppuccin.com/palette#:~:text=199deg%2C%2076%25%2C%2069%25)-,Blue,-%2389b4fa
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Jason Cameron | %s",
  description: "Todo",
  robots: "follow, index",
  authors: [{ name: "Jason Cameron", url: "https://jasoncameron.dev" }],
  keywords: [
    "Jason Cameron",
    "Portfolio",
    "Software Engineer",
    "Backend Developer",
    "DevOps",
    "Programmer",
    "Hackathon",
    "Python",
    "Golang",
    "Developer",
  ],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jasoncameron.dev",
    title: "Jason Cameron",
    description: "Todo",
    images: [
      {
        url: "https://jasoncameron.dev/favicon.ico",
        width: 1200,
        height: 630,
        alt: "Jason Cameron",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="overflow-x-hidden bg-base transition-colors duration-1000 [scrollbar-width:thin]">
        <MochaScrollbar />
        <BackgroundNoise />
        <div className="container mx-auto flex min-h-screen max-w-full flex-col px-4 py-5 sm:max-w-3xl md:max-w-5xl lg:max-w-7xl">
          <div className="flex-1">
            <Header />
            {children}
          </div>
          <Footer />
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
