import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../components/layouts/MainLayout";

function Dashboard() {
  return <div>Dashboard page</div>;
}

function Products() {
  return <div>Products list</div>;
}

function Alerts() {
  return <div>Alerts list</div>;
}

export default function AppRoutes() {
  const [loading, setLoading] = useState(true);

  // simulate network delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainLayout isLoading={loading}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </MainLayout>
  );
}
