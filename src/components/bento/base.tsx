import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function BentoCard(props: BentoCardProps) {
  const { description, className, children } = props;
  return (
    <Card className={cn("w-[350px] overflow-hidden" + className)}>
      {description && <CardDescription>{description}</CardDescription>}
      <CardContent>{children}</CardContent>
    </Card>
  );
}
