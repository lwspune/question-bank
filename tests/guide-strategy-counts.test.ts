/**
 * PROD-CONTRACT (2026-11-17, SUGGESTIONS 2026-09-14). A /guide strategy page
 * prints each strand's count in its label ("Rule — Grammar and Spotting Errors
 * (223 q / 25%)") and each chapter's in its summary ("52 q · 1 HARD across 10
 * yrs"), beside `qCount` / `pctOfBank` / `pctHard` fields. Nothing asserted
 * them: the fields were refreshed on the NDA II 2026 ingest and the prose beside
 * them was not, so the page said 223 where its own data said 239.
 *
 * Pure half: a count, share or HARD figure written in a strand label or at the
 * head of a chapter summary equals the field beside it, and a strand's qCount
 * is the sum of its chapters. Live half: the fields equal the live bank.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { liveKey, loadNotesLive } from "../scripts/lib/notesLiveCounts";
import { STRATEGY_STRANDS as BIO } from "@/app/guide/nda-biology/_data/strategy";
import { STRATEGY_STRANDS as CHEM } from "@/app/guide/nda-chemistry/_data/strategy";
import { STRATEGY_STRANDS as GEO } from "@/app/guide/nda-geography/_data/strategy";
import { STRATEGY_STRANDS as HIST } from "@/app/guide/nda-history/_data/strategy";
import { STRATEGY_STRANDS as PHYS } from "@/app/guide/nda-physics/_data/strategy";
import { STRATEGY_STRANDS as POL } from "@/app/guide/nda-polity/_data/strategy";
import { STRATEGY_BUCKETS as ENG } from "@/app/guide/nda-english/_data/strategy";

type Chapter = { chapter: string; qCount: number; pctHard?: number; summary: string };
type Strand = { label: string; qCount: number; pctOfBank?: number; chapters: Chapter[] };

const GUIDES: [string, string, string, Strand[]][] = [
  ["nda-biology", "NDA", "Biology", BIO as unknown as Strand[]],
  ["nda-chemistry", "NDA", "Chemistry", CHEM as unknown as Strand[]],
  ["nda-geography", "NDA", "Geography", GEO as unknown as Strand[]],
  ["nda-history", "NDA", "History", HIST as unknown as Strand[]],
  ["nda-physics", "NDA", "Physics", PHYS as unknown as Strand[]],
  ["nda-polity", "NDA", "Polity", POL as unknown as Strand[]],
  ["nda-english", "NDA", "English", ENG as unknown as Strand[]],
];

/** "(223 q / 25%)", "(16 q · 22%)" */
const LABEL = /\((\d[\d,]*) q\b(?:\s*[·/]\s*(\d+)%)?/;
const SUMMARY_HEAD = /^(\d[\d,]*) q\b/;
/** "52 q · 1 HARD", "11 q · ZERO HARD", "93 q · 22% HARD" */
const SUMMARY_HARD = /^\d[\d,]* q · (ZERO|\d+)(%?) HARD\b/;
const num = (s: string) => Number(s.replace(/,/g, ""));

describe("/guide strategy prose agrees with its own data", () => {
  for (const [route, , , strands] of GUIDES) {
    it(`${route}: labels and summaries state the fields beside them`, () => {
      const bad: string[] = [];
      for (const s of strands) {
        const sum = s.chapters.reduce((n, c) => n + c.qCount, 0);
        if (sum !== s.qCount) bad.push(`strand "${s.label}": qCount ${s.qCount}, chapters sum to ${sum}`);
        const l = s.label.match(LABEL);
        if (l && num(l[1]) !== s.qCount) bad.push(`strand label says ${l[1]} q, qCount ${s.qCount}`);
        if (l?.[2] && Number(l[2]) !== s.pctOfBank) bad.push(`strand label says ${l[2]}%, pctOfBank ${s.pctOfBank}`);
        for (const c of s.chapters) {
          const m = c.summary.trim().match(SUMMARY_HEAD);
          if (m && num(m[1]) !== c.qCount) bad.push(`${c.chapter}: summary says ${m[1]} q, qCount ${c.qCount}`);
          const h = c.summary.trim().match(SUMMARY_HARD);
          if (h?.[2] && Number(h[1]) !== c.pctHard) bad.push(`${c.chapter}: summary says ${h[1]}% HARD, pctHard ${c.pctHard}`);
        }
      }
      expect(bad).toEqual([]);
    });
  }
});

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("/guide strategy fields match the live bank", () => {
  let chapter: Map<string, number>;
  let hard: Map<string, number>;
  beforeAll(async () => {
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const live = await loadNotesLive(db);
    chapter = live.chapter;
    hard = live.hardChapter;
  }, 120_000);

  for (const [route, exam, subject, strands] of GUIDES) {
    it(`${route}: qCount, pctHard, pctOfBank and summary HARD counts are live`, () => {
      const bad: string[] = [];
      const all = strands.flatMap((s) => s.chapters);
      const total = all.reduce((n, c) => n + (chapter.get(liveKey(exam, subject, c.chapter)) ?? 0), 0);
      for (const s of strands) {
        if (s.pctOfBank !== undefined && Math.abs(s.pctOfBank - (100 * s.qCount) / total) > 1)
          bad.push(`strand "${s.label}": pctOfBank ${s.pctOfBank}, live ${((100 * s.qCount) / total).toFixed(1)}`);
        for (const c of s.chapters) {
          const k = liveKey(exam, subject, c.chapter);
          const live = chapter.get(k);
          if (live !== c.qCount) bad.push(`${c.chapter}: qCount ${c.qCount}, live ${live ?? "no such chapter"}`);
          const h = hard.get(k) ?? 0;
          if (c.pctHard !== undefined && Math.abs(c.pctHard - (100 * h) / c.qCount) > 1)
            bad.push(`${c.chapter}: pctHard ${c.pctHard}, live ${((100 * h) / c.qCount).toFixed(1)}`);
          const m = c.summary.trim().match(SUMMARY_HARD);
          if (m && !m[2]) {
            const said = m[1] === "ZERO" ? 0 : Number(m[1]);
            if (said !== h) bad.push(`${c.chapter}: summary says ${m[1]} HARD, live ${h}`);
          }
        }
      }
      expect(bad).toEqual([]);
    });
  }
});
