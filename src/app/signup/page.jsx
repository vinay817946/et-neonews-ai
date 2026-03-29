
import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return <main className="page-wrap min-h-screen px-4 py-6 text-white md:px-6 md:py-10"><div className="mx-auto grid min-h-[88vh] max-w-7xl items-center gap-8 xl:grid-cols-[1.08fr_0.92fr]"><section className="neo-panel neo-panel-strong neo-hero rounded-[40px] p-8 md:p-10 lg:p-12"><div className="section-kicker">Firebase authentication enabled</div><h1 className="mt-6 text-5xl font-black leading-[0.96] tracking-tight md:text-7xl">Create your<span className="block gradient-text text-glow">real-time AI workspace.</span></h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Register with Firebase Auth and store your account profile and watchlist in Firestore for a cleaner, more realistic product demo.</p><div className="mt-8 flex flex-wrap gap-3"><span className="pill">Email / Password</span><span className="pill">Google Sign-in</span><span className="pill">Protected dashboards</span><span className="pill">Real-time Firestore</span></div><Link href="/" className="mt-8 inline-flex text-sm text-cyan-200 hover:text-cyan-100">← Back to main page</Link></section><AuthForm mode="signup" /></div></main>;
}
