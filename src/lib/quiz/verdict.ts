/**
 * Pure score-band helper for the public quiz results screen. Maps a score to a
 * celebratory headline + a tone token (drives the ring colour). Percentage-based
 * so it reads right for any quiz length.
 */
export type VerdictTone = "gold" | "emerald" | "brand" | "amber" | "slate";

export type Verdict = {
  headline: string;
  blurb: string;
  tone: VerdictTone;
  /** true for the top two bands — drives the celebratory flourish */
  celebrate: boolean;
};

export function scoreVerdict(score: number, total: number): Verdict {
  const pct = total > 0 ? (score / total) * 100 : 0;
  if (pct >= 90)
    return { headline: "Outstanding!", blurb: "You've nailed this chapter.", tone: "gold", celebrate: true };
  if (pct >= 75)
    return { headline: "Strong work!", blurb: "Just a couple of gaps to close.", tone: "emerald", celebrate: true };
  if (pct >= 50)
    return { headline: "Good start", blurb: "A solid base — sharpen the weak spots below.", tone: "brand", celebrate: false };
  if (pct >= 25)
    return { headline: "Keep going", blurb: "Revise the misses below and retake.", tone: "amber", celebrate: false };
  return { headline: "Just getting started", blurb: "Every expert began here — the notes below will help.", tone: "slate", celebrate: false };
}
