import {Toolbar} from "@suid/material";

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
        <h3>Footer</h3>
      </Toolbar>
    </footer>
  );
};

export default Footer;
