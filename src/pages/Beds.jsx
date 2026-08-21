import { useMemo, useState } from "react";
import { BedDouble, Search } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/cards";
import { Badge, LoadingScreen } from "@/components/ui/primitives";
import { Select } from "@/components/ui/forms";

const statusTone = {
  Available: "green",
  Occupied: "red",
  Reserved: "amber",
  Maintenance: "slate",
};

const typeColor = {
  ICU: "from-rose-500 to-red-600",
  General: "from-brand-500 to-brand-700",
  Private: "from-violet-500 to-purple-600",
  Emergency: "from-amber-500 to-orange-600",
};

export function Beds() {
  const { loading, beds, updateBed } = useData();
  const { addToast } = useToast();

  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...beds];
    if (typeFilter !== "all") list = list.filter((b) => b.type === typeFilter);
    if (statusFilter !== "all") list = list.filter((b) => b.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) => b.ward.toLowerCase().includes(q) || b.number.toLowerCase().includes(q)
      );
    }
    return list;
  }, [beds, typeFilter, statusFilter, search]);

  const stats = {
    total: beds.length,
    available: beds.filter((b) => b.status === "Available").length,
    occupied: beds.filter((b) => b.status === "Occupied").length,
    other: beds.filter((b) => b.status === "Reserved" || b.status === "Maintenance").length,
  };

  const handleStatusChange = (bed, status) => {
    updateBed({ ...bed, status });
    addToast("info", "Bed updated", `${bed.ward} ${bed.number} is now ${status}.`);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Bed Management" subtitle="Monitor and manage bed availability across wards" />

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Total Beds", value: stats.total, cls: "text-slate-900 dark:text-white" },
          { label: "Available", value: stats.available, cls: "text-emerald-600" },
          { label: "Occupied", value: stats.occupied, cls: "text-rose-600" },
          { label: "Reserved / Maint.", value: stats.other, cls: "text-amber-600" },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.cls}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ward or bed number…"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
        </div>
        <div className="flex gap-3">
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-40"
            options={[
              { value: "all", label: "All types" },
              { value: "ICU", label: "ICU" },
              { value: "General", label: "General" },
              { value: "Private", label: "Private" },
              { value: "Emergency", label: "Emergency" },
            ]}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-40"
            options={[
              { value: "all", label: "All statuses" },
              { value: "Available", label: "Available" },
              { value: "Occupied", label: "Occupied" },
              { value: "Reserved", label: "Reserved" },
              { value: "Maintenance", label: "Maintenance" },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((bed) => (
          <Card key={bed.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <div className={`h-1.5 w-full bg-gradient-to-r ${typeColor[bed.type]}`} />
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    <BedDouble className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{bed.ward} — {bed.number}</p>
                    <p className="text-xs text-slate-500">{bed.type} Ward</p>
                  </div>
                </div>
                <Badge tone={statusTone[bed.status]}>{bed.status}</Badge>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Assigned patient</p>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{bed.patient ?? "—"}</p>
                </div>
                <Select
                  value={bed.status}
                  onChange={(e) => handleStatusChange(bed, e.target.value)}
                  className="w-32"
                  options={["Available", "Occupied", "Reserved", "Maintenance"].map((s) => ({ value: s, label: s }))}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
