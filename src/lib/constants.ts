interface Breakpoints {
  [key: string]: number;
}

export const breakpoints: Breakpoints = {
  lg: 1199,
  md: 799,
  sm: 374,
  xs: 319,
  xxs: 0,
};

interface RowHeights {
  [key: string]: number;
}

export const rowHeights: RowHeights = {
  lg: 280,
  md: 180,
  sm: 164,
  xs: 136,
  xxs: 132,
};

export const cols = { lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 };
