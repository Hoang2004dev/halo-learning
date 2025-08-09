// src/components/vocabItem/VocabItemFormFields.tsx
import { VocabStatus } from "../../models/vocabItem";
import RichTextEditor from "../editor/RichTextEditor";

interface Props {
  form: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onDescriptionChange: (value: string) => void;
  disabled?: boolean;
}

const statusOptions: { value: VocabStatus; label: string }[] = [
  { value: "NotLearned", label: "Not Learned" },
  { value: "Learning", label: "Learning" },
  { value: "Mastered", label: "Mastered" },
  { value: "Review", label: "Review" },
];

export default function VocabItemFormFields({
  form,
  errors,
  onChange,
  onDescriptionChange,
  disabled,
}: Props) {
  return (
    <div className="space-y-4">
      <InputField
        label="Word"
        name="word"
        value={form.word}
        onChange={onChange}
        error={errors.word}
        disabled={disabled}
        required
        autoFocus
      />
      <InputField
        label="Meaning (Native)"
        name="nativeMeaning"
        value={form.nativeMeaning}
        onChange={onChange}
        error={errors.nativeMeaning}
        disabled={disabled}
        required
      />
      <InputField
        label="Meaning (Foreign)"
        name="foreignMeaning"
        value={form.foreignMeaning}
        onChange={onChange}
        error={errors.foreignMeaning}
        disabled={disabled}
      />
      <InputField
        label="Example"
        name="example"
        value={form.example || ""}
        onChange={onChange}
        disabled={disabled}
      />
      <InputField
        label="Audio URL"
        name="audioUrl"
        value={form.audioUrl || ""}
        onChange={onChange}
        error={errors.audioUrl}
        disabled={disabled}
        placeholder="https://..."
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Description
        </label>
        <RichTextEditor value={form.description || ""} onChange={onDescriptionChange} disabled={!!disabled} />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={onChange}
          disabled={disabled}
          className="w-full ring-1 ring-slate-300 dark:ring-gray-600 bg-white dark:bg-gray-800 text-sm rounded-lg px-3 py-2 
                     text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-60"
        >
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  placeholder,
  required,
  autoFocus,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white 
          ring-1 focus:outline-none focus:ring-2 focus:ring-sky-500
          ${error ? "ring-rose-400" : "ring-slate-300 dark:ring-gray-600"}`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
