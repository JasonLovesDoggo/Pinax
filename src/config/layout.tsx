import { ReactNode } from "react";

interface NavItem {
  title: string;
  href: string;
  icon?: ReactNode;
  children?: NavItem[];
  className?: string;
}

export const navItems: NavItem[] = [
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
];
