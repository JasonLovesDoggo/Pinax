import ThemeSwitch from "@/components/themes/switcher";
import GridCard from "@/components/cards/default";
import { getRandomAccentHex } from "@/lib/themes";

const Opacity = 0x20;
export default function Theme() {
  return (
    <GridCard
      className={`flex-col items-center justify-center`}
      style={{
        backgroundColor: getRandomAccentHex() + Opacity,
      }}
    >
      <ThemeSwitch />
    </GridCard>
  );
}
