import { JSX } from "solid-js";

export const A = (props: {
  href: string;
  newTab?: boolean;
  children: JSX.Element;
}) => {
  if (!props.newTab) props.newTab = true;
  return (
    <a
      href={props.href}
      target={props.newTab ? "_blank" : "_self"}
      style={{ "text-decoration": "none", color: "white" }}
    >
      {props.children}
    </a>
  );
};
