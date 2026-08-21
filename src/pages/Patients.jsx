import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Users } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/cards";
import { Button, Badge, EmptyState, LoadingScreen } from "@/components/ui/primitives";
import { Input, Select } from "@/components/ui/forms";
import { Modal, ConfirmDialog } from "@/components/ui/overlay";
import { Table, Pagination } from "@/components/ui/table";

const statusTone = {
  Admitted: "blue",
  Discharged: "green",
  Outpatient: "violet",
  Critical: "red",
};

const emptyForm = {
  name: "",
  age: "",
  gender: "Male",
  bloodGroup: "O+",
  phone: "",
  email: "",
  address: "",
  diagnosis: "",
  admissionDate: "",
  status: "Admitted",
  doctor: "",
};

const PAGE_SIZE = 6;

export function Patients() {
  const { loading, patients, doctors, addPatient, updatePatient, deletePatient } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const filtered = useMemo(() => {
    let list = [...patients];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.diagnosis.toLowerCase().includes(q) ||
          p.doctor.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") list = list.filter((p) => p.status === statusFilter);

    list.sort((a, b) => {
      switch (sortBy) {
        case "age":
          return a.age - b.age;
        case "date":
          return new Date(b.admissionDate).getTime() - new Date(a.admissionDate).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return list;
  }, [patients, search, statusFilter, sortBy]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      age: String(p.age),
      gender: p.gender,
      bloodGroup: p.bloodGroup,
      phone: p.phone,
      email: p.email,
      address: p.address,
      diagnosis: p.diagnosis,
      admissionDate: p.admissionDate,
      status: p.status,
      doctor: p.doctor,
    });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.age || Number(form.age) <= 0) next.age = "Enter a valid age.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.diagnosis.trim()) next.diagnosis = "Diagnosis is required.";
    if (!form.doctor) next.doctor = "Select an attending doctor.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: editing?.id ?? `P-${Math.floor(1000 + Math.random() * 9000)}`,
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      bloodGroup: form.bloodGroup,
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      diagnosis: form.diagnosis.trim(),
      admissionDate: form.admissionDate || new Date().toISOString().slice(0, 10),
      status: form.status,
      doctor: form.doctor,
    };

    if (editing) {
      updatePatient(payload);
      addToast("success", "Patient updated", `${payload.name}'s record was updated.`);
    } else {
      addPatient(payload);
      addToast("success", "Patient added", `${payload.name} was added successfully.`);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    deletePatient(deleting.id);
    addToast("success", "Patient removed", `${deleting.name} was removed.`);
    setDeleting(null);
  };

  const columns = [
    {
      key: "patient",
      header: "Patient",
      cell: (p) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-500/10 dark:text-brand-400">
            {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{p.name}</p>
            <p className="text-xs text-slate-500">{p.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "age",
      header: "Age / Gender",
      cell: (p) => (
        <div>
          <p>{p.age} yrs</p>
          <p className="text-xs text-slate-500">{p.gender}</p>
        </div>
      ),
    },
    { key: "blood", header: "Blood", cell: (p) => <Badge tone="red">{p.bloodGroup}</Badge> },
    { key: "diagnosis", header: "Diagnosis", cell: (p) => <span className="block max-w-[180px] truncate">{p.diagnosis}</span> },
    { key: "doctor", header: "Doctor", cell: (p) => p.doctor },
    { key: "date", header: "Admitted", cell: (p) => p.admissionDate },
    { key: "status", header: "Status", cell: (p) => <Badge tone={statusTone[p.status]}>{p.status}</Badge> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (p) => (
        <div className="flex justify-end gap-1">
          <button onClick={() => openEdit(p)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => setDeleting(p)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10">
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
        title="Patient Management"
        subtitle={`${patients.length} patients registered`}
        action={
          <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>
            Add Patient
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
              placeholder="Search by name, diagnosis, doctor…"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
          </div>
          <div className="flex gap-3">
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-40"
              options={[
                { value: "all", label: "All statuses" },
                { value: "Admitted", label: "Admitted" },
                { value: "Discharged", label: "Discharged" },
                { value: "Outpatient", label: "Outpatient" },
                { value: "Critical", label: "Critical" },
              ]}
            />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-40"
              options={[
                { value: "name", label: "Sort by name" },
                { value: "age", label: "Sort by age" },
                { value: "date", label: "Sort by date" },
              ]}
            />
          </div>
        </div>

        {paginated.length === 0 ? (
          <EmptyState icon={<Users className="h-6 w-6" />} title="No patients found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <Table columns={columns} data={paginated} rowKey={(p) => p.id} />
            <Pagination page={page} pageCount={pageCount} total={filtered.length} onPageChange={setPage} />
          </>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Patient" : "Add New Patient"}
        description={editing ? `Updating record for ${editing.name}` : "Register a new patient record"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="John Doe" />
          <Input label="Age" required type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} error={errors.age} placeholder="30" />
          <Select label="Gender" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} options={[{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }]} />
          <Select label="Blood group" value={form.bloodGroup} onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })} options={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((b) => ({ value: b, label: b }))} />
          <Input label="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} placeholder="+1 555 0000" />
          <Input label="Email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="john@mail.com" />
          <div className="sm:col-span-2">
            <Input label="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, City" />
          </div>
          <div className="sm:col-span-2">
            <Input label="Diagnosis" required value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} error={errors.diagnosis} placeholder="e.g. Cardiac Arrhythmia" />
          </div>
          <Input label="Admission date" type="date" value={form.admissionDate} onChange={(e) => setForm({ ...form, admissionDate: e.target.value })} />
          <Select label="Attending doctor" required value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })} error={errors.doctor} options={[{ value: "", label: "Select doctor…" }, ...doctors.map((d) => ({ value: d.name, label: d.name }))]} />
          <div className="sm:col-span-2">
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={["Admitted", "Discharged", "Outpatient", "Critical"].map((s) => ({ value: s, label: s }))} />
          </div>
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Add patient"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete patient"
        message={`Are you sure you want to delete ${deleting?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
