"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { GuestReviewsPageContent } from "@/lib/api/types";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextField from "@/components/admin/RichTextField";

interface GuestReviewsPageFormProps {
  initial: GuestReviewsPageContent;
}

const inputClass =
  "w-full border border-[#e8d8c0] rounded-md px-3 py-2 text-sm text-[#4a3a28] focus:outline-none focus:border-[#c8923a] focus:ring-1 focus:ring-[#c8923a]/30 transition-colors";
const labelClass = "text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]";
const cardClass = "border border-[#e8d8c0] rounded-lg bg-white p-5 space-y-4 break-inside-avoid mb-6";
const cardTitleClass = "font-serif text-lg text-[#1e1a14]";

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className={labelClass}>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </div>
  );
}

const FIELD_LABELS: Record<string, string> = {
  "hero.label": "Hero Label",
  "hero.heading": "Hero Heading",
  "hero.subtext": "Hero Subtext",
  "hero.image": "Hero Image",
  "quote.text": "Quote Text",
  "quote.attribution": "Quote Attribution",
  "listLabel.label": "Reviews Grid Label",
  "listLabel.heading": "Reviews Grid Heading",
  "cta.label": "CTA Label",
  "cta.heading": "CTA Heading",
  "cta.body": "CTA Body",
  "cta.buttonLabel": "CTA Button Label",
};

function fieldLabel(path: string): string {
  return FIELD_LABELS[path] ?? path;
}

/** Every plain-text field across every section must be non-empty before submit. */
function findEmptyField(content: GuestReviewsPageContent): string | null {
  for (const key of ["label", "heading", "subtext", "image"] as const) {
    if (!content.hero[key].trim()) return `hero.${key}`;
  }
  if (!content.quote.attribution.trim()) return "quote.attribution";
  for (const key of ["label", "heading"] as const) {
    if (!content.listLabel[key].trim()) return `listLabel.${key}`;
  }
  for (const key of ["label", "heading", "buttonLabel"] as const) {
    if (!content.cta[key].trim()) return `cta.${key}`;
  }
  return null;
}

/** Strips React-only formatting so an empty Tiptap doc ("<p></p>") still counts as empty. */
function isBlank(html: string) {
  return html.replace(/<[^>]*>/g, "").trim().length === 0;
}

export default function GuestReviewsPageForm({ initial }: GuestReviewsPageFormProps) {
  const [content, setContent] = useState<GuestReviewsPageContent>(initial);
  const [submitting, setSubmitting] = useState(false);

  function updateSection<K extends Exclude<keyof GuestReviewsPageContent, "_id">>(
    key: K,
    patch: Partial<GuestReviewsPageContent[K]>
  ) {
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const richTextChecks: [string, string][] = [
      ["hero.subtext", content.hero.subtext],
      ["quote.text", content.quote.text],
      ["cta.body", content.cta.body],
    ];
    const blankRichText = richTextChecks.find(([, html]) => isBlank(html));
    if (blankRichText) {
      toast.error(`${fieldLabel(blankRichText[0])} can't be empty.`);
      return;
    }

    const emptyField = findEmptyField(content);
    if (emptyField) {
      toast.error(`${fieldLabel(emptyField)} can't be empty.`);
      return;
    }

    setSubmitting(true);
    try {
      const { _id, createdAt, updatedAt, ...body } = content as GuestReviewsPageContent & {
        createdAt?: string;
        updatedAt?: string;
      };
      void _id;
      void createdAt;
      void updatedAt;
      const saved = await adminApiClient.updateSingleton<GuestReviewsPageContent>(
        "pages/guest-reviews",
        body
      );
      setContent(saved);
      adminApiClient.revalidate("/guest-reviews").catch(() => {});
      toast.success("Guest Reviews page saved — live site updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="columns-1 lg:columns-2 gap-6">
        <div className={cardClass}>
          <h2 className={cardTitleClass}>Hero</h2>
          <Field label="Label" value={content.hero.label} onChange={(v) => updateSection("hero", { label: v })} />
          <Field
            label="Heading"
            value={content.hero.heading}
            onChange={(v) => updateSection("hero", { heading: v })}
          />
          <RichTextField
            label="Subtext"
            value={content.hero.subtext}
            onChange={(v) => updateSection("hero", { subtext: v })}
          />
          <ImageUploadField
            label="Background Image"
            value={content.hero.image}
            onChange={(v) => updateSection("hero", { image: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Quote</h2>
          <RichTextField
            label="Quote Text"
            value={content.quote.text}
            onChange={(v) => updateSection("quote", { text: v })}
          />
          <Field
            label="Attribution"
            value={content.quote.attribution}
            onChange={(v) => updateSection("quote", { attribution: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Reviews Grid</h2>
          <p className="text-xs text-[#7a6852]">
            Only the label/heading above the grid are editable here — the review cards shown come
            live from{" "}
            <Link href="/admin/guest-reviews" className="text-[#c8923a] underline">
              Guest Reviews
            </Link>{" "}
            in the sidebar.
          </p>
          <Field
            label="Label"
            value={content.listLabel.label}
            onChange={(v) => updateSection("listLabel", { label: v })}
          />
          <Field
            label="Heading"
            value={content.listLabel.heading}
            onChange={(v) => updateSection("listLabel", { heading: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>CTA</h2>
          <Field label="Label" value={content.cta.label} onChange={(v) => updateSection("cta", { label: v })} />
          <Field
            label="Heading"
            value={content.cta.heading}
            onChange={(v) => updateSection("cta", { heading: v })}
          />
          <RichTextField
            label="Body"
            value={content.cta.body}
            onChange={(v) => updateSection("cta", { body: v })}
          />
          <Field
            label="Button Label"
            value={content.cta.buttonLabel}
            onChange={(v) => updateSection("cta", { buttonLabel: v })}
          />
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 md:-mx-6 mt-6 border-t border-[#e8d8c0] bg-[#faf6ef]/95 backdrop-blur-sm px-4 md:px-6 py-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#c8923a] text-white rounded-md px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase hover:bg-[#b5822f] transition-colors disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
