"use client";

import { Pencil, Trash2 } from "lucide-react";

export type RowActionsVariant = "text" | "icon" | "icon-text";

interface AdminRowActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  variant?: RowActionsVariant;
}

const buttonBase =
  "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 transition-colors";

export default function AdminRowActions({
  onEdit,
  onDelete,
  variant = "icon-text",
}: AdminRowActionsProps) {
  const stop = (fn: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    fn();
  };

  if (variant === "text") {
    return (
      <div className="flex items-center gap-2 text-[14px] font-semibold whitespace-nowrap shrink-0">
        <button
          onClick={stop(onEdit)}
          className={`${buttonBase} text-[#8b5e3c] hover:text-[#c8923a] hover:bg-[#f5ede0]`}
        >
          Edit
        </button>
        <button
          onClick={stop(onDelete)}
          className={`${buttonBase} text-[#a8503f] hover:text-red-700 hover:bg-red-50`}
        >
          Delete
        </button>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
        <button
          onClick={stop(onEdit)}
          title="Edit"
          className={`${buttonBase} text-[#8b5e3c] hover:text-[#c8923a] hover:bg-[#f5ede0]`}
        >
          <Pencil size={16} strokeWidth={2} />
        </button>
        <button
          onClick={stop(onDelete)}
          title="Delete"
          className={`${buttonBase} text-[#a8503f] hover:text-red-700 hover:bg-red-50`}
        >
          <Trash2 size={16} strokeWidth={2} />
        </button>
      </div>
    );
  }

  // "icon-text" — icon always, label hidden below sm
  return (
    <div className="flex items-center gap-2 text-[13px] font-semibold whitespace-nowrap shrink-0">
      <button
        onClick={stop(onEdit)}
        title="Edit"
        className={`${buttonBase} text-[#8b5e3c] hover:text-[#c8923a] hover:bg-[#f5ede0]`}
      >
        <Pencil size={15} strokeWidth={2} />
        <span className="hidden sm:inline">Edit</span>
      </button>
      <button
        onClick={stop(onDelete)}
        title="Delete"
        className={`${buttonBase} text-[#a8503f] hover:text-red-700 hover:bg-red-50`}
      >
        <Trash2 size={15} strokeWidth={2} />
        <span className="hidden sm:inline">Delete</span>
      </button>
    </div>
  );
}
