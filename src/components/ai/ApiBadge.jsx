export default function ApiBadge({ aiPowered }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${aiPowered ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-200" : "border-amber-300/25 bg-amber-400/10 text-amber-200"}`}>
      <span className="floating-dot" style={{ width: "0.45rem", height: "0.45rem" }} />
      {aiPowered ? "Live AI response" : "Fallback mode"}
    </span>
  );
}
