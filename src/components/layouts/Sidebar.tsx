import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAppSelector } from "@/app/hooks";

type MenuItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const adminMenu: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Products",
    path: "/products",
    icon: <Package size={18} />,
  },
  {
    label: "Alerts",
    path: "/alerts",
    icon: <Bell size={18} />,
  },
];

const userMenu: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
];

export default function Sidebar() {
  const role = useAppSelector((state) => state.auth.role);
  const menu = role === "ADMIN" ? adminMenu : userMenu;

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen flex flex-col transition-all duration-300 
      border-r border-slate-200 bg-white shadow-sm
      ${collapsed ? "w-[72px]" : "w-sidebar"}`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 shadow-sm">
        {!collapsed && (
          <span className="text-base font-semibold text-slate-700">
            Admin Panel
          </span>
        )}

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`
            }
          >
            {/* Active indicator bar */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full 
              group-aria-[current=page]:bg-blue-600`}
            />

            <span className="shrink-0">{item.icon}</span>

            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
          <div className="mb-1">Role: {role}</div>
          <div>v1.0.0</div>
        </div>
      )}
    </aside>
  );
}
