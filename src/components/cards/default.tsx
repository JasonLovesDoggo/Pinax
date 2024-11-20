import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const GridCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Card ref={ref} className={cn("bg-surface0", className)} {...props} />
));
GridCard.displayName = "Card";

export default GridCard;
