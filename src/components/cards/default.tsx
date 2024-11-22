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
      "flex h-full flex-col justify-between gap-3 bg-surface0 p-8",
      className,
    )}
    {...props}
  />
));
GridCard.displayName = "Card";

export default GridCard;
