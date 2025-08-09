// src/components/grammarItem/GrammarItemList.tsx
import { useState } from "react";
import { GrammarItemDto } from "../../models/grammarItem";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface Props {
  items: GrammarItemDto[];
  onEdit: (item: GrammarItemDto) => void;
  onDelete: (id: number) => void;
}

const GrammarItemList = ({ items, onEdit, onDelete }: Props) => {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [showAnswer, setShowAnswer] = useState<Set<number>>(new Set());
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const toggleExpand = (id: number) =>
    setExpanded((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });

  const toggleAnswer = (id: number) =>
    setShowAnswer((prev) => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });

  const handleCopy = async (id: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1600);
    } catch {
      alert("Không thể copy.");
    }
  };

  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 dark:border-gray-700 p-6 text-sm text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-gray-900/40">
        <div className="flex items-center gap-2">📭 <span>No grammar items.</span></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {items.map((g) => {
          const isOpen = expanded.has(g.id);
          const answerOpen = showAnswer.has(g.id);
          const isCopied = copiedId === g.id;

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-gray-900/60 ring-1 ring-slate-200 dark:ring-gray-700 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 break-words">
                      {g.topic}
                    </h3>
                  </div>

                  {g.explanation && (
                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line">
                      {g.explanation}
                    </p>
                  )}

                  {/* Exercise */}
                  {g.exercise && (
                    <div className="mt-2 bg-sky-50 dark:bg-sky-900/20 ring-1 ring-sky-100 dark:ring-sky-800 rounded-md px-3 py-2">
                      <p className="text-sm text-sky-900 dark:text-sky-200 whitespace-pre-line">
                        <span className="font-medium text-sky-700 dark:text-sky-300">Exercise:</span> {g.exercise}
                      </p>
                    </div>
                  )}

                  {/* Answer */}
                  {g.answer && (
                    <div className="mt-3">
                      <div className="flex items-center gap-3 mb-1">
                        <button
                          onClick={() => toggleAnswer(g.id)}
                          className="px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:underline underline-offset-2 transition"
                          aria-expanded={answerOpen}
                          aria-controls={`ans-${g.id}`}
                        >
                          {answerOpen ? "Hide answer ▲" : "Show answer ▼"}
                        </button>

                        {answerOpen && (
                          <button
                            onClick={() => handleCopy(g.id, g.answer!)}
                            className="px-2 py-1 text-xs font-medium text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                            aria-live="polite"
                          >
                            📋 {isCopied ? "Copied" : "Copy"}
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {answerOpen && (
                          <motion.div
                            id={`ans-${g.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 ring-1 ring-emerald-100 dark:ring-emerald-800 rounded-md px-3 py-2 whitespace-pre-line">
                              <p className="text-sm text-emerald-900 dark:text-emerald-200">
                                <span className="font-medium text-emerald-700 dark:text-emerald-300">Answer:</span> {g.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Description */}
                  {g.description && (
                    <div className="mt-2">
                      <button
                        onClick={() => toggleExpand(g.id)}
                        className="text-xs text-sky-700 dark:text-sky-300 hover:underline underline-offset-2 transition"
                        aria-expanded={isOpen}
                        aria-controls={`desc-${g.id}`}
                      >
                        {isOpen ? "Hide description ▲" : "Show description ▼"}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`desc-${g.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="overflow-hidden mt-1"
                          >
                            <div className={clsx("prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200")}>
                              <div dangerouslySetInnerHTML={{ __html: g.description }} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Actions (nhẹ, đồng bộ với Vocab) */}
                <div className="shrink-0">
                  <div className="flex gap-4">
                    <button
                      onClick={() => onEdit(g)}
                      className="px-2 py-1 text-sm font-medium text-sky-600 hover:text-sky-700 underline-offset-2 hover:underline transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(g.id)}
                      className="px-2 py-1 text-sm font-medium text-rose-600 hover:text-rose-700 underline-offset-2 hover:underline transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default GrammarItemList;
