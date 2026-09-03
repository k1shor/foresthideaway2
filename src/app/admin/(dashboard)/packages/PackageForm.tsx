"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { Package } from "@/lib/api/types";
import ArrayField from "@/components/admin/ArrayField";
import ItineraryField from "@/components/admin/ItineraryField";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface PackageFormProps {
  initial?: Package;
}

const inputClass =
  "w-full border border-[#e8d8c0] rounded-md px-3 py-2 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors";
const labelClass =
  "text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]";

export default function PackageForm({ initial }: PackageFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [tag, setTag] = useState(initial?.tag ?? "");
  const [duration, setDuration] = useState(initial?.duration ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [img, setImg] = useState(initial?.img ?? "");
  const [inclusions, setInclusions] = useState<string[]>(initial?.inclusions ?? []);
  const [exclusions, setExclusions] = useState<string[]>(initial?.exclusions ?? []);
  const [itinerary, setItinerary] = useState(initial?.itinerary ?? []);
  const [suitableFor, setSuitableFor] = useState(initial?.suitableFor ?? "");
  const [order, setOrder] = useState(initial?.order ?? 0);
  const [published, setPublished] = useState(initial?.published ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const body = {
      name,
      slug: slug || undefined,
      tag,
      duration,
      description,
      img,
      inclusions,
      exclusions,
      itinerary,
      suitableFor,
      order,
      published,
    };
    try {
      if (isEdit && initial) {
        await adminApiClient.update("packages", initial._id, body);
      } else {
        await adminApiClient.create("packages", body);
      }
      router.push("/admin/packages");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass}>Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto-generated if blank"
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Tag</label>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputClass}
        />
      </div>

      <ImageUploadField label="Image" value={img} onChange={setImg} />

      <ArrayField label="Inclusions" values={inclusions} onChange={setInclusions} />
      <ArrayField label="Exclusions" values={exclusions} onChange={setExclusions} />

      <ItineraryField label="Itinerary" values={itinerary} onChange={setItinerary} />

      <div className="space-y-1">
        <label className={labelClass}>Suitable For</label>
        <input
          value={suitableFor}
          onChange={(e) => setSuitableFor(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={labelClass}>Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className={inputClass}
          />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="accent-[#c8923a]"
          />
          <label htmlFor="published" className={labelClass}>
            Published
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-[#a8503f]">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#c8923a] text-white rounded-md px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#b5822f] transition-colors disabled:opacity-50"
        >
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Create package"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/packages")}
          className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase rounded-md border border-[#e8d8c0] text-[#4a3a28] hover:border-[#c8923a] hover:text-[#8b5e3c] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
