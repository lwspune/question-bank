/**
 * Pure helpers for the NEET figure verify/gate flow (see verify-figures.ts +
 * flip-public.ts). Kept side-effect-free so they can be unit-tested without a PDF,
 * DB, or renderer. The pixel geometry lives in snapcrop.py; this is the manifest /
 * verdict / gate logic around it.
 */

export type Bbox = [number, number, number, number]; // [fx0, fy0, fx1, fy1] page fractions

/** Coarse anchors that snapcrop.py turns into a bbox (provenance, stored alongside bbox). */
export type Anchors = { col: [number, number]; top: number; bottom: number; answerY: number };

/** One manifest figure entry. `bbox` is what attach-images crops; `anchors` is optional provenance. */
export type FigureEntry = { page: number; bbox: Bbox; anchors?: Anchors };

export type VerifyStatus = "ok" | "needs-review" | "blocked";
export type VerifyRecord = { status: VerifyStatus; bboxHeight: number; flags: string[] };

export function bboxHeight(b: Bbox): number {
  return Math.round((b[3] - b[1]) * 1000) / 1000;
}

export function isMalformedBbox(b: Bbox): boolean {
  const [fx0, fy0, fx1, fy1] = b;
  return ![fx0, fy0, fx1, fy1].every((v) => v >= 0 && v <= 1) || fx0 >= fx1 || fy0 >= fy1;
}

/**
 * Soft pre-flags drawn on the contact sheet to steer the reviewer's eye. NEVER an
 * auto-block — a legitimately tall figure (a 4-graph option set) exceeds the height
 * cue, so the human/vision review is what actually decides ok vs blocked.
 */
export function figureFlags(entry: FigureEntry, opts?: { maxHeight?: number }): string[] {
  const flags: string[] = [];
  if (isMalformedBbox(entry.bbox)) flags.push("malformed bbox");
  const h = bboxHeight(entry.bbox);
  const maxH = opts?.maxHeight ?? 0.4;
  if (h > maxH) flags.push(`tall bbox (${h}) — confirm it excludes the answer/solution`);
  return flags;
}

/** Shape-check coarse anchors before snapcrop runs. Returns human-readable errors ([] = valid). */
export function validateAnchors(a: Anchors): string[] {
  const errs: string[] = [];
  const inUnit = (x: number) => x >= 0 && x <= 1;
  if (!(inUnit(a.col[0]) && inUnit(a.col[1]) && a.col[0] < a.col[1])) errs.push("col must be [x0 < x1] within [0,1]");
  if (!(inUnit(a.top) && inUnit(a.bottom) && a.top < a.bottom)) errs.push("top must be < bottom within [0,1]");
  if (!(a.bottom <= a.answerY)) errs.push("bottom must be <= answerY (the answer ceiling)");
  if (!inUnit(a.answerY)) errs.push("answerY must be within [0,1]");
  return errs;
}

/**
 * The flip-public gate: every figure question must be reviewed to "ok" before its
 * paper can go PUBLIC. Returns the sorted question numbers that are NOT ok (i.e. still
 * "needs-review" or "blocked") — a non-empty result blocks the flip.
 */
export function blockedFigureQuestions(verify: Record<string, VerifyRecord>): string[] {
  return Object.entries(verify)
    .filter(([, v]) => v.status !== "ok")
    .map(([q]) => q)
    .sort((a, b) => Number(a) - Number(b));
}

/**
 * Extract the figure LABELS a question stem names — the checklist a reviewer (or a
 * vision cross-check) must confirm is present in the crop. Catches the clipped-label
 * class (a stem naming "points A and B" whose crop shows only B). Deterministic, but a
 * REVIEW AID not a gate: it over-includes on chemistry formulae (harmless — those
 * figures are structures) and can't itself confirm presence (that needs OCR/vision).
 *
 * Signals: geometry letter-runs (loop `ABCD` → A,B,C,D; `PQR`), subscripted labels
 * (`L_1`,`D_2`,`C_5`,`T_1`,`V_A`,`U_P`), prose "point(s)/at/between/centre/axis X [and Y]",
 * `List I/II`, and an option-count reminder ("four plots"). Strips LaTeX delimiters first.
 */
const LABEL_STOPWORDS = new Set(["THE", "IF", "AND", "DNA", "DNP", "NEET", "UG", "OR", "AC", "DC", "II", "III", "IV"]);
export function extractStemLabels(stem: string): string[] {
  const labels = new Set<string>();
  const s = stem.replace(/\\[()[\]]/g, " ").replace(/[{}]/g, ""); // drop \( \) \[ \] and braces
  // 1. subscripted point/component labels — REQUIRE the underscore (LaTeX subscript) so
  //    "CD"/"BC"/"QR" (adjacent caps = geometry runs, handled below) and chem "CH_3"→"CH"
  //    don't masquerade as labels: L_1, D_2, C_5, T_1, V_A, U_P, W_3, R_0, I_A.
  for (const m of s.matchAll(/\b([A-Z])_([0-9A-Za-z]{1,3})\b/g)) {
    labels.add(`${m[1]}${m[2]}`);
  }
  // 2. geometry letter-runs (2-4 caps): ABCD, ABC, ADC, PQR, QR, BC → split to letters
  for (const m of s.matchAll(/\b[A-Z]{2,4}\b/g)) {
    if (LABEL_STOPWORDS.has(m[0]) || /[0-9]/.test(m[0])) continue;
    if (m[0].length <= 4) for (const ch of m[0]) labels.add(ch);
  }
  // 3. prose single-letter points in labelling contexts (incl. comma-lists like "labels: B, C, A ... D")
  const ctx = /\b(?:points?|between|centre|center|junction|axis|charge|source|cell|loop|node|label(?:s|led|ling)?|marked|at)[\s:]+([A-Za-z,'\s:.]{0,40})/gi;
  for (const m of s.matchAll(ctx)) {
    for (const t of m[1].matchAll(/\b([A-Z])\b/g)) if (!LABEL_STOPWORDS.has(t[1])) labels.add(t[1]);
  }
  // 4. Match-List columns
  for (const m of s.matchAll(/\bList\s+(I{1,3}|IV|V)\b/g)) labels.add(`List ${m[1]}`);
  // 5. option-count reminder
  const cnt = s.match(/\b(?:four|five|4|5|three)\s+(?:plots|diagrams|graphs|structures|options|figures|curves)\b/i);
  if (cnt) labels.add(cnt[0].toLowerCase());
  return [...labels].sort();
}

/**
 * Merge a freshly-computed verify pass over an existing verdict file: keep a human's
 * prior "ok"/"blocked" decision, refresh flags + height, and default new/never-seen
 * figures to "needs-review" so they can't silently ride through the gate.
 */
export function mergeVerify(
  computed: Record<string, { bboxHeight: number; flags: string[] }>,
  prior: Record<string, VerifyRecord> = {},
): Record<string, VerifyRecord> {
  const out: Record<string, VerifyRecord> = {};
  for (const [q, c] of Object.entries(computed)) {
    const was = prior[q]?.status;
    out[q] = { status: was === "ok" || was === "blocked" ? was : "needs-review", bboxHeight: c.bboxHeight, flags: c.flags };
  }
  return out;
}
