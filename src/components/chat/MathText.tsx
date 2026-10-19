"use client";

import { useEffect, useState, type ComponentType } from "react";

type Renderer = ComponentType<{ text: string; className?: string }>;
let loaded: Renderer | null = null;

/**
 * Text that may carry \( ... \) maths, for V's replies and the question card
 * (2026-10-19). V is on every page, so KaTeX is fetched only the first time a
 * reply actually holds maths; until then, and for text without any, the text
 * is shown as it is.
 */
export default function MathText({ text }: { text: string }) {
  const hasMath = text.includes("\\(") || text.includes("\\[");
  // An initialiser: a component handed to useState directly would be CALLED as one (it crashed the
  // second maths reply on a page, 2026-10-19 browser check).
  const [Katex, setKatex] = useState<Renderer | null>(() => loaded);
  useEffect(() => {
    if (!hasMath || Katex) return;
    let live = true;
    void import("@/components/math/KatexRenderer").then((m) => {
      loaded = m.default;
      if (live) setKatex(() => m.default);
    });
    return () => {
      live = false;
    };
  }, [hasMath, Katex]);
  if (!hasMath || !Katex) return <>{text}</>;
  return <Katex text={text} />;
}
