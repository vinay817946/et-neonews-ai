"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, LineChart, Globe, Video, Star } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/briefing", label: "AI Briefing", icon: BookOpen },
  { href: "/tracker", label: "Story Arc Tracker", icon: LineChart },
  { href: "/languages", label: "Vernacular Engine", icon: Globe },
  { href: "/video-studio", label: "AI Video Studio", icon: Video },
  { href: "/watchlist", label: "Smart Watchlist", icon: Star },
];

export default function MobileMenu() {
  const pathname = usePathname();
  return <div className="mb-6 grid gap-2 rounded-[28px] border border-white/10 bg-black/30 p-3 backdrop-blur-xl xl:hidden">{items.map(({ href, label, icon: Icon }) => { const active = pathname === href; return <Link key={href} href={href} className={`nav-pill flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${active ? "active border-cyan-300/25 bg-gradient-to-r from-cyan-400/14 to-violet-400/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`}><span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border ${active ? "border-cyan-300/20 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/5 text-white/60"}`}><Icon size={16} /></span><span className="font-medium">{label}</span></Link>; })}</div>;
}
