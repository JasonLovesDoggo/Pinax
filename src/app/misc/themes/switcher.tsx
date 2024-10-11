"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function ThemeSwitch() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function onThemeChange() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          aria-label="Switch theme"
          type="button"
          onClick={onThemeChange}
          className="text-text hover:bg-overlay ml-1 flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-md font-medium duration-200 ease-in-out sm:p-4"
        >
          <AnimatePresence mode="wait">
            {resolvedTheme === "light" && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="theme1"
              >
                <IconMoon size={15} />
              </motion.span>
            )}
            {resolvedTheme === "dark" && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                key="theme2"
              >
                <IconSun size={15} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
