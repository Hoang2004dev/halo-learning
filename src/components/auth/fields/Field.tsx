// components/auth/fields/Field.tsx
export function Field({ label, type="text", name, value, onChange, autoComplete, placeholder }:{
  label:string; type?:string; name:string; value:string;
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  autoComplete?:string; placeholder?:string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <input
        type={type} name={name} value={value} autoComplete={autoComplete} onChange={onChange} placeholder={placeholder}
        className="w-full rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                   ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}
