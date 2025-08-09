export function OAuthButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg px-4 py-2.5 text-sm font-medium ring-1 ring-slate-200 dark:ring-slate-700
                 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700
                 text-slate-700 dark:text-slate-100 transition"
    >
      {text}
    </button>
  );
}
