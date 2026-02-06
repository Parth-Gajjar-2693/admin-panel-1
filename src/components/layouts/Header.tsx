import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const role = useAppSelector((s) => s.auth.role);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
<header className="sticky top-0 z-40 h-header bg-white border-b px-6 p-2 flex items-center justify-between">
      {/* Left: App context */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-text">
          Parth Gajjar @2026
        </span>
      </div>

      {/* Right: User actions */}
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          {role}
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-muted hover:text-text transition cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
