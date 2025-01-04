"use client";

import { useEffect } from "react";
import { getRandomAccentHex } from "@/lib/themes";

export default function MochaScrollbar() {
  useEffect(() => {
    const randomColor = getRandomAccentHex();
    document.documentElement.style.setProperty(
      "--scrollbar-color",
      randomColor,
    );
  }, []);

  return null;
}
