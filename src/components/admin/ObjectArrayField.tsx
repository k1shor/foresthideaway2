"use client";

interface FieldSpec {
  key: string;
  label: string;
  multiline?: boolean;
}

interface ObjectArrayFieldProps {
  label: string;
  fields: FieldSpec[];
  values: Record<string, string>[];
  onChange: (values: Record<string, string>[]) => void;
}

export default function ObjectArrayField({
  label,
  fields,
  values,
  onChange,
}: ObjectArrayFieldProps) {
  function updateAt(index: number, key: string, value: string) {
    const next = values.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    onChange(next);
  }

  function removeAt(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  function add() {
    const empty = Object.fromEntries(fields.map((f) => [f.key, ""]));
    onChange([...values, empty]);
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
            {fields.map((f) =>
              f.multiline ? (
                <textarea
                  key={f.key}
                  value={item[f.key] ?? ""}
                  placeholder={f.label}
                  onChange={(e) => updateAt(i, f.key, e.target.value)}
                  className="w-full border border-[#e8d8c0] rounded-md px-3 py-1.5 text-sm text-[#4a3a28] bg-white focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
                  rows={2}
                />
              ) : (
                <input
                  key={f.key}
                  value={item[f.key] ?? ""}
                  placeholder={f.label}
                  onChange={(e) => updateAt(i, f.key, e.target.value)}
                  className="w-full border border-[#e8d8c0] rounded-md px-3 py-1.5 text-sm text-[#4a3a28] bg-white focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
                />
              )
            )}
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="text-sm text-[#a8503f] hover:text-red-700 transition-colors"
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
