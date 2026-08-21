import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Receipt, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/cards";
import { Button, Badge, EmptyState, LoadingScreen } from "@/components/ui/primitives";
import { Input, Select } from "@/components/ui/forms";
import { Modal, ConfirmDialog } from "@/components/ui/overlay";
import { Table, Pagination } from "@/components/ui/table";

const statusTone = {
  Paid: "green",
  Pending: "amber",
  Overdue: "red",
};

const emptyForm = {
  patient: "",
  date: "",
  items: "",
  total: "",
  status: "Pending",
  method: "Cash",
};

const PAGE_SIZE = 6;

export function Billing() {
  const { loading, invoices, patients, addInvoice, updateInvoice, deleteInvoice } = useData();
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
    let list = [...invoices];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((i) => i.patient.toLowerCase().includes(q) || i.id.toLowerCase().includes(q));
    }
    if (statusFilter !== "all") list = list.filter((i) => i.status === statusFilter);
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [invoices, search, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const totalRevenue = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.total, 0);
  const pending = invoices.filter((i) => i.status === "Pending");
  const overdue = invoices.filter((i) => i.status === "Overdue");

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (i) => {
    setEditing(i);
    setForm({
      patient: i.patient,
      date: i.date,
      items: String(i.items),
      total: String(i.total),
      status: i.status,
      method: i.method,
    });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const next = {};
    if (!form.patient) next.patient = "Select a patient.";
    if (!form.total || Number(form.total) < 0) next.total = "Enter a valid amount.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      id: editing?.id ?? `INV-${Math.floor(6000 + Math.random() * 9000)}`,
      patient: form.patient,
      date: form.date || new Date().toISOString().slice(0, 10),
      items: Number(form.items) || 1,
      total: Number(form.total),
      status: form.status,
      method: form.method,
    };
    if (editing) {
      updateInvoice(payload);
      addToast("success", "Invoice updated", `${payload.id} was updated.`);
    } else {
      addInvoice(payload);
      addToast("success", "Invoice created", `${payload.id} was generated.`);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    deleteInvoice(deleting.id);
    addToast("success", "Invoice deleted", `${deleting.id} was deleted.`);
    setDeleting(null);
  };

  const columns = [
    {
      key: "id",
      header: "Invoice",
      cell: (i) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-white">{i.id}</p>
          <p className="text-xs text-slate-500">{i.date}</p>
        </div>
      ),
    },
    { key: "patient", header: "Patient", cell: (i) => i.patient },
    { key: "items", header: "Items", cell: (i) => i.items },
    { key: "method", header: "Method", cell: (i) => i.method },
    { key: "total", header: "Total", cell: (i) => <span className="font-semibold">${i.total.toLocaleString()}</span> },
    { key: "status", header: "Status", cell: (i) => <Badge tone={statusTone[i.status]}>{i.status}</Badge> },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (i) => (
        <div className="flex justify-end gap-1">
          <button onClick={() => openEdit(i)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => setDeleting(i)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10">
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
        title="Billing"
        subtitle="Track invoices and payments"
        action={
          <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>
            New Invoice
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Collected</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Total Invoices</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{invoices.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Pending</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{pending.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Overdue</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{overdue.length}</p>
            </div>
          </div>
        </Card>
      </div>

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
              placeholder="Search invoice or patient…"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-40"
            options={[
              { value: "all", label: "All statuses" },
              { value: "Paid", label: "Paid" },
              { value: "Pending", label: "Pending" },
              { value: "Overdue", label: "Overdue" },
            ]}
          />
        </div>

        {paginated.length === 0 ? (
          <EmptyState icon={<Receipt className="h-6 w-6" />} title="No invoices found" description="Try adjusting your search or filters." />
        ) : (
          <>
            <Table columns={columns} data={paginated} rowKey={(i) => i.id} />
            <Pagination page={page} pageCount={pageCount} total={filtered.length} onPageChange={setPage} />
          </>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Invoice" : "Create Invoice"}
        description="Generate or update a billing invoice"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Select label="Patient" required value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} error={errors.patient} options={[{ value: "", label: "Select patient…" }, ...patients.map((p) => ({ value: p.name, label: p.name }))]} />
          </div>
          <Input label="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <Input label="Number of items" type="number" value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} />
          <Input label="Total amount ($)" required type="number" step="0.01" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} error={errors.total} />
          <Select label="Payment method" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} options={["Cash", "Credit Card", "Debit Card", "Insurance"].map((m) => ({ value: m, label: m }))} />
          <div className="sm:col-span-2">
            <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} options={["Paid", "Pending", "Overdue"].map((s) => ({ value: s, label: s }))} />
          </div>
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Create invoice"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete invoice"
        message={`Are you sure you want to delete ${deleting?.id}? This action cannot be undone.`}
      />
    </div>
  );
}
