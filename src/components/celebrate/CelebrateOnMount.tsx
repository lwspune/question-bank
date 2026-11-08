"use client";

import { useEffect } from "react";
import { celebrateInTurn } from "./celebrate";

/**
 * Show a celebration the SERVER decided on while rendering the page (the mock
 * result's "N questions answered", 2026-10-04; a board-path chapter done,
 * 2026-11-08). The award is already written and is never returned twice, so a
 * refresh of the page shows nothing; this only paints it, one message after
 * another when there are several. Renders nothing.
 */
export default function CelebrateOnMount({
  message = null,
  messages = [],
}: {
  message?: string | null;
  messages?: readonly string[];
}) {
  const all = [...messages, ...(message ? [message] : [])];
  const key = JSON.stringify(all);
  useEffect(() => {
    const list = JSON.parse(key) as string[];
    if (list.length > 0) celebrateInTurn(list.map((text) => ({ text, face: "talk" as const })));
  }, [key]);
  return null;
}
