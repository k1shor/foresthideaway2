"use client";

import { useState } from "react";
import { toast } from "sonner";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { ContactPageContent, GettingHereItem } from "@/lib/api/types";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextField from "@/components/admin/RichTextField";

interface ContactPageFormProps {
  initial: ContactPageContent;
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
  "formSection.label": "Form Section Label",
  "formSection.heading": "Form Section Heading",
  "details.label": "Contact Details Label",
  "details.heading": "Contact Details Heading",
  "details.addressName": "Address — Name",
  "details.addressLocation": "Address — Location",
  "details.phone": "Phone",
  "details.email": "Email",
  "details.receptionHours": "Reception Hours",
  "gettingHere.label": "Getting Here Label",
  "sidebar.image": "Sidebar Image",
  "sidebar.quoteText": "Sidebar Quote Text",
};

function fieldLabel(path: string): string {
  const itemMatch = path.match(/^gettingHere\.items\[(\d+)\]\.(icon|text)$/);
  if (itemMatch) {
    const [, index, field] = itemMatch;
    return `Getting Here Item ${Number(index) + 1} ${field === "icon" ? "Icon" : "Text"}`;
  }
  return FIELD_LABELS[path] ?? path;
}

/** Every plain-text field across every section must be non-empty before submit. */
function findEmptyField(content: ContactPageContent): string | null {
  for (const key of ["label", "heading", "subtext", "image"] as const) {
    if (!content.hero[key].trim()) return `hero.${key}`;
  }
  for (const key of ["label", "heading"] as const) {
    if (!content.formSection[key].trim()) return `formSection.${key}`;
  }
  for (const key of [
    "label",
    "heading",
    "addressName",
    "addressLocation",
    "phone",
    "email",
    "receptionHours",
  ] as const) {
    if (!content.details[key].trim()) return `details.${key}`;
  }
  if (!content.gettingHere.label.trim()) return "gettingHere.label";
  for (const [i, item] of content.gettingHere.items.entries()) {
    if (!item.icon.trim()) return `gettingHere.items[${i}].icon`;
    if (!item.text.trim()) return `gettingHere.items[${i}].text`;
  }
  if (!content.sidebar.image.trim()) return "sidebar.image";
  return null;
}

/** Strips React-only formatting so an empty Tiptap doc ("<p></p>") still counts as empty. */
function isBlank(html: string) {
  return html.replace(/<[^>]*>/g, "").trim().length === 0;
}

export default function ContactPageForm({ initial }: ContactPageFormProps) {
  const [content, setContent] = useState<ContactPageContent>(initial);
  const [submitting, setSubmitting] = useState(false);

  function updateSection<K extends Exclude<keyof ContactPageContent, "_id">>(
    key: K,
    patch: Partial<ContactPageContent[K]>
  ) {
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  function updateItem(index: number, patch: Partial<GettingHereItem>) {
    setContent((prev) => {
      const items = prev.gettingHere.items.map((item, i) => (i === index ? { ...item, ...patch } : item));
      return { ...prev, gettingHere: { ...prev.gettingHere, items } };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const richTextChecks: [string, string][] = [
      ["hero.subtext", content.hero.subtext],
      ["sidebar.quoteText", content.sidebar.quoteText],
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
      const { _id, createdAt, updatedAt, ...body } = content as ContactPageContent & {
        createdAt?: string;
        updatedAt?: string;
      };
      void _id;
      void createdAt;
      void updatedAt;
      const saved = await adminApiClient.updateSingleton<ContactPageContent>("pages/contact", body);
      setContent(saved);
      adminApiClient.revalidate("/contact").catch(() => {});
      toast.success("Contact page saved — live site updated.");
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
          <h2 className={cardTitleClass}>Form Section</h2>
          <p className="text-xs text-[#7a6852]">
            Only the label/heading above the form are editable here — the contact form itself is
            unchanged.
          </p>
          <Field
            label="Label"
            value={content.formSection.label}
            onChange={(v) => updateSection("formSection", { label: v })}
          />
          <Field
            label="Heading"
            value={content.formSection.heading}
            onChange={(v) => updateSection("formSection", { heading: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Contact Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Label"
              value={content.details.label}
              onChange={(v) => updateSection("details", { label: v })}
            />
            <Field
              label="Heading"
              value={content.details.heading}
              onChange={(v) => updateSection("details", { heading: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Address — Name"
              value={content.details.addressName}
              onChange={(v) => updateSection("details", { addressName: v })}
            />
            <Field
              label="Address — Location"
              value={content.details.addressLocation}
              onChange={(v) => updateSection("details", { addressLocation: v })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Phone"
              value={content.details.phone}
              onChange={(v) => updateSection("details", { phone: v })}
            />
            <Field
              label="Email"
              value={content.details.email}
              onChange={(v) => updateSection("details", { email: v })}
            />
          </div>
          <Field
            label="Reception Hours"
            value={content.details.receptionHours}
            onChange={(v) => updateSection("details", { receptionHours: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Getting Here</h2>
          <Field
            label="Label"
            value={content.gettingHere.label}
            onChange={(v) => updateSection("gettingHere", { label: v })}
          />
          {content.gettingHere.items.map((item, i) => (
            <div key={i} className="grid grid-cols-[72px_1fr] gap-3 border border-[#e8d8c0] rounded-md p-3">
              <Field label="Icon" value={item.icon} onChange={(v) => updateItem(i, { icon: v })} />
              <Field label="Text" value={item.text} onChange={(v) => updateItem(i, { text: v })} />
            </div>
          ))}
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Sidebar Image &amp; Quote</h2>
          <ImageUploadField
            label="Image"
            value={content.sidebar.image}
            onChange={(v) => updateSection("sidebar", { image: v })}
          />
          <RichTextField
            label="Quote Text"
            value={content.sidebar.quoteText}
            onChange={(v) => updateSection("sidebar", { quoteText: v })}
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
