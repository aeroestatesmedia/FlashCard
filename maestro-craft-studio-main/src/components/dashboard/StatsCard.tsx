import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
  variant?: "default" | "gradient" | "learning";
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  variant = "default"
}: StatsCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20";
      case "learning":
        return "bg-gradient-to-br from-learning-easy/5 to-learning-medium/5 border-learning-easy/20";
      default:
        return "bg-card/50 backdrop-blur-sm";
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md hover:-translate-y-1",
      getVariantClasses(),
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center",
          variant === "gradient" && "bg-primary/10",
          variant === "learning" && "bg-learning-easy/10",
          variant === "default" && "bg-muted"
        )}>
          <Icon className={cn(
            "h-4 w-4",
            variant === "gradient" && "text-primary",
            variant === "learning" && "text-learning-easy",
            variant === "default" && "text-muted-foreground"
          )} />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <Badge 
              variant={trend.isPositive ? "default" : "secondary"}
              className={cn(
                "text-xs",
                trend.isPositive 
                  ? "bg-learning-easy/10 text-learning-easy" 
                  : "bg-learning-hard/10 text-learning-hard"
              )}
            >
              {trend.isPositive ? "+" : ""}{trend.value}%
            </Badge>
          )}
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        
        {trend && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend.label}
          </p>
        )}
      </CardContent>
    </Card>
  );
}