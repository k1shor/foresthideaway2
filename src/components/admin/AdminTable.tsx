"use client";

import type { ReactNode } from "react";
import AdminRowActions, { type RowActionsVariant } from "./AdminRowActions";

interface Column<T> {
  header: string;
  render: (item: T) => ReactNode;
}

interface AdminTableProps<T> {
  items: T[];
  columns: Column<T>[];
  getId: (item: T) => string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  getImage?: (item: T) => string | undefined;
  actionsVariant?: RowActionsVariant;
}

export default function AdminTable<T>({
  items,
  columns,
  getId,
  onEdit,
  onDelete,
  getImage,
  actionsVariant,
}: AdminTableProps<T>) {
  const titleCol = columns[0];
  const orderCol = columns.find((c) => c.header === "Order");
  const publishedCol = columns.find((c) => c.header === "Published");
  const metaCols = columns.filter(
    (c) => c !== titleCol && c !== orderCol && c !== publishedCol
  );

  if (items.length === 0) {
    return (
      <div className="bg-white border border-[#e8d8c0] rounded-lg px-4 py-10 text-center text-sm text-[#a89877]">
        No items yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <div
          key={getId(item)}
          onClick={() => onEdit(item)}
          className="bg-white border border-[#e8d8c0] rounded-lg px-4 py-3.5 flex flex-wrap items-center gap-x-3 gap-y-2 hover:border-[#c8923a] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3.5 min-w-0 w-full sm:w-auto sm:flex-1">
            {getImage && (
              <div className="w-11 h-11 rounded-md shrink-0 overflow-hidden bg-gradient-to-br from-[#c8923a] to-[#8b5e3c]">
                {getImage(item) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getImage(item)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-[15px] text-[#4a3a28] truncate">
                {titleCol?.render(item)}
              </div>
              {metaCols.length > 0 && (
                <div className="flex items-center gap-2 text-[12.5px] text-[#7a6852] mt-0.5 flex-wrap">
                  {metaCols.map((col, i) => (
                    <span key={col.header} className="flex items-center gap-2">
                      {i > 0 && <span className="text-[#e8d8c0]">·</span>}
                      {col.render(item)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {publishedCol && (
            <span
              className={`text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${
                String(publishedCol.render(item)) === "Yes"
                  ? "bg-[#4d7a52]/[0.12] text-[#4d7a52]"
                  : "bg-[#e8d8c0]/60 text-[#a89877]"
              }`}
            >
              {publishedCol.render(item)}
            </span>
          )}

          {orderCol && (
            <span className="text-[11px] font-mono text-[#7a6852] bg-[#f5ede0] border border-[#e8d8c0] rounded-full px-2.5 py-1 whitespace-nowrap">
              #{orderCol.render(item)}
            </span>
          )}

          <AdminRowActions
            variant={actionsVariant}
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item)}
          />
        </div>
      ))}
    </div>
  );
}
