"use client";
import { navItems } from "@/config/layout";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ReactNode, useEffect, useState } from "react";
import { flavors } from "@catppuccin/palette";

const MotionLink = motion.create(Link);

let cachedColorNames: string[] | null = null;

const getColorNamesWithAccents = (): string[] => {
  if (!cachedColorNames) {
    cachedColorNames = flavors["mocha"].colorEntries
      .filter(([_, { accent }]) => accent)
      .map(([colorName]) => colorName);
  }
  return cachedColorNames;
};

const generateRandomColorName = (): string => {
  const colorNames = getColorNamesWithAccents();
  return colorNames[Math.floor(Math.random() * colorNames.length)] ?? "slate";
};

interface AnimatedLinkProps {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const AnimatedLink = ({
  href,
  children,
  className,
  onClick,
}: AnimatedLinkProps) => {
  const [color, setColor] = useState<string>("slate");
  useEffect(() => {
    setColor(generateRandomColorName());
  }, []);
  const baseClasses =
    "relative text-text hover:text-lavender cursor-pointer transition-all duration-300 ease-in-out";
  const hoverClasses = `hover:scale-105 bg-${color} hover-underline-animation`;

  const content = (
    <span className={cn(hoverClasses, baseClasses, className)}>{children}</span>
  );

  if (href) {
    return (
      <MotionLink
        href={href}
        className={navigationMenuTriggerStyle()}
        onClick={onClick}
      >
        {content}
      </MotionLink>
    );
  }

  return <motion.div onClick={onClick}>{content}</motion.div>;
};

export default function Navbar() {
  return (
    <NavigationMenu className="max-w-full flex-wrap justify-between px-4 py-2 text-text">
      <NavigationMenuList>
        {navItems.map((item, index) => (
          <NavigationMenuItem key={item.title}>
            {"children" in item ? (
              <NavigationMenuTrigger>
                <AnimatedLink>
                  <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    {item.title}
                  </motion.span>
                </AnimatedLink>
              </NavigationMenuTrigger>
            ) : (
              <AnimatedLink href={item.href} className={cn(item.className)}>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.icon ? item.icon : item.title}
                </motion.span>
              </AnimatedLink>
            )}

            {"children" in item && (
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 rounded-md bg-surface0 p-4 shadow-lg">
                  {item.children?.map((child) => (
                    <li key={child.title}>
                      <NavigationMenuLink asChild>
                        <AnimatedLink
                          href={child.href}
                          className={cn(
                            "block select-none rounded-md p-3 leading-none no-underline outline-none",
                            child.className,
                          )}
                        >
                          <div className="text-sm font-medium leading-none">
                            {child.title}
                          </div>
                        </AnimatedLink>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
