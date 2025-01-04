"use client";

import Site from "@/config/site";
import { useLayoutEffect, useState } from "react";

export default function Copyright() {
  const [year, setYear] = useState<number>();

  useLayoutEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <span className="text-zinc-350 dark:text-[#898992]">
      ©{" "}
      <time className="hidden sm:inline" dateTime={String(year)}>
        {year}{" "}
      </time>
      {Site.author}
    </span>
  );
}
