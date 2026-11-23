"use client";

import { useEffect } from "react";
import { setStudyChapter } from "@/lib/studyTime/clientStore";

/**
 * Tells the study clock (components/header/StudyClock) which chapter this
 * reading page is about, so reading time lands on it. The chapter id is
 * public taxonomy, so a cached page can carry it. Renders nothing.
 */
export default function StudyContext({ chapterId }: { chapterId: string | null | undefined }) {
  useEffect(() => {
    setStudyChapter(chapterId ?? null);
    return () => setStudyChapter(null);
  }, [chapterId]);
  return null;
}
