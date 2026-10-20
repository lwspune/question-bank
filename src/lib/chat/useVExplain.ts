"use client";

import { useEffect, useState } from "react";

/**
 * Which of V's switchable features are on (/dashboard/chat): "Ask V about
 * this question" (0168) and the week plan (0170, V's "Plan my week" button
 * since 2026-10-20). Asked once per page load however many cards the page
 * has. Off until the answer arrives, and off when it cannot be read: a
 * missing button is better than one that leads nowhere.
 */
export type VFeatures = { explain: boolean; plan: boolean };

const OFF: VFeatures = { explain: false, plan: false };
let pending: Promise<VFeatures> | null = null;

function fetchFeatures(): Promise<VFeatures> {
  pending ??= fetch("/api/chat/features")
    .then((r) => (r.ok ? r.json() : OFF))
    .then((j: { explain?: unknown; plan?: unknown }) => ({ explain: j.explain === true, plan: j.plan === true }))
    .catch(() => OFF);
  return pending;
}

export function useVFeatures(): VFeatures {
  const [on, setOn] = useState<VFeatures>(OFF);
  useEffect(() => {
    let live = true;
    void fetchFeatures().then((v) => {
      if (live) setOn(v);
    });
    return () => {
      live = false;
    };
  }, []);
  return on;
}

export function useVExplain(): boolean {
  return useVFeatures().explain;
}
