"use client";
import {
  createBalancedTreeFromLeaves,
  getLeaves,
  Mosaic,
  MosaicNode,
  MosaicWindow,
} from "react-mosaic-component";

// import "react-mosaic-component/react-mosaic-component.css";
import Chats from "@/components/bento/cards/about";
import "@/styles/bento.css";
import { ReactNode, useState } from "react";

// import "@blueprintjs/core/lib/css/blueprint.css";
// import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export type ViewTypes = "a" | "b" | "c" | "d" | "e";

const ELEMENT_MAP: Record<ViewTypes, ReactNode> = {
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

export interface BentoState {
  currentNode: MosaicNode<string> | null;
}

const initialState: BentoState = {
  currentNode: {
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
    splitPercentage: 10,
  },
};

const BentoContainer = () => {
  const [state, setState] = useState<BentoState>(initialState);

  const onChange = (currentNode: BentoState["currentNode"]) => {
    setState({ currentNode });
  };

  const autoArrange = () => {
    const leaves = getLeaves(state.currentNode);

    setState({
      currentNode: createBalancedTreeFromLeaves(leaves),
    });
  };

  return (
    <>
      <button onClick={autoArrange}>Auto Arrange</button>
      <Mosaic
        renderTile={(id, path) => (
          <MosaicWindow<ViewTypes>
            path={path}
            title={listOfIds[id as ViewTypes]}
          >
            {ELEMENT_MAP[id as ViewTypes]}
          </MosaicWindow>
        )}
        onRelease={(n) => {
          console.log("released", n);
        }}
        onChange={onChange}
        initialValue={undefined}
        value={state.currentNode}
      />
    </>
  );
};

export default BentoContainer;
