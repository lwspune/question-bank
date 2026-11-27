"use client";

import { useEffect, useState, type ComponentType } from "react";
import { hasBlockContent } from "@/lib/chat/tableText";
import MathText from "./MathText";
import { inlineFractions } from "@/lib/chat/inlineMath";
import { useKatexStylesheet } from "@/lib/chat/katexStylesheet";

type Renderer = ComponentType<{ text: string; className?: string }>;
let loaded: Renderer | null = null;

/**
 * A question's text or passage in V's cards (2026-10-23): a table in it is
 * drawn as a table. MathText knows nothing about tables and printed
 * "| Organism | Habitat |" as raw pipes. The table renderer (BlockText,
 * which also draws the maths) is fetched only when the text holds a table;
 * until it arrives, and for every text without one, this is MathText. Fenced
 * code needs it too (GATE CS, 2026-11-23): MathText would read `*p` as italics.
 */
export default function MathBlockText({ text }: { text: string }) {
  const table = hasBlockContent(text);
  // An initialiser, as in MathText: a component handed to useState directly would be called as one.
  const [Block, setBlock] = useState<Renderer | null>(() => loaded);
  // BlockText draws its maths with KaTeX, loaded the same way, so it needs the same stylesheet (2026-11-27).
  useKatexStylesheet(table);
  useEffect(() => {
    if (!table || Block) return;
    let live = true;
    void import("@/components/math/BlockText").then((m) => {
      loaded = m.default;
      if (live) setBlock(() => m.default);
    });
    return () => {
      live = false;
    };
  }, [table, Block]);
  if (!table || !Block) return <MathText text={text} />;
  return <Block text={inlineFractions(text)} />;
}
