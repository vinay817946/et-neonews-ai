export function filterStories(stories, personaId, search = "") {
  return stories.filter((story) => {
    const matchesPersona = story.relevance.includes(personaId);
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || story.title.toLowerCase().includes(query) || story.category.toLowerCase().includes(query) || story.tags.some((tag) => tag.toLowerCase().includes(query));
    return matchesPersona && matchesSearch;
  });
}
