
"use client";
import { useEffect, useState } from "react";
import ProtectedShell from "@/components/layout/ProtectedShell";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileMenu from "@/components/layout/MobileMenu";
import GlassCard from "@/components/ui/GlassCard";
import LanguageSelector from "@/components/language/LanguageSelector";
import TranslationCard from "@/components/language/TranslationCard";
import ContextExplainer from "@/components/language/ContextExplainer";
import ApiBadge from "@/components/ai/ApiBadge";
import { translations } from "@/data/translations";

export default function LanguagesPage() {
  const baseText = "Rate-cut expectations may support loan demand, improve liquidity, and indirectly help startup financing conditions.";
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [result, setResult] = useState({ label: "English", text: baseText });
  const [aiPowered, setAiPowered] = useState(false);

  useEffect(() => {
    async function runTranslation() {
      const response = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: baseText, language: selectedLanguage }) });
      const data = await response.json();
      setResult({ label: data.language || selectedLanguage, text: data.translatedText || translations.find((item) => item.label === selectedLanguage)?.text || baseText, simplifiedTerms: data.simplifiedTerms || [], localContext: data.localContext || "" });
      setAiPowered(Boolean(data.aiPowered));
    }
    runTranslation();
  }, [selectedLanguage]);

  return <ProtectedShell><div className="page-wrap relative flex min-h-screen"><Sidebar /><main className="page-main flex-1 p-4 md:p-6 xl:p-8"><Topbar title="Vernacular Business Engine" /><MobileMenu /><div className="space-y-6"><ApiBadge aiPowered={aiPowered} /><GlassCard className="neo-panel-strong neo-hero rounded-[36px] p-6 md:p-8"><p className="section-kicker">Vernacular Business News Engine</p><h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">Translate meaning, not just words.</h1><p className="mt-4 max-w-3xl text-white/70 leading-8">This module explains business news in local languages with cultural and financial context so first-time users can understand the story clearly.</p></GlassCard><section className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]"><GlassCard className="neo-panel-strong rounded-[32px] p-6"><p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Choose language</p><div className="mt-5"><LanguageSelector languages={translations} selectedLanguage={selectedLanguage} onSelect={setSelectedLanguage} /></div></GlassCard><div className="space-y-6"><TranslationCard language={result.label} text={result.text} /><ContextExplainer simplifiedTerms={result.simplifiedTerms} localContext={result.localContext} /></div></section></div></main></div></ProtectedShell>;
}
