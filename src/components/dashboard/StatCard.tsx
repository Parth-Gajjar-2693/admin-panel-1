import { ReactNode } from "react";
import clsx from "clsx";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
  variant?: "blue" | "green" | "amber" | "red" | "slate";
};

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  variant = "blue",
}: StatCardProps) {
  const variants = {
    blue: {
      cardBg: "bg-blue-100",
      iconBg: "bg-blue-100 text-blue-600",
      hoverRing: "hover:ring-blue-200",
    },
    green: {
      cardBg: "bg-green-100",
      iconBg: "bg-green-100 text-green-600",
      hoverRing: "hover:ring-green-200",
    },
    amber: {
      cardBg: "bg-amber-100",
      iconBg: "bg-amber-100 text-amber-600",
      hoverRing: "hover:ring-amber-200",
    },
    red: {
      cardBg: "bg-red-100",
      iconBg: "bg-red-100 text-red-600",
      hoverRing: "hover:ring-red-200",
    },
    slate: {
      cardBg: "bg-slate-100",
      iconBg: "bg-slate-200 text-slate-700",
      hoverRing: "hover:ring-slate-300",
    },
  };

  return (
    <div
      className={clsx(
        "group relative rounded-xl border p-5 flex items-center gap-4",
        "transition-all duration-200",
        "hover:shadow-sm hover:-translate-y-[1px]",
        "hover:ring-1 hover:ring-inset",
        variants[variant].hoverRing,
        variants[variant].cardBg,
        "cursor-pointer",
      )}
    >
      {icon && (
        <div
          className={clsx(
            "h-12 w-12 flex items-center justify-center rounded-lg",
            "transition-colors duration-200",
            variants[variant].iconBg,
          )}
        >
          {icon}
        </div>
      )}

      <div>
        <p className="text-sm text-muted">{title}</p>
        <p className="text-2xl font-semibold text-text">{value}</p>
        {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
