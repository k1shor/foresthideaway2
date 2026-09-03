"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { Blog } from "@/lib/api/types";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface BlogFormProps {
  initial?: Blog;
}

function toDateInputValue(iso?: string) {
  if (!iso) return "";
  return iso.slice(0, 10);
}

const inputClass =
  "w-full border border-[#e8d8c0] rounded-md px-3 py-2 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors";
const labelClass =
  "text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]";

export default function BlogForm({ initial }: BlogFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [img, setImg] = useState(initial?.img ?? "");
  const [readTime, setReadTime] = useState(initial?.readTime ?? "");
  const [publishedAt, setPublishedAt] = useState(
    toDateInputValue(initial?.publishedAt)
  );
  const [order, setOrder] = useState(initial?.order ?? 0);
  const [published, setPublished] = useState(initial?.published ?? true);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const body = {
      title,
      slug: slug || undefined,
      category,
      excerpt,
      content,
      img,
      readTime,
      publishedAt: publishedAt || undefined,
      order,
      published,
    };
    try {
      if (isEdit && initial) {
        await adminApiClient.update("blogs", initial._id, body);
      } else {
        await adminApiClient.create("blogs", body);
      }
      router.push("/admin/blogs");
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
          <label className={labelClass}>Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <label className={labelClass}>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-1">
          <label className={labelClass}>Read Time</label>
          <input
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            placeholder="e.g. 4 min read"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className={inputClass}
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          className={inputClass}
        />
      </div>

      <ImageUploadField label="Image" value={img} onChange={setImg} />

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className={labelClass}>Published At</label>
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className={inputClass}
          />
        </div>
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
          {submitting ? "Saving..." : isEdit ? "Save changes" : "Create blog"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          className="px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase rounded-md border border-[#e8d8c0] text-[#4a3a28] hover:border-[#c8923a] hover:text-[#8b5e3c] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
