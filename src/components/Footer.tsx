import { IconButton, Link, Stack, Toolbar } from "@suid/material";
import { FooterItem, footerItems } from "../config";
import { For } from "solid-js";

const Footer = () => {
  return (
    <footer>
      <Toolbar
        sx={{
          position: "static",
          backgroundColor: "#525252",
          height: "8vh",
          color: "white",
        }}
      >
        <Stack direction="row" spacing={1}>
          <For each={footerItems}>
            {(item: FooterItem) => (
              // @ts-ignore
              <IconButton aria-label={item.label} as={Link} href={item.href}>
                {<item.icon />}
              </IconButton>
            )}
          </For>
        </Stack>
      </Toolbar>
    </footer>
  );
};

export default Footer;
