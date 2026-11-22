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
