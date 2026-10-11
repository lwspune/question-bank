/**
 * The Congratulate button on the results strip (2026-10-11). Pure: the browser
 * half is components/results/CongratulateButton.
 *
 * NOTHING IS STORED ON THE SERVER (the owner's call, option A): a tap bursts
 * confetti and V says well done. The visitor's own browser remembers which
 * results it congratulated, so the button reads "Congratulated" on the next
 * visit instead of inviting a second tap. A public count was option B,
 * deferred until the click numbers (funnel event results_congratulate_click)
 * show people use it. Spec: tests/results-congratulate.test.ts.
 */
import type { ResultGroup } from "./summary";

export const CONGRATS_STORAGE_KEY = "pv_congratulated";
/** Results are few; the newest few are all a browser needs to remember. */
export const CONGRATS_MEMORY_CAP = 20;

export function congratsKey(g: Pick<ResultGroup, "examSlug" | "sitting" | "stage">): string {
  return `${g.examSlug}|${g.sitting}|${g.stage}`;
}

function parse(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const v: unknown = JSON.parse(raw);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function hasCongratulated(raw: string | null, key: string): boolean {
  return parse(raw).includes(key);
}

/** The stored value after congratulating `key`: deduped, newest last, capped. */
export function rememberCongratulated(raw: string | null, key: string): string {
  const list = parse(raw).filter((k) => k !== key);
  list.push(key);
  return JSON.stringify(list.slice(-CONGRATS_MEMORY_CAP));
}

export function congratsMessage(count: number): string {
  if (count === 1) return "Well done to them!";
  if (count === 2) return "Well done to both of them!";
  return `Well done to all ${count} of them!`;
}
