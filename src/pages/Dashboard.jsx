import { Link } from "react-router-dom";
import {
  Users,
  Stethoscope,
  CalendarDays,
  BedDouble,
  DollarSign,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useData } from "@/hooks/useData";
import { StatCard, Card, CardHeader } from "@/components/ui/cards";
import { Badge, LoadingScreen } from "@/components/ui/primitives";
import { weeklyAdmissions, departmentStats } from "@/data/mockData";

const statusTone = {
  Scheduled: "blue",
  Completed: "green",
  Cancelled: "red",
  Pending: "amber",
};

const PIE_COLORS = ["#0891b2", "#10b981", "#f59e0b", "#ef4444"];

export function Dashboard() {
  const { loading, patients, doctors, appointments, beds, invoices } = useData();

  if (loading) return <LoadingScreen />;

  const admitted = patients.filter((p) => p.status === "Admitted" || p.status === "Critical");
  const availableBeds = beds.filter((b) => b.status === "Available").length;
  const todayAppointments = appointments.filter(
    (a) => a.status === "Scheduled" || a.status === "Pending"
  ).length;
  const revenue = invoices.reduce((sum, i) => sum + i.total, 0);

  const bedOccupancy = [
    { name: "Available", value: beds.filter((b) => b.status === "Available").length },
    { name: "Occupied", value: beds.filter((b) => b.status === "Occupied").length },
    { name: "Reserved", value: beds.filter((b) => b.status === "Reserved").length },
    { name: "Maintenance", value: beds.filter((b) => b.status === "Maintenance").length },
  ].filter((x) => x.value > 0);

  const recentAppointments = appointments.slice(0, 5);

  return (
    <div className="animate-fade-in-up space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Welcome back! Here's what's happening at MediCare today.
          </p>
        </div>
        <Link
          to="/appointments"
          className="inline-flex items-center gap-1.5 self-start rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          <CalendarDays className="h-4 w-4" /> Schedule Appointment
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Patients" value={patients.length} icon={<Users className="h-5 w-5" />} trend="12.5%" trendUp />
        <StatCard label="Active Doctors" value={doctors.length} icon={<Stethoscope className="h-5 w-5" />} iconClassName="bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400" trend="4.2%" trendUp />
        <StatCard label="Appointments Today" value={todayAppointments} icon={<CalendarDays className="h-5 w-5" />} iconClassName="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400" trend="2.8%" trendUp />
        <StatCard label="Available Beds" value={availableBeds} icon={<BedDouble className="h-5 w-5" />} iconClassName="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" trend="3.1%" trendUp={false} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Admitted Patients" value={admitted.length} icon={<Activity className="h-5 w-5" />} iconClassName="bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400" />
        <StatCard label="Monthly Revenue" value={`$${revenue.toLocaleString()}`} icon={<DollarSign className="h-5 w-5" />} iconClassName="bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400" trend="8.7%" trendUp />
        <Card className="p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Critical Patients</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {patients.filter((p) => p.status === "Critical").length}
          </p>
          <p className="mt-2 text-xs font-medium text-rose-600">Requires attention</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Invoices</p>
          <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {invoices.filter((i) => i.status === "Pending").length}
          </p>
          <p className="mt-2 text-xs font-medium text-amber-600">Awaiting payment</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Patient Admissions & Discharges"
            subtitle="Weekly activity overview"
            action={
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> Admissions
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-400" /> Discharges
                </span>
              </div>
            }
          />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyAdmissions} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="adm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,0.3)", fontSize: 12 }} />
                <Area type="monotone" dataKey="admissions" stroke="#0891b2" strokeWidth={2.5} fill="url(#adm)" />
                <Area type="monotone" dataKey="discharges" stroke="#8b5cf6" strokeWidth={2.5} fill="url(#dis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader title="Bed Occupancy" subtitle="By current status" />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bedOccupancy} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {bedOccupancy.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,0.3)", fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Patients by Department" subtitle="Distribution across specialties" />
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentStats} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.2)" vertical={false} />
                <XAxis dataKey="department" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(148,163,184,0.08)" }} contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,0.3)", fontSize: 12 }} />
                <Bar dataKey="patients" fill="#0891b2" radius={[6, 6, 0, 0]} maxBarSize={44} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Recent Appointments"
            action={
              <Link to="/appointments" className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentAppointments.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{a.patient}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{a.doctor} · {a.time}</p>
                </div>
                <Badge tone={statusTone[a.status]}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
