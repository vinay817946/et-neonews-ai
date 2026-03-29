
"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProtectedShell from "@/components/layout/ProtectedShell";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileMenu from "@/components/layout/MobileMenu";
import GlassCard from "@/components/ui/GlassCard";
import BriefingHeader from "@/components/briefing/BriefingHeader";
import SummaryBlock from "@/components/briefing/SummaryBlock";
import FollowUpQuestions from "@/components/briefing/FollowUpQuestions";
import KeyTakeaways from "@/components/briefing/KeyTakeaways";
import SourceInsights from "@/components/briefing/SourceInsights";
import ApiBadge from "@/components/ai/ApiBadge";
import { newsSeed } from "@/data/newsSeed";

export default function BriefingPage() {
  const params = useSearchParams();
  const storyId = params.get("story");
  const story = useMemo(() => newsSeed.find((item) => String(item.id) === String(storyId)) || newsSeed[0], [storyId]);
  const [briefing, setBriefing] = useState(null);
  const [aiPowered, setAiPowered] = useState(false);
  useEffect(() => {
    async function loadBriefing() {
      const response = await fetch("/api/briefing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ story, persona: "Student Investor" }) });
      const data = await response.json();
      setBriefing(data.briefing);
      setAiPowered(Boolean(data.aiPowered));
    }
    loadBriefing();
  }, [story]);

  return <ProtectedShell><div className="page-wrap relative flex min-h-screen"><Sidebar /><main className="page-main flex-1 p-4 md:p-6 xl:p-8"><Topbar title="AI Briefing" /><MobileMenu /><div className="space-y-6"><ApiBadge aiPowered={aiPowered} />{briefing ? <><BriefingHeader story={story} briefing={briefing} /><section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]"><div className="space-y-6"><SummaryBlock title="What happened" text={briefing.whatHappened} /><SummaryBlock title="Why it matters" text={briefing.whyItMatters} /><KeyTakeaways items={briefing.keyTakeaways || []} /><SourceInsights items={briefing.sourceInsights || []} /></div><FollowUpQuestions story={story} /></section></> : <GlassCard className="rounded-[30px] p-6 text-white/60">Generating AI briefing...</GlassCard>}</div></main></div></ProtectedShell>;
}
