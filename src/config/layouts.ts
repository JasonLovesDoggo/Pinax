import { Layout } from "react-grid-layout";

export const lgLayout: Layout[] = [
  { i: "location", x: 0, y: 0, w: 2, h: 2 },
  { i: "theme", x: 2, y: 0, w: 1, h: 1 },
  { i: "skills", x: 0, y: 2, w: 1, h: 2 },
];

export const mdLayout: Layout[] = [
  { i: "location", x: 0, y: 0, w: 2, h: 2 },
  { i: "theme", x: 2, y: 0, w: 1, h: 1 },
  { i: "skills", x: 0, y: 2, w: 1, h: 2 },
];

export const smLayout: Layout[] = [
  { i: "location", x: 0, y: 0, w: 2, h: 2 },
  { i: "theme", x: 0, y: 2, w: 1, h: 1 },
  { i: "skills", x: 0, y: 3, w: 1, h: 2 },
];
