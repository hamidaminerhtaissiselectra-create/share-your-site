import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        serviceBlue: "bg-service-blue/10 border-service-blue/20 text-service-blue",
        serviceOrange: "bg-service-orange/10 border-service-orange/20 text-service-orange",
        serviceEmerald: "bg-service-emerald/10 border-service-emerald/20 text-service-emerald",
        serviceRose: "bg-service-rose/10 border-service-rose/20 text-service-rose",
        serviceViolet: "bg-service-violet/10 border-service-violet/20 text-service-violet",
        serviceCyan: "bg-service-cyan/10 border-service-cyan/20 text-service-cyan",
        accent: "bg-accent/10 border-accent/20 text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
  }
);
Badge.displayName = "Badge";

export { Badge };
