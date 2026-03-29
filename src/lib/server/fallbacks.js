export function buildFallbackBriefing(story) {
  return {
    headline: story.title,
    shortSummary: story.summary,
    whatHappened: story.description || story.summary,
    whyItMatters: "This matters because it changes what different users should pay attention to next — from jobs and startups to market moves and policy signals.",
    actionItems: ["Save the story to your watchlist.", "Compare impact for your persona.", "Generate a short video summary for revision."],
    keyTakeaways: ["AI can combine many reports into one useful briefing.", "Relevance changes by user type.", "The same story can power timelines, translation, and Q&A."],
    followUpQuestions: ["Explain this in simple words.", "Who benefits the most?", "What should I watch next week?"],
    sourcesUsed: [story.source || "Internal Seed"]
  };
}
export function buildFallbackStoryArc(story) {
  return {
    timeline: [
      { point: "Story Breaks", detail: story.summary, tone: "Attention spike" },
      { point: "Interpretation", detail: "Analysts and readers start extracting impact and next-step signals.", tone: "Analysis" },
      { point: "User Relevance", detail: "The product adapts the angle for each persona.", tone: "Action layer" }
    ],
    keyPlayers: ["Policy makers", "Retail investors", "Startup founders", "Students"],
    sentimentShift: [{ label: "Initial reaction", tone: "Mixed" }, { label: "After analysis", tone: "More informed" }],
    whatToWatchNext: ["Official commentary", "Sector reaction", "User-level implications"],
    contrarianViews: ["The biggest headline may not produce the biggest long-term change."]
  };
}
export function buildFallbackTranslation(text, language) {
  return { language, translatedText: `[${language}] ${text}`, simplifiedTerms: ["rate cut = cheaper borrowing", "liquidity = money available in the system"], localContext: "This explanation uses simple business language for first-time readers." };
}
export function buildFallbackVideo(story) {
  return {
    title: `${story.title} in 60 seconds`,
    hook: `Here is the business story you need to understand today: ${story.title}`,
    estimatedDuration: "78 sec",
    outputFormat: "Vertical + Broadcast",
    scenes: [
      { title: "Headline hook", narration: `Start with the big why-now: ${story.title}.`, visual: "Breaking headline card with animated gradient backdrop", overlay: "Why this matters today", duration: "12s" },
      { title: "Core changes", narration: "Explain the three most important developments using fast, clean narration.", visual: "Three stacked stat cards with moving ticker accents", overlay: "Top 3 takeaways", duration: "18s" },
      { title: "Who is affected", narration: "Map impact for students, investors, and founders in one split-screen sequence.", visual: "Persona cards with icon-led motion overlays", overlay: "Who benefits / who should watch", duration: "22s" },
      { title: "What to watch next", narration: "Close with the next watchpoint and invite viewers to track the story arc for updates.", visual: "Watchlist panel with calendar and trendline animation", overlay: "Next watchpoints", duration: "18s" }
    ],
    outro: "Follow the story arc for updates and explainers.",
    narrationStyle: "Confident, clean, newsroom-style"
  };
}
