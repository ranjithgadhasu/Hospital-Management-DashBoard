import { cn } from "@/utils/cn";

export function Card({ children, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-white">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, icon, trend, trendUp, iconClassName }) {
  return (
    <Card className="p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "mt-2 flex items-center gap-1 text-xs font-medium",
                trendUp ? "text-emerald-600" : "text-rose-600"
              )}
            >
              <span>{trendUp ? "▲" : "▼"}</span> {trend}
              <span className="font-normal text-slate-400">vs last week</span>
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            iconClassName ??
              "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
