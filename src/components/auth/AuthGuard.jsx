
"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import GlassCard from "@/components/ui/GlassCard";

export default function AuthGuard({ children }) {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!initializing && !user) {
      const next = encodeURIComponent(pathname || "/dashboard");
      router.replace(`/login?next=${next}`);
    }
  }, [initializing, user, router, pathname]);

  if (initializing) return <div className="page-wrap flex min-h-screen items-center justify-center p-6"><GlassCard className="neo-panel-strong rounded-[32px] px-8 py-10 text-center"><LoaderCircle className="mx-auto animate-spin text-cyan-200" size={34} /><h2 className="mt-4 text-2xl font-semibold">Checking your session</h2><p className="mt-2 text-white/60">Loading your personalized newsroom…</p></GlassCard></div>;
  if (!user) return <div className="page-wrap flex min-h-screen items-center justify-center p-6"><GlassCard className="neo-panel-strong rounded-[32px] px-8 py-10 text-center"><LockKeyhole className="mx-auto text-cyan-200" size={34} /><h2 className="mt-4 text-2xl font-semibold">Authentication required</h2><p className="mt-2 text-white/60">Redirecting to login…</p></GlassCard></div>;
  return children;
}
