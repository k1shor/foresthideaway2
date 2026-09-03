"use client";

import ArrayField from "./ArrayField";

interface ItineraryDay {
  day: string;
  title: string;
  items: string[];
}

interface ItineraryFieldProps {
  label: string;
  values: ItineraryDay[];
  onChange: (values: ItineraryDay[]) => void;
}

export default function ItineraryField({
  label,
  values,
  onChange,
}: ItineraryFieldProps) {
  function updateAt(index: number, patch: Partial<ItineraryDay>) {
    const next = values.map((item, i) =>
      i === index ? { ...item, ...patch } : item
    );
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...values, { day: "", title: "", items: [] }]);
  }

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]">
        {label}
      </label>
      <div className="space-y-3">
        {values.map((item, i) => (
          <div
            key={i}
            className="border border-[#e8d8c0] rounded-md p-3 space-y-2 bg-[#faf6ef]"
          >
            <div className="grid grid-cols-2 gap-2">
              <input
                value={item.day}
                placeholder="Day (e.g. Day 1)"
                onChange={(e) => updateAt(i, { day: e.target.value })}
                className="border border-[#e8d8c0] rounded-md px-3 py-1.5 text-sm text-[#4a3a28] bg-white focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
              />
              <input
                value={item.title}
                placeholder="Title"
                onChange={(e) => updateAt(i, { title: e.target.value })}
                className="border border-[#e8d8c0] rounded-md px-3 py-1.5 text-sm text-[#4a3a28] bg-white focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
              />
            </div>
            <ArrayField
              label="Items"
              values={item.items}
              onChange={(items) => updateAt(i, { items })}
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="text-sm text-[#a8503f] hover:text-red-700 transition-colors"
            >
              Remove day
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="text-sm text-[#8b5e3c] hover:text-[#c8923a] transition-colors font-medium"
      >
        + Add day
      </button>
    </div>
  );
}
