import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { userGrowthData } from "@/data/dashboard";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border bg-white px-3 py-2 shadow-sm">
      <p className="text-xs text-muted">{label}</p>
      <p className="text-sm font-medium text-text">
        {payload[0].value} users
      </p>
    </div>
  );
}

export default function UserGrowthChart() {
  const latest = userGrowthData[userGrowthData.length - 1]?.users ?? 0;
  const previous =
    userGrowthData[userGrowthData.length - 2]?.users ?? 0;
  const growth = latest - previous;

  const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });


  return (
    <div className="relative overflow-hidden rounded-xl border bg-blue-50/40 p-6">
      {/* soft background accent */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-text">
            User Growth
          </h2>
          <p className="text-xs text-muted">
            Monthly active users
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold text-text">
            {latest}
          </p>
          <p
            className={`text-xs ${
              growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {growth >= 0 ? "+" : ""}
            {growth} this month
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="relative z-10 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={userGrowthData}>
            <defs>
              <linearGradient
                id="userLineGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563eb"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="users"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#2563eb",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              fill="url(#userLineGradient)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
