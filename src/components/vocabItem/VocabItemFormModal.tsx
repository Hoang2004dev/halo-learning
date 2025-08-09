// src/components/vocabItem/VocabItemFormModal.tsx
import { useEffect, useRef, useState } from "react";
import VocabItemFormFields from "./VocabItemFormFields";
import {
  CreateVocabItemDto,
  UpdateVocabItemDto,
  VocabItemDto,
} from "../../models/vocabItem";
import { vocabItemApi } from "../../api/vocabItemApi";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;        // parent sẽ chỉ refetch list vocab (đã tối ưu)
  studyDayId: number;
  editData?: VocabItemDto | null;
}

export default function VocabItemFormModal({
  open,
  onClose,
  onSuccess,
  studyDayId,
  editData,
}: Props) {
  const [form, setForm] = useState<CreateVocabItemDto | UpdateVocabItemDto>({
    word: "",
    nativeMeaning: "",
    foreignMeaning: "",
    example: "",
    audioUrl: "",
    description: "",
    status: "NotLearned",
    studyDayId,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  // Init / reset
  useEffect(() => {
    if (!open) return;
    if (editData) {
      setForm({ ...editData, studyDayId });
    } else {
      setForm({
        word: "",
        nativeMeaning: "",
        foreignMeaning: "",
        example: "",
        audioUrl: "",
        description: "",
        status: "NotLearned",
        studyDayId,
      });
    }
    setErrors({});
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, editData, studyDayId]);

  // Close on backdrop click
  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !submitting) onClose();
  };

  // Keyboard: Esc close, Ctrl/Cmd+Enter submit
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

  // Basic client validation
  const validate = () => {
    const next: Record<string, string> = {};
    const word = (form.word || "").trim();
    const nativeMeaning = (form.nativeMeaning || "").trim();
    const audioUrl = (form.audioUrl || "").trim();

    if (!word) next.word = "Required.";
    if (!nativeMeaning) next.nativeMeaning = "Required.";
    if (audioUrl && !/^https?:\/\/.+/i.test(audioUrl)) next.audioUrl = "Must be a valid URL.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleDescriptionChange = (value: string) => {
    setForm((prev) => ({ ...prev, description: value }));
    if (errors.description) setErrors((p) => ({ ...p, description: "" }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        word: form.word?.trim(),
        nativeMeaning: form.nativeMeaning?.trim(),
        foreignMeaning: form.foreignMeaning?.trim(),
        example: form.example?.trim(),
        audioUrl: form.audioUrl?.trim(),
      };

      if ("id" in form && editData) {
        await vocabItemApi.update(payload as UpdateVocabItemDto);
      } else {
        await vocabItemApi.create(payload as CreateVocabItemDto);
      }
      onSuccess();   // parent chỉ reload danh sách vocab
      onClose();
    } catch (error: any) {
      // Map BE validation: [{ field, error }]
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
      aria-modal="true"
      role="dialog"
      aria-labelledby="vocab-form-title"
    >
      <div
        ref={dialogRef}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-2xl p-6 relative 
                   max-h-[90vh] overflow-y-auto scrollbar-none scroll-smooth"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-5">
          <h2 id="vocab-form-title" className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {editData ? "✏️ Edit Vocabulary" : "➕ Add Vocabulary"}
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

        <VocabItemFormFields
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
