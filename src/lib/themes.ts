import { flavors } from "@catppuccin/palette";

let cachedColorNames: string[] | null = null;

const getColorNamesWithAccents = (): string[] => {
  if (!cachedColorNames) {
    cachedColorNames = flavors.mocha.colorEntries
      .filter(([_, { accent }]) => accent)
      .map(([colorName]) => colorName);
  }
  return cachedColorNames;
};

export const generateRandomColorName = (
  defaultColor: string = "slate",
): string => {
  const colorNames = getColorNamesWithAccents();
  return (
    colorNames[Math.floor(Math.random() * colorNames.length)] ?? defaultColor
  );
};

export const getRandomAccentHex = (): string => {
  // Get mocha accent colors directly from the flavors object
  const mochaAccentColors = flavors.mocha.colorEntries
    .filter(([_, color]) => color.accent)
    .map(([_, color]) => color.hex);

  const randomIndex = Math.floor(Math.random() * mochaAccentColors.length);
  return mochaAccentColors[randomIndex] ?? flavors.mocha.colors.flamingo.hex;
};
