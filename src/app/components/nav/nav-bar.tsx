"use client";
import { usePathname } from "next/navigation";
import { navItems } from "~/config/layout";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavMenu } from "~/app/components/nav/nav-menu";
import { cn } from "~/lib/utils";

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
                path == href ? "" : "hover:opacity-50",
              )}
              href={href}
            >
              {path == href && (
                <motion.div
                  layoutId="active"
                  className="bg-primary absolute inset-0 backdrop-blur-sm"
                  style={{
                    borderRadius: 9999,
                  }}
                  transition={{ type: "spring", duration: "0.6" }}
                />
              )}
              <span className="relative z-10">{icon ?? title}</span>
            </Link>
          </div>
        ))}
        <NavMenu />
      </nav>
    </div>
  );
};

export default NavBar;
