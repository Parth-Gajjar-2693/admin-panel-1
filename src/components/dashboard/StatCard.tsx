import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-surface rounded-xl border p-5 flex items-center gap-4">
      {icon && (
        <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>
      )}

      <div>
        <p className="text-sm text-muted">{title}</p>
        <p className="text-2xl font-semibold text-text">{value}</p>
        {subtitle && (
          <p className="text-xs text-muted mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
