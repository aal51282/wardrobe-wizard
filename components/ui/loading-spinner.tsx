import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

const sizeMap = {
  sm: "h-4 w-4",
  default: "h-8 w-8",
  lg: "h-12 w-12"
};

export function LoadingSpinner({ className, size = "default" }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 
        className={cn(
          "animate-spin text-amber-600",
          sizeMap[size],
          className
        )} 
      />
    </div>
  );
} 