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
 * SCOPE WIDENED 2026-09-20, from NDA-only to EVERY exam. The NDA-only filter
 * was not a stated decision, just where the 2026-09-14 backfill started — and
 * the drift it could not see was real: MHT-CET Indefinite Integration had read
 * "121 PYQs" since 2026-06-30, on a page whose own card, ~300px lower, printed
 * the live 159. Six chapters across MHT-CET, JEE Mains and CDS were stale.
 *
 * WIDENING IS NOT "DELETE THE FILTER" — the live map must then be keyed by
 * EXAM TOO. `Mathematics / Indefinite Integration` exists under NDA, MH HSC
 * Class 12 AND Worksheets; `Maths / Matrices` under MHT-CET and JEE Mains. A
 * subject+chapter key silently merged them and reported every NDA Maths
 * chapter as holding 2,280 questions — a gate that fails everywhere is as
 * useless as one that looks nowhere. Same lesson the syllabus-map loaders
 * carry: scope by BOTH axes, never one.
 *
 * CONTRACT (deliberately narrow so it cannot be brittle):
 *   1. Every "<N> PYQs/questions" claim in a noted chapter intro OR its
 *      optional `cardBlurb` must equal
 *      that chapter's live PUBLIC pyq count, one of its subtopics' live
 *      counts, or the SUM OF TWO of them. Intros legitimately cite all three —
 *      Indefinite Integration quotes its chapter total AND "Integration by
 *      Substitution (18 PYQs)", and Mathematical Logic says "drill Negation
 *      and Finding Truth Values first — 30 questions", which is 14 + 16. So
 *      the test must not force every number to the chapter total; that is
 *      exactly the mistake a naive backfill would make, and on the pair-sum
 *      case it would push a CORRECT number to a wrong one.
 *   2. A stated year range must not END BEFORE the chapter's newest live PYQ
 *      year. ("2017–2025" on a chapter that now holds a 2026 question
 *      under-claims the bank.)
 *
 * NOT EVERY NUMBER IN AN INTRO IS A BANK COUNT. CDS Number System says "100
 * questions in 120 minutes" — a fact about the PAPER, which no bank count will
 * ever match. Those are declared in EXEMPT below rather than papered over by a
 * looser regex, so each one stays a human decision that is visible in review.
 *
 * SUBTOPIC `whyItMatters` COUNTS ARE **NOT** GATED HERE. They carry the same
 * class of claim (130 of them) and 65 are currently stale — too much shipped
 * editorial copy to rewrite behind a gate flip. `npm run notes:intro` reports
 * them as triage; the backfill is logged in ROADMAP.md.
 *
 * KNOWN, ACCEPTED WEAKNESS: rule 1 cannot tell WHICH subtopic a claim refers
 * to, so a subtopic claim that coincidentally equals a different subtopic's
 * count passes, and the pair-sum allowance widens that a little further. It
 * still catches every drift where the number matches nothing.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import {
  extractCountClaims,
  allowedCounts,
  isExemptCount,
} from "@/lib/notes/introAudit";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * The claim regex and the allowed-counts rule live in src/lib/notes/introAudit
 * .ts (spec: tests/notes-intro-audit.test.ts), shared with `npm run
 * notes:intro`. A gate and a probe that disagree about what a claim IS are
 * worse than either alone.
 */
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
  /** Every single subtopic count, plus every two-subtopic sum. */
  subtopic: Map<string, Set<number>>;
  maxYear: Map<string, number>;
};

/**
 * Keyed by EXAM + subject + chapter. All three are load-bearing: chapter names
 * repeat across exams ("Indefinite Integration" under NDA, MH HSC Class 12 and
 * Worksheets) and so do subject names ("Maths" under MHT-CET and JEE Mains).
 *
 * This is not hypothetical. While widening the test, a two-argument key left in
 * place against three-argument calls silently dropped the chapter — every NDA
 * Maths chapter then reported 2,280 questions, and the year rule reported five
 * chapters as stale whose ranges were in fact correct. A merged key does not
 * fail loudly; it answers a different question.
 */
const key = (exam: string, subject: string, chapter: string) =>
  `${exam}\t${subject}\t${chapter}`;

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
      // ORDER BY is NOT optional here. Without a stable sort, PostgREST's
      // 1000-row windows overlap and drop rows, so the same scan returns
      // different totals run to run — two consecutive runs of this loader
      // disagreed by five findings before the order was added. A count that
      // is not reproducible cannot gate anything.
      .order("id", { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as any[];
    for (const r of rows) {
      const k = key(
        r.chapters?.subjects?.exams?.name,
        r.chapters?.subjects?.name,
        r.chapters?.name,
      );
      chapter.set(k, (chapter.get(k) ?? 0) + 1);
      if (!perSub.has(k)) perSub.set(k, new Map());
      const sn = r.subtopics?.name ?? "?";
      perSub.get(k)!.set(sn, (perSub.get(k)!.get(sn) ?? 0) + 1);
      if (r.pyq_year) maxYear.set(k, Math.max(maxYear.get(k) ?? 0, r.pyq_year));
    }
    if (rows.length < 1000) break;
  }

  // Singles AND pair sums, via the shared core.
  const subtopic = new Map<string, Set<number>>();
  for (const [k, m] of perSub) {
    subtopic.set(k, allowedCounts(chapter.get(k) ?? 0, [...m.values()]));
  }
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
      const route = `${c.subjectRoute}/${c.chapterSlug}`;
      const k = key(c.examName, c.subjectName, c.chapter.chapterName);
      const total = live.chapter.get(k);
      if (total === undefined) continue; // chapter resolution is another test's job
      const subs = live.subtopic.get(k) ?? new Set<number>();
      for (const n of extractCountClaims(claimText(c))) {
        if (n === total || subs.has(n) || isExemptCount(route, n)) continue;
        bad.push(
          `${route}: intro/cardBlurb claims ${n}, live chapter ${total}` +
            ` (subtopic counts + pair sums: ${[...subs].sort((a, b) => b - a).join(", ")})`,
        );
      }
    }
    expect(bad).toEqual([]);
  });

  it("no intro year range ends before the chapter's newest live PYQ", () => {
    const bad: string[] = [];
    for (const c of NOTES_CHAPTERS as any[]) {
      const k = key(c.examName, c.subjectName, c.chapter.chapterName);
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
