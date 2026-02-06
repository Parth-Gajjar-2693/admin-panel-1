import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";

const adminMenu = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Products", path: "/products" },
  { label: "Alerts", path: "/alerts" },
];

const userMenu = [
  { label: "Dashboard", path: "/dashboard" },
];

export default function Sidebar() {
  const role = useAppSelector((s) => s.auth.role);

  const menu = role === "ADMIN" ? adminMenu : userMenu;

  return (
    <aside className="w-sidebar bg-surface border-r px-4 py-6">
      <h1 className="text-lg font-semibold mb-6">Admin</h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-slate-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
