"use client";

import { useState } from "react";
import { toast } from "sonner";
import { adminApiClient } from "@/lib/admin/adminApiClient";
import type { HomePageContent, InstagramPhoto } from "@/lib/api/types";
import ImageUploadField from "@/components/admin/ImageUploadField";
import RichTextField from "@/components/admin/RichTextField";

interface HomePageFormProps {
  initial: HomePageContent;
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
      {/* No `required` here on purpose — the browser's native validation popup
          ("Please fill out this field") looks and reads nothing like the rest of
          this form's toasts. All emptiness checks instead go through the single
          findEmptyField() path below, so every field reports the same way. */}
      <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
    </div>
  );
}

/** Human labels for every validated dot-path, matching the <Field label> text shown on screen. */
const FIELD_LABELS: Record<string, string> = {
  "hero.tag": "Hero Tag",
  "hero.headingLine1": "Hero Heading — Line 1",
  "hero.headingLine2": "Hero Heading — Line 2",
  "hero.subtext": "Hero Subtext",
  "hero.ctaLabel": "Hero CTA Button Label",
  "hero.locationTag": "Hero Location Tag",
  "hero.image": "Hero Background Image",
  "resort.label": "The Resort Label",
  "resort.heading": "The Resort Heading",
  "resort.body": "The Resort Body",
  "resort.linkLabel": "The Resort Link Label",
  "resort.image": "The Resort Image",
  "quote.label": "Quote Label",
  "quote.text": "Quote Text",
  "mapInfo.label": "Map & Key Info Label",
  "mapInfo.heading": "Map & Key Info Heading",
  "mapInfo.body": "Map & Key Info Body",
  "mapInfo.gatewayText": "Map & Key Info Gateway Info",
  "mapInfo.seasonText": "Map & Key Info Ideal Season",
  "mapInfo.bestForText": "Map & Key Info Best For",
  "mapInfo.airportText": "Map & Key Info Nearest Airport",
  "packagesSection.label": "Packages Section Label",
  "packagesSection.heading": "Packages Section Heading",
  "video.label": "Video Label",
  "video.heading": "Video Heading",
  "video.body": "Video Body",
  "video.image": "Video Background Image",
  "video.ctaLabel": "Video CTA Button Label",
  "video.ctaHref": "Video CTA Link URL",
  "experiencesSection.label": "Signature Experiences Label",
  "experiencesSection.heading": "Signature Experiences Heading",
  "newsletter.label": "Newsletter Label",
  "newsletter.heading": "Newsletter Heading",
  "newsletter.body": "Newsletter Body",
  "instagram.label": "Instagram Label",
  "instagram.heading": "Instagram Heading",
  "instagram.url": "Instagram Profile URL",
};

function fieldLabel(path: string): string {
  const photoMatch = path.match(/^instagram\.photos\[(\d+)\]\.(image|alt)$/);
  if (photoMatch) {
    const [, index, field] = photoMatch;
    return `Instagram Photo ${Number(index) + 1} ${field === "image" ? "Image" : "Alt Text"}`;
  }
  return FIELD_LABELS[path] ?? path;
}

/** Every plain-text field across every section must be non-empty before submit. */
function findEmptyField(content: HomePageContent): string | null {
  for (const [sectionKey, section] of Object.entries(content)) {
    if (sectionKey === "_id" || sectionKey === "createdAt" || sectionKey === "updatedAt") continue;
    if (sectionKey === "instagram") {
      const instagram = section as HomePageContent["instagram"];
      if (!instagram.label.trim()) return "instagram.label";
      if (!instagram.heading.trim()) return "instagram.heading";
      if (!instagram.url.trim()) return "instagram.url";
      for (const [i, photo] of instagram.photos.entries()) {
        if (!photo.image.trim()) return `instagram.photos[${i}].image`;
        if (!photo.alt.trim()) return `instagram.photos[${i}].alt`;
      }
      continue;
    }
    if (typeof section !== "object" || section === null) continue;
    for (const [fieldKey, value] of Object.entries(section as Record<string, unknown>)) {
      if (typeof value === "string" && !value.trim()) return `${sectionKey}.${fieldKey}`;
    }
  }
  return null;
}

