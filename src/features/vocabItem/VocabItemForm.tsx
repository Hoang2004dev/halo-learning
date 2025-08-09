// src/features/vocabItem/VocabItemForm.tsx
// (Nếu bạn đang dùng file này thay cho Modal ở components, có thể xoá file này.
//  Hoặc giữ lại file này làm wrapper gọi Modal ở trên cho đồng nhất.)
import VocabItemFormModal from "../../components/vocabItem/VocabItemFormModal";
import { VocabItemDto } from "../../models/vocabItem";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  studyDayId: number;
  editData?: VocabItemDto | null;
}

export default function VocabItemForm(props: Props) {
  return <VocabItemFormModal {...props} />;
}
