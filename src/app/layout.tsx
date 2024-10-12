import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/app/layouts/header";
import { Footer } from "~/app/layouts/footer";
import { Toaster } from "~/components/ui/sonner";
import BackgroundNoise from "~/app/misc/themes/Noise";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable}`}
    >
      <body className="bg-base transition-colors duration-700">
        <BackgroundNoise />
        <div className="container mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-5">
          <div className="flex-1">
            <Header />
            <main>
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </main>
          </div>
          <Footer />
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
