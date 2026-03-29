
"use client";
import { useEffect, useMemo, useState } from "react";
import { Video } from "lucide-react";
import ProtectedShell from "@/components/layout/ProtectedShell";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileMenu from "@/components/layout/MobileMenu";
import GlassCard from "@/components/ui/GlassCard";
import VideoPreviewCard from "@/components/video/VideoPreviewCard";
import ScriptScenes from "@/components/video/ScriptScenes";
import NarrationOptions from "@/components/video/NarrationOptions";
import ApiBadge from "@/components/ai/ApiBadge";
import { newsSeed } from "@/data/newsSeed";
function normalizeScenes(scenes = []) { return scenes.map((scene, index) => typeof scene === "string" ? { title: `Scene ${index + 1}`, narration: scene } : scene); }
export default function VideoStudioPage() {
  const [script, setScript] = useState(null);
  const [aiPowered, setAiPowered] = useState(false);
  useEffect(() => {
    async function loadScript() {
      const response = await fetch("/api/generate-video-script", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ story: newsSeed[0] }) });
      const data = await response.json();
      setScript(data.script);
      setAiPowered(Boolean(data.aiPowered));
    }
    loadScript();
  }, []);
  const sceneCount = useMemo(() => normalizeScenes(script?.scenes || []).length, [script]);
  return <ProtectedShell><div className="page-wrap relative flex min-h-screen"><Sidebar /><main className="page-main flex-1 p-4 md:p-6 xl:p-8"><Topbar title="AI Video Studio" /><MobileMenu /><div className="space-y-6"><ApiBadge aiPowered={aiPowered} /><GlassCard className="neo-panel-strong neo-hero rounded-[36px] p-6 md:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div className="max-w-4xl"><p className="section-kicker"><Video size={14} /> AI News Video Studio</p><h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Turn articles into premium short video briefings.</h1><p className="mt-4 max-w-3xl text-white/70 leading-8">Generate a 60 to 120 second broadcast-style explainer with narration, animated data visuals, overlays, scene timing, and a concise newsroom outro.</p></div><div className="grid gap-3 sm:grid-cols-3">{[["Scene cards", sceneCount || "4"],["Formats", "2"],["Voice styles", "2"]].map(([label, value]) => <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 text-center"><p className="text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/45">{label}</p></div>)}</div></div></GlassCard>{script ? <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]"><VideoPreviewCard title={script.title} hook={script.hook} estimatedDuration={script.estimatedDuration || "78 sec"} format={script.outputFormat || "Vertical + Broadcast"} /><div className="space-y-6"><ScriptScenes scenes={script.scenes || []} /><NarrationOptions narrationStyle={script.narrationStyle} outro={script.outro} /></div></section> : <GlassCard className="rounded-[30px] p-6 text-white/60">Generating AI video script...</GlassCard>}</div></main></div></ProtectedShell>;
}
