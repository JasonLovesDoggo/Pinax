import {Drawer, Link, List, ListItemButton, ListItemText,} from "@suid/material";
import {For} from "solid-js";
import drawerItems from "../config";

const NavDrawer = (props: {
  open: () => boolean;
  setOpen: (open: boolean) => null;
}) => {
  return (
    <Drawer onClose={() => props.setOpen(false)} open={props.open()}>
      <List>
        <For each={drawerItems} fallback={<div>Loading...</div>}>
          {(item) => (
            <ListItemButton component={Link} href={item.href}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          )}
        </For>
      </List>
    </Drawer>
  );
};

export default NavDrawer;
