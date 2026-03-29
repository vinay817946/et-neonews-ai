
"use client";
import Link from "next/link";
import { Bell, Briefcase, LogOut, Sparkles, UserCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Topbar({ title = "AI Newsroom Dashboard" }) {
  const { user, logout } = useAuth();
  async function handleLogout() { try { await logout(); } catch {} }
  return <header className="neo-panel neo-panel-strong mb-6 rounded-[30px] p-4 md:p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><div className="section-kicker !px-3 !py-2 !text-[10px]"><Sparkles size={13} /> Premium live workspace</div><h2 className="mt-3 text-xl font-semibold tracking-tight md:text-[1.75rem]">{title}</h2><p className="mt-1 text-sm text-white/55">Interactive business intelligence interface with AI-first storytelling and authenticated data.</p></div><div className="flex flex-wrap items-center gap-3"><button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/80 transition hover:border-cyan-300/20 hover:bg-white/10"><Bell size={16} /> Alerts</button>{user ? <><div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white/85"><UserCircle2 size={16} />{user.displayName || user.email}</div><button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(255,255,255,0.18)]"><LogOut size={16} /> Sign out</button></> : <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_12px_30px_rgba(255,255,255,0.18)]"><Briefcase size={16} /> Login</Link>}</div></div></header>;
}
