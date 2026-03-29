import Parser from "rss-parser";
import { newsSeed } from "@/data/newsSeed";

const parser = new Parser();

function normalizeArticle(item, index) {
  return {
    id: item.guid || item.link || `rss-${index}`,
    category: item.categories?.[0] || "Latest",
    title: item.title || "Untitled",
    summary: item.contentSnippet || item.content?.slice(0, 180) || item.description || "",
    description: item.content || item.contentSnippet || item.description || "",
    source: item.creator || item.source || "RSS Feed",
    url: item.link || "#",
    publishedAt: item.isoDate || item.pubDate || new Date().toISOString(),
    tags: item.categories || [],
    relevance: ["student", "investor", "founder"],
  };
}

export async function getLiveArticles() {
  const customNewsApiUrl = process.env.NEWS_API_URL;
  const customNewsApiKey = process.env.NEWS_API_KEY;

  if (customNewsApiUrl) {
    const response = await fetch(customNewsApiUrl, {
      headers: customNewsApiKey ? { Authorization: `Bearer ${customNewsApiKey}` } : {},
      next: { revalidate: 900 },
    });
    if (response.ok) {
      const data = await response.json();
      const articles = data.articles || data.results || [];
      return articles.map((item, index) => ({
        id: item.id || item.url || `api-${index}`,
        category: item.category || item.section || "Latest",
        title: item.title,
        summary: item.description || item.summary || "",
        description: item.content || item.description || "",
        source: item.source?.name || item.source || "News API",
        url: item.url || "#",
        publishedAt: item.publishedAt || new Date().toISOString(),
        tags: item.keywords || item.tags || [],
        relevance: ["student", "investor", "founder"],
      }));
    }
  }

  const feeds = [
    "https://news.google.com/rss/search?q=business+india",
    "https://news.google.com/rss/search?q=indian+startups",
    "https://news.google.com/rss/search?q=markets+india",
  ];

  try {
    const feedResults = await Promise.all(feeds.map((url) => parser.parseURL(url)));
    const items = feedResults.flatMap((feed) => feed.items || []).slice(0, 18);
    if (items.length) return items.map(normalizeArticle);
  } catch {
    // graceful fallback to seed content
  }

  return newsSeed;
}

export function heuristicPersonaFilter(articles, personaId, search = "") {
  const personaKeywords = {
    student: ["student", "career", "placement", "education", "internship", "startup", "ai"],
    investor: ["market", "stocks", "investor", "mutual", "fund", "bank", "macro", "earnings"],
    founder: ["startup", "funding", "policy", "saas", "competitor", "growth", "ai"],
  };

  const keywords = personaKeywords[personaId] || [];
  const q = search.toLowerCase();

  return articles
    .map((article) => {
      const haystack = `${article.title} ${article.summary} ${article.description} ${(article.tags || []).join(" ")}`.toLowerCase();
      const keywordScore = keywords.reduce((acc, keyword) => acc + (haystack.includes(keyword) ? 1 : 0), 0);
      const searchScore = q ? (haystack.includes(q) ? 3 : 0) : 0;
      const explicitRelevance = article.relevance?.includes(personaId) ? 2 : 0;
      return {
        ...article,
        score: keywordScore + searchScore + explicitRelevance,
        rationale: `Matched ${keywordScore} persona signals${searchScore ? " and your search query" : ""}.`,
        audienceFit: personaId,
        angle: article.category,
      };
    })
    .filter((article) => article.score > 0 || !search)
    .sort((a, b) => b.score - a.score);
}
