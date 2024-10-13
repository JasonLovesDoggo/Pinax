"use client";
import { Mosaic, MosaicWindow } from "react-mosaic-component";

// import "react-mosaic-component/react-mosaic-component.css";
import Chats from "@/components/bento/cards/about";
import "@/styles/bento.css";

// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export type ViewTypes = "a" | "b" | "c" | "d" | "e";

const ELEMENT_MAP: Record<ViewTypes, JSX.Element> = {
  a: <Chats />,
  b: <Chats />,
  c: <Chats />,
  d: <Chats />,
  e: <Chats />,
};

const listOfIds = {
  a: "Chirag",
  b: "JSON",
  c: "Apple Sauce",
  d: "About me",
  e: "What",
};

const BentoContainer = () => {
  return (
    <Mosaic
      renderTile={(id, path) => (
        <MosaicWindow<ViewTypes> path={path} title={listOfIds[id as ViewTypes]}>
          {ELEMENT_MAP[id as ViewTypes]}
        </MosaicWindow>
      )}
      initialValue={{
        direction: "row",
        first: {
          direction: "column",
          first: "a",
          second: "b",
        },
        second: {
          direction: "column",
          first: "c",
          second: "d",
        },
        splitPercentage: 60,
      }}
    />
  );
};

export default BentoContainer;
