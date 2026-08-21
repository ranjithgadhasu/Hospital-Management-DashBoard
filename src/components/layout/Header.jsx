import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  UserCircle,
  LogOut,
  Settings,
  CheckCheck,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { useData } from "@/hooks/useData";
import { cn } from "@/utils/cn";

export function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { notifications, markAllNotificationsRead } = useData();
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 dark:border-slate-800 dark:bg-slate-900/80">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search patients, doctors, records…"
          className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 animate-slide-down overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Notifications
                </p>
                <button
                  onClick={markAllNotificationsRead}
                  className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "border-b border-slate-100 px-4 py-3 last:border-0 dark:border-slate-800",
                      !n.read && "bg-brand-50/50 dark:bg-brand-500/5"
                    )}
                  >
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {n.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                      {n.message}
                    </p>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                      {n.time}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setNotifOpen(false);
                  navigate("/notifications");
                }}
                className="block w-full border-t border-slate-200 px-4 py-2.5 text-center text-xs font-semibold text-brand-600 hover:bg-slate-50 dark:border-slate-800 dark:text-brand-400 dark:hover:bg-slate-800"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        <div ref={userRef} className="relative">
          <button
            onClick={() => setUserOpen((o) => !o)}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-bold text-white">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold leading-tight text-slate-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-[11px] leading-tight text-slate-500 dark:text-slate-400">
                {user?.role}
              </p>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>

          {userOpen && (
            <div className="absolute right-0 mt-2 w-52 animate-slide-down overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
              <div className="border-b border-slate-100 px-4 py-2.5 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-slate-500">{user?.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setUserOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <UserCircle className="h-4 w-4" /> My Profile
              </Link>
              <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
