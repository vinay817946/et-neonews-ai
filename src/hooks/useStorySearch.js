"use client";
import { useMemo } from "react";
import { filterStories } from "@/lib/filters";
export default function useStorySearch(stories, personaId, search) { return useMemo(() => filterStories(stories, personaId, search), [stories, personaId, search]); }
