import { AnchorHTMLAttributes } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

export default function Anchor({
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "bg-white group inline-flex items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full p-3 transition-all duration-300",
        "ring-gray-200/45 dark:text-black dark:ring-gray-200/30 outline-none ring-2 focus-within:outline-none focus-within:ring-4 hover:ring-4",
        props.className,
      )}
    />
  );
}
