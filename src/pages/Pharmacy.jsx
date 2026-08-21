import { useMemo, useState } from "react";
import { Search, Plus, Pencil, Trash2, Pill, AlertTriangle } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/cards";
import { Button, Badge, EmptyState, LoadingScreen } from "@/components/ui/primitives";
import { Input, Select } from "@/components/ui/forms";
import { Modal, ConfirmDialog } from "@/components/ui/overlay";
import { Table, Pagination } from "@/components/ui/table";

const emptyForm = {
  name: "",
  category: "Antibiotic",
  stock: "",
  price: "",
  expiry: "",
  manufacturer: "",
};

const PAGE_SIZE = 6;

function stockTone(stock) {
  if (stock <= 20) return "red";
  if (stock <= 50) return "amber";
  return "green";
}

export function Pharmacy() {
  const { loading, medicines, addMedicine, updateMedicine, deleteMedicine } = useData();
  const { addToast } = useToast();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(medicines.map((m) => m.category)))],
    [medicines]
  );

  const filtered = useMemo(() => {
    let list = [...medicines];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) => m.name.toLowerCase().includes(q) || m.manufacturer.toLowerCase().includes(q)
      );
    }
    if (category !== "all") list = list.filter((m) => m.category === category);
    return list;
  }, [medicines, search, category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setForm({
      name: m.name,
      category: m.category,
      stock: String(m.stock),
      price: String(m.price),
      expiry: m.expiry,
      manufacturer: m.manufacturer,
    });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.stock || Number(form.stock) < 0) next.stock = "Enter a valid stock.";
    if (!form.price || Number(form.price) < 0) next.price = "Enter a valid price.";
    if (!form.manufacturer.trim()) next.manufacturer = "Manufacturer is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      id: editing?.id ?? `M-${Math.floor(5000 + Math.random() * 9000)}`,
      name: form.name.trim(),
      category: form.category,
      stock: Number(form.stock),
      price: Number(form.price),
      expiry: form.expiry || "2026-12-31",
      manufacturer: form.manufacturer.trim(),
    };
    if (editing) {
      updateMedicine(payload);
      addToast("success", "Medicine updated", `${payload.name} was updated.`);
    } else {
      addMedicine(payload);
      addToast("success", "Medicine added", `${payload.name} added to inventory.`);
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    deleteMedicine(deleting.id);
    addToast("success", "Medicine removed", `${deleting.name} was removed.`);
    setDeleting(null);
  };

  const columns = [
    {
      key: "name",
      header: "Medicine",
      cell: (m) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            <Pill className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">{m.name}</p>
            <p className="text-xs text-slate-500">{m.manufacturer}</p>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Category", cell: (m) => <Badge tone="violet">{m.category}</Badge> },
    {
      key: "stock",
      header: "Stock",
      cell: (m) => (
        <div className="flex items-center gap-2">
          <Badge tone={stockTone(m.stock)}>{m.stock} units</Badge>
          {m.stock <= 20 && <AlertTriangle className="h-4 w-4 text-amber-500" />}
        </div>
      ),
    },
    { key: "price", header: "Price", cell: (m) => `$${m.price.toFixed(2)}` },
    { key: "expiry", header: "Expiry", cell: (m) => m.expiry },
    {
      key: "actions",
      header: "",
      className: "text-right",
      cell: (m) => (
        <div className="flex justify-end gap-1">
          <button onClick={() => openEdit(m)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-800">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={() => setDeleting(m)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10">
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
        title="Pharmacy"
        subtitle={`${medicines.length} medicines in inventory`}
        action={
          <Button onClick={openAdd} icon={<Plus className="h-4 w-4" />}>
            Add Medicine
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
              placeholder="Search medicine or manufacturer…"
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            />
          </div>
          <Select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="w-48"
            options={categories.map((c) => ({ value: c, label: c === "all" ? "All categories" : c }))}
          />
        </div>

        {paginated.length === 0 ? (
          <EmptyState icon={<Pill className="h-6 w-6" />} title="No medicines found" description="Try adjusting your search or category." />
        ) : (
          <>
            <Table columns={columns} data={paginated} rowKey={(m) => m.id} />
            <Pagination page={page} pageCount={pageCount} total={filtered.length} onPageChange={setPage} />
          </>
        )}
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Medicine" : "Add Medicine"}
        description="Manage pharmacy inventory"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Medicine name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="Amoxicillin" />
          <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={["Antibiotic", "Analgesic", "Antidiabetic", "Cardiovascular", "Gastrointestinal", "Antihistamine"].map((c) => ({ value: c, label: c }))} />
          <Input label="Stock (units)" required type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} error={errors.stock} />
          <Input label="Price ($)" required type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} error={errors.price} />
          <Input label="Expiry date" type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
          <Input label="Manufacturer" required value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} error={errors.manufacturer} placeholder="Pfizer" />
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editing ? "Save changes" : "Add medicine"}</Button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Remove medicine"
        message={`Are you sure you want to remove ${deleting?.name} from inventory?`}
      />
    </div>
  );
}
