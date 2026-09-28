/**
 * Integration test for the /guide/mht-cet-chemistry tree (the execution-mode-strand variant of the
 * MHT-CET Maths tier variant). Mirrors tests/guide-mht-cet-maths-playbooks.
 *
 * What it locks, beyond the Maths suite:
 *   - every rate and count the chapter table, the playbooks and the tail
 *     quote is RECOMPUTED from matrix.generated.ts (2024-2025 columns), so an
 *     ingest that moves the grid fails here instead of leaving stale prose;
 *   - the strand and tail sums reconcile to the whole bank and the whole paper;
 *   - every slug cross-reference (details, related, traps, formulas) resolves;
 *   - live: every taxonomy name resolves, and the two measured shapes the traps
 *     quote (the bank's HARD total, Electrochemistry's HARD, Kinetics' HARD-free pages) still hold.
 *
 * PROD-CONTRACT: matches the `tests/guide-*.test.ts` glob in
 * tests/prodContractFiles.ts, so the live half runs under
 * `npm run test:prod-contract`, not the default `npm test`.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  PLAYBOOKS,
  PLAYBOOK_SLUGS,
  playbooksInBucket,
} from "@/app/guide/mht-cet-chemistry/_data/playbooks";
import { PLAYBOOK_DETAILS } from "@/app/guide/mht-cet-chemistry/_data/playbook-details";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { STRATEGY_STRANDS, TAIL_CHAPTERS } from "@/app/guide/mht-cet-chemistry/_data/strategy";
import { DRIFT_ROWS, DRIFT_CALLOUTS } from "@/app/guide/mht-cet-chemistry/_data/trends";
import { CHAPTER_MATRIX, PAPER_TOTALS, SHIFT_PAPERS } from "@/app/guide/mht-cet-chemistry/_data/matrix.generated";
import { TRAP_SHAPES } from "@/app/guide/mht-cet-chemistry/_data/traps";
import { FORMULA_GROUPS } from "@/app/guide/mht-cet-chemistry/_data/reference";
import { CHAPTER_TABLE, OVERVIEW } from "@/app/guide/mht-cet-chemistry/_data/mht-cet-chemistry";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Recent-window rate (2024-2025 columns) for a chapter, from the grid. */
const RECENT = SHIFT_PAPERS.flatMap((p, i) => (p.year >= 2024 ? [i] : []));
function gridRate(chapter: string): number {
  const row = CHAPTER_MATRIX.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`no grid row for ${chapter}`);
  return RECENT.reduce((a, c) => a + row.counts[c], 0) / RECENT.length;
}
/** Rates are printed to 2 dp, so 0.875 prints as 0.88: allow half a hundredth. */
function expectRate(actual: number, grid: number, label: string) {
  expect(Math.abs(actual - grid), label).toBeLessThanOrEqual(0.00501);
}
function gridTotal(chapter: string): number {
  const row = CHAPTER_MATRIX.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`no grid row for ${chapter}`);
  return row.total;
}

