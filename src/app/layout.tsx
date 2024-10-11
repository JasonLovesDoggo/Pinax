import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/app/layouts/header";
import { Footer } from "~/app/layouts/footer";
import { Toaster } from "sonner";
import { ThemeProvider } from "~/app/misc/themes/theme-provider";

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
      <body
      className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] font-10"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-5">
            <div className="flex-1">
              <Header />
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </div>
            <Footer />
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
