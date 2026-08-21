import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Button } from "@/components/ui/primitives";
import { Field } from "@/components/ui/forms";
import { useToast } from "@/hooks/useToast";

export function ResetPassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (password.length < 8) next.password = "Password must be at least 8 characters.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("success", "Password reset", "Your password has been updated. Please sign in.");
      navigate("/login");
    }, 600);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Choose a new secure password for your account."
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field label="New password" error={errors.password} required>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>

        <Field label="Confirm password" error={errors.confirm} required>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter password"
              className={inputClass}
            />
          </div>
        </Field>

        <Button type="submit" loading={loading} className="w-full">
          Update password
        </Button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </form>
    </AuthLayout>
  );
}
