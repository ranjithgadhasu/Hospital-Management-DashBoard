import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const baseField =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

export function Field({ label, error, required, hint, className, children }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
          {required && <span className="ml-0.5 text-rose-500">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-rose-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-400">{hint}</p>
      ) : null}
    </div>
  );
}

export const Input = forwardRef(function Input(
  { label, error, hint, required, className, ...props },
  ref
) {
  return (
    <Field label={label} error={error} hint={hint} required={required} className={className}>
      <input
        ref={ref}
        className={cn(
          baseField,
          error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
        )}
        {...props}
      />
    </Field>
  );
});

export const Select = forwardRef(function Select(
  { label, error, required, className, options, ...props },
  ref
) {
  return (
    <Field label={label} error={error} required={required} className={className}>
      <select
        ref={ref}
        className={cn(baseField, "appearance-none pr-8", error && "border-rose-500")}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, error, required, className, ...props },
  ref
) {
  return (
    <Field label={label} error={error} required={required} className={className}>
      <textarea
        ref={ref}
        className={cn(baseField, "min-h-[90px] resize-y", error && "border-rose-500")}
        {...props}
      />
    </Field>
  );
});
