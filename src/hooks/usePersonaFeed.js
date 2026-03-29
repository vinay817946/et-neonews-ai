"use client";
import { useMemo } from "react";
import { stories } from "@/data/stories";
import { filterStories } from "@/lib/filters";
export default function usePersonaFeed(personaId, search = "") { return useMemo(() => filterStories(stories, personaId, search), [personaId, search]); }
