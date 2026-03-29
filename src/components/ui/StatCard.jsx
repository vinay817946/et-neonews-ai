import GlassCard from "./GlassCard";

export default function StatCard({ label, value, sub }) {
  return (
    <GlassCard className="neo-panel-strong panel-hover p-5">
      <div className="floating-dot mb-4" />
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-sm text-white/65 leading-6">{sub}</p>
    </GlassCard>
  );
}
