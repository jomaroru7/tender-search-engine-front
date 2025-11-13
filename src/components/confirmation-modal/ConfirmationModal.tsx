import { useState } from "react";

export type ConfirmationModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  confirmClassName?: string;
  cancelClassName?: string;
};

export default function ConfirmationModal({
  open,
  title = "Confirmar",
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  confirmClassName = "px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700",
  cancelClassName = "px-3 py-1 rounded border border-slate-300 hover:bg-slate-100",
}: ConfirmationModalProps) {
  const [processing, setProcessing] = useState(false);

  if (!open) return null;

  const handleConfirm = async () => {
    try {
      setProcessing(true);
      await onConfirm();
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-slate-600 mb-4">{description}</p>}
        <div className="flex justify-end gap-3">
          <button type="button" className={cancelClassName} onClick={onCancel} disabled={processing}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={confirmClassName}
            onClick={handleConfirm}
            disabled={processing}
            aria-busy={processing}
          >
            {processing ? "Procesando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}