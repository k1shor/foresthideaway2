"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { GuestReview } from "@/lib/api/types";

interface GuestReviewFormProps {
  initial?: GuestReview;
}

const inputClass =
  "w-full border border-[#e8d8c0] rounded-md px-3 py-2 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors";
const labelClass =
  "text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]";

export default function GuestReviewForm({ initial }: GuestReviewFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [name, setName] = useState(initial?.name ?? "");
  const [origin, setOrigin] = useState(initial?.origin ?? "");
  const [trip, setTrip] = useState(initial?.trip ?? "");
  const [text, setText] = useState(initial?.text ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 5);
  const [order, setOrder] = useState(initial?.order ?? 0);
  const [published, setPublished] = useState(initial?.published ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const body = { name, origin, trip, text, rating, order, published };
    try {
      if (isEdit && initial) {
        await adminApiClient.update("guest-reviews", initial._id, body);
      } else {
        await adminApiClient.create("guest-reviews", body);
      }
      router.push("/admin/guest-reviews");
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
          <label className={labelClass}>Origin</label>
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g. United Kingdom"
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Trip</label>
          <input
            value={trip}
            onChange={(e) => setTrip(e.target.value)}
            placeholder="e.g. Jeep Safari"
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={inputClass}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Review Text</label>
        <textarea
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
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
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Create review"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/guest-reviews")}
          className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase rounded-md border border-[#e8d8c0] text-[#4a3a28] hover:border-[#c8923a] hover:text-[#8b5e3c] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
