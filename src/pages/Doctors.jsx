import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Star, Stethoscope, Phone, Mail } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/cards";
import { Button, Badge, EmptyState, LoadingScreen } from "@/components/ui/primitives";
import { Input, Select } from "@/components/ui/forms";
import { Modal, ConfirmDialog } from "@/components/ui/overlay";

const availabilityTone = {
  Available: "green",
  "On Leave": "amber",
  "In Surgery": "blue",
};

const emptyForm = {
  name: "",
  specialty: "",
  phone: "",
  email: "",
  experience: "",
  availability: "Available",
  rating: "",
};

export function Doctors() {
  const { loading, doctors, addDoctor, updateDoctor, deleteDoctor } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const specialties = useMemo(
    () => ["all", ...Array.from(new Set(doctors.map((d) => d.specialty)))],
    [doctors]
  );

  const filtered = useMemo(() => {
    let list = [...doctors];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)
      );
    }
    if (specialty !== "all") list = list.filter((d) => d.specialty === specialty);
    return list;
  }, [doctors, search, specialty]);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (d) => {
    setEditing(d);
    setForm({
      name: d.name,
      specialty: d.specialty,
      phone: d.phone,
      email: d.email,
      experience: String(d.experience),
      availability: d.availability,
      rating: String(d.rating),
    });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.specialty.trim()) next.specialty = "Specialty is required.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    if (form.rating && (Number(form.rating) < 0 || Number(form.rating) > 5))
      next.rating = "Rating must be between 0 and 5.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: editing?.id ?? `D-${Math.floor(2000 + Math.random() * 9000)}`,
      name: form.name.trim(),
      specialty: form.specialty.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      experience: Number(form.experience) || 0,
      patients: editing?.patients ?? 0,
      availability: form.availability,
      rating: form.rating ? Number(form.rating) : 0,
    };

    if (editing) {
      updateDoctor(payload);
      addToast("success", "Doctor updated", `${payload.name}'s profile was updated.`);
    } else {
      addDoctor(payload);
      addToast("success", "Doctor added", `${payload.name} was added to the team.`);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    deleteDoctor(deleting.id);
    addToast("success", "Doctor removed", `${deleting.name} was removed.`);
    setDeleting(null);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="animate-fade-in-up">
      <PageHeader
        title="Doctor Management"
        subtitle={`${doctors.length} doctors on staff`}
        action={
          <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>
            Add Doctor
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctors or specialty…"
            className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          />
        </div>
        <Select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full sm:w-52"
          options={specialties.map((s) => ({ value: s, label: s === "all" ? "All specialties" : s }))}
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState icon={<Stethoscope className="h-6 w-6" />} title="No doctors found" description="Try a different search or specialty filter." />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((d) => (
            <Card key={d.id} className="p-5 transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-sm font-bold text-white">
                    {d.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{d.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{d.specialty}</p>
                  </div>
                </div>
                <Badge tone={availabilityTone[d.availability]}>{d.availability}</Badge>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">{d.rating}</span>
                </span>
                <span>{d.experience} yrs exp</span>
                <span>{d.patients} patients</span>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {d.phone}</p>
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {d.email}</p>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm" icon={<Pencil className="h-3.5 w-3.5" />} onClick={() => openEdit(d)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" icon={<Trash2 className="h-3.5 w-3.5" />} onClick={() => setDeleting(d)}>
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Doctor" : "Add New Doctor"}
        description={editing ? `Updating ${editing.name}` : "Add a doctor to the staff"}
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="Dr. Jane Doe" />
          <Input label="Specialty" required value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} error={errors.specialty} placeholder="Cardiology" />
          <Input label="Phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} />
          <Input label="Email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
          <Input label="Experience (years)" type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
          <Input label="Rating (0–5)" type="number" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} error={errors.rating} />
          <div className="sm:col-span-2">
            <Select label="Availability" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} options={["Available", "On Leave", "In Surgery"].map((a) => ({ value: a, label: a }))} />
          </div>
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Add doctor"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Remove doctor"
        message={`Are you sure you want to remove ${deleting?.name}? This action cannot be undone.`}
      />
    </div>
  );
}
