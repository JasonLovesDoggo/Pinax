import { createContext, createSignal, JSXElement } from "solid-js";
import { Container, CssBaseline } from "@suid/material";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
// @ts-ignore
import { NinjaKeys } from "solid-ninja-keys";
import { hotkeys } from "./config";
import ColorSelector from "./ColorSelector/Portal";

export const OpenContext = createContext(
  {} as { themerOpen: () => boolean; openThemer: (arg: boolean) => void },
);

// export const [theme, setTheme] = createSignal({});

const Layout = (props: { children: JSXElement[] }) => {
  const [themerOpen, openThemer] = createSignal(false);
  const [color, setColor] = createSignal("#000000");

  openThemer(true);

  return (
    <>
      <OpenContext.Provider value={{ themerOpen, openThemer }}>
        <ColorSelector isOpen={themerOpen} color={color} setColor={setColor} />
        <NinjaKeys hotkeys={hotkeys} placeholder="Search or jump to..." />
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
