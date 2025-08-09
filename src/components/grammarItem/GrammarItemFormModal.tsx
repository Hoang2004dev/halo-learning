// src/components/grammarItem/GrammarItemFormModal.tsx
import { useEffect, useRef, useState } from "react";
import {
  GrammarItemDto,
  CreateGrammarItemDto,
  UpdateGrammarItemDto,
} from "../../models/grammarItem";
import { grammarItemApi } from "../../api/grammarItemApi";
import GrammarItemFormFields from "./GrammarItemFormFields";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;     // parent chỉ refetch grammar list
  studyDayId: number;
  editData?: GrammarItemDto | null;
}

export default function GrammarItemFormModal({
  open,
  onClose,
  onSuccess,
  studyDayId,
  editData,
}: Props) {
  const [form, setForm] = useState<CreateGrammarItemDto | UpdateGrammarItemDto>({
    topic: "",
    explanation: "",
    exercise: "",
    answer: "",
    description: "",
    studyDayId,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // init / reset
  useEffect(() => {
    if (!open) return;
    setForm(
      editData
        ? { ...editData, studyDayId }
        : { topic: "", explanation: "", exercise: "", answer: "", description: "", studyDayId }
    );
    setErrors({});
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, editData, studyDayId]);

  // close on backdrop
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !submitting) onClose();
  };

  // keyboard: Esc, Ctrl/Cmd+Enter
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "enter" && !submitting) {
        void handleSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, submitting]); // eslint-disable-line

  // validate
  const validate = () => {
    const next: Record<string, string> = {};
    const topic = (form.topic || "").trim();
    const explanation = (form.explanation || "").trim();
    if (!topic) next.topic = "Required.";
    if (!explanation) next.explanation = "Required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const handleDescriptionChange = (value: string) => {
    setForm((p) => ({ ...p, description: value }));
    if (errors.description) setErrors((er) => ({ ...er, description: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        topic: form.topic?.trim(),
        explanation: form.explanation?.trim(),
        exercise: form.exercise?.trim(),
        answer: form.answer?.trim(),
      };

      if ("id" in form && editData) {
        await grammarItemApi.update(payload as UpdateGrammarItemDto);
      } else {
        await grammarItemApi.create(payload as CreateGrammarItemDto);
      }
      onSuccess(); // chỉ reload grammar list
      onClose();
    } catch (error: any) {
      const be = error?.response?.data;
      if (be?.errors && Array.isArray(be.errors)) {
        const fieldErrors: Record<string, string> = {};
        for (const e of be.errors) {
          if (e?.field) fieldErrors[e.field] = e?.error || "Invalid.";
        }
        setErrors(fieldErrors);
      } else {
        console.error("Submit error:", error);
        alert(be?.message || "Unexpected error.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center px-4"
      onMouseDown={onBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="grammar-form-title"
    >
      <div
        ref={dialogRef}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative
                   max-h-[90vh] overflow-y-auto scrollbar-none scroll-smooth"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <h2 id="grammar-form-title" className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {editData ? "✏️ Edit Grammar" : "➕ Add Grammar"}
          </h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        <GrammarItemFormFields
          form={form}
          errors={errors}
          onChange={handleChange}
          onDescriptionChange={handleDescriptionChange}
          disabled={submitting}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200
                       ring-1 ring-slate-300 dark:ring-gray-600 hover:bg-slate-50 dark:hover:bg-gray-800 transition disabled:opacity-60"
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700
                       focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm transition disabled:opacity-70 min-w-[96px]"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Saving…" : editData ? "Save" : "Add"}
          </button>
        </div>

        <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
          Tip: Press <kbd className="px-1 rounded border">Ctrl</kbd>+<kbd className="px-1 rounded border">Enter</kbd> to submit.
        </p>
      </div>
    </div>
  );
}
