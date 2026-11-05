"use client";

import { useState } from "react";
import { toast } from "sonner";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { AboutPageContent, ValueCard, FacilityCard } from "@/lib/api/types";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextField from "@/components/admin/RichTextField";

interface AboutPageFormProps {
  initial: AboutPageContent;
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
  "team.label": "Our People Label",
  "team.heading": "Our People Heading",
  "team.body1": "Our People Body 1",
  "team.body2": "Our People Body 2",
  "team.image": "Our People Image",
  "philosophy.label": "Philosophy Label",
  "philosophy.heading": "Philosophy Heading",
  "quote.text": "Quote Text",
  "facilities.label": "Facilities Label",
  "facilities.heading": "Facilities Heading",
  "facilities.ctaLabel": "Facilities CTA Button Label",
};

function fieldLabel(path: string): string {
  const valueMatch = path.match(/^philosophy\.values\[(\d+)\]\.(title|body)$/);
  if (valueMatch) {
    const [, index, field] = valueMatch;
    return `Philosophy Value ${Number(index) + 1} ${field === "title" ? "Title" : "Body"}`;
  }
  const facilityMatch = path.match(/^facilities\.items\[(\d+)\]\.(heading|body)$/);
  if (facilityMatch) {
    const [, index, field] = facilityMatch;
    return `Facility ${Number(index) + 1} ${field === "heading" ? "Heading" : "Body"}`;
  }
  return FIELD_LABELS[path] ?? path;
}

/** Every plain-text field across every section must be non-empty before submit. */
function findEmptyField(content: AboutPageContent): string | null {
  for (const key of ["label", "heading", "subtext", "image"] as const) {
    if (!content.hero[key].trim()) return `hero.${key}`;
  }
  for (const key of ["label", "heading", "body1", "body2", "image"] as const) {
    if (!content.team[key].trim()) return `team.${key}`;
  }
  if (!content.philosophy.label.trim()) return "philosophy.label";
  if (!content.philosophy.heading.trim()) return "philosophy.heading";
  for (const [i, value] of content.philosophy.values.entries()) {
    if (!value.title.trim()) return `philosophy.values[${i}].title`;
    if (!value.body.trim()) return `philosophy.values[${i}].body`;
  }
  if (!content.quote.text.trim()) return "quote.text";
  if (!content.facilities.label.trim()) return "facilities.label";
  if (!content.facilities.heading.trim()) return "facilities.heading";
  for (const [i, item] of content.facilities.items.entries()) {
    if (!item.heading.trim()) return `facilities.items[${i}].heading`;
    if (!item.body.trim()) return `facilities.items[${i}].body`;
  }
  if (!content.facilities.ctaLabel.trim()) return "facilities.ctaLabel";
  return null;
}

/** Strips React-only formatting so an empty Tiptap doc ("<p></p>") still counts as empty. */
function isBlank(html: string) {
  return html.replace(/<[^>]*>/g, "").trim().length === 0;
}

export default function AboutPageForm({ initial }: AboutPageFormProps) {
  const [content, setContent] = useState<AboutPageContent>(initial);
  const [submitting, setSubmitting] = useState(false);

  function updateSection<K extends Exclude<keyof AboutPageContent, "_id">>(
    key: K,
    patch: Partial<AboutPageContent[K]>
  ) {
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  function updateValue(index: number, patch: Partial<ValueCard>) {
    setContent((prev) => {
      const values = prev.philosophy.values.map((v, i) => (i === index ? { ...v, ...patch } : v));
      return { ...prev, philosophy: { ...prev.philosophy, values } };
    });
  }

  function updateFacility(index: number, patch: Partial<FacilityCard>) {
    setContent((prev) => {
      const items = prev.facilities.items.map((item, i) => (i === index ? { ...item, ...patch } : item));
      return { ...prev, facilities: { ...prev.facilities, items } };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const richTextChecks: [string, string][] = [
      ["hero.subtext", content.hero.subtext],
      ["team.body1", content.team.body1],
      ["team.body2", content.team.body2],
      ["quote.text", content.quote.text],
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
      const { _id, createdAt, updatedAt, ...body } = content as AboutPageContent & {
        createdAt?: string;
        updatedAt?: string;
      };
      void _id;
      void createdAt;
      void updatedAt;
      const saved = await adminApiClient.updateSingleton<AboutPageContent>("pages/about", body);
      setContent(saved);
      adminApiClient.revalidate("/about-us").catch(() => {});
      toast.success("About Us page saved — live site updated.");
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
          <h2 className={cardTitleClass}>Our People</h2>
          <Field label="Label" value={content.team.label} onChange={(v) => updateSection("team", { label: v })} />
          <Field
            label="Heading"
            value={content.team.heading}
            onChange={(v) => updateSection("team", { heading: v })}
          />
          <RichTextField
            label="Body 1"
            value={content.team.body1}
            onChange={(v) => updateSection("team", { body1: v })}
          />
          <RichTextField
            label="Body 2"
            value={content.team.body2}
            onChange={(v) => updateSection("team", { body2: v })}
          />
          <ImageUploadField
            label="Image"
            value={content.team.image}
            onChange={(v) => updateSection("team", { image: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Philosophy</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Label"
              value={content.philosophy.label}
              onChange={(v) => updateSection("philosophy", { label: v })}
            />
            <Field
              label="Heading"
              value={content.philosophy.heading}
              onChange={(v) => updateSection("philosophy", { heading: v })}
            />
          </div>
          {content.philosophy.values.map((value, i) => (
            <div key={i} className="space-y-2 border border-[#e8d8c0] rounded-md p-3">
              <p className={labelClass}>Value {i + 1}</p>
              <Field label="Title" value={value.title} onChange={(v) => updateValue(i, { title: v })} />
              <Field label="Body" value={value.body} onChange={(v) => updateValue(i, { body: v })} />
            </div>
          ))}
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
          <h2 className={cardTitleClass}>Facilities</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Label"
              value={content.facilities.label}
              onChange={(v) => updateSection("facilities", { label: v })}
            />
            <Field
              label="Heading"
              value={content.facilities.heading}
              onChange={(v) => updateSection("facilities", { heading: v })}
            />
          </div>
          {content.facilities.items.map((item, i) => (
            <div key={i} className="space-y-2 border border-[#e8d8c0] rounded-md p-3">
              <p className={labelClass}>Facility {i + 1}</p>
              <Field label="Heading" value={item.heading} onChange={(v) => updateFacility(i, { heading: v })} />
              <Field label="Body" value={item.body} onChange={(v) => updateFacility(i, { body: v })} />
            </div>
          ))}
          <Field
            label="CTA Button Label"
            value={content.facilities.ctaLabel}
            onChange={(v) => updateSection("facilities", { ctaLabel: v })}
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
