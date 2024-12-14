"use client";

import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NotFound() {
  const isMounted = useMounted();

  return (
    <main className="flex items-center justify-center pt-32">
      <div
        className={cn(
          "space-y-4 text-center",
          isMounted ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
          "transition-[opacity,_transform] duration-700",
        )}
      >
        <h1 className="font-calistoga text-7xl md:text-9xl">404</h1>
        <h2 className="font-calistoga text-xl md:text-3xl">Page Not Found</h2>
        <p>Sorry, we couldn&apos;t find what you were looking for.</p>
        <Link href="/" className="text-random px-4 py-2">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