describe("mht-cet-chemistry — static structure", () => {
  it("PLAYBOOK_SLUGS lists every playbook slug exactly once", () => {
    expect(PLAYBOOK_SLUGS).toHaveLength(PLAYBOOKS.length);
    expect(new Set(PLAYBOOK_SLUGS).size).toBe(PLAYBOOK_SLUGS.length);
  });

  it("every playbook is complete and has a deep dive", () => {
    for (const p of PLAYBOOKS) {
      expect(p.subtopics.length, p.slug).toBeGreaterThan(0);
      expect(p.summary.length, p.slug).toBeGreaterThan(60);
      const d = PLAYBOOK_DETAILS[p.slug];
      expect(d, `no deep dive for ${p.slug}`).toBeDefined();
      expect(d.story.length, p.slug).toBeGreaterThanOrEqual(2);
      expect(d.subSkills.length, p.slug).toBeGreaterThanOrEqual(3);
      expect(d.traps.length, p.slug).toBeGreaterThanOrEqual(2);
    }
    expect(Object.keys(PLAYBOOK_DETAILS).sort()).toEqual([...PLAYBOOK_SLUGS].sort());
  });

  it("each chapter appears in exactly one playbook", () => {
    const chapters = PLAYBOOKS.map((p) => p.chapter);
    expect(new Set(chapters).size).toBe(chapters.length);
  });

  it("strand sizes match what the strategy page claims", () => {
    expect(playbooksInBucket("calculate")).toHaveLength(8);
    expect(playbooksInBucket("reactions")).toHaveLength(6);
    expect(playbooksInBucket("recall")).toHaveLength(9);
    expect(PLAYBOOKS).toHaveLength(23);
    for (const s of STRATEGY_STRANDS) {
      const names = s.chapters.map((c) => c.chapter).sort();
      expect(names, s.id).toEqual(playbooksInBucket(s.id).map((p) => p.chapter).sort());
      expect(s.qCount, `${s.id} qCount`).toBe(s.chapters.reduce((a, c) => a + c.qCount, 0));
      expect(s.pctOfBank, `${s.id} pctOfBank`).toBe(Math.round((s.qCount / OVERVIEW.totalQ) * 100));
    }
  });

  it("the headline claims are arithmetic on the data", () => {
    const rate = (b: "calculate" | "reactions" | "recall") =>
      playbooksInBucket(b).reduce((a, p) => a + p.qPerPaper, 0);
    expect(Math.round(rate("recall") + rate("reactions"))).toBe(25); // "about 25 answered on sight"
    expect(Math.round(rate("calculate"))).toBe(21); // "the other 21"
    // "3% HARD" on every page
    expect(Math.round((OVERVIEW.difficulty.hard / OVERVIEW.totalQ) * 100)).toBe(3);
  });

  it("strands are stated with the numbers they sum to", () => {
    const rate = (id: string) =>
      STRATEGY_STRANDS.find((s) => s.id === id)!.chapters.reduce((a, c) => a + (PLAYBOOKS.find((p) => p.chapter === c.chapter)!.qPerPaper), 0);
    expect(rate("calculate").toFixed(1)).toBe("20.8");
    expect(rate("reactions").toFixed(1)).toBe("11.3");
    expect(rate("recall").toFixed(1)).toBe("13.6");
  });

  it("the 0.9 q/paper line holds both ways, and every playbook states the grid's numbers", () => {
    for (const row of CHAPTER_MATRIX) {
      const rate = gridRate(row.chapter);
      const pb = PLAYBOOKS.find((p) => p.chapter === row.chapter);
      if (rate >= 0.9) expect(pb, `${row.chapter} runs ${rate.toFixed(2)} q/paper but has no playbook`).toBeDefined();
      else expect(pb, `${row.chapter} runs ${rate.toFixed(2)} q/paper but has a playbook`).toBeUndefined();
      if (pb) {
        expectRate(pb.qPerPaper, rate, `${row.chapter} qPerPaper`);
        expect(pb.qCount, `${row.chapter} qCount`).toBe(row.total);
      }
    }
  });

  it("the chapter table and the tail agree with the grid and reconcile to the bank", () => {
    expect(CHAPTER_TABLE).toHaveLength(OVERVIEW.chapters);
    expect(CHAPTER_MATRIX).toHaveLength(OVERVIEW.chapters);
    for (const r of CHAPTER_TABLE) {
      expect(r.qCount, `${r.chapter} qCount`).toBe(gridTotal(r.chapter));
      expectRate(r.qPerPaper, gridRate(r.chapter), `${r.chapter} qPerPaper`);
      expect(r.pctTotal, `${r.chapter} pctTotal`).toBeCloseTo((r.qCount / OVERVIEW.totalQ) * 100, 1);
    }
    expect(CHAPTER_TABLE.reduce((a, r) => a + r.qCount, 0)).toBe(OVERVIEW.totalQ);
    const totalRate = CHAPTER_TABLE.reduce((a, r) => a + r.qPerPaper, 0);
    // Some recent papers are a question or two short in the bank, so the rates sum to the
    // grid's own average paper size over 2024-25, not to a flat 50.
    const recentMean = RECENT.reduce((a, i) => a + PAPER_TOTALS[i], 0) / RECENT.length;
    expect(Math.abs(totalRate - recentMean)).toBeLessThan(0.05);
    expect(recentMean).toBeGreaterThan(48);
    // sorted by recent weightage
    const rates = CHAPTER_TABLE.map((r) => r.qPerPaper);
    expect(rates).toEqual([...rates].sort((a, b) => b - a));
    for (const t of TAIL_CHAPTERS) {
      expect(t.qCount, t.chapter).toBe(gridTotal(t.chapter));
      expectRate(t.qPerPaper, gridRate(t.chapter), t.chapter);
    }
    const strands = STRATEGY_STRANDS.reduce((a, s) => a + s.qCount, 0);
    expect(strands + TAIL_CHAPTERS.reduce((a, t) => a + t.qCount, 0)).toBe(OVERVIEW.totalQ);
    expect(SHIFT_PAPERS).toHaveLength(OVERVIEW.papers);
  });

  it("every slug cross-reference resolves", () => {
    const slugs = new Set(PLAYBOOK_SLUGS);
    for (const d of Object.values(PLAYBOOK_DETAILS)) {
      for (const r of d.relatedSlugs) expect(slugs.has(r), `${d.slug} -> ${r}`).toBe(true);
    }
    for (const t of TRAP_SHAPES) {
      for (const a of t.affects) expect(slugs.has(a), `trap ${t.id} -> ${a}`).toBe(true);
    }
    for (const g of FORMULA_GROUPS) {
      const pb = PLAYBOOKS.find((p) => p.slug === g.playbookSlug);
      expect(pb, `formula group ${g.chapter}`).toBeDefined();
      expect(pb!.chapter).toBe(g.chapter);
    }
  });
});

