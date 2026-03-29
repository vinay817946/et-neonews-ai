export default function Badge({ children, tone = "default" }) {
  const tones = {
    default: "border-white/10 bg-white/5 text-white/75",
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
    emerald: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
    violet: "border-violet-300/20 bg-violet-400/10 text-violet-200",
    orange: "border-orange-300/20 bg-orange-400/10 text-orange-200",
    pink: "border-pink-300/20 bg-pink-400/10 text-pink-200",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${tones[tone]}`}>{children}</span>;
}
