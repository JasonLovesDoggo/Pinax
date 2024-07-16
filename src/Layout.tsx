import { createContext, JSX } from "solid-js";
import { Container, CssBaseline } from "@suid/material";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";
// @ts-ignore
import { NinjaKeys } from "solid-ninja-keys";
import { hotkeys } from "./config";

createContext();

// export const [theme, setTheme] = createSignal({});

const Layout = (props: { children: JSX.Element[] }) => {
  return (
    <>
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
    </>
  );
};
export default Layout;
