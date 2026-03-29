import HeroSection from "@/components/home/HeroSection";
import FeatureGrid from "@/components/home/FeatureGrid";
import DemoPreview from "@/components/home/DemoPreview";
import CTASection from "@/components/home/CTASection";

export default function HomePage() { return <main className="page-wrap min-h-screen px-4 py-6 text-white md:px-6 md:py-10"><div className="page-main mx-auto max-w-7xl space-y-8"><HeroSection /><FeatureGrid /><DemoPreview /><CTASection /></div></main>; }
