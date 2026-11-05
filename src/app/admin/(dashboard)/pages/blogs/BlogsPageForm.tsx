"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { BlogsPageContent } from "@/lib/api/types";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextField from "@/components/admin/RichTextField";

interface BlogsPageFormProps {
  initial: BlogsPageContent;
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
  "comingSoon.label": "Coming Soon Label",
  "comingSoon.heading": "Coming Soon Heading",
  "comingSoon.body": "Coming Soon Body",
  "comingSoon.buttonLabel": "Coming Soon Button Label",
  "detailCta.label": "Detail Page CTA Label",
  "detailCta.heading": "Detail Page CTA Heading",
  "detailCta.button1Label": "Detail Page CTA Button 1 Label",
  "detailCta.button2Label": "Detail Page CTA Button 2 Label",
};

function fieldLabel(path: string): string {
  return FIELD_LABELS[path] ?? path;
}

/** Every plain-text field across every section must be non-empty before submit. */
function findEmptyField(content: BlogsPageContent): string | null {
  for (const key of ["label", "heading", "subtext", "image"] as const) {
    if (!content.hero[key].trim()) return `hero.${key}`;
  }
  for (const key of ["label", "heading", "buttonLabel"] as const) {
    if (!content.comingSoon[key].trim()) return `comingSoon.${key}`;
  }
  for (const key of ["label", "heading", "button1Label", "button2Label"] as const) {
    if (!content.detailCta[key].trim()) return `detailCta.${key}`;
  }
  return null;
}

/** Strips React-only formatting so an empty Tiptap doc ("<p></p>") still counts as empty. */
function isBlank(html: string) {
  return html.replace(/<[^>]*>/g, "").trim().length === 0;
}

export default function BlogsPageForm({ initial }: BlogsPageFormProps) {
  const [content, setContent] = useState<BlogsPageContent>(initial);
  const [submitting, setSubmitting] = useState(false);

  function updateSection<K extends Exclude<keyof BlogsPageContent, "_id">>(
    key: K,
    patch: Partial<BlogsPageContent[K]>
  ) {
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const richTextChecks: [string, string][] = [
      ["hero.subtext", content.hero.subtext],
      ["quote.text", content.quote.text],
      ["comingSoon.body", content.comingSoon.body],
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
      const { _id, createdAt, updatedAt, ...body } = content as BlogsPageContent & {
        createdAt?: string;
        updatedAt?: string;
      };
      void _id;
      void createdAt;
      void updatedAt;
      const saved = await adminApiClient.updateSingleton<BlogsPageContent>("pages/blogs", body);
      setContent(saved);
      adminApiClient.revalidate("/blogs").catch(() => {});
      toast.success("Blogs page saved — live site updated.");
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
          <h2 className={cardTitleClass}>Blog Grid</h2>
          <p className="text-xs text-[#7a6852]">
            This section just shows the live list of Blogs (with category filter pills) below the
            hero. To add, edit, remove, or reorder posts, go to{" "}
            <Link href="/admin/blogs" className="text-[#c8923a] underline">
              Blogs
            </Link>{" "}
            in the sidebar. Nothing to edit here.
          </p>
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Coming Soon Box</h2>
          <p className="text-xs text-[#7a6852]">Shown below the blog grid.</p>
          <Field
            label="Label"
            value={content.comingSoon.label}
            onChange={(v) => updateSection("comingSoon", { label: v })}
          />
          <Field
            label="Heading"
            value={content.comingSoon.heading}
            onChange={(v) => updateSection("comingSoon", { heading: v })}
          />
          <RichTextField
            label="Body"
            value={content.comingSoon.body}
            onChange={(v) => updateSection("comingSoon", { body: v })}
          />
          <Field
            label="Button Label"
            value={content.comingSoon.buttonLabel}
            onChange={(v) => updateSection("comingSoon", { buttonLabel: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Quote</h2>
          <RichTextField
            label="Quote Text"
            value={content.quote.text}
            onChange={(v) => updateSection("quote", { text: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Detail Page CTA</h2>
          <p className="text-xs text-[#7a6852]">Shown at the bottom of every blog post.</p>
          <Field
            label="Label"
            value={content.detailCta.label}
            onChange={(v) => updateSection("detailCta", { label: v })}
          />
          <Field
            label="Heading"
            value={content.detailCta.heading}
            onChange={(v) => updateSection("detailCta", { heading: v })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Button 1 Label"
              value={content.detailCta.button1Label}
              onChange={(v) => updateSection("detailCta", { button1Label: v })}
            />
            <Field
              label="Button 2 Label"
              value={content.detailCta.button2Label}
              onChange={(v) => updateSection("detailCta", { button2Label: v })}
            />
          </div>
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
