import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/utils/cn";

const config = {
  success: { icon: CheckCircle2, accent: "text-emerald-500", bar: "bg-emerald-500" },
  error: { icon: AlertCircle, accent: "text-rose-500", bar: "bg-rose-500" },
  info: { icon: Info, accent: "text-sky-500", bar: "bg-sky-500" },
  warning: { icon: AlertTriangle, accent: "text-amber-500", bar: "bg-amber-500" },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const { icon: Icon, accent, bar } = config[toast.type] ?? config.info;
        return (
          <div
            key={toast.id}
            className="pointer-events-auto relative animate-toast-in overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
          >
            <div className={cn("absolute inset-y-0 left-0 w-1", bar)} />
            <div className="flex items-start gap-3 p-4 pl-5">
              <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", accent)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {toast.message}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
