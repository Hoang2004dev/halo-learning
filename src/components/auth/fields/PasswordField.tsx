// components/auth/fields/PasswordField.tsx
import { EyeIcon } from "../icons/Eye";
import { EyeOffIcon } from "../icons/EyeOff";

export function PasswordField({ label, name, value, onChange, show, setShow }:{
  label:string; name:string; value:string;
  onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void;
  show:boolean; setShow:(v:boolean)=>void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"} name={name} value={value} onChange={onChange} autoComplete="current-password"
          className="w-full rounded-lg px-3 py-2.5 pr-10 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100
                     ring-1 ring-slate-300 dark:ring-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="button" onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-700 dark:text-slate-400"
          aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
}
