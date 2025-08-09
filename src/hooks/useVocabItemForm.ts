// hooks/useVocabItemForm.ts
import { useEffect, useState } from "react";
import {
  CreateVocabItemDto,
  UpdateVocabItemDto,
  VocabItemDto,
} from "../models/vocabItem";
import { vocabItemApi } from "../api/vocabItemApi";

type FormType = CreateVocabItemDto | UpdateVocabItemDto;

interface UseVocabItemFormProps {
  open: boolean;
  studyDayId: number;
  editData?: VocabItemDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

// ----- Mapping functions (Đưa lên trước để tránh lỗi hoisting) -----
const mapToCreateForm = (studyDayId: number): CreateVocabItemDto => ({
  word: "",
  nativeMeaning: "",
  foreignMeaning: "",
  example: "",
  audioUrl: "",
  description: "",
  status: "NotLearned",
  studyDayId,
});

const mapToUpdateForm = (
  editData: VocabItemDto,
  studyDayId: number
): UpdateVocabItemDto => ({
  id: editData.id,
  word: editData.word,
  nativeMeaning: editData.nativeMeaning,
  foreignMeaning: editData.foreignMeaning,
  example: editData.example ?? "",
  audioUrl: editData.audioUrl ?? "",
  description: editData.description ?? "",
  status: editData.status,
  studyDayId,
});

export const useVocabItemForm = ({
  open,
  studyDayId,
  editData,
  onClose,
  onSuccess,
}: UseVocabItemFormProps) => {
  const [form, setForm] = useState<FormType>(
    mapToCreateForm(studyDayId)
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      const initial = editData
        ? mapToUpdateForm(editData, studyDayId)
        : mapToCreateForm(studyDayId);
      setForm(initial);
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, editData, studyDayId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleDescriptionChange = (value: string) => {
    setForm((prev) => ({ ...prev, description: value }));
    setErrors((prev) => ({ ...prev, description: "" }));
  };

  const handleSubmit = async () => {
    try {
      if ("id" in form && editData) {
        await vocabItemApi.update(form as UpdateVocabItemDto);
      } else {
        await vocabItemApi.create(form as CreateVocabItemDto);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        const fieldErrors: Record<string, string> = {};
        error.response.data.errors.forEach((e: any) => {
          fieldErrors[e.field] = e.error;
        });
        setErrors(fieldErrors);
      } else {
        console.error("❌ Submit error:", error);
        alert(error?.response?.data?.message || "Unexpected error.");
      }
    }
  };

  return {
    form,
    errors,
    handleChange,
    handleDescriptionChange,
    handleSubmit,
  };
};
