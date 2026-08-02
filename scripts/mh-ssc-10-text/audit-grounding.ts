/**
 * GROUNDING AUDIT — does every factual claim in an authored answer actually
 * appear in the chapter the answer was written from?
 *
 *   npx tsx scripts/mh-sb-9/dump-text.ts <chapterId>      # prerequisite
 *   npx tsx scripts/mh-sb-9/audit-grounding.ts <chapterId>
 *   npx tsx scripts/mh-sb-9/audit-grounding.ts --all
 *
 * Why this exists: the History / Political Science textbook ships NO answer key
 * (see config.ts), so the step-6 book cross-check cannot run and every answer is
 * authored. The failure mode that replaces a wrong-key error is a *fluent
 * invention* — a real-sounding date, person or organisation that the chapter
 * never mentions, which no reader would question. This probe is the mechanical
 * half of catching that.
 *
 * Method: pull every distinctive token out of each stored solution — 4-digit
 * years, and proper nouns (capitalised words NOT at a sentence start, plus
 * capitalised runs anywhere) — and check each against the chapter's own text
 * layer. A token absent from the chapter is a CANDIDATE ungrounded claim.
 *
 * It is TRIAGE, not a verdict, and it is deliberately one-sided:
 *   - It cannot see an invented claim made in ordinary lowercase words
 *     ("the movement lasted three years"). A clean run is NOT proof of grounding.
 *   - It flags legitimate glue ("Note", "The") — hence the stoplist — and
 *     legitimate rewordings of a name the book spells differently.
 * So: read every hit, and treat the exit code as advisory. Exits 0 always.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { OUT, DATA, CHAPTERS, requireChapter } from "./config";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** Words that start sentences or are generic enough to carry no factual load. */
const STOP = new Set(
  `A An The This That These Those It Its In On At To For From By With Without And But Or Not No So If When While Where Which What Who Why How
   He She They We You I Their There Then Thus Hence Also Both Each Every All Any Some Such Since Because After Before During Until
   Note True False Yes Its Is Are Was Were Be Been Being Has Have Had Do Does Did Can Could Will Would Shall Should May Might Must
   First Second Third Fourth Fifth Last Next Many Much More Most Other Others Another Same Different Chapter Textbook Answer Question
   Q Ex According Given Under Over Between Among Through Above Below Here However Therefore Although Though Even Only Just Still Yet
   One Two Three Four Five Six Seven Eight Nine Ten`
    .split(/\s+/)
    .filter(Boolean)
);

/** Normalise for containment testing: collapse all whitespace, unify quotes/dashes. */
function norm(s: string): string {
  return s
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/\s+/g, " ");
}

export type Hit = { ref: string; token: string; kind: "year" | "proper-noun" };

/**
 * Pure core: distinctive tokens in `solution` that do not occur in `chapterText`.
 * Both are normalised first. A capitalised word is skipped when it sits at a
 * sentence start (or opens the string), because that capital is grammatical
 * rather than a name — the single biggest source of false positives.
 */
