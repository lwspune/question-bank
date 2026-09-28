/**
 * Integration test for the /guide/mht-cet-physics tree (Template C, the
 * MHT-CET Maths tier variant). Mirrors tests/guide-mht-cet-maths-playbooks.
 *
 * What it locks, beyond the Maths suite:
 *   - every rate and count the chapter table, the playbooks and the tail
 *     quote is RECOMPUTED from matrix.generated.ts (2024-2025 columns), so an
 *     ingest that moves the grid fails here instead of leaving stale prose;
 *   - the strand and tail sums reconcile to the whole bank and the whole paper;
 *   - every slug cross-reference (details, related, traps, formulas) resolves;
 *   - live: every taxonomy name resolves, and the two measured shapes the traps
 *     quote (ratio stems, figure questions) still match the bank.
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
} from "@/app/guide/mht-cet-physics/_data/playbooks";
import { PLAYBOOK_DETAILS } from "@/app/guide/mht-cet-physics/_data/playbook-details";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { STRATEGY_STRANDS, TAIL_CHAPTERS } from "@/app/guide/mht-cet-physics/_data/strategy";
import { DRIFT_ROWS, DRIFT_CALLOUTS } from "@/app/guide/mht-cet-physics/_data/trends";
import { CHAPTER_MATRIX, SHIFT_PAPERS } from "@/app/guide/mht-cet-physics/_data/matrix.generated";
import { TRAP_SHAPES } from "@/app/guide/mht-cet-physics/_data/traps";
import { FORMULA_GROUPS } from "@/app/guide/mht-cet-physics/_data/formulas";
import { CHAPTER_TABLE, OVERVIEW } from "@/app/guide/mht-cet-physics/_data/mht-cet-physics";

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
function gridTotal(chapter: string): number {
  const row = CHAPTER_MATRIX.find((r) => r.chapter === chapter);
  if (!row) throw new Error(`no grid row for ${chapter}`);
  return row.total;
}

describe("mht-cet-physics — static structure", () => {
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
    expect(playbooksInBucket("cornerstone")).toHaveLength(6);
    expect(playbooksInBucket("quickwin")).toHaveLength(6);
    expect(playbooksInBucket("longtail")).toHaveLength(9);
    expect(PLAYBOOKS).toHaveLength(21);
    for (const s of STRATEGY_STRANDS) {
      const names = s.chapters.map((c) => c.chapter).sort();
      expect(names, s.id).toEqual(playbooksInBucket(s.id).map((p) => p.chapter).sort());
      expect(s.qCount, `${s.id} qCount`).toBe(s.chapters.reduce((a, c) => a + c.qCount, 0));
      expect(s.pctOfBank, `${s.id} pctOfBank`).toBe(Math.round((s.qCount / OVERVIEW.totalQ) * 100));
    }
  });

  it("the headline claims are arithmetic on the data", () => {
    const qw = playbooksInBucket("quickwin");
    const qwRate = qw.reduce((a, p) => a + p.qPerPaper, 0);
    expect(Math.round(qwRate)).toBe(13); // "13 questions a paper"
    expect(Math.max(...qw.map((p) => p.pctHard))).toBe(14); // "14% HARD or less"
    const cs = playbooksInBucket("cornerstone").reduce((a, p) => a + p.qPerPaper, 0);
    expect(Math.round((cs / OVERVIEW.paper.questions) * 100)).toBe(37); // "37% of the Physics half"
  });

  it("every quick-win is cheaper than the whole bank", () => {
    const bankHard = Math.round((OVERVIEW.difficulty.hard / OVERVIEW.totalQ) * 100);
    for (const p of playbooksInBucket("quickwin")) expect(p.pctHard, p.slug).toBeLessThan(bankHard);
  });

  it("the 0.9 q/paper line holds both ways, and every playbook states the grid's numbers", () => {
    for (const row of CHAPTER_MATRIX) {
      const rate = gridRate(row.chapter);
      const pb = PLAYBOOKS.find((p) => p.chapter === row.chapter);
      if (rate >= 0.9) expect(pb, `${row.chapter} runs ${rate.toFixed(2)} q/paper but has no playbook`).toBeDefined();
      else expect(pb, `${row.chapter} runs ${rate.toFixed(2)} q/paper but has a playbook`).toBeUndefined();
      if (pb) {
        expect(pb.qPerPaper, `${row.chapter} qPerPaper`).toBeCloseTo(rate, 2);
        expect(pb.qCount, `${row.chapter} qCount`).toBe(row.total);
      }
    }
  });

  it("the chapter table and the tail agree with the grid and reconcile to the bank", () => {
    expect(CHAPTER_TABLE).toHaveLength(OVERVIEW.chapters);
    expect(CHAPTER_MATRIX).toHaveLength(OVERVIEW.chapters);
    for (const r of CHAPTER_TABLE) {
      expect(r.qCount, `${r.chapter} qCount`).toBe(gridTotal(r.chapter));
      expect(r.qPerPaper, `${r.chapter} qPerPaper`).toBeCloseTo(gridRate(r.chapter), 2);
      expect(r.pctTotal, `${r.chapter} pctTotal`).toBeCloseTo((r.qCount / OVERVIEW.totalQ) * 100, 1);
    }
    expect(CHAPTER_TABLE.reduce((a, r) => a + r.qCount, 0)).toBe(OVERVIEW.totalQ);
    const totalRate = CHAPTER_TABLE.reduce((a, r) => a + r.qPerPaper, 0);
    expect(Math.abs(totalRate - OVERVIEW.paper.questions)).toBeLessThan(0.2);
    // sorted by recent weightage
    const rates = CHAPTER_TABLE.map((r) => r.qPerPaper);
    expect(rates).toEqual([...rates].sort((a, b) => b - a));
    for (const t of TAIL_CHAPTERS) {
      expect(t.qCount, t.chapter).toBe(gridTotal(t.chapter));
      expect(t.qPerPaper, t.chapter).toBeCloseTo(gridRate(t.chapter), 2);
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

describe.skipIf(!HAS_ENV)("mht-cet-physics — live taxonomy and bank", () => {
  let client: SupabaseClient;

  beforeAll(() => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  it("every playbook lists exactly its chapter's live subtopics", async () => {
    const taxonomy = await resolveTaxonomy(client, "MHT-CET", "Physics");
    const problems: string[] = [];
    for (const p of PLAYBOOKS) {
      const chap = taxonomy.chapters.get(p.chapter);
      if (!chap) {
        problems.push(`chapter "${p.chapter}"`);
        continue;
      }
      for (const s of p.subtopics) if (!chap.subtopics.has(s)) problems.push(`"${s}" not live in ${p.chapter}`);
      for (const s of chap.subtopics.keys()) if (!p.subtopics.includes(s)) problems.push(`"${s}" missing from ${p.slug}`);
    }
    expect(problems).toEqual([]);
  });

  it("every chapter/subtopic named in strategy, tail and trends resolves", async () => {
    const taxonomy = await resolveTaxonomy(client, "MHT-CET", "Physics");
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

  it("the ratio and figure counts the traps quote still match the bank", async () => {
    const ratio = TRAP_SHAPES.find((t) => t.id === "ratio-by-calculation")!;
    const [, ratioQ, ratioCh] = /is in (\d+) question stems across (\d+) of the/.exec(ratio.mechanic)!;
    const fig = TRAP_SHAPES.find((t) => t.id === "figure-assumed")!;
    const [, figQ, figCh] = /(\d+) Physics questions across (\d+) chapters carry a figure/.exec(fig.mechanic)!;

    const { data: exam } = await client.from("exams").select("id").eq("name", "MHT-CET").single();
    const { data: subject } = await client.from("subjects").select("id").eq("exam_id", exam!.id).eq("name", "Physics").single();
    const rows: { chapter_id: string; text: string; image_url: string | null }[] = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await client
        .from("questions")
        .select("chapter_id, text, image_url")
        .eq("exam_id", exam!.id)
        .eq("subject_id", subject!.id)
        .eq("visibility", "PUBLIC")
        .eq("question_kind", "pyq")
        .order("id")
        .range(from, from + 999);
      expect(error).toBeNull();
      rows.push(...(data ?? []));
      if ((data ?? []).length < 1000) break;
    }
    expect(rows).toHaveLength(OVERVIEW.totalQ);
    const ratioRows = rows.filter((r) => /\bratio\b/i.test(r.text));
    const figRows = rows.filter((r) => r.image_url);
    expect(ratioRows.length, "ratio stems").toBe(Number(ratioQ));
    expect(new Set(ratioRows.map((r) => r.chapter_id)).size, "ratio chapters").toBe(Number(ratioCh));
    expect(figRows.length, "figure questions").toBe(Number(figQ));
    expect(new Set(figRows.map((r) => r.chapter_id)).size, "figure chapters").toBe(Number(figCh));
  });
});
