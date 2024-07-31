import type { JSX } from "solid-js";

export type Icon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => Element;

export interface Settings {
  github: string;
  linkedin: string;
  wakatime: {
    username: string;
    export_id: string;
  };
  abacus_path: string;
}

export enum Colors {
  primary = "primary",
  secondary = "secondary",
  accent = "accent",
  default = "default",
}

export interface NavItem {
  name: string;
  href: string;
  icon: Icon;
  color: Colors;
}

export interface FooterItem {
  label: string;
  href: string;
  icon: Icon;
}
