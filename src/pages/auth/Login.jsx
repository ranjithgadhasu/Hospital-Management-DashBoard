import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Info } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Button } from "@/components/ui/primitives";
import { Field } from "@/components/ui/forms";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { DEMO_CREDENTIALS } from "@/store/slices/authSlice";

export function Login() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!password) next.password = "Password is required.";
    else if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) {
        addToast("success", "Welcome back!", "Signed in successfully.");
        navigate("/");
      } else {
        setErrors({ password: "Invalid email or password." });
        addToast("error", "Login failed", "Please check your credentials.");
      }
    }, 600);
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Enter your credentials to access the dashboard."
    >
      <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-300">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Demo credentials — email:{" "}
          <span className="font-semibold">{DEMO_CREDENTIALS.email}</span>, password:{" "}
          <span className="font-semibold">{DEMO_CREDENTIALS.password}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field label="Email address" error={errors.email} required>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@medicare.com"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </Field>

        <Field label="Password" error={errors.password} required>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
}
