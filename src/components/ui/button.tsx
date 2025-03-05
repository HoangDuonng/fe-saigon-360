import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-lg transition",
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
          size === "sm" && "px-3 py-1 text-sm",
          size === "md" && "px-4 py-2",
          size === "lg" && "px-6 py-3 text-lg",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
