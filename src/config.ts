import { OcHome2, OcMarkgithub2 } from "solid-icons/oc";
import { IconTypes } from "solid-icons";
import { FaBrandsLinkedin } from "solid-icons/fa";

enum Colors {
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  default = "default",
}

export interface NavItem {
  name: string;
  href: string;
  icon: IconTypes;
  color: Colors;
}
export interface FooterItem {
  label: string;
  href: string;
  icon: IconTypes;
}

export const nav: NavItem[] = [
  {
    name: "Home",
    href: "/",
    color: Colors.primary,
    icon: OcHome2,
  },
];

export const footerItems: FooterItem[] = [
  {
    label: "My GitHub",
    href: "https://github.com/jasonlovesdoggo",
    icon: OcMarkgithub2,
  },
  {
    label: "My LinkedIn",
    href: "https://www.linkedin.com/in/jsoncameron/",
    icon: FaBrandsLinkedin,
  },
];

export default nav;

export const drawerItems = {};

export const hotkeys = [
  {
    id: "Home",
    title: "Open Home",
    hotkey: "cmd+h",
    mdIcon: "home",
    handler: () => {
      console.log("navigation to home");
    },
  },
  {
    id: "Theme",
    title: "Change theme...",
    mdIcon: "desktop_windows",
    children: [
      {
        id: "Reset to Default",
        title: "Change theme to Light",
        mdIcon: "light_mode",
      },
      {
        id: "Dark Theme",
        title: "Change theme to Dark",
        mdIcon: "dark_mode",
        keywords: "lol",
      },
    ],
  },
];
