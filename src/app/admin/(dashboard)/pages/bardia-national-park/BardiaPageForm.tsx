"use client";

import { useState } from "react";
import { toast } from "sonner";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { BardiaPageContent, WildlifeCard, PracticalInfoCard } from "@/lib/api/types";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextField from "@/components/admin/RichTextField";

interface BardiaPageFormProps {
  initial: BardiaPageContent;
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
  "landscape.label": "Landscape Label",
  "landscape.heading": "Landscape Heading",
  "landscape.body1": "Landscape Body 1",
  "landscape.body2": "Landscape Body 2",
  "landscape.image": "Landscape Image",
  "wildlife.label": "Wildlife Label",
  "wildlife.heading": "Wildlife Heading",
  "bestTime.heading": "Best Time to Visit Heading",
  "bestTime.body": "Best Time to Visit Body",
  "gettingThere.heading": "Getting There Heading",
  "gettingThere.body": "Getting There Body",
  "conservation.label": "Conservation Label",
  "conservation.heading": "Conservation Heading",
  "conservation.body1": "Conservation Body 1",
  "conservation.body2": "Conservation Body 2",
  "conservation.image": "Conservation Image",
  "quote.text": "Quote Text",
  "quote.ctaLabel": "Quote CTA Button Label",
};

function fieldLabel(path: string): string {
  const factMatch = path.match(/^landscape\.facts\[(\d+)\]$/);
  if (factMatch) return `Landscape Fact ${Number(factMatch[1]) + 1}`;

  const animalMatch = path.match(/^wildlife\.animals\[(\d+)\]\.(icon|name|desc)$/);
  if (animalMatch) {
    const [, index, field] = animalMatch;
    const fieldName = field === "icon" ? "Icon" : field === "name" ? "Name" : "Description";
    return `Wildlife Animal ${Number(index) + 1} ${fieldName}`;
  }

  const extrasMatch = path.match(/^(bestTime|gettingThere)\.extras\[(\d+)\]$/);
  if (extrasMatch) {
    const [, section, index] = extrasMatch;
    const sectionName = section === "bestTime" ? "Best Time to Visit" : "Getting There";
    return `${sectionName} Extra ${Number(index) + 1}`;
  }

  return FIELD_LABELS[path] ?? path;
}

/** Every plain-text field across every section must be non-empty before submit. */
function findEmptyField(content: BardiaPageContent): string | null {
  for (const key of ["label", "heading", "subtext", "image"] as const) {
    if (!content.hero[key].trim()) return `hero.${key}`;
  }
  for (const key of ["label", "heading", "body1", "body2", "image"] as const) {
    if (!content.landscape[key].trim()) return `landscape.${key}`;
  }
  for (const [i, fact] of content.landscape.facts.entries()) {
    if (!fact.trim()) return `landscape.facts[${i}]`;
  }
  if (!content.wildlife.label.trim()) return "wildlife.label";
  if (!content.wildlife.heading.trim()) return "wildlife.heading";
  for (const [i, animal] of content.wildlife.animals.entries()) {
    if (!animal.icon.trim()) return `wildlife.animals[${i}].icon`;
    if (!animal.name.trim()) return `wildlife.animals[${i}].name`;
    if (!animal.desc.trim()) return `wildlife.animals[${i}].desc`;
  }
  for (const section of ["bestTime", "gettingThere"] as const) {
    if (!content[section].heading.trim()) return `${section}.heading`;
    for (const [i, extra] of content[section].extras.entries()) {
      if (!extra.trim()) return `${section}.extras[${i}]`;
    }
  }
  if (!content.quote.ctaLabel.trim()) return "quote.ctaLabel";
  return null;
}

/** Strips React-only formatting so an empty Tiptap doc ("<p></p>") still counts as empty. */
function isBlank(html: string) {
  return html.replace(/<[^>]*>/g, "").trim().length === 0;
}

