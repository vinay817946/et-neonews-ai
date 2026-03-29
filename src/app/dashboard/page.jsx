
"use client";
import { useEffect, useState } from "react";
import { Sparkles, WandSparkles } from "lucide-react";
import ProtectedShell from "@/components/layout/ProtectedShell";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileMenu from "@/components/layout/MobileMenu";
import GlassCard from "@/components/ui/GlassCard";
import SearchBar from "@/components/dashboard/SearchBar";
import PersonaSelector from "@/components/dashboard/PersonaSelector";
import NewsCard from "@/components/dashboard/NewsCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import InterestTags from "@/components/dashboard/InterestTags";
import ApiBadge from "@/components/ai/ApiBadge";
import { personas } from "@/data/personas";

export default function DashboardPage() {
  const [selectedPersona, setSelectedPersona] = useState(personas[0]);
  const [search, setSearch] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiPowered, setAiPowered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadFeed() {
      setLoading(true);
      try {
        const response = await fetch("/api/persona-feed", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ personaId: selectedPersona.id, search }) });
        const data = await response.json();
        if (!cancelled) { setStories(data.stories || []); setAiPowered(Boolean(data.aiPowered)); }
      } catch {
        if (!cancelled) setStories([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadFeed();
    return () => { cancelled = true; };
  }, [selectedPersona, search]);

  return <ProtectedShell><div className="page-wrap relative flex min-h-screen"><Sidebar /><main className="page-main flex-1 p-4 md:p-6 xl:p-8"><Topbar title="Personalized Dashboard" /><MobileMenu /><section className="grid gap-6 xl:grid-cols-[1.45fr_0.8fr]"><GlassCard className="neo-panel-strong neo-hero rounded-[38px] p-6 md:p-8"><div className="flex flex-wrap items-center justify-between gap-4"><div className="max-w-4xl"><div className="section-kicker"><Sparkles size={14} /> AI-Native News Experience</div><h1 className="mt-5 text-4xl font-black leading-[0.98] tracking-tight md:text-6xl">News that adapts to<span className="block gradient-text">who you are and what you need.</span></h1><p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">ET NeoNews AI transforms static business coverage into personalized briefings, story arcs, multilingual explainers, and AI-generated short video workflows.</p><div className="mt-5"><ApiBadge aiPowered={aiPowered} /></div></div><div className="neo-panel rounded-[30px] min-w-[290px] p-5"><p className="text-sm text-white/50">Current profile</p><p className="mt-2 text-2xl font-semibold tracking-tight">{selectedPersona.title}</p><p className="mt-1 text-cyan-300">{selectedPersona.subtitle}</p><div className="mt-4"><InterestTags items={selectedPersona.interests} /></div></div></div></GlassCard><GlassCard className="rounded-[38px] bg-gradient-to-br from-cyan-400/14 to-violet-400/12 p-6"><div className="section-kicker !bg-white/10 !text-white/80 !border-white/10"><WandSparkles size={14} /> Why this feels new</div><div className="mt-5 space-y-4 text-sm text-white/80">{["One AI deep briefing replaces many articles and saves reading time.","Every persona gets a different homepage and explanation style.","Stories become timelines, Q&A layers, watchlists, and short videos.","Business news becomes understandable in Indian languages."].map((item) => <div key={item} className="rounded-[24px] border border-white/10 bg-black/20 p-4 leading-7">{item}</div>)}</div></GlassCard></section><div className="mt-6"><StatsGrid /></div><section className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.8fr]"><GlassCard className="neo-panel-strong rounded-[36px] p-6"><div className="flex items-center justify-between gap-4 flex-wrap"><div><p className="text-sm uppercase tracking-[0.2em] text-cyan-300">My ET</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Personalized newsroom</h2></div><SearchBar value={search} onChange={setSearch} /></div><div className="mt-6 space-y-4">{loading ? <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6 text-white/60">Loading AI-personalized stories...</div> : stories.map((story) => <NewsCard key={story.id} story={story} />)}{!loading && stories.length === 0 ? <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6 text-white/60">No stories matched your search.</div> : null}</div></GlassCard><GlassCard className="neo-panel-strong rounded-[36px] p-6"><p className="text-sm uppercase tracking-[0.2em] text-violet-300">Choose persona</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Different news for different people</h2><p className="mt-2 text-sm leading-6 text-white/60">Switch the reader profile and the entire feed changes to match their goals, risk level, and learning style.</p><div className="mt-5"><PersonaSelector personas={personas} selectedPersona={selectedPersona} onSelect={setSelectedPersona} /></div></GlassCard></section></main></div></ProtectedShell>;
}
