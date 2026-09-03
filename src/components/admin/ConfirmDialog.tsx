"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#1c2316]/40 flex items-center justify-center z-50">
      <div className="bg-white border border-[#e8d8c0] rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
        <h2 className="font-serif text-lg text-[#1e1a14]">{title}</h2>
        <p className="text-sm text-[#7a6852]">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3.5 py-1.5 text-sm rounded-md border border-[#e8d8c0] text-[#4a3a28] hover:border-[#c8923a] hover:text-[#8b5e3c] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3.5 py-1.5 text-sm rounded-md bg-[#a8503f] text-white hover:bg-[#8f4234] transition-colors"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
