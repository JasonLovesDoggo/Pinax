enum Colors {
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  default = "default",
}

interface NavItem {
  name: string;
  href: string;
  color: Colors;
}

export const nav: NavItem[] = [
  {
    name: "Home",
    href: "/",
    color: Colors.primary,
  },
  {
    name: "About",
    href: "/about",
    color: Colors.secondary,
  },
  {
    name: "Contact",
    href: "Eee",
    color: Colors.accent,
  },
];

export default nav;

export const drawerItems = {};


export const hotkeys = [
  {
    id: 'Home',
    title: 'Open Home',
    hotkey: 'cmd+h',
    mdIcon: 'home',
    handler: () => {
      console.log('navigation to home')
    },
  },
  {
    id: 'Theme',
    title: 'Change theme...',
    mdIcon: 'desktop_windows',
    children: [
      {
        id: 'Light Theme',
        title: 'Change theme to Light',
        mdIcon: 'light_mode',
      },
      {
        id: 'Dark Theme',
        title: 'Change theme to Dark',
        mdIcon: 'dark_mode',
        keywords: 'lol',
      },
    ],
  },
]
