
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, LineChart, Globe, Video, Star, Sparkles, Bot, TrendingUp, Languages, ChevronRight, UserCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/briefing", label: "AI Briefing", icon: BookOpen },
  { href: "/tracker", label: "Story Arc Tracker", icon: LineChart },
  { href: "/languages", label: "Vernacular Engine", icon: Globe },
  { href: "/video-studio", label: "AI Video Studio", icon: Video },
  { href: "/watchlist", label: "Smart Watchlist", icon: Star },
];
const modules = [
  { icon: Sparkles, label: "Personalized newsroom" },
  { icon: Bot, label: "Follow-up AI chat" },
  { icon: TrendingUp, label: "Sentiment watchpoints" },
  { icon: Languages, label: "Context-aware translations" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  return <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-black/20 px-5 py-6 backdrop-blur-2xl xl:block"><div className="neo-panel neo-panel-strong rounded-[30px] p-5"><div className="flex items-center gap-3"><div className="relative flex h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-white text-base font-black text-slate-950 shadow-[0_12px_28px_rgba(255,255,255,0.24)]">ET<span className="metric-orb -right-1 -top-1 h-5 w-5 bg-cyan-300" /></div><div><p className="font-semibold tracking-wide">ET NeoNews AI</p><p className="text-sm text-white/50">AI-native newsroom prototype</p></div></div><div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4"><div className="flex items-center justify-between"><p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Signed in workspace</p><ChevronRight size={16} className="text-white/45" /></div><div className="mt-3 flex items-center gap-3"><span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-cyan-200"><UserCircle2 size={18} /></span><div><p className="text-sm font-medium text-white/90">{user?.displayName || "Authenticated User"}</p><p className="text-xs text-white/50">{user?.email || "Firebase session active"}</p></div></div></div></div><div className="mt-6 space-y-2">{items.map(({ href, label, icon: Icon }) => { const active = pathname === href; return <Link key={href} href={href} className={`nav-pill flex items-center gap-3 px-4 py-3.5 text-sm transition duration-300 ${active ? "active border-cyan-300/25 bg-gradient-to-r from-cyan-400/15 to-violet-400/10 text-white shadow-[0_18px_32px_rgba(0,0,0,0.22)]" : "text-white/70 hover:border-cyan-300/18 hover:bg-white/5 hover:text-white"}`}><span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${active ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/5 text-white/65"}`}><Icon size={17} /></span><span className="font-medium">{label}</span></Link>; })}</div><div className="mt-6 neo-panel rounded-[30px] p-5"><p className="text-xs uppercase tracking-[0.2em] text-white/50">Core modules</p><div className="mt-4 space-y-3">{modules.map(({ icon: Icon, label }) => <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/75"><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-cyan-200"><Icon size={16} /></span>{label}</div>)}</div></div></aside>;
}