/** Strips React-only formatting so an empty Tiptap doc ("<p></p>") still counts as empty. */
function isBlank(html: string) {
  return html.replace(/<[^>]*>/g, "").trim().length === 0;
}

export default function HomePageForm({ initial }: HomePageFormProps) {
  const [content, setContent] = useState<HomePageContent>(initial);
  const [submitting, setSubmitting] = useState(false);

  function updateSection<K extends Exclude<keyof HomePageContent, "_id">>(
    key: K,
    patch: Partial<HomePageContent[K]>
  ) {
    setContent((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }));
  }

  function updatePhoto(index: number, patch: Partial<InstagramPhoto>) {
    setContent((prev) => {
      const photos = prev.instagram.photos.map((photo, i) =>
        i === index ? { ...photo, ...patch } : photo
      );
      return { ...prev, instagram: { ...prev.instagram, photos } };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const richTextChecks: [string, string][] = [
      ["hero.subtext", content.hero.subtext],
      ["resort.body", content.resort.body],
      ["quote.text", content.quote.text],
      ["mapInfo.body", content.mapInfo.body],
      ["video.body", content.video.body],
      ["newsletter.body", content.newsletter.body],
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
      const { _id, createdAt, updatedAt, ...body } = content as HomePageContent & {
        createdAt?: string;
        updatedAt?: string;
      };
      void _id;
      void createdAt;
      void updatedAt;
      const saved = await adminApiClient.updateSingleton<HomePageContent>("pages/home", body);
      setContent(saved);
      // Best-effort: don't fail the save if on-demand revalidation can't reach the route.
      adminApiClient.revalidate("/").catch(() => {});
      toast.success("Home page saved — live site updated.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* CSS multi-column instead of grid: a grid row's height is pinned to its
          tallest card, so a short card (e.g. Quote) next to a tall one leaves a
          dead gap and pushes the next row down. Columns let each card flow
          immediately under the shortest column, closing that gap. */}
      <div className="columns-1 lg:columns-2 gap-6">
      <div className={cardClass}>
        <h2 className={cardTitleClass}>Hero</h2>
        <Field label="Tag" value={content.hero.tag} onChange={(v) => updateSection("hero", { tag: v })} />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Heading — Line 1"
            value={content.hero.headingLine1}
            onChange={(v) => updateSection("hero", { headingLine1: v })}
          />
          <Field
            label="Heading — Line 2"
            value={content.hero.headingLine2}
            onChange={(v) => updateSection("hero", { headingLine2: v })}
          />
        </div>
        <RichTextField
          label="Subtext"
          value={content.hero.subtext}
          onChange={(v) => updateSection("hero", { subtext: v })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="CTA Button Label"
            value={content.hero.ctaLabel}
            onChange={(v) => updateSection("hero", { ctaLabel: v })}
          />
          <Field
            label="Location Tag"
            value={content.hero.locationTag}
            onChange={(v) => updateSection("hero", { locationTag: v })}
          />
        </div>
        <ImageUploadField
          label="Background Image"
          value={content.hero.image}
          onChange={(v) => updateSection("hero", { image: v })}
        />
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>The Resort</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Label"
            value={content.resort.label}
            onChange={(v) => updateSection("resort", { label: v })}
          />
          <Field
            label="Link Label"
            value={content.resort.linkLabel}
            onChange={(v) => updateSection("resort", { linkLabel: v })}
          />
        </div>
        <Field
          label="Heading"
          value={content.resort.heading}
          onChange={(v) => updateSection("resort", { heading: v })}
        />
        <RichTextField
          label="Body"
          value={content.resort.body}
          onChange={(v) => updateSection("resort", { body: v })}
        />
        <ImageUploadField
          label="Image"
          value={content.resort.image}
          onChange={(v) => updateSection("resort", { image: v })}
        />
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>Quote</h2>
        <Field label="Label" value={content.quote.label} onChange={(v) => updateSection("quote", { label: v })} />
        <RichTextField
          label="Quote Text"
          value={content.quote.text}
          onChange={(v) => updateSection("quote", { text: v })}
        />
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>Map &amp; Key Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Label"
            value={content.mapInfo.label}
            onChange={(v) => updateSection("mapInfo", { label: v })}
          />
          <Field
            label="Heading"
            value={content.mapInfo.heading}
            onChange={(v) => updateSection("mapInfo", { heading: v })}
          />
        </div>
        <RichTextField
          label="Body"
          value={content.mapInfo.body}
          onChange={(v) => updateSection("mapInfo", { body: v })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Gateway Info"
            value={content.mapInfo.gatewayText}
            onChange={(v) => updateSection("mapInfo", { gatewayText: v })}
          />
          <Field
            label="Ideal Season"
            value={content.mapInfo.seasonText}
            onChange={(v) => updateSection("mapInfo", { seasonText: v })}
          />
          <Field
            label="Best For"
            value={content.mapInfo.bestForText}
            onChange={(v) => updateSection("mapInfo", { bestForText: v })}
          />
          <Field
            label="Nearest Airport"
            value={content.mapInfo.airportText}
            onChange={(v) => updateSection("mapInfo", { airportText: v })}
          />
        </div>
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>Packages Section</h2>
        <p className="text-xs text-[#7a6852]">
          Only the heading here is editable — the 3 package cards shown are pulled live from{" "}
          <span className="font-medium">Packages</span>, sorted by order.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Label"
            value={content.packagesSection.label}
            onChange={(v) => updateSection("packagesSection", { label: v })}
          />
          <Field
            label="Heading"
            value={content.packagesSection.heading}
            onChange={(v) => updateSection("packagesSection", { heading: v })}
          />
        </div>
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>Video / Visual Story</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Label"
            value={content.video.label}
            onChange={(v) => updateSection("video", { label: v })}
          />
          <Field
            label="Heading"
            value={content.video.heading}
            onChange={(v) => updateSection("video", { heading: v })}
          />
        </div>
        <RichTextField
          label="Body"
          value={content.video.body}
          onChange={(v) => updateSection("video", { body: v })}
        />
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="CTA Button Label"
            value={content.video.ctaLabel}
            onChange={(v) => updateSection("video", { ctaLabel: v })}
          />
          <Field
            label="CTA Link URL"
            value={content.video.ctaHref}
            onChange={(v) => updateSection("video", { ctaHref: v })}
          />
        </div>
        <ImageUploadField
          label="Background Image"
          value={content.video.image}
          onChange={(v) => updateSection("video", { image: v })}
        />
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>Signature Experiences Section</h2>
        <p className="text-xs text-[#7a6852]">
          Only the heading here is editable — the 3 activity cards shown are pulled live from{" "}
          <span className="font-medium">Activities</span>, sorted by order.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Label"
            value={content.experiencesSection.label}
            onChange={(v) => updateSection("experiencesSection", { label: v })}
          />
          <Field
            label="Heading"
            value={content.experiencesSection.heading}
            onChange={(v) => updateSection("experiencesSection", { heading: v })}
          />
        </div>
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>Newsletter</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Label"
            value={content.newsletter.label}
            onChange={(v) => updateSection("newsletter", { label: v })}
          />
          <Field
            label="Heading"
            value={content.newsletter.heading}
            onChange={(v) => updateSection("newsletter", { heading: v })}
          />
        </div>
        <RichTextField
          label="Body"
          value={content.newsletter.body}
          onChange={(v) => updateSection("newsletter", { body: v })}
        />
      </div>

      <div className={cardClass}>
        <h2 className={cardTitleClass}>Instagram Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field
            label="Label"
            value={content.instagram.label}
            onChange={(v) => updateSection("instagram", { label: v })}
          />
          <Field
            label="Heading"
            value={content.instagram.heading}
            onChange={(v) => updateSection("instagram", { heading: v })}
          />
        </div>
        <Field
          label="Instagram Profile URL"
          value={content.instagram.url}
          onChange={(v) => updateSection("instagram", { url: v })}
        />
        <div className="grid grid-cols-2 gap-4">
          {content.instagram.photos.map((photo, i) => (
            <div key={i} className="space-y-2 border border-[#e8d8c0] rounded-md p-3">
              <p className={labelClass}>Photo {i + 1}</p>
              <ImageUploadField
                label="Image"
                value={photo.image}
                onChange={(v) => updatePhoto(i, { image: v })}
              />
              <Field label="Alt Text" value={photo.alt} onChange={(v) => updatePhoto(i, { alt: v })} />
            </div>
          ))}
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
