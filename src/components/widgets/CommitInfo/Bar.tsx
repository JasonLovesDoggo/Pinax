import { For } from "solid-js";
import { Grid, Typography } from "@suid/material";
import { Typ } from "@common/Mui";

export interface LanguageElementProps {
  name: string;
  color: string;
  percentage: number;
}

const LanguageDescriptor = (props: LanguageElementProps) => {
  return (
    <li style={{ display: "inline" }}>
      <span
        style={{ display: "inline-flex" }}
        class="d-inline-flex flex-items-center flex-nowrap text-small mr-3"
      >
        <svg
          style={{
            color: `#${props.color}`,
            "margin-right": "8px",
            fill: `#${props.color}`,
          }}
          aria-hidden="true"
          height="16"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
        >
          <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"></path>
        </svg>
        <Typ sx={{ "margin-right": "4px", fontWeight: "600" }}>
          {props.name}
        </Typ>
        <Typ>{props.percentage}%</Typ>
      </span>
    </li>
  );
};

const LanguageBarElement = (props: LanguageElementProps) => {
  return (
    <span
      style={`background-color:#${props.color} !important;;width: ${props.percentage}%;`}
      itemProp="keywords"
      aria-label={`${props.name} ${props.percentage}%`}
      data-view-component="true"
      class="Progress-item color-bg-success-emphasis"
    ></span>
  );
};

export const LanguageWidget = (props: {
  languages: LanguageElementProps[];
}) => {
  let sum = 0; // sum of all language percentages, should be 100, otherwise log an error and return
  props.languages.forEach((lang) => {
    sum += lang.percentage;
  });
  if (sum !== 100) {
    console.error("Languages do not add up to 100%");
    return null;
  }
  // Sort languages by percentage
  props.languages.sort((a, b) => b.percentage - a.percentage);

  return (
    <>
      <Typography variant="h4">Languages</Typography>
      <Grid>
        <span
          style={{
            background: "inherit",
            "border-radius": "6px",
            display: "flex",
            height: "8px",
            overflow: "hidden",
          }}
        >
          {" "}
          {/*Same bg color as bg*/}
          <For each={props.languages}>
            {(lang) => <LanguageBarElement {...lang} />}
          </For>
        </span>
      </Grid>

      <ul class="list-style-none">
        <For each={props.languages}>
          {(lang) => <LanguageDescriptor {...lang} />}
        </For>
      </ul>
    </>
  );
};
