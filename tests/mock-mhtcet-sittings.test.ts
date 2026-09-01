/**
 * The MHT-CET sitting registry — 45 shifts, each yielding up to TWO papers.
 *
 * WHY A REGISTRY AT ALL: `pyq_month` cannot separate these sittings (17 of them
 * share (2023, "May")), so the NDA year+month discovery loop would collapse them
 * onto one slug and, since the mock id is slugToUuid(slug), SILENTLY overwrite
 * 16 of the 17. Sittings are therefore keyed by `source_file`, the CDS/NEET shape.
 *
 * WHY IT IS PART-DERIVED, PART-HAND-WRITTEN: `scripts/mhtcet/config.ts` is the
 * source of record for the 13 April-2025 shifts (it is what the ingestion
 * pipeline stamps into source_file), so those are DERIVED — a renamed booklet
 * there must not leave a mock silently empty here. The other 32 shifts came in
 * through the generic /upload path years earlier and have no config anywhere in
 * the repo, so they can only be hand-written.
 */
import { describe, it, expect } from "vitest";
import {
  MHT_CET_SITTINGS,
  deriveMhtCetSittings,
  mhtCetMockSlug,
  mhtCetMockTitle,
} from "../scripts/mocks/mhtcetSittings";
import { SHIFTS } from "../scripts/mhtcet/config";
import {
  MHT_CET_MATHS_PAPER,
  MHT_CET_PHY_CHEM_PAPER,
} from "@/lib/mocks/blueprints";

describe("MHT-CET sitting registry", () => {
  const sittings = deriveMhtCetSittings();

  it("covers all 45 sittings in the bank", () => {
    expect(sittings).toHaveLength(45);
  });

  it("has a unique key and a unique source file for every sitting", () => {
    expect(new Set(sittings.map((s) => s.key)).size).toBe(45);
    expect(new Set(sittings.map((s) => s.sourceFile)).size).toBe(45);
  });

  /**
   * The failure this guards is silent: two sittings deriving one slug means one
   * upsert overwrites the other (same slugToUuid id) and a real paper vanishes
   * with no error. Checked across BOTH papers at once, since they share a stem.
   */
  it("derives 90 distinct slugs across the two papers", () => {
    const slugs = sittings.flatMap((s) => [
      mhtCetMockSlug(s.key, MHT_CET_MATHS_PAPER.code),
      mhtCetMockSlug(s.key, MHT_CET_PHY_CHEM_PAPER.code),
    ]);
    expect(slugs).toHaveLength(90);
    expect(new Set(slugs).size).toBe(90);
  });

  it("emits slugs that are URL-safe and exam-prefixed", () => {
    for (const s of sittings) {
      const slug = mhtCetMockSlug(s.key, MHT_CET_MATHS_PAPER.code);
      expect(slug).toMatch(/^mht-cet-[a-z0-9-]+$/);
    }
  });

  /**
   * DRIFT GUARD: the 13 April-2025 sittings must come from the ingestion config,
   * not a hand-copied duplicate of it. Rename a booklet there and this fails
   * here rather than shipping an empty mock.
   */
  it("derives the 2025 April sittings from scripts/mhtcet/config.ts", () => {
    const configKeys = Object.keys(SHIFTS);
    expect(configKeys).toHaveLength(13);
    for (const key of configKeys) {
      const s = sittings.find((x) => x.key === key);
      expect(s, `sitting ${key} missing`).toBeDefined();
      expect(s!.sourceFile).toBe(SHIFTS[key].sourceFile);
      expect(s!.year).toBe(SHIFTS[key].pyqYear);
      // The label is the config's own provenance string, verbatim — inventing a
      // different one here is exactly the drift this test exists to prevent.
      expect(s!.label).toBe(SHIFTS[key].pyqNote);
    }
  });

  it("keeps every hand-written sitting out of the derived set", () => {
    const configKeys = new Set(Object.keys(SHIFTS));
    const handWritten = MHT_CET_SITTINGS.filter((s) => !configKeys.has(s.key));
    expect(handWritten).toHaveLength(32);
    // A hand-written entry duplicating a config source file would produce two
    // sittings for one paper.
    const configFiles = new Set(Object.values(SHIFTS).map((s) => s.sourceFile));
    for (const s of handWritten) expect(configFiles.has(s.sourceFile)).toBe(false);
  });

  it("agrees with its own key about the year", () => {
    for (const s of sittings) {
      expect(s.key.startsWith(String(s.year)), `${s.key} vs ${s.year}`).toBe(true);
    }
  });

  /**
   * The user's call: ship only papers that reconstruct at their TRUE length.
   * 30 of the 90 are short — 10 because a flawed question is deliberately
   * withheld PRIVATE (irrecoverable), 20 because rows are absent from the bank
   * (closable by a future ingest) — so 60 ship.
   */
  it("holds exactly 30 papers, leaving 60 to ship", () => {
    const heldMaths = sittings.filter((s) => s.hold?.maths).length;
    const heldPhyChem = sittings.filter((s) => s.hold?.phyChem).length;
    expect(heldMaths).toBe(12);
    expect(heldPhyChem).toBe(18);
    expect(90 - heldMaths - heldPhyChem).toBe(60);
  });

  /** A hold with no stated reason is indistinguishable from a mistake. */
  it("states a reason and a count for every hold", () => {
    for (const s of sittings) {
      for (const reason of [s.hold?.maths, s.hold?.phyChem]) {
        if (!reason) continue;
        expect(reason.length, `${s.key}: empty hold reason`).toBeGreaterThan(10);
        // Every reason names the shortfall as "<got>/<expected>".
        expect(reason, `${s.key}: "${reason}"`).toMatch(/\d+\/(50|100)/);
      }
    }
  });

  it("titles a dated sitting with its date and an undated one without", () => {
    expect(mhtCetMockTitle(2023, "3 May Shift 1", MHT_CET_MATHS_PAPER)).toBe(
      "MHT-CET 2023 (3 May Shift 1) — Paper I — Mathematics"
    );
    expect(mhtCetMockTitle(2021, null, MHT_CET_PHY_CHEM_PAPER)).toBe(
      "MHT-CET 2021 — Paper II — Physics & Chemistry"
    );
  });

  /**
   * `MHT_CET_3rdMay2023_S1_QB.xlsx` stores the pyq_note "3rd May 2nd Shift",
   * contradicting its own filename. Settled against the local source booklets
   * (2026-09-01): its stems appear only in "3 may shift 1 (ques).docx", so the
   * FILENAME is right and the note is a typo. The registry must not inherit the
   * typo — a wrong label would put this paper under Shift 2's identity while a
   * separate file already legitimately claims that sitting.
   */
  it("labels MHT_CET_3rdMay2023_S1_QB as Shift 1, not the note's Shift 2", () => {
    const s = sittings.find((x) => x.sourceFile === "MHT_CET_3rdMay2023_S1_QB.xlsx");
    expect(s).toBeDefined();
    expect(s!.key).toBe("2023-may-03-s1");
    expect(s!.label).toBe("3 May Shift 1");
    // ...and the genuine Shift 2 file keeps its own distinct identity.
    const s2 = sittings.find(
      (x) => x.sourceFile === "MHT_CET_3rdMay2023_Shift2_QuestionBank.xlsx"
    );
    expect(s2!.key).toBe("2023-may-03-s2");
  });
});
