interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: "~",
  },
];