describe.skipIf(!HAS_ENV)("mht-cet-chemistry — live taxonomy and bank", () => {
  let client: SupabaseClient;

  beforeAll(() => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  it("every playbook lists exactly its chapter's live subtopics", async () => {
    // Subtopics that hold practice questions only: a PYQ drill for them would be empty, so no
    // playbook lists them. Proven PYQ-free below, so this list cannot hide a real miss.
    const PRACTICE_ONLY = new Set(["Empirical and Molecular Formula"]);
    const taxonomy = await resolveTaxonomy(client, "MHT-CET", "Chemistry");
    for (const [, chap] of taxonomy.chapters) {
      for (const [name, id] of chap.subtopics) {
        if (!PRACTICE_ONLY.has(name)) continue;
        const { count } = await client.from("questions").select("id", { count: "exact", head: true })
          .eq("subtopic_id", id).eq("visibility", "PUBLIC").eq("question_kind", "pyq");
        expect(count, `${name} is listed as practice-only but holds PYQs`).toBe(0);
      }
    }
    const problems: string[] = [];
    for (const p of PLAYBOOKS) {
      const chap = taxonomy.chapters.get(p.chapter);
      if (!chap) {
        problems.push(`chapter "${p.chapter}"`);
        continue;
      }
      for (const s of p.subtopics) if (!chap.subtopics.has(s)) problems.push(`"${s}" not live in ${p.chapter}`);
      for (const s of chap.subtopics.keys()) if (!p.subtopics.includes(s) && !PRACTICE_ONLY.has(s)) problems.push(`"${s}" missing from ${p.slug}`);
    }
    expect(problems).toEqual([]);
  });

  it("every chapter/subtopic named in strategy, tail and trends resolves", async () => {
    const taxonomy = await resolveTaxonomy(client, "MHT-CET", "Chemistry");
    const refs: { where: string; chapter: string; subtopic?: string }[] = [];
    for (const s of STRATEGY_STRANDS) {
      for (const c of s.chapters) {
        refs.push({ where: s.id, chapter: c.chapter });
        for (const st of [...c.mustDrill, ...(c.skipSubtopics ?? []), ...(c.targetHard ?? [])]) {
          refs.push({ where: `${s.id}/${c.chapter}`, chapter: c.chapter, subtopic: st });
        }
      }
    }
    for (const t of TAIL_CHAPTERS) refs.push({ where: "tail", chapter: t.chapter });
    for (const r of CHAPTER_TABLE) refs.push({ where: "table", chapter: r.chapter });
    for (const r of DRIFT_ROWS) refs.push({ where: "drift", chapter: r.chapter });
    for (const c of DRIFT_CALLOUTS) {
      if (c.drill) refs.push({ where: "callout", chapter: c.drill.chapter, subtopic: c.drill.subtopic });
    }
    const unresolved = refs
      .filter((r) => {
        const chap = taxonomy.chapters.get(r.chapter);
        return !chap || (r.subtopic ? !chap.subtopics.has(r.subtopic) : false);
      })
      .map((r) => `${r.where}: ${r.chapter}${r.subtopic ? ` / ${r.subtopic}` : ""}`);
    expect(refs.length).toBeGreaterThan(100);
    expect(unresolved).toEqual([]);
  });

  it("the HARD counts the guide quotes still match the bank", async () => {
    const { data: exam } = await client.from("exams").select("id").eq("name", "MHT-CET").single();
    const { data: subject } = await client.from("subjects").select("id").eq("exam_id", exam!.id).eq("name", "Chemistry").single();
    const rows: { difficulty: string; chapters: { name: string } | null; subtopics: { name: string } | null }[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await client
        .from("questions")
        .select("difficulty, chapters(name), subtopics(name)")
        .eq("exam_id", exam!.id)
        .eq("subject_id", subject!.id)
        .eq("visibility", "PUBLIC")
        .eq("question_kind", "pyq")
        .order("id")
        .range(from, from + 999);
      expect(error).toBeNull();
      rows.push(...((data ?? []) as any[]));
      if ((data ?? []).length < 1000) break;
    }
    expect(rows).toHaveLength(OVERVIEW.totalQ);
    const hard = rows.filter((r) => r.difficulty === "HARD");
    expect(hard.length, "bank HARD").toBe(OVERVIEW.difficulty.hard); // "67"
    expect(hard.filter((r) => r.chapters?.name === "Electrochemistry").length, "Electrochemistry HARD").toBe(11);
    expect(
      hard.filter((r) => r.subtopics?.name === "Galvanic Cells, EMF, Nernst Equation and Thermodynamics").length,
      "galvanic-page HARD"
    ).toBe(10);
    const kineticsFree = ["First-Order Kinetics, Rate Constant and Half-Life", "Rate Law, Order, Molecularity and Rate Expression", "Rate of Reaction, Stoichiometry and Average Rate"];
    const onThree = rows.filter((r) => r.chapters?.name === "Chemical Kinetics" && kineticsFree.includes(r.subtopics?.name ?? ""));
    expect(onThree.length, "Kinetics' three HARD-free pages").toBe(103);
    expect(onThree.filter((r) => r.difficulty === "HARD")).toHaveLength(0);
  });
});
