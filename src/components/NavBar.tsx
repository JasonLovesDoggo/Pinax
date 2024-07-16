import {AppBar, IconButton, Toolbar} from "@suid/material";
import {Menu} from "@suid/icons-material";
import NavDrawer from "@components/Drawer";
import {createSignal} from "solid-js";

const NavBar = () => {
  const [NavIsOpen, setNavIsOpen] = createSignal(false);
  return (
    <>
      <NavDrawer open={NavIsOpen} setOpen={setNavIsOpen} />
      <AppBar as={"header"} position={"static"}>
        <Toolbar>
          <IconButton
            onClick={() => {
              setNavIsOpen(true);
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <h3>Header !!!</h3>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
