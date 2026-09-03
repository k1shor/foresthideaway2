"use client";

import { useState } from "react";
import Image from "next/image";
import { adminApiClient } from "@/lib/admin/adminApiClient";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const { url } = await adminApiClient.uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]">
        {label}
      </label>
      {value && (
        <div className="relative w-40 h-28 rounded-md overflow-hidden border border-[#e8d8c0] bg-[#f5ede0]">
          <Image src={value} alt="" fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL"
          className="flex-1 border border-[#e8d8c0] rounded-md px-3 py-1.5 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors"
        />
        <label className="text-sm text-[#8b5e3c] hover:text-[#c8923a] transition-colors font-medium cursor-pointer whitespace-nowrap">
          {uploading ? "Uploading..." : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
      </div>
      {error && <p className="text-sm text-[#a8503f]">{error}</p>}
    </div>
  );
}
