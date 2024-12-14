import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const GridCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "relative flex h-full flex-col items-center justify-center",
      className,
    )}
    {...props}
  />
));
GridCard.displayName = "Card";

export default GridCard;
