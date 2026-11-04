/**
 * The owner's 2026-11-03 ruling on the 203 MPSC key doubts listed in
 * scripts/mpsc/KEY_DOUBTS.md: notice + grace, MPSC's key kept.
 *
 * The ledger and the notices are checked BOTH ways: every ledger row has a
 * notice, and every notice is a ledger row, so neither can be edited alone.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_PAPERS, expectedNumbers } from "../scripts/mpsc/config";
import { KEY_DOUBT_NOTICES } from "../scripts/mpsc/keyDoubtNotices";
import { noticeTextFor, withNotice } from "../scripts/mpsc/notice";
import { PAPERS as MAINS_PAPERS, sourceFileFor } from "../scripts/mpsc-mains/config";
import { MAINS_KEY_DOUBT_NOTICES } from "../scripts/mpsc-mains/keyDoubtNotices";
import { deriveMpscSittings } from "../scripts/mocks/mpscSittings";
import { deriveMainsSittings } from "../scripts/mocks/mpscMainsSittings";

const GRACE_EN = "In PYQ Vault mocks this question is awarded to every candidate.";
const GRACE_MR = "PYQ Vault च्या सराव परीक्षांमध्ये या प्रश्नाचे गुण सर्व उमेदवारांना दिले जातात.";

/** (source_file, question number) pairs from the committed ledger. */
function ledger(): { sourceFile: string; n: number }[] {
  const text = readFileSync(join(process.cwd(), "scripts", "mpsc", "KEY_DOUBTS.md"), "utf8").replace(/\r/g, "");
  const out: { sourceFile: string; n: number }[] = [];
  let sourceFile: string | null = null;
  for (const line of text.split("\n")) {
    const h = line.match(/^## (MPSC-\S+)/);
    if (h) {
      sourceFile = h[1];
      continue;
    }
    const r = line.match(/^\| (\d+) \| [A-D] \|/);
    if (r && sourceFile) out.push({ sourceFile, n: Number(r[1]) });
  }
  return out;
}

/** Every (source_file, Q) a notice covers. A joint Mains paper covers each exam's copy. */
function noticed(): Set<string> {
  const out = new Set<string>();
  for (const [id, byQ] of Object.entries(KEY_DOUBT_NOTICES)) {
    const p = ALL_PAPERS.find((x) => x.id === id)!;
    for (const n of Object.keys(byQ)) out.add(`${p.sourceFile}#${n}`);
  }
  for (const [id, byQ] of Object.entries(MAINS_KEY_DOUBT_NOTICES)) {
    const p = MAINS_PAPERS.find((x) => x.id === id)!;
    for (const n of Object.keys(byQ)) for (const e of p.exams) out.add(`${sourceFileFor(p, e)}#${n}`);
  }
  return out;
}

describe("MPSC key-doubt notices (owner, 2026-11-03)", () => {
  it("the ledger lists 209 questions (203 of 2026-11-03, ssp-2025 Q39, and 2025-b Q1/Q20/Q87 + ssp-2026 Q60/Q77 of 2026-11-04)", () => {
    expect(ledger()).toHaveLength(209);
  });

  it("every ledger row has a notice", () => {
    const have = noticed();
    const missing = ledger().filter((r) => !have.has(`${r.sourceFile}#${r.n}`));
    expect(missing).toEqual([]);
  });

  it("every notice is a ledger row (a joint paper's twin copy aside)", () => {
    const rows = new Set(ledger().map((r) => `${r.sourceFile}#${r.n}`));
    const paperOf = (k: string) => k.replace(/-(ASO|STI|PSI|SSM|GRPB)#/, "#");
    const ledgerPapers = new Set([...rows].map(paperOf));
    const extra = [...noticed()].filter((k) => !rows.has(k) && !ledgerPapers.has(paperOf(k)));
    expect(extra).toEqual([]);
  });

  it("every Prelims notice names a real paper and a question it prints", () => {
    for (const [id, byQ] of Object.entries(KEY_DOUBT_NOTICES)) {
      const p = ALL_PAPERS.find((x) => x.id === id);
      expect(p, id).toBeDefined();
      const nums = new Set(expectedNumbers(p!));
      for (const n of Object.keys(byQ).map(Number)) expect(nums.has(n), `${id} Q${n}`).toBe(true);
    }
  });

  it("every Mains notice names a real paper and a question it prints", () => {
    for (const [id, byQ] of Object.entries(MAINS_KEY_DOUBT_NOTICES)) {
      const p = MAINS_PAPERS.find((x) => x.id === id);
      expect(p, id).toBeDefined();
      for (const n of Object.keys(byQ).map(Number)) expect(n >= 1 && n <= p!.questions, `${id} Q${n}`).toBe(true);
    }
  });

  it("the config papers carry the Prelims notices, so the mock graces them", () => {
    const sittings = deriveMpscSittings(ALL_PAPERS, () => [], undefined, () => ({}));
    for (const [id, byQ] of Object.entries(KEY_DOUBT_NOTICES)) {
      const p = ALL_PAPERS.find((x) => x.id === id)!;
      for (const n of Object.keys(byQ).map(Number)) expect(p.notices?.[n], `${id} Q${n}`).toEqual(byQ[n]);
      const s = sittings.find((x) => x.key === id)!;
      for (const n of Object.keys(byQ).map(Number)) expect(s.graceNumbers, `${id} Q${n}`).toContain(n);
    }
  });

  it("the Mains papers carry their notices and every exam's mock graces them", () => {
    const sittings = deriveMainsSittings(
      MAINS_PAPERS.filter((p) => !p.dropped && !p.missingQuestions?.length),
      () => ({})
    );
    for (const [id, byQ] of Object.entries(MAINS_KEY_DOUBT_NOTICES)) {
      const p = MAINS_PAPERS.find((x) => x.id === id)!;
      for (const n of Object.keys(byQ).map(Number)) expect(p.notices?.[n], `${id} Q${n}`).toBe(byQ[n]);
      for (const e of p.exams) {
        const s = sittings.find((x) => x.key === `${id}:${e}`)!;
        for (const n of Object.keys(byQ).map(Number)) expect(s.graceNumbers, `${id}:${e} Q${n}`).toContain(n);
      }
    }
  });

  it("a Mains notice adds to the key's cancelled questions, it does not replace them", () => {
    const p = { ...MAINS_PAPERS.find((x) => !x.dropped && !x.missingQuestions?.length)!, notices: { 7: "x" } };
    const [s] = deriveMainsSittings([p], () => ({ 3: "#", 7: "A", 9: "B" }));
    expect(s.graceNumbers).toEqual([3, 7]);
  });

  it("every notice reads as a notice, in its own language, and ends on the grace line", () => {
    for (const byQ of Object.values(KEY_DOUBT_NOTICES)) {
      for (const n of Object.values(byQ)) {
        expect(n.en.startsWith("**Notice:** ")).toBe(true);
        expect(n.en.endsWith(GRACE_EN)).toBe(true);
        expect(n.mr.startsWith("**सूचना:** ")).toBe(true);
        expect(n.mr.endsWith(GRACE_MR)).toBe(true);
      }
    }
    for (const byQ of Object.values(MAINS_KEY_DOUBT_NOTICES)) {
      for (const t of Object.values(byQ)) {
        const ok = (t.startsWith("**Notice:** ") && t.endsWith(GRACE_EN)) || (t.startsWith("**सूचना:** ") && t.endsWith(GRACE_MR));
        expect(ok, t.slice(0, 80)).toBe(true);
      }
    }
  });

  it("no notice carries a dash the house style forbids", () => {
    const all = [
      ...Object.values(KEY_DOUBT_NOTICES).flatMap((b) => Object.values(b).flatMap((n) => [n.en, n.mr])),
      ...Object.values(MAINS_KEY_DOUBT_NOTICES).flatMap((b) => Object.values(b)),
    ];
    for (const t of all) expect(/—|–| -- /.test(t), t.slice(0, 80)).toBe(false);
  });
});

describe("withNotice: what a row's solution becomes once its notice is added", () => {
  const N = "**Notice:** MPSC's key gives option C. In PYQ Vault mocks this question is awarded to every candidate.";

  it("an empty solution becomes the notice", () => {
    expect(withNotice(null, N)).toBe(N);
    expect(withNotice("  ", N)).toBe(N);
  });

  it("a worked solution keeps its working, under the notice", () => {
    expect(withNotice("Step one.\nSo the answer is (C) x.", N)).toBe(`${N}\n\nStep one.\nSo the answer is (C) x.`);
  });

  it("a solution that already heads with the notice is left alone (re-running writes nothing)", () => {
    expect(withNotice(`${N}\n\nStep one.`, N)).toBeNull();
    expect(withNotice(N, N)).toBeNull();
  });
});

describe("noticeTextFor: a row gets the notice in the language it is printed in", () => {
  const n = { en: "EN", mr: "MR" };
  it("an English row gets the English notice", () => expect(noticeTextFor("Which of the following ?", n)).toBe("EN"));
  it("a Marathi-only row gets the Marathi notice", () => expect(noticeTextFor("खालीलपैकी कोणते ?", n)).toBe("MR"));
  it("a row that only quotes a Marathi word inside English is still English", () =>
    expect(noticeTextFor("The word 'साप' in the sentence means", n)).toBe("EN"));
});
