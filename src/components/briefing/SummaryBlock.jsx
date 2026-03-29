import GlassCard from "@/components/ui/GlassCard";
export default function SummaryBlock({ title, text }) { return <GlassCard className="neo-panel-strong rounded-[30px] p-5"><p className="text-sm uppercase tracking-[0.2em] text-cyan-200">{title}</p><p className="mt-3 text-white/75 leading-8">{text}</p></GlassCard>; }
