import { BellOff } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";

export default function Alerts() {
  const alerts: any[] = [];

  if (alerts.length === 0) {
    return (
      <EmptyState
        icon={<BellOff size={36} />}
        title="No alerts"
        description="You're all caught up. Alerts will appear here when triggered."
      />
    );
  }

  return <div>{/* alerts list later */}</div>;
}
