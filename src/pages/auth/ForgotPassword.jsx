import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { Button } from "@/components/ui/primitives";
import { Field } from "@/components/ui/forms";
import { useToast } from "@/hooks/useToast";

export function ForgotPassword() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError(undefined);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast("success", "Reset link sent", `A password reset link has been sent to ${email}.`);
      navigate("/reset-password");
    }, 600);
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your registered email and we'll send you a reset link."
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Field label="Email address" error={error} required>
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

        <Button type="submit" loading={loading} className="w-full">
          Send reset link
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
