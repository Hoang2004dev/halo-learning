// src/components/grammarItem/GrammarItemFormFields.tsx
import RichTextEditor from "../editor/RichTextEditor";

interface Props {
  form: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDescriptionChange: (value: string) => void;
  disabled?: boolean;
}

export default function GrammarItemFormFields({
  form,
  errors,
  onChange,
  onDescriptionChange,
  disabled,
}: Props) {
  return (
    <div className="space-y-4">
      <InputField
        label="Topic"
        name="topic"
        value={form.topic}
        onChange={onChange}
        error={errors.topic}
        disabled={disabled}
        required
        autoFocus
      />
      <TextAreaField
        label="Explanation"
        name="explanation"
        value={form.explanation}
        onChange={onChange}
        error={errors.explanation}
        disabled={disabled}
        required
        rows={4}
      />
      <InputField
        label="Exercise"
        name="exercise"
        value={form.exercise || ""}
        onChange={onChange}
        disabled={disabled}
      />
      <InputField
        label="Answer"
        name="answer"
        value={form.answer || ""}
        onChange={onChange}
        disabled={disabled}
      />

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Description
        </label>
        <RichTextEditor value={form.description || ""} onChange={onDescriptionChange} disabled={!!disabled} />
        {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
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
  required,
  autoFocus,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
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
        autoFocus={autoFocus}
        className={`w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white 
          ring-1 focus:outline-none focus:ring-2 focus:ring-sky-500
          ${error ? "ring-rose-400" : "ring-slate-300 dark:ring-gray-600"}`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  disabled,
  required,
  rows = 3,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className={`w-full px-3 py-2 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white 
          ring-1 focus:outline-none focus:ring-2 focus:ring-sky-500
          ${error ? "ring-rose-400" : "ring-slate-300 dark:ring-gray-600"}`}
      />
      {error && <p className="text-xs text-rose-500 mt-1">{error}</p>}
    </div>
  );
}
