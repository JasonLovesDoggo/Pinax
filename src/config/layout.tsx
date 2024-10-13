import { ReactNode } from "react";

interface NavItemWithHref {
  title: string;
  href: string;
  icon?: ReactNode;
  children?: never;
  className?: string;
}

interface NavItemWithChildren {
  title: string;
  icon?: ReactNode;
  children: NavItemWithHref[];
  className?: string;
  href?: never;
}

export const navItems: (NavItemWithChildren | NavItemWithHref)[] = [
  {
    title: "Home",
    href: "/",
    icon: "~",
    className: "pr-10",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Photos",
    href: "/photos",
  },
  {
    title: "Extras",
    children: [
      {
        title: "Foodle",
        href: "jasoncameron.dev/foodle",
        className: "pr-10",
      },
      {
        title: "Music",
        href: "/music",
        className: "pr-10",
      },
    ],
  },
];
