import { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-surface p-10 text-center">
      {icon && (
        <div className="mb-4 text-slate-400">
          {icon}
        </div>
      )}

      <h3 className="text-sm font-semibold text-text">
        {title}
      </h3>

      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}
