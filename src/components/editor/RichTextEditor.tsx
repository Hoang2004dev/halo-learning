// src/components/editor/RichTextEditor.tsx
import { EditorContent } from "@tiptap/react";
import EditorToolbar from "./EditorToolbar";
import useEditorInstance from "./useEditorInstance";
import "../../styles/tiptap.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function RichTextEditor({ value, onChange, disabled }: Props) {
  const editor = useEditorInstance({ value, onChange, editable: !disabled });

  return (
    <div
      className={`rounded-lg border border-gray-300 dark:border-gray-600 ${
        disabled ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} className="editor-content px-3 py-2" />
    </div>
  );
}
