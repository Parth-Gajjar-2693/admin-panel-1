import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Alerts from "@/pages/Alerts";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MainLayout>
              <Products />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/alerts"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <MainLayout>
              <Alerts />
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
