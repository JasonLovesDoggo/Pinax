"use client";
import { usePathname } from "next/navigation";
import { navItems } from "@/config/layout";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NavBar = () => {
  const path = usePathname();

  return (
    <div className="flex shrink-0 items-center">
      <nav className="flex gap-2 rounded-3xl px-1 py-2">
        {navItems.map(({ title, href, icon, className }) => (
          <div key={title + href} className={className}>
            <Link
              className={cn(
                "relative transform-gpu rounded-full px-3 py-2 transition-all",
                path == href ? "text-mantle" : "hover:opacity-50",
              )}
              href={href}
            >
              {path == href && (
                <motion.div
                  layoutId="active"
                  className="absolute inset-0 bg-text backdrop-blur-sm"
                  style={{
                    borderRadius: 99,
                  }}
                  transition={{ type: "spring", duration: "0.6" }}
                />
              )}
              <span className="relative z-10">{icon ?? title}</span>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
