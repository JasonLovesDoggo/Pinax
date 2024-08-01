import { createContext, createSignal, JSXElement } from "solid-js";
import { Container, CssBaseline } from "@suid/material";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
import "solid-command-palette/pkg-dist/style.css";
import { CommandPalette, Root } from "solid-command-palette";
import ColorSelector from "./ColorSelector/Portal";
import { actions } from "./config";

export interface ActionsContext {
  increment: () => void;
}

export const OpenContext = createContext(
  {} as { themerOpen: () => boolean; openThemer: (arg: boolean) => void },
);

// export const [theme, setTheme] = createSignal({});

const Layout = (props: { children: JSXElement[] }) => {
  const [themerOpen, openThemer] = createSignal(false);
  const [color, setColor] = createSignal("#000000");

  openThemer(true);
  const actionsContext = {
    increment() {
      console.log("increment count state by 1");
    },
  };

  return (
    <>
      <OpenContext.Provider value={{ themerOpen, openThemer }}>
        <ColorSelector isOpen={themerOpen} color={color} setColor={setColor} />
        <Root actions={actions} actionsContext={actionsContext}>
          <CommandPalette />
        </Root>
        <CssBaseline />
        <NavBar />
        <Container
          sx={{ height: "100vh", width: "100vw" }}
          as={"main"}
          disableGutters
          maxWidth={false}
        >
          {props.children}
        </Container>
        <Footer />
      </OpenContext.Provider>
    </>
  );
};
export default Layout;
