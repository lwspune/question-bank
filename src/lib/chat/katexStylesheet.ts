"use client";

import { useEffect } from "react";

/**
 * KaTeX's stylesheet for V's maths (2026-11-27). V loads its maths renderer on
 * first use with a plain import(), and the production build (Turbopack) did not
 * bring that renderer's CSS along: on pages that do not draw maths themselves
 * (the homepage, /notes, /mock) V's maths had no KaTeX styles, so every symbol
 * showed twice. Local dev (webpack) did bring it, so it never showed there.
 *
 * So V adds a copy served from public/katex/ (`npm run katex:assets`, kept
 * equal to the installed KaTeX by tests/katex-public-stylesheet.test.ts), once
 * per page, and only when KaTeX's styles are not already active: a page that
 * draws maths itself (/browse) already has them, and loading them again would
 * be a wasted request. Nothing loads on a page whose V shows no maths.
 */
export const KATEX_CSS_HREF = "/katex/katex.min.css";

/** KaTeX's styles are active when its hidden MathML copy is positioned out of sight. */
function katexStylesActive(): boolean {
  const probe = document.createElement("span");
  probe.className = "katex";
  probe.style.cssText = "position:absolute;visibility:hidden";
  const inner = document.createElement("span");
  inner.className = "katex-mathml";
  probe.appendChild(inner);
  document.body.appendChild(probe);
  const active = getComputedStyle(inner).position === "absolute";
  probe.remove();
  return active;
}

function addKatexStylesheet(): void {
  if (document.querySelector(`link[href="${KATEX_CSS_HREF}"]`) || katexStylesActive()) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = KATEX_CSS_HREF;
  document.head.appendChild(link);
}

/** Adds KaTeX's stylesheet to the page the first time `needed` is true. */
export function useKatexStylesheet(needed: boolean): void {
  useEffect(() => {
    if (needed) addKatexStylesheet();
  }, [needed]);
}
