/**
 * Diff independently derived ISC answers against CISCE's official marking
 * scheme — the pure core.
 *
 * ── WHY ONLY MCQ LETTERS ARE COMPARED MECHANICALLY ───────────────────────────
 * CISCE's own key for ISC 2025 Maths 1(xiv) reads:
 *
 *     60/343  or  0.175  or  0.18  or  0.17  or  5/7 x 4/7 x 3/7
 *
 * Five printed forms of one number, including an unevaluated product. A string
 * comparison reports four disagreements where there are none; a fuzzy one hides
 * a real error behind a tolerance nobody chose. Neither is a measurement.
 *
 * So free-response rows are routed to NEEDS_ADJUDICATION — a human reads them —
 * and are EXCLUDED FROM THE RATE rather than quietly counted as either. The
 * summary reports that exclusion explicitly, because a rate computed over a
 * subset is not a rate for the corpus. This project has the scar: CLAUDE.md
 * records a "99.4% of temp writes" figure that was a percentage of the TRACKED
 * subset and wrong by an order of magnitude as a percentage of the database.
 *
 * ── WHY NOTHING IS EVER DROPPED ──────────────────────────────────────────────
 * A derived answer with no official entry becomes NO_KEY, and an official entry
 * nobody derived becomes MISSING_DERIVATION. Both are rows in the output. The
 * 2026 corpus has no key at all, and it must read as UNVERIFIED — never as
 * verified-and-fine, which is what silently dropping unmatched rows would make
 * it look like.
 */

export type Confidence = "HIGH" | "MEDIUM" | "LOW";

export type DerivedAnswer = {
  ref: string;
  /** MCQ option letter, absent for free response. */
  label?: string;
  value: string;
  working?: string;
  confidence: Confidence;
};

export type OfficialAnswer = {
  ref: string;
  /** Accepted MCQ letters. Empty for free response. More than one = grace. */
  labels: string[];
  value: string;
  acceptedAlternatives?: string[];
  /** The paper accepted more than one answer; award to all. */
  grace?: boolean;
  note?: string;
};

export type Verdict =
  | "AGREE"
  | "DISAGREE"
  | "NEEDS_ADJUDICATION"
  | "NO_KEY"
  | "MISSING_DERIVATION";

export type CrossCheckRow = {
  ref: string;
  verdict: Verdict;
  derived: string;
  official: string;
  confidence?: Confidence;
  grace?: boolean;
  reason: string;
};

const norm = (s: string) => s.trim().toUpperCase();

function officialText(official: OfficialAnswer): string {
  const parts: string[] = [];
  if (official.labels.length) parts.push(official.labels.join(" or "));
  if (official.value) parts.push(official.value);
  if (official.acceptedAlternatives?.length) {
    parts.push(`(also accepted: ${official.acceptedAlternatives.join(", ")})`);
  }
  return parts.join(" — ");
}

function derivedText(derived: DerivedAnswer): string {
  return [derived.label, derived.value].filter(Boolean).join(" — ");
}

export function crossCheck(
  derived: readonly DerivedAnswer[],
  key: readonly OfficialAnswer[]
): CrossCheckRow[] {
  const byRef = new Map(key.map((k) => [k.ref, k]));
  const seen = new Set<string>();
  const rows: CrossCheckRow[] = [];

  for (const d of derived) {
    const official = byRef.get(d.ref);
    if (!official) {
      rows.push({
        ref: d.ref,
        verdict: "NO_KEY",
        derived: derivedText(d),
        official: "",
        confidence: d.confidence,
        reason:
          "No official answer held for this question — derived but UNVERIFIED. " +
          "This is the whole of the 2026 corpus until CISCE publishes its key.",
      });
      continue;
    }
    seen.add(d.ref);

    // Free response: the key may print several equivalent forms, so no
    // mechanical verdict is honest. Hand it to a reader.
    if (official.labels.length === 0 || !d.label) {
      rows.push({
        ref: d.ref,
        verdict: "NEEDS_ADJUDICATION",
        derived: derivedText(d),
        official: officialText(official),
        confidence: d.confidence,
        grace: official.grace,
        reason:
          "Free-response answer — CISCE accepts multiple printed forms of the " +
          "same value, so equivalence must be read, not string-matched.",
      });
      continue;
    }

    const accepted = official.labels.map(norm);
    const agrees = accepted.includes(norm(d.label));
    rows.push({
      ref: d.ref,
      verdict: agrees ? "AGREE" : "DISAGREE",
      derived: derivedText(d),
      official: officialText(official),
      confidence: d.confidence,
      grace: official.grace,
      reason: agrees
        ? official.grace
          ? `Matches one of ${accepted.length} accepted answers (grace question).`
          : "Letter matches the official key."
        : `Derived ${norm(d.label)}, official ${accepted.join(" or ")}.`,
    });
  }

  for (const k of key) {
    if (seen.has(k.ref)) continue;
    rows.push({
      ref: k.ref,
      verdict: "MISSING_DERIVATION",
      derived: "",
      official: officialText(k),
      grace: k.grace,
      reason: "An official answer exists but nothing was derived for it.",
    });
  }

  return rows;
}

export type Summary = {
  mechanical: {
    agree: number;
    disagree: number;
    total: number;
    /** null when nothing is mechanically comparable — not 0, and not 100. */
    ratePct: number | null;
  };
  needsAdjudication: number;
  noKey: number;
  missingDerivation: number;
  graceRows: number;
  /** Stated so the rate is never quoted without its denominator. */
  scopeNote: string;
};

export function summarise(rows: readonly CrossCheckRow[]): Summary {
  const agree = rows.filter((r) => r.verdict === "AGREE").length;
  const disagree = rows.filter((r) => r.verdict === "DISAGREE").length;
  const total = agree + disagree;
  return {
    mechanical: {
      agree,
      disagree,
      total,
      ratePct: total === 0 ? null : (agree / total) * 100,
    },
    needsAdjudication: rows.filter((r) => r.verdict === "NEEDS_ADJUDICATION").length,
    noKey: rows.filter((r) => r.verdict === "NO_KEY").length,
    missingDerivation: rows.filter((r) => r.verdict === "MISSING_DERIVATION").length,
    graceRows: rows.filter((r) => r.grace).length,
    scopeNote:
      "Rate covers MCQ rows with an official key ONLY. Free-response rows are " +
      "excluded pending adjudication and unkeyed rows are excluded entirely; " +
      "both are counted separately above. This is not an accuracy figure for " +
      "the whole corpus.",
  };
}
