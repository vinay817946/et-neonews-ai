
"use client";
import { useEffect, useState } from "react";
import ProtectedShell from "@/components/layout/ProtectedShell";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileMenu from "@/components/layout/MobileMenu";
import GlassCard from "@/components/ui/GlassCard";
import WatchlistGrid from "@/components/watchlist/WatchlistGrid";
import { useAuth } from "@/context/AuthContext";
import { removeFromWatchlist, subscribeToWatchlist } from "@/lib/firebase/watchlist";

export default function WatchlistPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToWatchlist(user.uid, setItems);
    return () => unsubscribe?.();
  }, [user]);
  async function clearFirst() {
    if (!user || !items[0]?.docId) return;
    await removeFromWatchlist(user.uid, items[0].docId);
  }
  return <ProtectedShell><div className="page-wrap relative flex min-h-screen"><Sidebar /><main className="page-main flex-1 p-4 md:p-6 xl:p-8"><Topbar title="Smart Watchlist" /><MobileMenu /><div className="space-y-6"><GlassCard className="neo-panel-strong neo-hero rounded-[36px] p-6 md:p-8"><p className="section-kicker">Smart watchlist</p><h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Track the stories that matter to you.</h1><p className="mt-4 max-w-3xl text-white/70 leading-8">This page is connected to Firestore in real time. Save stories from the dashboard and they appear here instantly for the signed-in user.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={clearFirst} className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85">Remove first saved story</button><div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">{items.length} saved item{items.length === 1 ? "" : "s"}</div></div></GlassCard>{items.length ? <WatchlistGrid items={items} /> : <GlassCard className="rounded-[30px] p-6 text-white/60">No saved stories yet. Open the dashboard and use the Save button on any story card.</GlassCard>}</div></main></div></ProtectedShell>;
}
