
"use client";
import { useEffect, useState } from "react";
import ProtectedShell from "@/components/layout/ProtectedShell";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileMenu from "@/components/layout/MobileMenu";
import GlassCard from "@/components/ui/GlassCard";
import TimelineView from "@/components/tracker/TimelineView";
import KeyPlayers from "@/components/tracker/KeyPlayers";
import SentimentShift from "@/components/tracker/SentimentShift";
import WatchNextPanel from "@/components/tracker/WatchNextPanel";
import ApiBadge from "@/components/ai/ApiBadge";
import { newsSeed } from "@/data/newsSeed";

export default function TrackerPage() {
  const [storyArc, setStoryArc] = useState(null);
  const [aiPowered, setAiPowered] = useState(false);
  useEffect(() => {
    async function loadStoryArc() {
      const response = await fetch("/api/story-arc", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ story: newsSeed[0] }) });
      const data = await response.json();
      setStoryArc(data.storyArc);
      setAiPowered(Boolean(data.aiPowered));
    }
    loadStoryArc();
  }, []);
  return <ProtectedShell><div className="page-wrap relative flex min-h-screen"><Sidebar /><main className="page-main flex-1 p-4 md:p-6 xl:p-8"><Topbar title="Story Arc Tracker" /><MobileMenu /><div className="space-y-6"><ApiBadge aiPowered={aiPowered} /><GlassCard className="neo-panel-strong neo-hero rounded-[36px] p-6 md:p-8"><p className="section-kicker">Story Arc Tracker</p><h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Follow the full business story, not random headlines.</h1><p className="mt-4 max-w-3xl text-white/70 leading-8">Track how a story evolves over time with timeline events, sentiment changes, key actors, and what-to-watch-next predictions.</p></GlassCard>{storyArc ? <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]"><TimelineView items={storyArc.timeline || []} /><div className="space-y-6"><KeyPlayers items={storyArc.keyPlayers || []} /><SentimentShift items={storyArc.sentimentShift || []} /><WatchNextPanel items={storyArc.whatToWatchNext || []} /></div></section> : <GlassCard className="rounded-[30px] p-6 text-white/60">Building story arc...</GlassCard>}</div></main></div></ProtectedShell>;
}
