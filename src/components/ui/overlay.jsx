import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./primitives";

export function Modal({ open, onClose, title, description, children, size = "md" }) {
  if (!open) return null;

  const sizeMap = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full animate-scale-in rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:ring-1 dark:ring-slate-800",
          sizeMap[size]
        )}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            {description && (
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-sm text-slate-600 dark:text-slate-300">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
