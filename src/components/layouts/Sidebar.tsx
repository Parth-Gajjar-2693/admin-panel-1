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
      className={`bg-surface border-r h-screen flex flex-col transition-all duration-300
        ${collapsed ? "w-[72px]" : "w-sidebar"}`}
    >
      {/* Branding (same height as header) */}
      {/* <div className="h-header flex items-center justify-between px-4">
        {!collapsed && (
          <span className="text-lg font-semibold text-text">Admin Panel</span>
        )}

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-muted hover:text-text transition cursor-pointer"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div> */}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
  ${
    isActive
      ? "bg-blue-50 text-blue-700"
      : "text-muted hover:bg-slate-100 hover:text-text"
  }`
            }
          >
            {/* Active indicator */}
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r
  group-aria-[current=page]:bg-blue-600`}
            />

            {/* Icon */}
            <span className="shrink-0">{item.icon}</span>

            {/* Label */}
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-6 py-4 border-t text-xs text-muted">
          <div>Role: {role}</div>
          <div>v1.0.0</div>
        </div>
      )}
    </aside>
  );
}
