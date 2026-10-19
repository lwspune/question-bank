"use client";

import { useEffect, useState } from "react";

/**
 * Whether "Ask V about this question" is switched on (/dashboard/chat, 0168),
 * asked once per page load however many cards the page has. Off until the
 * answer arrives, and off when it cannot be read: a missing button is
 * better than one that leads nowhere.
 */
let pending: Promise<boolean> | null = null;

function fetchExplain(): Promise<boolean> {
  pending ??= fetch("/api/chat/features")
    .then((r) => (r.ok ? r.json() : { explain: false }))
    .then((j: { explain?: unknown }) => j.explain === true)
    .catch(() => false);
  return pending;
}

export function useVExplain(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let live = true;
    void fetchExplain().then((v) => {
      if (live) setOn(v);
    });
    return () => {
      live = false;
    };
  }, []);
  return on;
}