export function ungroundedTokens(solution: string, chapterText: string): Hit[] {
  const hay = norm(chapterText);
  const hayLower = hay.toLowerCase();
  const sol = norm(solution);
  const hits: Hit[] = [];
  const seen = new Set<string>();

  // 1. Years — the highest-value signal: a date is either in the book or invented.
  for (const m of sol.matchAll(/\b(1[6-9]\d{2}|20\d{2})\b/g)) {
    const y = m[0];
    if (seen.has(y) || hay.includes(y)) continue;
    seen.add(y);
    hits.push({ ref: "", token: y, kind: "year" });
  }

  // 2. Proper nouns — capitalised runs. Sentence-SPLIT first: a run must never
  //    span a full stop, or "Golden Temple. The army" becomes one bogus token and
  //    the real signal drowns. Within a sentence, the FIRST word's capital is
  //    grammatical, so it only counts when it joins a multi-word run.
  const sentences = sol.split(/(?<=[.!?:;])\s+/);
  const re = /\b([A-Z][a-zA-Z'’-]*(?:\s+(?:of|the|and|for|de)\s+)?(?:\s*[A-Z][a-zA-Z'’-]*)*)/g;
  for (const sentence of sentences) {
    for (const m of sentence.matchAll(re)) {
      let token = m[1].trim().replace(/[.,;:'"]+$/, "");
      const at = m.index ?? 0;
      // Drop a leading sentence-initial capital from a run ("True. At Yalta" →
      // handled by the split; "The League of Nations" → keep "League of Nations").
      let words = token.split(/\s+/);
      if (at === 0 && words.length > 1 && STOP.has(words[0])) {
        words = words.slice(1);
        token = words.join(" ");
      }
      if (!token || token.length < 4) continue;
      if (words.length === 1) {
        if (STOP.has(words[0])) continue;
        if (at === 0) continue; // bare sentence-initial capital carries no name
      }
      if (words.every((w) => STOP.has(w))) continue;
      if (seen.has(token)) continue;
      seen.add(token);
      if (hayLower.includes(token.toLowerCase())) continue;
      hits.push({ ref: "", token, kind: "proper-noun" });
    }
  }
  return hits;
}

async function auditChapter(id: string): Promise<number> {
  const ch = requireChapter(id);
  const textPath = join(OUT, `${id}.text.md`);
  if (!existsSync(textPath)) {
    console.log(`\n${id}: SKIPPED — no ${textPath}. Run: npx tsx scripts/mh-sb-9/dump-text.ts ${id}`);
    return 0;
  }
  let chapterText = readFileSync(textPath, "utf8");

  // Geography especially: a lot of a chapter's factual content is printed INSIDE
  // its maps and diagrams, and PyMuPDF cannot see those labels — they are vector
  // art, not text. Without this, every map-sourced fact reads as unsourced (fig
  // 2.18's plate names produced 12 false positives on the pilot chapter). The
  // optional data/<id>.figtext.json supplies that missing text, transcribed off
  // the rendered figure and attributed to it, so a real invention still stands out.
  const figPath = join(DATA, `${id}.figtext.json`);
  if (existsSync(figPath)) {
    const fig = JSON.parse(readFileSync(figPath, "utf8")) as {
      figures?: Record<string, string[]>;
    };
    const labels = Object.values(fig.figures ?? {}).flat();
    chapterText += "\n" + labels.join("\n");
    console.log(`  (+${labels.length} figure labels from ${id}.figtext.json)`);
  }

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("question_number, source_row, solution")
    .eq("source_file", ch.sourceFile)
    .not("solution", "is", null)
    .order("source_row");
  if (error) throw error;

  const rows = data ?? [];
  const all: Hit[] = [];
  for (const r of rows) {
    for (const h of ungroundedTokens(r.solution as string, chapterText)) {
      all.push({ ...h, ref: r.question_number as string });
    }
  }

  console.log(`\n${ch.chapterName} (${ch.subjectName}) — ${rows.length} answered rows`);
  if (!all.length) {
    console.log("  ✓ every year and proper noun in every answer occurs in the chapter text.");
    return 0;
  }
  console.log(`  ${all.length} candidate(s) NOT found in the chapter — read each, this is triage:`);
  for (const h of all) console.log(`    ${h.ref.padEnd(14)} ${h.kind.padEnd(12)} ${h.token}`);
  return all.length;
}

async function main() {
  loadEnv();
  const arg = process.argv[2];
  const ids = arg === "--all" || !arg ? Object.keys(CHAPTERS) : [arg];
  let total = 0;
  for (const id of ids) total += await auditChapter(id);
  console.log(
    `\n${total} candidate(s) across ${ids.length} chapter(s). Triage only — a clean run is NOT proof of grounding (it cannot see an invention phrased in lowercase).`
  );
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
