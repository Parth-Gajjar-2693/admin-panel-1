import { Users, Package, Bell, Shield } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import StatCard from "@/components/dashboard/StatCard";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";
import ProductStatusChart from "@/components/dashboard/ProductStatusChart";

export default function Dashboard() {
  const role = useAppSelector((s) => s.auth.role);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold text-text">Dashboard</h1>
        <p className="text-sm text-muted">System analytics overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={128}
          subtitle="Active accounts"
          icon={<Users size={22} />}
          variant="blue"
        />

        {role === "ADMIN" && (
          <>
            <StatCard
              title="Products"
              value={42}
              subtitle="Listed products"
              icon={<Package size={22} />}
              variant="green"
            />

            <StatCard
              title="Active Alerts"
              value={7}
              subtitle="Needs attention"
              icon={<Bell size={22} />}
              variant="amber"
            />
          </>
        )}

        <StatCard
          title="Your Role"
          value={role ?? "-"}
          subtitle="Access level"
          icon={<Shield size={22} />}
          variant="slate"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UserGrowthChart />
        </div>
        <ProductStatusChart />
      </div>
    </div>
  );
}
