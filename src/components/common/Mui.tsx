import { Box as SBox, Theme, Typography } from "@suid/material";
import { JSXElement } from "solid-js";
import { TypographyProps } from "@suid/material/Typography";

export const Typ = (props: TypographyProps) => {
  return <Typography {...props}>{props.children}</Typography>;
};

export const BBox = (props: { sx: any; children: JSXElement }) => {
  return (
    <SBox
      sx={{
        borderColor: (theme: Theme) => theme.palette.primary.main,
        ...props.sx,
      }}
    >
      {props.children}
    </SBox>
  );
};
