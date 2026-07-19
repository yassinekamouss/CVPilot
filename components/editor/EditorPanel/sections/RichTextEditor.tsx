"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered, Undo2, Redo2 } from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  id?: string;
}

/**
 * RichTextEditor
 *
 * A headless TipTap-powered editor that blends seamlessly with the design system.
 * Toolbar: Bold, Italic, Bullet, Ordered, Undo, Redo.
 * Outputs clean HTML stored as a string in the resume schema.
 */
export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing…",
  minHeight = "120px",
  id,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // Treat empty editor as empty string (avoid "<p></p>")
      onChange(html === "<p></p>" ? "" : html);
    },
    editorProps: {
      attributes: {
        id: id ?? "",
        class: [
          "prose prose-sm max-w-none outline-none",
          "text-[14px] leading-relaxed text-[#0B132B]",
          "[&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1",
          "[&_ul]:pl-4 [&_ol]:pl-4",
          "[&_li]:my-0.5",
          "[&_strong]:font-semibold [&_em]:italic",
        ].join(" "),
      },
    },
  });

  // Sync external value changes (e.g., AI Enhance button typewriter effect)
  React.useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    const currentHtml = editor.getHTML();
    const incoming = value || "";
    if (currentHtml !== incoming && incoming !== "<p></p>") {
      // Avoid re-setting if they're semantically the same
      if (incoming === "" && currentHtml === "<p></p>") return;
      editor.commands.setContent(incoming, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-[#2563EB]/50 focus-within:border-[#2563EB]">
      {/* ─── Toolbar ─── */}
      <div
        role="toolbar"
        aria-label="Text formatting"
        className="flex items-center gap-0.5 px-2 py-1.5 border-b border-[#E2E8F0] bg-[#FAFAFA]"
      >
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          aria-label="Bold"
          title="Bold (Ctrl+B)"
        >
          <Bold size={12} strokeWidth={2.5} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          aria-label="Italic"
          title="Italic (Ctrl+I)"
        >
          <Italic size={12} />
        </ToolbarBtn>

        <div className="w-px h-3.5 bg-[#E2E8F0] mx-1 flex-shrink-0" />

        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          aria-label="Bullet list"
          title="Bullet list"
        >
          <List size={12} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          aria-label="Numbered list"
          title="Numbered list"
        >
          <ListOrdered size={12} />
        </ToolbarBtn>

        <div className="w-px h-3.5 bg-[#E2E8F0] mx-1 flex-shrink-0" />

        <ToolbarBtn
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          aria-label="Undo"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={12} />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          aria-label="Redo"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={12} />
        </ToolbarBtn>
      </div>

      {/* ─── Editor area ─── */}
      <div
        className="relative px-3 py-2.5"
        style={{ minHeight }}
        onClick={() => editor.commands.focus()}
      >
        {/* Placeholder */}
        {!value && (
          <p
            aria-hidden="true"
            className="absolute top-2.5 left-3 text-sm text-[#CBD5E1] pointer-events-none select-none"
          >
            {placeholder}
          </p>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface ToolbarBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

function ToolbarBtn({ children, isActive, className = "", ...props }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      className={[
        "p-1.5 rounded-md transition-colors duration-100 flex items-center justify-center",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB]",
        isActive
          ? "bg-[#2563EB]/10 text-[#2563EB]"
          : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0B132B]",
        props.disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
