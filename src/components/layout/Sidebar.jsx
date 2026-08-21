import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  BedDouble,
  Pill,
  Receipt,
  Bell,
  UserCircle,
  HeartPulse,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/doctors", label: "Doctors", icon: Stethoscope },
  { to: "/appointments", label: "Appointments", icon: CalendarDays },
  { to: "/beds", label: "Bed Management", icon: BedDouble },
  { to: "/pharmacy", label: "Pharmacy", icon: Pill },
  { to: "/billing", label: "Billing", icon: Receipt },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: UserCircle },
];

export function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white transition-transform duration-300 dark:bg-slate-900 lg:static lg:translate-x-0",
          "border-r border-slate-200 dark:border-slate-800",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/30">
              <HeartPulse className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                MediCare
              </p>
              <p className="-mt-0.5 text-[10px] font-medium uppercase tracking-widest text-brand-600 dark:text-brand-400">
                Hospital
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                )
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.to === "/notifications" && unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {user?.name}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user?.role}
              </p>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-500 dark:hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
