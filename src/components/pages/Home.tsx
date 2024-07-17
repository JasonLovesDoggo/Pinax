import { Button } from "@suid/material";
import { useContext } from "solid-js";
import { OpenContext } from "../../Layout";

const Home = (setOpen, open) => {
  const { themerOpen, openThemer } = useContext(OpenContext);
  return (
    <div>
      <h1>Home</h1>
      <Button
        variant="contained"
        color="primary"
        on:click={() => {
          openThemer(!themerOpen());
        }}
      >
        Primary
      </Button>
    </div>
  );
};

export default Home;
