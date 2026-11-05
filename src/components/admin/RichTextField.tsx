"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

/**
 * Treats a bare "google.com" as external (https://google.com) instead of a path
 * relative to the current page, while leaving internal paths ("/activities/jeep-safari",
 * "#newsletter") and already-protocoled URLs untouched.
 */
function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  return `https://${trimmed}`;
}

/** Internal links (site-relative paths, anchors) stay in-tab; only external ones open a new tab. */
function linkAttrsFor(url: string) {
  if (/^https?:/i.test(url)) return { target: "_blank", rel: "noopener noreferrer" };
  return { target: null, rel: null };
}

interface RichTextFieldProps {
  label: string;
  value: string;
  onChange: (html: string) => void;
}

function ToolbarButton({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      // Mousedown normally steals focus from the editor and collapses the text
      // selection before onClick fires, so the format would apply to nothing.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
        active
          ? "bg-[#c8923a] border-[#c8923a] text-white"
          : "border-[#e8d8c0] text-[#4a3a28] hover:border-[#c8923a]"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextField({ label, value, onChange }: RichTextFieldProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        link: { openOnClick: false },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[100px] px-3 py-2 text-sm text-[#4a3a28] focus:outline-none [&_a]:text-[#c8923a] [&_a]:underline",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#7a6852]">
        {label}
      </label>
      <div className="border border-[#e8d8c0] rounded-md focus-within:border-[#c8923a] focus-within:ring-1 focus-within:ring-[#c8923a]/30 transition-colors">
        <div className="flex gap-1.5 border-b border-[#e8d8c0] px-2 py-1.5">
          <ToolbarButton
            label="Bold"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            label="Italic"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            label="Underline"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <span className="underline">U</span>
          </ToolbarButton>
          <ToolbarButton
            label="Link"
            active={editor.isActive("link")}
            onClick={() => {
              const url = window.prompt(
                "Link URL — external (https://example.com) or internal (/activities/jeep-safari)"
              );
              if (url) {
                const href = normalizeUrl(url);
                editor.chain().focus().setLink({ href, ...linkAttrsFor(href) }).run();
              } else {
                editor.chain().focus().unsetLink().run();
              }
            }}
          >
            Link
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
