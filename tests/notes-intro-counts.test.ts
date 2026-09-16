/**
 * PROD-CONTRACT — /notes chapter intros state BANK COUNTS in prose ("165
 * past-year questions across 2017–2026"). Nothing asserted them, so on
 * 2026-09-14 44 of 50 noted NDA chapters were stating a stale number — in the
 * page body, the subject-landing cards, the print cover AND `metadata
 * .description`, i.e. the text Google indexes for those pages.
 *
 * This is the /notes half of the same class the guide `_data` tables carry.
 * The guide tables are gated by their own integrity tests; the intros were not.
 *
 * CONTRACT (deliberately narrow so it cannot be brittle):
 *   1. Every "<N> PYQs/questions" claim in a noted NDA chapter intro OR its
 *      optional `cardBlurb` must equal
 *      EITHER that chapter's live PUBLIC pyq count OR one of its subtopics'
 *      live counts. Intros legitimately cite both — Indefinite Integration
 *      quotes its chapter total AND "Integration by Substitution (18 PYQs)" —
 *      so the test must not force every number to the chapter total. That is
 *      exactly the mistake a naive backfill would make.
 *   2. A stated year range must not END BEFORE the chapter's newest live PYQ
 *      year. ("2017–2025" on a chapter that now holds a 2026 question
 *      under-claims the bank.)
 *
 * KNOWN, ACCEPTED WEAKNESS: rule 1 cannot tell WHICH subtopic a claim refers
 * to, so a subtopic claim that coincidentally equals a different subtopic's
 * count passes. It still catches every drift where the number matches nothing.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * "165 past-year questions", "40 PYQs", "18 PYQs" — and the HYPHENATED
 * attributive form "a steady 63-PYQ chapter", which a whitespace-only
 * separator misses. That gap was real: Differential Equations sat at a stale
 * 63 through the first pass of this very backfill because of it.
 */
const CLAIM = /(\d{2,4})[\s-]+(?:past-year[\s-]+)?(?:PYQs?|questions)/gi;
/** "2017–2026", "2017-2026" (en dash, em dash or hyphen) */
const RANGE = /(\d{4})\s*[–—-]\s*(\d{4})/g;

/**
 * Both rules scan the intro AND the optional `cardBlurb` together. The blurb is
 * the line that actually reaches the subject-landing card, <meta description>
 * and JSON-LD, so a count stated there is MORE exposed than one in the intro,
 * not less. (The 76 chapters with no authored blurb derive theirs from the
 * intro's first sentence, which this already covers.)
 */
const claimText = (c: any) =>
  [c.chapter.intro, c.chapter.cardBlurb].filter(Boolean).join(" ");

type Live = {
  chapter: Map<string, number>;
  subtopic: Map<string, Set<number>>;
  maxYear: Map<string, number>;
};

const key = (subject: string, chapter: string) => `${subject}\t${chapter}`;

async function loadLive(db: SupabaseClient): Promise<Live> {
  const chapter = new Map<string, number>();
  const perSub = new Map<string, Map<string, number>>();
  const maxYear = new Map<string, number>();

  // Paged in 1000-row windows — PostgREST silently truncates a raw select at
  // 1000 and this derives counts FROM THE PAYLOAD, the documented trap.
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year, subtopics(name), chapters(name, subjects(name, exams(name)))")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as any[];
    for (const r of rows) {
      if (!/NDA/i.test(r.chapters?.subjects?.exams?.name ?? "")) continue;
      const k = key(r.chapters?.subjects?.name, r.chapters?.name);
      chapter.set(k, (chapter.get(k) ?? 0) + 1);
      if (!perSub.has(k)) perSub.set(k, new Map());
      const sn = r.subtopics?.name ?? "?";
      perSub.get(k)!.set(sn, (perSub.get(k)!.get(sn) ?? 0) + 1);
      if (r.pyq_year) maxYear.set(k, Math.max(maxYear.get(k) ?? 0, r.pyq_year));
    }
    if (rows.length < 1000) break;
  }

  const subtopic = new Map<string, Set<number>>();
  for (const [k, m] of perSub) subtopic.set(k, new Set(m.values()));
  return { chapter, subtopic, maxYear };
}

describe.skipIf(!HAS_ENV)("/notes chapter intros state live bank counts", () => {
  let live: Live;

  beforeAll(async () => {
    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
    live = await loadLive(db);
  }, 120_000);

  it("every count claimed in an intro matches the chapter or one of its subtopics", () => {
    const bad: string[] = [];
    for (const c of NOTES_CHAPTERS as any[]) {
      if (c.examName !== "NDA") continue;
      const k = key(c.subjectName, c.chapter.chapterName);
      const total = live.chapter.get(k);
      if (total === undefined) continue; // chapter resolution is another test's job
      const subs = live.subtopic.get(k) ?? new Set<number>();
      for (const m of claimText(c).matchAll(CLAIM)) {
        const n = Number(m[1]);
        if (n === total || subs.has(n)) continue;
        bad.push(
          `${c.subjectRoute}/${c.chapterSlug}: intro/cardBlurb claims ${n}, live chapter ${total}` +
            ` (subtopic counts: ${[...subs].sort((a, b) => b - a).join(", ")})`,
        );
      }
    }
    expect(bad).toEqual([]);
  });

  it("no intro year range ends before the chapter's newest live PYQ", () => {
    const bad: string[] = [];
    for (const c of NOTES_CHAPTERS as any[]) {
      if (c.examName !== "NDA") continue;
      const k = key(c.subjectName, c.chapter.chapterName);
      const newest = live.maxYear.get(k);
      if (newest === undefined) continue;
      for (const m of claimText(c).matchAll(RANGE)) {
        const end = Number(m[2]);
        if (end >= newest) continue;
        bad.push(`${c.subjectRoute}/${c.chapterSlug}: intro/cardBlurb says ${m[1]}–${end}, newest live PYQ ${newest}`);
      }
    }
    expect(bad).toEqual([]);
  });
});
