import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef, ElementType } from "react";

interface ContainerProps<T extends ElementType> {
  as?: T;
}

export default function Container<T extends ElementType = "div">({
  as,
  ...props
}: ContainerProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as ?? "div";
  return (
    <Component
      {...props}
      className={cn(
        "mx-auto px-4 py-6",
        "max-w-[1200px] max-lg:max-w-[800px] max-md:max-w-[375px] max-sm:max-w-[320px]",
        props.className,
      )}
    />
  );
}
