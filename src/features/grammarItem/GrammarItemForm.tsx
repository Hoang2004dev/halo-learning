// src/features/grammarItem/GrammarItemForm.tsx
import GrammarItemFormModal from "../../components/grammarItem/GrammarItemFormModal";
import { GrammarItemDto } from "../../models/grammarItem";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; // parent chỉ refetch grammar list
  studyDayId: number;
  editData?: GrammarItemDto | null;
}
export default function GrammarItemForm(props: Props) {
  return <GrammarItemFormModal {...props} />;
}
