// src/components/grammarItem/GrammarSection.tsx
import { GrammarItemDto } from "../../models/grammarItem";
import GrammarItemList from "./GrammarItemList";

interface Props {
  items: GrammarItemDto[];
  onAdd: () => void;
  onEdit: (item: GrammarItemDto) => void;
  onDelete: (id: number) => void;
}

export default function GrammarSection({ items, onAdd, onEdit, onDelete }: Props) {
  return (
    <>
      <hr className="my-6" />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">📘 Grammar</h2>
        <button
          className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm min-w-[140px] transition"
          onClick={onAdd}
        >
          + Add Grammar
        </button>
      </div>

      <GrammarItemList items={items} onEdit={onEdit} onDelete={onDelete} />
    </>
  );
}
