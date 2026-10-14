/**
 * Hand-read verdicts on figure-audit hits, and the split that honours them.
 *
 * A figure audit flags a row whose stem points at a picture it does not carry.
 * Its precision is far from 100%: "the half reactions shown below" points at
 * lines the stem itself prints. A person reads each hit and records a verdict in
 * `triage/<lane>.json` (contract: TRIAGE_BRIEF.md). Nothing read those files
 * until 2026-10-14, so every audit run re-reported rows already ruled harmless.
 *
 * Only verdicts that say NO figure is needed hide a row. `MISS` (genuinely
 * missing) and `OPTIONS` (the options are the figure) still need an image, so a
 * row carrying either stays open until the image is attached, at which point
 * the audit stops flagging it on its own.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const VERDICT_CODES = ["MISS", "DRAWS", "CONCEPT", "OPTIONS", "SELFCONTAINED", "DESCRIBED"] as const;
export type VerdictCode = (typeof VERDICT_CODES)[number];
export type FigureVerdict = { id: string; ref: string; verdict: VerdictCode; why: string };

const NO_FIGURE_NEEDED: ReadonlySet<VerdictCode> = new Set(["DRAWS", "CONCEPT", "SELFCONTAINED", "DESCRIBED"]);

export function splitByVerdict<T extends { id: string }>(
  flagged: T[],
  verdicts: FigureVerdict[]
): { open: T[]; reviewed: (T & { verdict: VerdictCode; why: string })[] } {
  const byId = new Map(verdicts.map((v) => [v.id, v]));
  const open: T[] = [];
  const reviewed: (T & { verdict: VerdictCode; why: string })[] = [];
  for (const row of flagged) {
    const v = byId.get(row.id);
    if (v && NO_FIGURE_NEEDED.has(v.verdict)) reviewed.push({ ...row, verdict: v.verdict, why: v.why });
    else open.push(row);
  }
  return { open, reviewed };
}

/** Every verdict in triage/*.json. A row ruled twice keeps the last file's ruling. */
export function loadVerdicts(dir = join(__dirname, "triage")): FigureVerdict[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .flatMap((f) => JSON.parse(readFileSync(join(dir, f), "utf8")).rows as FigureVerdict[]);
}
