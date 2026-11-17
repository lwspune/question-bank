// Pure core for the military-school lane, beyond what it imports from
// ../upsc/lib (band merge, catalog check, crosstab, records) and ../capf/lib.
//
// NTA's AISSEE key differs from UPSC's in three ways, all handled here:
//   - options are numbered 1-4, not lettered (we store A-D);
//   - a withdrawn item reads "DROP", not "X";
//   - an item where NTA accepted two options reads "1,2". It has no single
//     correct letter, so it ships with the accepted letter a blind pass reached,
//     a notice naming both, and grace in mocks (keycheck.ts).

const NUM_TO_LETTER: Record<string, string> = { "1": "A", "2": "B", "3": "C", "4": "D" };

export type NtaKey = {
  /** Question number -> letter, or "X" for a dropped item. Feeds parseOfficialKey. */
  key: Record<string, string>;
  /** Items with more than one accepted option, letters in printed order. */
  multi: Record<string, string[]>;
};

/**
 * Turn a vision read of NTA's key (question -> cell text) into letters.
 * REFUSES an unreadable cell and a short key: a misread "5" or a missed column
 * must stop the run, never fall through to a derived answer.
 */
export function normaliseNtaKey(raw: Record<string, string>, total: number): NtaKey {
  const key: Record<string, string> = {};
  const multi: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(raw)) {
    const n = Number(k);
    if (!Number.isInteger(n) || n < 1 || n > total) throw new Error(`key has Q${k}, outside 1..${total}`);
    const cell = String(v ?? "").trim().toUpperCase();
    if (cell === "DROP" || cell === "X") {
      key[String(n)] = "X";
      continue;
    }
    const parts = cell.split(/\s*,\s*/).filter(Boolean);
    const letters = parts.map((p) => NUM_TO_LETTER[p]);
    if (!parts.length || letters.some((l) => !l)) {
      throw new Error(`Q${n}: key cell ${JSON.stringify(v)} is not 1-4, a list of them, or DROP`);
    }
    key[String(n)] = letters[0];
    if (letters.length > 1) multi[String(n)] = letters;
  }
  const missing: number[] = [];
  for (let n = 1; n <= total; n++) if (!(String(n) in key)) missing.push(n);
  if (missing.length) {
    throw new Error(
      `key is missing ${missing.length} of ${total} question(s): Q${missing.slice(0, 12).join(", Q")}` +
        `${missing.length > 12 ? ", ..." : ""}. A partial key must not be used as a full one.`
    );
  }
  return { key, multi };
}

/** The letter to ship for a two-answer item: one a blind pass reached, else the first. */
export function resolveAccepted(accepted: string[], a: string | undefined, b: string | undefined): string {
  const up = (x: string | undefined) => (x ?? "").trim().toUpperCase();
  if (accepted.includes(up(a))) return up(a);
  if (accepted.includes(up(b))) return up(b);
  return accepted[0];
}

export type AcceptedScore = {
  scored: number;
  match: number;
  mismatched: number[];
  byConfidence: Record<string, { ok: number; of: number }>;
};

/** Score a blind pass against a key, counting any accepted letter as right. */
export function scoreAccepted(
  key: Record<string, string>,
  multi: Record<string, string[]>,
  pass: { number: number; answer: string; confidence?: string }[]
): AcceptedScore {
  const s: AcceptedScore = { scored: 0, match: 0, mismatched: [], byConfidence: {} };
  for (const d of [...pass].sort((x, y) => x.number - y.number)) {
    const official = key[String(d.number)];
    if (!official || official === "X") continue;
    const accepted = multi[String(d.number)] ?? [official];
    const ok = accepted.includes(d.answer.trim().toUpperCase());
    s.scored++;
    if (ok) s.match++;
    else s.mismatched.push(d.number);
    const c = (d.confidence ?? "").trim().toUpperCase() || "?";
    s.byConfidence[c] ??= { ok: 0, of: 0 };
    s.byConfidence[c].of++;
    if (ok) s.byConfidence[c].ok++;
  }
  return s;
}
