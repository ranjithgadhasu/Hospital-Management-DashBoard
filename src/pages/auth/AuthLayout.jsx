import { HeartPulse } from "lucide-react";

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-12 lg:flex">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-brand-400/20 blur-2xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xl font-bold text-white">MediCare</p>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-100">
              Hospital Management
            </p>
          </div>
        </div>

        <div className="relative">
          <h2 className="max-w-md text-3xl font-bold leading-tight text-white">
            Streamline every aspect of your hospital operations.
          </h2>
          <p className="mt-4 max-w-md text-brand-100">
            Manage patients, doctors, appointments, beds, pharmacy and billing from a single,
            unified dashboard.
          </p>
        </div>

        <p className="relative text-sm text-brand-200/80">© 2025 MediCare Healthcare Systems</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <HeartPulse className="h-5 w-5" />
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">MediCare</p>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
