import { useState } from "react";
import { Mail, Phone, Building2, BadgeCheck, ShieldCheck, Lock, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardHeader } from "@/components/ui/cards";
import { Button, Badge } from "@/components/ui/primitives";
import { Input } from "@/components/ui/forms";

export function Profile() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    department: user?.department ?? "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwErrors, setPwErrors] = useState({});

  const handleProfile = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    setTimeout(() => {
      updateUser({ ...user, ...form });
      setSaving(false);
      addToast("success", "Profile updated", "Your profile details were saved.");
    }, 600);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    const next = {};
    if (!pw.current) next.current = "Current password is required.";
    if (pw.next.length < 8) next.next = "At least 8 characters.";
    if (pw.confirm !== pw.next) next.confirm = "Passwords do not match.";
    setPwErrors(next);
    if (Object.keys(next).length > 0) return;

    setPw({ current: "", next: "", confirm: "" });
    addToast("success", "Password changed", "Your password was updated successfully.");
  };

  const initials = (user?.name ?? "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="animate-fade-in-up mx-auto max-w-4xl">
      <PageHeader title="My Profile" subtitle="Manage your account information and settings" />

      <Card className="mb-6 overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-brand-600 to-violet-600" />
        <div className="px-6 pb-6">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl font-bold text-white ring-4 ring-white dark:ring-slate-900">
                {initials}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user?.name}</h2>
                  <BadgeCheck className="h-5 w-5 text-brand-600" />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user?.role}</p>
              </div>
            </div>
            <Badge tone="green">
              <ShieldCheck className="h-3.5 w-3.5" /> Active
            </Badge>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Mail, label: "Email", value: user?.email },
              { icon: Phone, label: "Phone", value: user?.phone },
              { icon: Building2, label: "Department", value: user?.department },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-brand-600 shadow-sm dark:bg-slate-900">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Personal Information" subtitle="Update your account details" />
          <form onSubmit={handleProfile} className="space-y-4 p-5">
            <Input label="Full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
            <Input label="Email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Input label="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
            <div className="flex justify-end">
              <Button type="submit" loading={saving} icon={<Save className="h-4 w-4" />}>
                Save changes
              </Button>
            </div>
          </form>
        </Card>

        <Card>
          <CardHeader title="Change Password" subtitle="Keep your account secure" />
          <form onSubmit={handlePassword} className="space-y-4 p-5">
            <Input label="Current password" type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} error={pwErrors.current} placeholder="••••••••" />
            <Input label="New password" type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} error={pwErrors.next} placeholder="At least 8 characters" />
            <Input label="Confirm new password" type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} error={pwErrors.confirm} placeholder="Re-enter new password" />
            <div className="flex justify-end">
              <Button type="submit" variant="outline" icon={<Lock className="h-4 w-4" />}>
                Update password
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
