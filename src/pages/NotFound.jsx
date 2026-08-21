import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-950">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
        <HeartPulse className="h-8 w-8" />
      </div>
      <p className="mt-6 text-6xl font-bold text-slate-900 dark:text-white">404</p>
      <h1 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