export default function BardiaPageForm({ initial }: BardiaPageFormProps) {
  const [content, setContent] = useState<BardiaPageContent>(initial);
  const [submitting, setSubmitting] = useState(false);

  function updateSection<K extends Exclude<keyof BardiaPageContent, "_id">>(
    key: K,
    patch: Partial<BardiaPageContent[K]>
  ) {
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  function updateFact(index: number, value: string) {
    setContent((prev) => {
      const facts = prev.landscape.facts.map((f, i) => (i === index ? value : f));
      return { ...prev, landscape: { ...prev.landscape, facts } };
    });
  }

  function updateAnimal(index: number, patch: Partial<WildlifeCard>) {
    setContent((prev) => {
      const animals = prev.wildlife.animals.map((a, i) => (i === index ? { ...a, ...patch } : a));
      return { ...prev, wildlife: { ...prev.wildlife, animals } };
    });
  }

  function updatePracticalInfo(
    section: "bestTime" | "gettingThere",
    patch: Partial<PracticalInfoCard>
  ) {
    setContent((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
  }

  function updateExtra(section: "bestTime" | "gettingThere", index: number, value: string) {
    setContent((prev) => {
      const extras = prev[section].extras.map((e, i) => (i === index ? value : e));
      return { ...prev, [section]: { ...prev[section], extras } };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const richTextChecks: [string, string][] = [
      ["hero.subtext", content.hero.subtext],
      ["landscape.body1", content.landscape.body1],
      ["landscape.body2", content.landscape.body2],
      ["bestTime.body", content.bestTime.body],
      ["gettingThere.body", content.gettingThere.body],
      ["conservation.body1", content.conservation.body1],
      ["conservation.body2", content.conservation.body2],
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
      const { _id, createdAt, updatedAt, ...body } = content as BardiaPageContent & {
        createdAt?: string;
        updatedAt?: string;
      };
      void _id;
      void createdAt;
      void updatedAt;
      const saved = await adminApiClient.updateSingleton<BardiaPageContent>(
        "pages/bardia-national-park",
        body
      );
      setContent(saved);
      adminApiClient.revalidate("/bardia-national-park").catch(() => {});
      toast.success("Bardia National Park page saved — live site updated.");
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
          <h2 className={cardTitleClass}>Landscape</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Label"
              value={content.landscape.label}
              onChange={(v) => updateSection("landscape", { label: v })}
            />
            <Field
              label="Heading"
              value={content.landscape.heading}
              onChange={(v) => updateSection("landscape", { heading: v })}
            />
          </div>
          <RichTextField
            label="Body 1"
            value={content.landscape.body1}
            onChange={(v) => updateSection("landscape", { body1: v })}
          />
          <RichTextField
            label="Body 2"
            value={content.landscape.body2}
            onChange={(v) => updateSection("landscape", { body2: v })}
          />
          <div className="space-y-2">
            <p className={labelClass}>Facts</p>
            {content.landscape.facts.map((fact, i) => (
              <input
                key={i}
                value={fact}
                onChange={(e) => updateFact(i, e.target.value)}
                className={inputClass}
              />
            ))}
          </div>
          <ImageUploadField
            label="Image"
            value={content.landscape.image}
            onChange={(v) => updateSection("landscape", { image: v })}
          />
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Wildlife</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Label"
              value={content.wildlife.label}
              onChange={(v) => updateSection("wildlife", { label: v })}
            />
            <Field
              label="Heading"
              value={content.wildlife.heading}
              onChange={(v) => updateSection("wildlife", { heading: v })}
            />
          </div>
          {content.wildlife.animals.map((animal, i) => (
            <div key={i} className="space-y-2 border border-[#e8d8c0] rounded-md p-3">
              <p className={labelClass}>Animal {i + 1}</p>
              <div className="grid grid-cols-[72px_1fr] gap-3">
                <Field label="Icon" value={animal.icon} onChange={(v) => updateAnimal(i, { icon: v })} />
                <Field label="Name" value={animal.name} onChange={(v) => updateAnimal(i, { name: v })} />
              </div>
              <Field label="Description" value={animal.desc} onChange={(v) => updateAnimal(i, { desc: v })} />
            </div>
          ))}
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Best Time to Visit</h2>
          <Field
            label="Heading"
            value={content.bestTime.heading}
            onChange={(v) => updatePracticalInfo("bestTime", { heading: v })}
          />
          <RichTextField
            label="Body"
            value={content.bestTime.body}
            onChange={(v) => updatePracticalInfo("bestTime", { body: v })}
          />
          <div className="space-y-2">
            <p className={labelClass}>Extras</p>
            {content.bestTime.extras.map((extra, i) => (
              <input
                key={i}
                value={extra}
                onChange={(e) => updateExtra("bestTime", i, e.target.value)}
                className={inputClass}
              />
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Getting There</h2>
          <Field
            label="Heading"
            value={content.gettingThere.heading}
            onChange={(v) => updatePracticalInfo("gettingThere", { heading: v })}
          />
          <RichTextField
            label="Body"
            value={content.gettingThere.body}
            onChange={(v) => updatePracticalInfo("gettingThere", { body: v })}
          />
          <div className="space-y-2">
            <p className={labelClass}>Extras</p>
            {content.gettingThere.extras.map((extra, i) => (
              <input
                key={i}
                value={extra}
                onChange={(e) => updateExtra("gettingThere", i, e.target.value)}
                className={inputClass}
              />
            ))}
          </div>
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>Conservation</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Label"
              value={content.conservation.label}
              onChange={(v) => updateSection("conservation", { label: v })}
            />
            <Field
              label="Heading"
              value={content.conservation.heading}
              onChange={(v) => updateSection("conservation", { heading: v })}
            />
          </div>
          <RichTextField
            label="Body 1"
            value={content.conservation.body1}
            onChange={(v) => updateSection("conservation", { body1: v })}
          />
          <RichTextField
            label="Body 2"
            value={content.conservation.body2}
            onChange={(v) => updateSection("conservation", { body2: v })}
          />
          <ImageUploadField
            label="Image"
            value={content.conservation.image}
            onChange={(v) => updateSection("conservation", { image: v })}
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
            label="CTA Button Label"
            value={content.quote.ctaLabel}
            onChange={(v) => updateSection("quote", { ctaLabel: v })}
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
