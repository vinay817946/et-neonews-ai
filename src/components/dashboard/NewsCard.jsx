
"use client";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Plus } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { addToWatchlist } from "@/lib/firebase/watchlist";

export default function NewsCard({ story }) {
  const { user } = useAuth();
  async function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    try {
      const result = await addToWatchlist(user.uid, story);
      window.alert(result.duplicate ? "This story is already in your watchlist." : "Story saved to your watchlist.");
    } catch (error) {
      window.alert(error?.message || "Failed to save story.");
    }
  }
  return <Link href={`/briefing?story=${story.id}`} className="neo-panel neo-panel-strong panel-hover group block rounded-[32px] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Badge tone="cyan">{story.category || "Latest"}</Badge><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/40">{story.sourceCount || 1} sources</span></div><span className="text-xs text-white/48">{story.readTime || "5 min read"}</span></div><h3 className="news-card-title mt-4 text-[1.35rem] font-semibold leading-snug tracking-tight transition group-hover:text-cyan-100">{story.title}</h3><p className="mt-3 text-white/70 leading-7">{story.summary}</p><div className="mt-4 flex flex-wrap gap-2">{(story.tags || []).map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/62">#{tag}</span>)}</div><div className="mt-5 flex flex-wrap items-center justify-between gap-3"><div className="inline-flex items-center gap-2 text-sm text-cyan-200"><Sparkles size={14} /> AI ready</div><div className="flex items-center gap-2">{user ? <button onClick={handleAdd} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-cyan-300/25 hover:bg-white/10"><Plus size={14} /> Save</button> : null}<div className="inline-flex items-center gap-2 text-sm text-white/65 transition group-hover:text-white">Open briefing<ArrowUpRight size={16} /></div></div></div></Link>;
}
