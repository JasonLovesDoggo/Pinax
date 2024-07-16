import {createContext, JSX} from "solid-js";
import {Container, CssBaseline} from "@suid/material";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

createContext();

// export const [theme, setTheme] = createSignal({});

const Layout = (props: { children: JSX.Element[] }) => {
  return (
    <>
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
