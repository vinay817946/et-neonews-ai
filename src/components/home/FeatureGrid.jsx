import { Bot, Languages, LineChart, PlayCircle, Sparkles, Star } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const features = [
  { title: "My ET", desc: "Every persona gets a different newsroom, order of stories, and explanation depth.", icon: Sparkles, tone: "cyan" },
  { title: "News Navigator", desc: "One AI briefing replaces many fragmented articles and surfaces the why behind the headline.", icon: Bot, tone: "violet" },
  { title: "Story Arc Tracker", desc: "Watch how a story evolves, who matters, what sentiment changed, and what to track next.", icon: LineChart, tone: "emerald" },
  { title: "Vernacular Engine", desc: "Business news is translated with cultural and market context, not literal word swaps.", icon: Languages, tone: "orange" },
  { title: "AI Video Studio", desc: "Auto-build a broadcast-style 60–90 second explainer with scene prompts and narration.", icon: PlayCircle, tone: "pink" },
  { title: "Smart Watchlist", desc: "Save a theme once and receive evolving AI updates instead of rereading the same story.", icon: Star, tone: "default" },
];

const toneMap = { cyan: "text-cyan-200 bg-cyan-400/10 border-cyan-300/20", violet: "text-violet-200 bg-violet-400/10 border-violet-300/20", emerald: "text-emerald-200 bg-emerald-400/10 border-emerald-300/20", orange: "text-orange-200 bg-orange-400/10 border-orange-300/20", pink: "text-pink-200 bg-pink-400/10 border-pink-300/20", default: "text-white/80 bg-white/5 border-white/10" };

export default function FeatureGrid() { return <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{features.map((item) => { const Icon = item.icon; return <GlassCard key={item.title} className="neo-panel-strong panel-hover p-5"><div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${toneMap[item.tone]}`}><Icon size={20} /></div><h3 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h3><p className="mt-3 text-white/70 leading-7">{item.desc}</p></GlassCard>; })}</section>; }
