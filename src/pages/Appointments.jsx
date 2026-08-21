import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, CalendarDays } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/cards";
import { Button, Badge, EmptyState, LoadingScreen } from "@/components/ui/primitives";
import { Input, Select } from "@/components/ui/forms";
import { Modal, ConfirmDialog } from "@/components/ui/overlay";
import { Table, Pagination } from "@/components/ui/table";

const statusTone = {
  Scheduled: "blue",
  Completed: "green",
  Cancelled: "red",
  Pending: "amber",
};

const emptyForm = {
  patient: "",
  doctor: "",
  date: "",
  time: "",
  type: "Checkup",
  status: "Scheduled",
};

const PAGE_SIZE = 7;

export function Appointments() {
  const { loading, appointments, patients, doctors, addAppointment, updateAppointment, deleteAppointment } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filtered = useMemo(() => {
    let list = [...appointments];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) => a.patient.toLowerCase().includes(q) || a.doctor.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") list = list.filter((a) => a.status === statusFilter);
    return list.sort(
      (a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime()
    );
  }, [appointments, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (a) => {
    setEditing(a);
    setForm({ patient: a.patient, doctor: a.doctor, date: a.date, time: a.time, type: a.type, status: a.status });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const next = {};
    if (!form.patient) next.patient = "Select a patient.";
    if (!form.doctor) next.doctor = "Select a doctor.";
    if (!form.date) next.date = "Date is required.";
    if (!form.time) next.time = "Time is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      id: editing?.id ?? `A-${Math.floor(3000 + Math.random() * 9000)}`,
      patient: form.patient,
      doctor: form.doctor,
      date: form.date,
      time: form.time,
      type: form.type,
      status: form.status,
    };
    if (editing) {
      updateAppointment(payload);
      addToast("success", "Appointment updated", "The appointment was updated.");
    } else {
      addAppointment(payload);
      addToast("success", "Appointment scheduled", `${form.patient} booked with ${form.doctor}.`);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    deleteAppointment(deleting.id);
    addToast("success", "Appointment removed", "The appointment was cancelled.");
    setDeleting(null);
  };

  const columns = [
    {
      key: "patient",
      header: "Patient",
      cell: (a) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{a.patient}</p>
          <p className="text-xs text-slate-500">{a.id}</p>
        </div>
      ),
    },
    { key: "doctor", header: "Doctor", cell: (a) => a.doctor },
    {
      key: "datetime",
      header: "Date & Time",
      cell: (a) => (
        <div>
          <p>{a.date}</p>
          <p className="text-xs text-slate-500">{a.time}</p>
        </div>
      ),
    },
    { key: "type", header: "Type", cell: (a) => <Badge tone="cyan">{a.type}</Badge> },
    { key: "status", header: "Status", cell: (a) => <Badge tone={statusTone[a.status]}>{a.status}</Badge> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (a) => (
        <div className="flex justify-end gap-1">
          <button onClick={() => openEdit(a)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => setDeleting(a)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Appointment Management"
        subtitle={`${appointments.length} total appointments`}
        action={
          <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>
            New Appointment
          </Button>
        }
      />

      <Card>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center dark:border-slate-800">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by patient or doctor…"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-44"
            options={[
              { value: "all", label: "All statuses" },
              { value: "Scheduled", label: "Scheduled" },
              { value: "Pending", label: "Pending" },
              { value: "Completed", label: "Completed" },
              { value: "Cancelled", label: "Cancelled" },
            ]}
          />
        </div>

        {paginated.length === 0 ? (
          <EmptyState icon={<CalendarDays className="h-6 w-6" />} title="No appointments found" description="Try adjusting your filters." />
        ) : (
          <>
            <Table columns={columns} data={paginated} rowKey={(a) => a.id} />
            <Pagination page={page} pageCount={pageCount} total={filtered.length} onPageChange={setPage} />
          </>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Appointment" : "Schedule Appointment"}
        description="Book or update a patient appointment"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Patient" required value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} error={errors.patient} options={[{ value: "", label: "Select patient…" }, ...patients.map((p) => ({ value: p.name, label: p.name }))]} />
          <Select label="Doctor" required value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} error={errors.doctor} options={[{ value: "", label: "Select doctor…" }, ...doctors.map((d) => ({ value: d.name, label: d.name }))]} />
          <Input label="Date" required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} error={errors.date} />
          <Input label="Time" required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} error={errors.time} />
          <Select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} options={["Checkup", "Consultation", "Follow-up", "Surgery", "Emergency"].map((t) => ({ value: t, label: t }))} />
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={["Scheduled", "Pending", "Completed", "Cancelled"].map((s) => ({ value: s, label: s }))} />
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Schedule"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Cancel appointment"
        message={`Are you sure you want to cancel this appointment for ${deleting?.patient}?`}
      />
    </div>
  );
}
