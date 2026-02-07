import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { productStats } from "@/data/dashboard";

export default function ProductStatusChart() {
  return (
    <div className="bg-surface border rounded-xl p-6">
      <h2 className="text-sm font-semibold text-text mb-4">
        Product Status
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
