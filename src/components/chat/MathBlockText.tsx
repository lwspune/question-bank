"use client";

import { useEffect, useState, type ComponentType } from "react";
import { hasPipeTable } from "@/lib/chat/tableText";
import MathText from "./MathText";

type Renderer = ComponentType<{ text: string; className?: string }>;
let loaded: Renderer | null = null;

/**
 * A question's text or passage in V's cards (2026-10-23): a table in it is
 * drawn as a table. MathText knows nothing about tables and printed
 * "| Organism | Habitat |" as raw pipes. The table renderer (BlockText,
 * which also draws the maths) is fetched only when the text holds a table;
 * until it arrives, and for every text without one, this is MathText.
 */
export default function MathBlockText({ text }: { text: string }) {
  const table = hasPipeTable(text);
  // An initialiser, as in MathText: a component handed to useState directly would be called as one.
  const [Block, setBlock] = useState<Renderer | null>(() => loaded);
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
  return <Block text={text} />;
}
