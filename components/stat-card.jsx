import React from "react";
import { LucideIcon } from "lucide-react";

function StatCard({ title, value, description, icon: Icon, trend }) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        {Icon && <Icon className="h-8 w-8 text-primary opacity-20" />}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
      )}

      {trend && (
        <div
          className={`text-xs font-semibold ${
            trend.isPositive ? "text-primary" : "text-destructive"
          }`}
        >
          {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last
          month
        </div>
      )}
    </div>
  );
}
export default StatCard;
