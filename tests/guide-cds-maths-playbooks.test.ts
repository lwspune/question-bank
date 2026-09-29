/**
 * Live half of the /guide/cds-maths checks (the offline half is tests/cds-maths-guide-data.test.ts and
 * tests/cds-trends-editorial.test.ts; the grid itself is pinned by `npm run cds:matrix -- --check`).
 *
 * Two things only the live bank can prove:
 *   - every subtopic NAME the guide drills (playbook subtopics, mustDrill, skipSubtopics, targetHard)
 *     resolves — a typo or a later re-cut renders an empty /browse drill and no error;
 *   - every "Name (count · N% HARD)" pair in CHAPTER_TABLE's focus text, and each chapter's %HARD,
 *     still matches the bank.
 *
 * PROD-CONTRACT: matches the `tests/guide-*.test.ts` glob in tests/prodContractFiles.ts, so it runs
 * under `npm run test:prod-contract`, not the default `npm test`.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolveTaxonomy, type ResolvedTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { PLAYBOOKS } from "@/app/guide/cds-maths/_data/playbooks";
import { STRATEGY_STRANDS } from "@/app/guide/cds-maths/_data/strategy";
import { CHAPTER_TABLE } from "@/app/guide/cds-maths/_data/cds-maths";
import { retryOnStatementTimeout } from "./helpers/retryTimeout";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type Row = { difficulty: string | null; subtopics: { name: string } | null };

describe.skipIf(!HAS_ENV)("cds-maths guide — live taxonomy and counts", () => {
  let sb: SupabaseClient;
  let tax: ResolvedTaxonomy;

  beforeAll(async () => {
    sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    tax = await resolveTaxonomy(sb, "CDS", "Mathematics");
  });

  it("every drilled subtopic name resolves in its chapter", () => {
    const missing: string[] = [];
    const check = (chapter: string, names: string[]) => {
      const ch = tax.chapters.get(chapter);
      if (!ch) return missing.push(`chapter: ${chapter}`);
      for (const n of names) if (!ch.subtopics.has(n)) missing.push(`${chapter} → ${n}`);
    };
    for (const p of PLAYBOOKS) check(p.chapter, p.subtopics);
    for (const s of STRATEGY_STRANDS)
      for (const c of s.chapters) check(c.chapter, [...c.mustDrill, ...(c.skipSubtopics ?? []), ...(c.targetHard ?? [])]);
    expect(missing).toEqual([]);
  });

  it("each playbook drills every subtopic of its chapter", () => {
    for (const p of PLAYBOOKS) {
      const live = [...tax.chapters.get(p.chapter)!.subtopics.keys()].sort();
      expect([...p.subtopics].sort(), p.chapter).toEqual(live);
    }
  });

  it("CHAPTER_TABLE's per-subtopic counts and %HARD match the bank", async () => {
    const wrong: string[] = [];
    for (const row of CHAPTER_TABLE) {
      const ch = tax.chapters.get(row.chapter);
      expect(ch, row.chapter).toBeDefined();
      const { data, error } = await retryOnStatementTimeout(() =>
        sb
          .from("questions")
          .select("difficulty, subtopics(name)")
          .eq("chapter_id", ch!.id)
          .eq("visibility", "PUBLIC")
          .eq("question_kind", "pyq")
          .range(0, 999)
      );
      expect(error, error?.message).toBeNull();
      const rows = (data ?? []) as unknown as Row[];
      // One chapter never nears the 1000-row cap (the largest is ~230); fail loudly if it ever does.
      expect(rows.length, `${row.chapter} hit the page cap`).toBeLessThan(1000);
      if (rows.length !== row.qCount) wrong.push(`${row.chapter}: qCount ${row.qCount}, bank ${rows.length}`);
      const hard = rows.filter((r) => r.difficulty === "HARD").length;
      const pct = Math.round((100 * hard) / rows.length);
      if (pct !== row.pctHard) wrong.push(`${row.chapter}: pctHard ${row.pctHard}, bank ${pct}`);

      const bySub = new Map<string, { q: number; hard: number }>();
      for (const r of rows) {
        const k = r.subtopics?.name ?? "";
        const v = bySub.get(k) ?? { q: 0, hard: 0 };
        v.q++;
        if (r.difficulty === "HARD") v.hard++;
        bySub.set(k, v);
      }
      for (const [name, v] of bySub) {
        const needle = `${name} (${v.q} · ${Math.round((100 * v.hard) / v.q)}%`;
        if (!row.focus.includes(needle)) wrong.push(`${row.chapter}: focus should state "${needle}"`);
      }
    }
    expect(wrong).toEqual([]);
  }, 120_000);
});
