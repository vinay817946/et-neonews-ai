
"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LoaderCircle, Mail, Lock, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthForm({ mode = "login" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup, loginWithGoogle } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const nextUrl = useMemo(() => searchParams.get("next") || "/dashboard", [searchParams]);
  const isLogin = mode === "login";

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (isLogin) await login(form.email, form.password);
      else await signup({ name: form.name, email: form.email, password: form.password });
      router.push(nextUrl);
    } catch (err) {
      setError(err?.message || "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setSubmitting(true);
    setError("");
    try {
      await loginWithGoogle();
      router.push(nextUrl);
    } catch (err) {
      setError(err?.message || "Google sign-in failed");
    } finally {
      setSubmitting(false);
    }
  }

  return <div className="neo-panel neo-panel-strong w-full max-w-xl rounded-[36px] p-6 md:p-8"><div className="section-kicker">{isLogin ? "Welcome back" : "Create your workspace"}</div><h1 className="mt-5 text-4xl font-black tracking-tight">{isLogin ? "Login to ET NeoNews AI" : "Start your AI-native newsroom"}</h1><p className="mt-3 text-white/65">{isLogin ? "Access your personalized dashboard, real-time watchlist, and AI tools." : "Create an account to save stories, sync watchlists, and unlock protected demo pages."}</p><form className="mt-8 space-y-4" onSubmit={handleSubmit}>{!isLogin && <label className="block"><span className="mb-2 block text-sm text-white/60">Full name</span><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><UserIcon size={18} className="text-cyan-200" /><input required value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} className="w-full bg-transparent outline-none placeholder:text-white/30" placeholder="Vinay" /></div></label>}<label className="block"><span className="mb-2 block text-sm text-white/60">Email</span><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><Mail size={18} className="text-cyan-200" /><input required type="email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} className="w-full bg-transparent outline-none placeholder:text-white/30" placeholder="you@example.com" /></div></label><label className="block"><span className="mb-2 block text-sm text-white/60">Password</span><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><Lock size={18} className="text-cyan-200" /><input required minLength={6} type="password" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} className="w-full bg-transparent outline-none placeholder:text-white/30" placeholder="Minimum 6 characters" /></div></label>{error ? <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}<button disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 disabled:opacity-70">{submitting ? <LoaderCircle size={18} className="animate-spin" /> : <ArrowRight size={18} />}{isLogin ? "Login" : "Create account"}</button></form><button type="button" onClick={handleGoogle} disabled={submitting} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-medium text-white disabled:opacity-70">Continue with Google</button><p className="mt-6 text-sm text-white/55">{isLogin ? "New here?" : "Already have an account?"} <Link className="text-cyan-200 hover:text-cyan-100" href={isLogin ? `/signup?next=${encodeURIComponent(nextUrl)}` : `/login?next=${encodeURIComponent(nextUrl)}`}>{isLogin ? "Create an account" : "Login"}</Link></p></div>;
}
