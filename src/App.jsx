import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { loadData } from "@/store/slices/dataSlice";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";
import { ToastContainer } from "@/components/ToastContainer";
import { Login } from "@/pages/auth/Login";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";
import { Dashboard } from "@/pages/Dashboard";
import { Patients } from "@/pages/Patients";
import { Doctors } from "@/pages/Doctors";
import { Appointments } from "@/pages/Appointments";
import { Beds } from "@/pages/Beds";
import { Pharmacy } from "@/pages/Pharmacy";
import { Billing } from "@/pages/Billing";
import { Notifications } from "@/pages/Notifications";
import { Profile } from "@/pages/Profile";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  // Apply dark/light class on the document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  // Simulate initial data loading
  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  return (
    <HashRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/beds" element={<Beds />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </HashRouter>
  );
}
