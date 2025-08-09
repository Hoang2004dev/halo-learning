export default function FeatureItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
      <p className="text-white/90">{text}</p>
    </div>
  );
}
