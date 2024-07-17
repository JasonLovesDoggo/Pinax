import { Portal, Show } from "solid-js/web";
import { createEffect, createSignal, For } from "solid-js";
import { Box } from "@suid/material/Box";
import { hslToHex } from "../utils/colors";

const HueSelector = (props: {
  Hue: () => number;
  setHue: (hue: number) => void;
}) => {
  return <Box>{props.Hue()}</Box>;
};

const LightnessSelector = (props: {
  Hue: () => number;
  Lightness: () => number;
  setLightness: (lightness: number) => void;
}) => {
  const brackets: number[] = [25, 35, 45, 55, 65];
  return (
    <Box>
      <For each={brackets}>
        {(bracket) => (
          <Box
            sx={{
              backgroundColor: `hsl(${props.Hue()}, 1, 0.${bracket})`,
              width: "30px",
              height: "30px",
              cursor: "pointer",
            }}
          ></Box>
        )}
      </For>
    </Box>
  );
};

interface SelectorProps {
  isOpen: () => boolean;
  color: () => string;
  setColor: (color: string) => void;
}

const ColorSelector = (props: SelectorProps) => {
  const [Hue, setHue] = createSignal(215);
  const [Lightness, setLightness] = createSignal(0);

  createEffect(() => {
    const color = hslToHex(Hue(), 1, Lightness());
    props.setColor(hslToHex(Hue(), 1, Lightness()));
    // @ts-ignore
    document.head.querySelector('meta[name="theme-color"]')!.content =
      `#${color}`;
    `#${color}`;
  }, []);

  return (
    <Show when={props.isOpen()}>
      <Portal useShadow={true}>
        <Box>
          <HueSelector Hue={Hue} setHue={setHue} />
          <LightnessSelector
            Hue={Hue}
            Lightness={Lightness}
            setLightness={setLightness}
          />
        </Box>
      </Portal>
    </Show>
  );
};

export default ColorSelector;
