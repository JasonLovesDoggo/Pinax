import ThemeSwitch from "@/components/themes/switcher";
import GridCard from "@/components/cards/default";
import { getRandomAccentHex } from "@/lib/themes";

const TwentyTwoInHex = 0x20;
export default function Theme() {
  return (
    <GridCard
      className={`relative flex h-full flex-col items-center justify-center`}
      style={{
        backgroundColor: getRandomAccentHex() + TwentyTwoInHex,
      }}
    >
      <ThemeSwitch />
    </GridCard>
  );
}
