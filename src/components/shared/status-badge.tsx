import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: "ACTIVE" | "INACTIVE";
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "px-2 py-1 text-xs font-medium",
        status === "ACTIVE" 
          ? "bg-green-50 text-green-700 border-green-200" 
          : "bg-gray-50 text-gray-600 border-gray-200",
        className
      )}
    >
      {status === "ACTIVE" ? "Activo" : "Inactivo"}
    </Badge>
  );
}
