// src/components/editor/useEditorInstance.ts
import { useEffect } from "react";
import { useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

type Args = {
  value: string;
  onChange: (value: string) => void;
  editable?: boolean; // hỗ trợ disable/readonly
};

export default function useEditorInstance({
  value,
  onChange,
  editable = true,
}: Args) {
  const editor = useEditor({
    content: value || "",
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    editable,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "outline-none prose dark:prose-invert text-sm min-h-[120px]",
      },
    },
  }) as Editor | null;

  // Đồng bộ content khi value bên ngoài thay đổi
  useEffect(() => {
    if (!editor) return;
    const cur = editor.getHTML();
    if (value != null && value !== cur) {
      editor.commands.setContent(value, { emitUpdate: false }); // FIX
    }
  }, [value, editor]);

  // Đồng bộ editable khi prop thay đổi
  useEffect(() => {
    if (!editor) return;
    editor.setEditable(editable);
  }, [editable, editor]);

  return editor;
}
