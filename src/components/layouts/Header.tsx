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
    <header className="sticky top-0 z-40 h-16 
      bg-white border-b border-slate-200 
      shadow-sm px-6 flex items-center justify-between"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-700 tracking-tight">
          Parth Gajjar ©2026
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Role badge */}
        <span className="inline-flex items-center rounded-full 
          bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
        >
          {role}
        </span>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm 
          text-slate-500 hover:text-slate-700 
          transition-colors duration-200 cursor-pointer"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}
