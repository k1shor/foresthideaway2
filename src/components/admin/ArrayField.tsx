"use client";

interface ArrayFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function ArrayField({
  label,
  values,
  onChange,
  placeholder,
}: ArrayFieldProps) {
  function updateAt(index: number, value: string) {
    const next = [...values];
    next[index] = value;
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...values, ""]);
  }

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]">
        {label}
      </label>
      <div className="space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={value}
              placeholder={placeholder}
              onChange={(e) => updateAt(i, e.target.value)}
              className="flex-1 border border-[#e8d8c0] rounded-md px-3 py-1.5 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="px-2 text-sm text-[#a8503f] hover:text-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="text-sm text-[#8b5e3c] hover:text-[#c8923a] transition-colors font-medium"
      >
        + Add
      </button>
    </div>
  );
}
