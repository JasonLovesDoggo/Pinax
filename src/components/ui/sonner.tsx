"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-base group-[.toaster]:text-text group-[.toaster]:border-overlay2" +
            " group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-text group-[.toast]:font-semibold",
          description: "group-[.toast]:text-subtext1",
          actionButton:
            "group-[.toast]:!bg-subtext1  group-[.toast]:!text-surface0 group-[.toast]:hover:!scale-105",
          cancelButton:
            "group-[.toast]:!bg-subtext1  group-[.toast]:!text-surface0",
          closeButton:
            '"group-[.toast]:!bg-subtext1  group-[.toast]:!text-surface0 group-[.toast]:hover:opacity-100',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
