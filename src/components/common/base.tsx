import {JSX} from "solid-js";
import {Box as SBox, Theme} from "@suid/material";

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
            style={{"text-decoration": "none", color: "white"}}
        >
            {props.children}
        </a>
    );
};


export const BBox = (props: { sx: any; children: JSX.Element }) => {
    return (
        <SBox
            sx={{
                borderColor: (theme: Theme) => theme.palette.primary.main,
                ...props.sx,
            }}>{props.children}</SBox>
    );
}
