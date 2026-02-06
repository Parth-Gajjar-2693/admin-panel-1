import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/features/auth/authSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="h-header border-b bg-surface px-6 flex items-center justify-between">
      <h2 className="text-sm font-medium text-muted">Admin Dashboard</h2>

      <button
        onClick={handleLogout}
        className="text-sm text-primary hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
