import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

/* ---------------- Button ---------------- */
const variantStyles = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-500 shadow-sm shadow-brand-600/20",
  secondary:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  ghost:
    "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 shadow-sm shadow-rose-600/20",
  outline:
    "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
};

const sizeStyles = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  loading,
  icon,
  className,
  children,
  disabled,
  ...props
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}

/* ---------------- Badge ---------------- */
const toneStyles = {
  green:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
  red: "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400",
  amber:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400",
  blue: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-400",
  slate:
    "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-500/10 dark:text-slate-300",
  violet:
    "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-500/10 dark:text-violet-400",
  cyan: "bg-cyan-50 text-cyan-700 ring-cyan-600/20 dark:bg-cyan-500/10 dark:text-cyan-400",
};

export function Badge({ tone = "slate", children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- Spinner ---------------- */
export function Spinner({ className }) {
  return <Loader2 className={cn("h-5 w-5 animate-spin text-brand-600", className)} />;
}

export function LoadingScreen() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-500 dark:text-slate-400">
      <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      <p className="text-sm font-medium">Loading data…</p>
    </div>
  );
}

/* ---------------- Empty State ---------------- */
export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-slate-700 dark:text-slate-200">{title}</p>
        {description && (
          <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
