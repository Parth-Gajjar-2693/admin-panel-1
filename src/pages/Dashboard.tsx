import { Users, Package, Bell, Shield } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import StatCard from "@/components/dashboard/StatCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { BarChart3 } from "lucide-react";

export default function Dashboard() {
  const role = useAppSelector((s) => s.auth.role);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-xl font-semibold text-text">Dashboard</h1>
        <p className="text-sm text-muted">Overview of system activity</p>
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={128}
          subtitle="Active accounts"
          icon={<Users size={22} />}
        />

        {role === "ADMIN" && (
          <>
            <StatCard
              title="Products"
              value={42}
              subtitle="Listed products"
              icon={<Package size={22} />}
            />

            <StatCard
              title="Active Alerts"
              value={7}
              subtitle="Needs attention"
              icon={<Bell size={22} />}
            />
          </>
        )}

        <StatCard
          title="Your Role"
          value={role ?? "-"}
          subtitle="Access level"
          icon={<Shield size={22} />}
        />
      </div>
      <div className="bg-surface border rounded-xl p-6">
        <EmptyState
          icon={<BarChart3 size={32} />}
          title="No analytics available"
          description="Charts and insights will appear once data is available."
        />
      </div>
      {/* Placeholder section */}
      <div className="bg-surface border rounded-xl p-6">
        <p className="text-sm text-muted">
          Charts and analytics will appear here.
        </p>
      </div>
    </div>
  );
}
