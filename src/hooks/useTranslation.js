"use client";
import { useMemo } from "react";
import { translations } from "@/data/translations";
export default function useTranslation(language) { return useMemo(() => translations.find((item) => item.label === language) || translations[0], [language]); }
