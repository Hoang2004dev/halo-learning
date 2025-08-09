import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

import { StudyDayDto, StudyDayStatus } from "../../models/studyDay";
import { VocabItemDto, VocabStatus } from "../../models/vocabItem";
import { GrammarItemDto } from "../../models/grammarItem";

import { studyDayApi } from "../../api/studyDayApi";
import { vocabItemApi } from "../../api/vocabItemApi";
import { grammarItemApi } from "../../api/grammarItemApi";

import StudyDayStatusSection from "../../components/studyDay/StudyDayStatusSection";
import NoteEditor from "../../components/studyDay/NoteEditor";
import VocabSection from "../../components/vocabItem/VocabSection";
import GrammarSection from "../../components/grammarItem/GrammarSection";
import VocabItemFormModal from "../../components/vocabItem/VocabItemFormModal";
import GrammarItemFormModal from "../../components/grammarItem/GrammarItemFormModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import StudyDayHeader from "../../components/studyDay/StudyDayHeader";

dayjs.extend(isSameOrAfter);

type TabType = "vocab" | "grammar" | "listening" | "speaking";

const TABS: { key: TabType; label: string; icon: string }[] = [
  { key: "vocab", label: "Vocabulary", icon: "📖" },
  { key: "grammar", label: "Grammar", icon: "📘" },
  { key: "listening", label: "Listening", icon: "🎧" },
  { key: "speaking", label: "Speaking", icon: "🗣️" },
];

const StudyDayDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const studyDayId = parseInt(id ?? "0");

  const [studyDay, setStudyDay] = useState<StudyDayDto | null>(null);
  const [loading, setLoading] = useState(true);

  const [vocabList, setVocabList] = useState<VocabItemDto[]>([]);
  const [grammarList, setGrammarList] = useState<GrammarItemDto[]>([]);

  const [openVocabForm, setOpenVocabForm] = useState(false);
  const [editVocab, setEditVocab] = useState<VocabItemDto | null>(null);

  const [openGrammarForm, setOpenGrammarForm] = useState(false);
  const [editGrammar, setEditGrammar] = useState<GrammarItemDto | null>(null);

  const [editingNote, setEditingNote] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [savingNote, setSavingNote] = useState(false);

  const [activeTab, setActiveTab] = useState<TabType>("vocab");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmItemId, setConfirmItemId] = useState<number | null>(null);
  const [confirmType, setConfirmType] = useState<"vocab" | "grammar" | null>(
    null
  );
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchInitial = useCallback(async () => {
    try {
      setLoading(true);
      const [day, vocabs, grammars] = await Promise.all([
        studyDayApi.getById(studyDayId),
        vocabItemApi.getByStudyDay(studyDayId),
        grammarItemApi.getByStudyDay(studyDayId),
      ]);
      setStudyDay(day);
      setNoteInput(day.note || "");
      setVocabList(vocabs);
      setGrammarList(grammars);
    } finally {
      setLoading(false);
    }
  }, [studyDayId]);

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  // --- Only-part reload helpers ---
  const reloadVocabOnly = useCallback(async () => {
    const vocabs = await vocabItemApi.getByStudyDay(studyDayId);
    setVocabList(vocabs);
  }, [studyDayId]);

  const reloadGrammarOnly = useCallback(async () => {
    const grammars = await grammarItemApi.getByStudyDay(studyDayId);
    setGrammarList(grammars);
  }, [studyDayId]);

  // --- Note ---
  const handleSaveNote = async () => {
    if (!studyDay) return;
    setSavingNote(true);
    try {
      await studyDayApi.update({
        id: studyDay.id,
        targetDate: studyDay.targetDate,
        note: noteInput,
        status: studyDay.status,
      });
      setStudyDay((prev) => (prev ? { ...prev, note: noteInput } : prev)); // chỉ cập nhật note
      setEditingNote(false);
    } finally {
      setSavingNote(false);
    }
  };

  // --- StudyDay status ---
  const handleChangeStudyStatus = async (newStatus: StudyDayStatus) => {
    if (!studyDay) return;
    await studyDayApi.updateStatus(studyDay.id, newStatus);
    setStudyDay((prev) => (prev ? { ...prev, status: newStatus } : prev)); // chỉ cập nhật status
  };

  // --- Vocab: status change (no full reload) ---
  const handleVocabChangeStatus = async (id: number, status: VocabStatus) => {
    await vocabItemApi.updateStatus(id, status);
    setVocabList((prev) =>
      prev.map((x) => (x.id === id ? ({ ...x, status } as VocabItemDto) : x))
    );
  };

  // --- Delete with confirm (update list only) ---
  const openDelete = (type: "vocab" | "grammar", id: number) => {
    setConfirmType(type);
    setConfirmItemId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (confirmItemId == null || !confirmType) return;
    setConfirmLoading(true);
    try {
      if (confirmType === "vocab") {
        await vocabItemApi.delete(confirmItemId);
        setVocabList((prev) => prev.filter((x) => x.id !== confirmItemId)); // chỉ cắt phần tử
      } else {
        await grammarItemApi.delete(confirmItemId);
        setGrammarList((prev) => prev.filter((x) => x.id !== confirmItemId));
      }
      setConfirmOpen(false);
    } finally {
      setConfirmLoading(false);
    }
  };

  const isEditableStatus = studyDay
    ? dayjs(studyDay.targetDate).isSameOrAfter(dayjs(), "day")
    : false;

  if (loading || !studyDay) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md min-h-screen">
      {/* Header */}
      <StudyDayHeader
        targetDate={dayjs(studyDay.targetDate).format("DD/MM/YYYY")}
        status={studyDay.status}
      />

      {/* Back */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/study-day")}
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 transition"
        >
          ← Back to Study Days
        </button>
      </div>

      {/* StudyDay status */}
      <StudyDayStatusSection
        status={studyDay.status}
        editable={isEditableStatus}
        onChange={handleChangeStudyStatus}
      />

      {/* Note */}
      <NoteEditor
        note={noteInput}
        editing={editingNote}
        saving={savingNote}
        onEdit={() => setEditingNote(true)}
        onCancel={() => {
          setNoteInput(studyDay.note || "");
          setEditingNote(false);
        }}
        onChange={(val) => setNoteInput(val)}
        onSave={handleSaveNote}
      />

      {/* Tabs */}
      <div className="flex gap-3 mt-8 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-sm px-4 py-2 rounded-t-md font-medium transition whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                : "text-gray-500 hover:text-blue-600 dark:hover:text-blue-300"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "vocab" && (
        <VocabSection
          items={vocabList}
          onAdd={() => {
            setEditVocab(null);
            setOpenVocabForm(true);
          }}
          onEdit={(item) => {
            setEditVocab(item);
            setOpenVocabForm(true);
          }}
          onDelete={(id) => openDelete("vocab", id)}
          onChangeStatus={handleVocabChangeStatus}
        />
      )}

      {activeTab === "grammar" && (
        <GrammarSection
          items={grammarList}
          onAdd={() => {
            setEditGrammar(null);
            setOpenGrammarForm(true);
          }}
          onEdit={(item) => {
            setEditGrammar(item);
            setOpenGrammarForm(true);
          }}
          onDelete={(id) => openDelete("grammar", id)}
        />
      )}

      {activeTab === "listening" && (
        <div className="text-gray-500 italic text-sm">
          🎧 Listening content will be available soon.
        </div>
      )}

      {activeTab === "speaking" && (
        <div className="text-gray-500 italic text-sm">
          🗣️ Speaking content will be available soon.
        </div>
      )}

      {/* Modals */}
      <VocabItemFormModal
        open={openVocabForm}
        onClose={() => {
          setOpenVocabForm(false);
          setEditVocab(null);
        }}
        onSuccess={reloadVocabOnly} // chỉ refetch vocab list
        studyDayId={studyDayId}
        editData={editVocab}
      />

      <GrammarItemFormModal
        open={openGrammarForm}
        onClose={() => {
          setOpenGrammarForm(false);
          setEditGrammar(null);
        }}
        onSuccess={reloadGrammarOnly} // chỉ refetch grammar list
        studyDayId={studyDayId}
        editData={editGrammar}
      />

      {/* Confirm delete */}
      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteConfirmed}
        message="Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        loading={confirmLoading}
      />
    </div>
  );
};

export default StudyDayDetail;
