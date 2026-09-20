/**
 * /notes intro audit — TRIAGE, always exits 0.
 *
 *   npm run notes:intro                 # every chapter
 *   npm run notes:intro -- mht-cet      # filter by subjectRoute/chapterSlug
 *
 * Reports three classes that no other gate reads:
 *
 *   1. STALE COUNT — a "<N> PYQs/questions" claim matching neither the
 *      chapter's live count, nor any subtopic's, nor a two-subtopic sum.
 *      Intro/cardBlurb claims are GATED by tests/notes-intro-counts.test.ts;
 *      the subtopic `whyItMatters` claims are not, and are the reason this
 *      probe exists — 130 of them, ungated, and stale in bulk.
 *
 *   2. DUPLICATE STRUCTURE — an intro enumerating "(1) … (2) …" the same
 *      subtopics the chapter landing renders as cards directly beneath it,
 *      each with a one-line definition and a LIVE count. The prose copy says
 *      the same thing twice and is the copy that goes stale: MHT-CET
 *      Indefinite Integration read "121 PYQs" for 82 days while the card under
 *      it printed 159.
 *
 *   3. LENGTH — the readable symptom of (2). `intro` renders as ONE unbroken
 *      <p> in the hero, so a 156-word sentence is ~35 lines on a phone before
 *      the first tappable thing, and this audience is mobile-first.
 *
 * Classes 2 and 3 are JUDGEMENT, not defects — a long intro that says
 * something the cards cannot say is fine. Read them, don't sweep them.
 *
 * Read-only. Requires NEXT_PUBLIC_SUPABASE_URL + a key in .env.local.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { NOTES_CHAPTERS } from "../src/lib/notes/chapters";
import {
  extractCountClaims,
  allowedCounts,
  enumeratedItems,
  longestSentenceWords,
  isExemptCount,
} from "../src/lib/notes/introAudit";

/** A sentence past this, rendered in one <p>, is a wall. */
const LONG_SENTENCE = 60;
/** Intros past this are worth a second look; the median is 172. */
const LONG_INTRO = 200;

/**
 * Keyed by EXAM + subject + chapter — all three. Chapter names repeat across
 * exams ("Indefinite Integration" under NDA, MH HSC and Worksheets), and so do
 * subject names ("Maths" under MHT-CET and JEE Mains). A key missing either
 * axis does not fail; it quietly answers a different question.
 */
const key = (exam: string, subject: string, chapter: string) =>
  `${exam}\t${subject}\t${chapter}`;

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });
}

async function loadLive(db: SupabaseClient) {
  const chapter = new Map<string, number>();
  const perSub = new Map<string, Map<string, number>>();
  // Paged in 1000-row windows — PostgREST silently truncates a raw select at
  // 1000 and this derives counts FROM THE PAYLOAD, the documented trap.
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("subtopics(name), chapters(name, subjects(name, exams(name)))")
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
        r.chapters?.name
      );
      chapter.set(k, (chapter.get(k) ?? 0) + 1);
      if (!perSub.has(k)) perSub.set(k, new Map());
      const sn = r.subtopics?.name ?? "?";
      perSub.get(k)!.set(sn, (perSub.get(k)!.get(sn) ?? 0) + 1);
    }
    if (rows.length < 1000) break;
  }
  return { chapter, perSub };
}

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const apiKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !apiKey) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL / key in .env.local");
    process.exit(2);
  }
  const filter = (process.argv[2] ?? "").toLowerCase();
  const db = createClient(url, apiKey, { auth: { persistSession: false } });
  const { chapter: liveChapter, perSub } = await loadLive(db);

  const stale: string[] = [];
  const duplicated: string[] = [];
  const long: string[] = [];
  let scanned = 0;

  for (const c of NOTES_CHAPTERS as any[]) {
    const route = `${c.subjectRoute}/${c.chapterSlug}`;
    if (filter && !route.toLowerCase().includes(filter)) continue;
    scanned++;

    const k = key(c.examName, c.subjectName, c.chapter.chapterName);
    const total = liveChapter.get(k);
    const subCounts = [...(perSub.get(k) ?? new Map()).values()];
    const ok = total === undefined ? null : allowedCounts(total, subCounts);

    // 1. STALE COUNT — intro/cardBlurb (gated elsewhere) + subtopic prose (not).
    const texts: [string, string][] = [
      ["intro", [c.chapter.intro, c.chapter.cardBlurb].filter(Boolean).join(" ")],
    ];
    for (const slug of c.chapter.subtopicOrder) {
      const note = c.notes[slug];
      if (!note) continue;
      texts.push([slug, `${note.whyItMatters ?? ""} ${note.oneLineDefinition ?? ""}`]);
    }
    if (ok) {
      for (const [where, text] of texts) {
        for (const n of extractCountClaims(text)) {
          if (ok.has(n) || isExemptCount(route, n)) continue;
          stale.push(
            `${route} [${where}] claims ${n} — live chapter ${total}, subtopics ${subCounts
              .slice()
              .sort((a, b) => b - a)
              .join("/")}`
          );
        }
      }
    }

    // 2. DUPLICATE STRUCTURE.
    const items = enumeratedItems(c.chapter.intro);
    const subs = c.chapter.subtopicOrder.length;
    if (items >= 3) {
      duplicated.push(
        `${route} — intro enumerates ${items} item${items === 1 ? "" : "s"}` +
          ` against ${subs} subtopic card${subs === 1 ? "" : "s"}` +
          `${items === subs ? " (one per card)" : ""}`
      );
    }

    // 3. LENGTH.
    const words = c.chapter.intro.trim().split(/\s+/).length;
    const longest = longestSentenceWords(c.chapter.intro);
    if (words > LONG_INTRO || longest > LONG_SENTENCE) {
      long.push(`${route} — ${words} words, longest sentence ${longest}`);
    }
  }

  const section = (title: string, rows: string[]) => {
    console.log(`\n${title} (${rows.length})`);
    if (rows.length === 0) console.log("  none");
    else rows.forEach((r) => console.log("  " + r));
  };

  console.log(`/notes intro audit — ${scanned} chapter${scanned === 1 ? "" : "s"}${filter ? ` matching "${filter}"` : ""}`);
  section("1. STALE COUNT — matches no live chapter/subtopic/pair-sum", stale);
  section("2. DUPLICATE STRUCTURE — intro re-lists the subtopic cards below it", duplicated);
  section(`3. LENGTH — over ${LONG_INTRO} words or a sentence over ${LONG_SENTENCE}`, long);
  console.log(
    "\nTriage, not a gate. Class 1 in an intro/cardBlurb is also gated by" +
      " tests/notes-intro-counts.test.ts; class 1 in a subtopic is not."
  );
}

main();
