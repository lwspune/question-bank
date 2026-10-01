/**
 * Spec for the CDS General Knowledge answer-provenance clause.
 *
 * The property that matters is NEGATIVE and asymmetric. Understating what we
 * hold — calling an official answer a derivation — is a missed claim. OVERstating
 * it — telling a student an LLM-derived answer came from an official key — is a
 * false claim about the trustworthiness of the answer itself, on a corpus where
 * nineteen of twenty papers have no key at all. Every test below exists to stop
 * the second.
 */
import { describe, expect, it } from "vitest";
import {
  DERIVED_CLAUSE,
  KEYED_CLAUSE,
  derivedModel,
  provenanceClause,
  restampSolution,
  solutionTail,
  stampNote,
} from "../scripts/cds-gs/provenance";
import { PAPERS } from "../scripts/cds-gs/config";

describe("provenanceClause", () => {
  it("claims a derivation for a paper with no published key", () => {
    expect(provenanceClause(false)).toBe(DERIVED_CLAUSE);
    expect(provenanceClause(false)).toMatch(/No official answer key/);
  });

  it("claims the official key ONLY for a paper that has one", () => {
    expect(provenanceClause(true)).toBe(KEYED_CLAUSE);
    expect(provenanceClause(true)).toMatch(/official UPSC provisional answer key/);
  });

  it("never claims an official key on a key-less paper — the clause that must not leak", () => {
    expect(provenanceClause(false)).not.toMatch(/official UPSC provisional answer key/);
  });

  it("names a different derived_model for each case, so the column agrees with the note", () => {
    expect(derivedModel(false)).toMatch(/blind passes/);
    expect(derivedModel(true)).toMatch(/official UPSC provisional key/);
    expect(derivedModel(true)).not.toBe(derivedModel(false));
  });
});

describe("stampNote", () => {
  it("appends the clause to the sitting's own note", () => {
    expect(stampNote("CDS (II) 2026 — General Knowledge", true)).toBe(
      "CDS (II) 2026 — General Knowledge" + KEYED_CLAUSE
    );
  });

  it("is idempotent — a re-run does not stamp twice", () => {
    const once = stampNote("CDS (I) 2025 — General Knowledge", false);
    expect(stampNote(once, false)).toBe(once);
  });

  it("does not add the KEYED clause to a row already carrying the DERIVED one", () => {
    // The cross-clause case: a paper that gained a key later must not end up
    // publishing two contradictory provenance statements on the same row.
    const derived = stampNote("CDS (II) 2026 — General Knowledge", false);
    expect(stampNote(derived, true)).toBe(derived);
  });

  it("does not add the DERIVED clause to a row already carrying the KEYED one", () => {
    const keyed = stampNote("CDS (II) 2026 — General Knowledge", true);
    expect(stampNote(keyed, false)).toBe(keyed);
  });

  it("tolerates a null note rather than writing the string 'null'", () => {
    expect(stampNote(null, false)).toBe(DERIVED_CLAUSE);
  });
});

describe("solutionTail — the bracket that ends every solution", () => {
  it("keeps the derived wording, with confidence, for a key-less paper", () => {
    expect(solutionTail({ hasAnswerKey: false, confidence: "HIGH", agreed: true })).toBe(
      "[Derived answer — this booklet carries no official key. Two independent blind derivations agreed; " +
        "confidence: HIGH. Verify before relying on it.]"
    );
    expect(solutionTail({ hasAnswerKey: false, confidence: "LOW", agreed: false })).toMatch(
      /were reconciled by hand; confidence: LOW/
    );
  });

  it("names the official key on a keyed paper and makes no derivation claim", () => {
    // 2026-II shipped 120 rows whose solution said 'no official key' while the
    // note said the opposite: the tail was hardcoded where the note was not.
    const tail = solutionTail({ hasAnswerKey: true, confidence: "HIGH", agreed: true });
    expect(tail).toMatch(/official UPSC provisional (answer )?key/);
    expect(tail).not.toMatch(/no official key/i);
    expect(tail).not.toMatch(/two independent blind derivations/i);
    expect(tail).not.toMatch(/confidence/i);
  });
});

describe("restampSolution — repairing rows already in the bank", () => {
  const body = "Hydrogen sulphide is the gas released by decay.";
  const derived = `${body} ${solutionTail({ hasAnswerKey: false, confidence: "HIGH", agreed: true })}`;
  const keyed = `${body} ${solutionTail({ hasAnswerKey: true, confidence: "HIGH", agreed: true })}`;

  it("swaps the derived tail for the keyed one on a keyed paper", () => {
    expect(restampSolution(derived, true)).toBe(keyed);
  });

  it("swaps a hand-reconciled derived tail too", () => {
    const reconciled = `${body} ${solutionTail({ hasAnswerKey: false, confidence: "MED", agreed: false })}`;
    expect(restampSolution(reconciled, true)).toBe(keyed);
  });

  it("is idempotent", () => {
    expect(restampSolution(restampSolution(derived, true), true)).toBe(keyed);
  });

  it("never touches a key-less paper's row", () => {
    expect(restampSolution(derived, false)).toBe(derived);
  });

  it("leaves a solution with no recognised tail unchanged rather than guessing", () => {
    expect(restampSolution(body, true)).toBe(body);
  });

  it("only replaces a tail at the END — a bracket quoted mid-text stays", () => {
    const mid = `${derived} A later remark.`;
    expect(restampSolution(mid, true)).toBe(mid);
  });
});

describe("against the real cds-gs config", () => {
  it("marks exactly one paper as key-backed, and it is 2026-2", () => {
    const keyed = Object.values(PAPERS).filter((p) => p.answerKey).map((p) => p.id);
    expect(keyed).toEqual(["2026-2"]);
  });

  it("every key-backed paper also declares its series — the key is per-series", () => {
    for (const p of Object.values(PAPERS)) {
      if (p.answerKey) expect(p.series).toBeTruthy();
    }
  });

  it("the derived clause survives the provenance cap — it is stripped, not published", () => {
    // publicPyqNote strips the bracketed clause before applying its 48-char cap,
    // so the clause length is irrelevant to publication but the BARE note is not.
    for (const p of Object.values(PAPERS)) {
      expect(p.pyqNote.length).toBeLessThan(48);
    }
  });
});
