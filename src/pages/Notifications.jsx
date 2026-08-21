import { useState } from "react";
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle2, AlertCircle, Inbox } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/cards";
import { Button, EmptyState, LoadingScreen } from "@/components/ui/primitives";
import { cn } from "@/utils/cn";

const typeConfig = {
  info: { icon: Info, accent: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
  warning: { icon: AlertTriangle, accent: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  success: { icon: CheckCircle2, accent: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  error: { icon: AlertCircle, accent: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-500/10" },
};

export function Notifications() {
  const { loading, notifications, markNotificationRead, markAllNotificationsRead, deleteNotification } = useData();
  const { addToast } = useToast();

  const [tab, setTab] = useState("all");

  const filtered = notifications.filter((n) => {
    if (tab === "unread") return !n.read;
    if (tab === "read") return n.read;
    return true;
  });

  const unread = notifications.filter((n) => !n.read).length;

  const tabs = [
    { key: "all", label: "All", count: notifications.length },
    { key: "unread", label: "Unread", count: unread },
    { key: "read", label: "Read", count: notifications.length - unread },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Notifications"
        subtitle={`${unread} unread notifications`}
        action={
          <Button
            variant="outline"
            onClick={() => {
              markAllNotificationsRead();
              addToast("success", "All caught up", "All notifications marked as read.");
            }}
            icon={<CheckCheck className="h-4 w-4" />}
          >
            Mark all read
          </Button>
        }
      />

      <div className="mb-4 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              tab === t.key
                ? "bg-brand-600 text-white"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800"
            )}
          >
            {t.label} <span className="ml-1 text-xs opacity-70">{t.count}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={<Inbox className="h-6 w-6" />} title="No notifications" description="You're all caught up for now." />
        </Card>
      ) : (
        <Card className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((n) => {
            const cfg = typeConfig[n.type] ?? typeConfig.info;
            const Icon = cfg.icon;
            return (
              <div key={n.id} className={cn("flex items-start gap-4 p-4 transition-colors", !n.read && "bg-brand-50/40 dark:bg-brand-500/5")}>
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", cfg.bg)}>
                  <Icon className={cn("h-5 w-5", cfg.accent)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900 dark:text-white">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{n.message}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">{n.time}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  {!n.read && (
                    <button onClick={() => markNotificationRead(n.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800" title="Mark as read">
                      <CheckCheck className="h-4 w-4" />
                    </button>
                  )}
                  <button onClick={() => deleteNotification(n.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </Card>
      )}

      {notifications.length === 0 && (
        <div className="mt-6 flex justify-center">
          <Bell className="h-8 w-8 text-slate-300 dark:text-slate-700" />
        </div>
      )}
    </div>
  );
}
