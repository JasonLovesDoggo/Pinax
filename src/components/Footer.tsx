import { IconButton, Link, Stack, Toolbar, Typography } from "@suid/material";
import { FooterItem, footerItems } from "../config";
import { For } from "solid-js";
import StackProps from "@suid/material/Stack/StackProps";
import WakaTime from "@components/widgets/WakaTime";
import ViewCount from "@components/widgets/ViewCount";
import { SxProps } from "@suid/system";

const FooterElement = (props: StackProps) => {
  return (
    <Stack direction="row" {...props}>
      {props.children}
    </Stack>
  );
};

const styles: SxProps = {
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "static",
    backgroundColor: "#525252",
    minHeight: "fit-content",
    margin: "0.5rem",
    borderRadius: "10px",
    padding: "1rem",
    color: "white",
  },
  left: {
    justifyContent: "flex-start",
    flex: 1,
  },
  middle: {
    justifySelf: "center",
  },
  right: {
    justifyContent: "flex-end",
    flex: 1,
  },
};

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Toolbar component="footer" sx={styles.footer}>
      <FooterElement spacing={2} sx={styles.left}>
        <For each={footerItems}>
          {(item: FooterItem) => (
            // @ts-ignore
            <IconButton aria-label={item.label} as={Link} href={item.href}>
              {<item.icon />}
            </IconButton>
          )}
        </For>
      </FooterElement>
      <FooterElement sx={styles.middle}>
        <Typography>Copyright ©️ {year} Jason Cameron</Typography>
      </FooterElement>
      <FooterElement spacing={2} sx={styles.right}>
        <WakaTime />
        <ViewCount duration={1} />
      </FooterElement>
    </Toolbar>
  );
};

export default Footer;
