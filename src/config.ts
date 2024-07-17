import { OcHome2, OcMarkgithub2 } from "solid-icons/oc";
import { FaBrandsLinkedin } from "solid-icons/fa";
import { navigateTo } from "./utils/handlers";
import { Colors, FooterItem, NavItem, Settings } from "./utils/settings.types";

export const settings: Settings = {
  wakatime: {
    username: "JasonLovesDoggo",
    export_id: "f2e375a2-7920-488d-b43b-3f8c7da12ccf",
  },
  github: "JasonLovesDoggo",
  linkedin: "jsoncameron",
  abacus_path: "jasoncameron/portfolio",
};

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
    handler: navigateTo("/"),
  },
  {
    id: "GitHub",
    title: "Open GitHub",
    hotkey: "cmd+g",
    mdIcon: "mark_github",
    handler: navigateTo("https://github.com/" + settings.github, true),
  },
  {
    id: "LinkedIn",
    title: "Open LinkedIn",
    hotkey: "cmd+l",
    mdIcon: "brand_linkedin",
    handler: navigateTo(
      "https://www.linkedin.com/in/" + settings.linkedin,
      true,
    ),
  },
  {
    id: "WakaTime",
    title: "Open WakaTime",
    mdIcon: "access_time",
    handler: navigateTo(
      "https://wakatime.com/@${settings.wakatime.username}",
      true,
    ),
  },
  {
    id: "Themer",
    title: "Open Themer",
    mdIcon: "palette",
    handler: () => {
      console.log("Open Themer");
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
