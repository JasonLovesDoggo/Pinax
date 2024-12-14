import * as Cards from "@/components/cards";
import { ComponentType } from "react";

export interface GridItem {
  i: string;
  component: ComponentType;
}

export const gridItems: GridItem[] = [
  // { i: 'description', component: GridComponents.Description },
  { i: "location", component: Cards.Location },
  { i: "spotify", component: Cards.Spotify },
  // { i: 'linkedin', component: GridComponents.LinkedIn },
  { i: "theme", component: Cards.Theme },
  // { i: 'project-2', component: GridComponents.SecondProject },
  // { i: 'spotify', component: GridComponents.Spotify },
  { i: "skills", component: Cards.Skills },
  // { i: 'article', component: GridComponents.Article },
  // { i: 'contact', component: GridComponents.Contact },
];
