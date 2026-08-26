/**
 * Scan candidate records against the LIVE bank for duplicate questions BEFORE committing.
 *
 * WHY. `content_hash` dedup at commit catches only an EXACT match of
 * (stem + sorted options + answer). A question reprinted with one option reworded, or
 * with its options in a different order, hashes differently and lands as a second copy —
 * invisible afterwards. This reports both classes so they can be adjudicated as `dup`
 * up front rather than discovered later.
 *
 *   npx tsx scripts/practice-paper/dedup-scan.ts <recordsFile> [<recordsFile> ...]
 *
 * Reports, per candidate:
 *   EXACT   normalised stem AND normalised option set both match a bank row
 *   STEM    normalised stem matches but the options differ (reworded reprint)
 *
 * Also reports duplicates BETWEEN the candidate files, which commit-time dedup would
 * resolve by insertion order rather than by adjudication.
 *
 * Tooling for the manual ingest core, NOT a committed data artifact.
 */
import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Rec = { n: number; stem: string; optA: string; optB: string; optC: string; optD: string };

/** Aggressive normalisation: we WANT near-misses to collide here. */
const norm = (s: unknown) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/\\[a-z]+\{?|[{}\\()]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const optKey = (o: string[]) => o.map(norm).filter(Boolean).sort().join(" ~ ");

async function main() {
  const files = process.argv.slice(2);
  if (!files.length) throw new Error("usage: dedup-scan.ts <recordsFile> [...]");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  // Scope to the NDA exam and skip Maths. An unscoped scan that joins options across all
  // ~57k rows is cancelled by the statement timeout — measured, not guessed.
  const { data: ex } = await db.from("exams").select("id, name").ilike("name", "%NDA%");
  const examIds = (ex ?? []).map((e: any) => e.id);
  const { data: subs } = await db
    .from("subjects")
    .select("id, name, exam_id")
    .in("exam_id", examIds);
  const subjectIds = (subs ?? [])
    .filter((s: any) => s.name !== "Mathematics")
    .map((s: any) => s.id);
  const { data: chs } = await db
    .from("chapters")
    .select("id, subject_id")
    .in("subject_id", subjectIds);
  const chapterIds = (chs ?? []).map((c: any) => c.id);

  // PASS 1 - stems only. No join, so it is cheap enough to complete.
  const byStem = new Map<string, { id: string; src: string; n: string }[]>();
  let total = 0;
  const CH = 60; // chunk the .in() filter: the list rides in the request URL
  for (let i = 0; i < chapterIds.length; i += CH) {
    const part = chapterIds.slice(i, i + CH);
    let from = 0;
    for (;;) {
      const { data, error } = await db
        .from("questions")
        .select("id, text, question_number, source_file")
        .in("chapter_id", part)
        .range(from, from + 999);
      if (error) throw error;
      if (!data?.length) break;
      for (const r of data as any[]) {
        const k = norm(r.text);
        if (k.length < 25) continue; // too short to be a meaningful match
        if (!byStem.has(k)) byStem.set(k, []);
        byStem.get(k)!.push({
          id: r.id,
          src: r.source_file ?? "?",
          n: r.question_number ?? "?",
        });
      }
      total += data.length;
      if (data.length < 1000) break;
      from += 1000;
    }
  }
  console.log(`bank: scanned ${total} NDA non-Maths rows, ${byStem.size} distinct stems\n`);

  const parsed = files.map((f) => ({
    f,
    recs: JSON.parse(readFileSync(f, "utf-8")) as Rec[],
  }));

  // PASS 2 - options, but ONLY for the bank rows a candidate actually collided with.
  // Options are collected into an ARRAY, never joined with a delimiter: any separator
  // you pick has to be one that can never occur in option text, and there isn't one.
  const wanted = new Set<string>();
  for (const { recs } of parsed)
    for (const r of recs) (byStem.get(norm(r.stem)) ?? []).forEach((h) => wanted.add(h.id));
  const optsById = new Map<string, string[]>();
  const ids = [...wanted];
  for (let i = 0; i < ids.length; i += 150) {
    const { data, error } = await db
      .from("options")
      .select("question_id, text")
      .in("question_id", ids.slice(i, i + 150));
    if (error) throw error;
    for (const o of (data ?? []) as any[]) {
      if (!optsById.has(o.question_id)) optsById.set(o.question_id, []);
      optsById.get(o.question_id)!.push(o.text);
    }
  }
  const bankOpts = (id: string) => optKey(optsById.get(id) ?? []);

  for (const { f, recs } of parsed) {
    let exact = 0;
    let stemOnly = 0;
    let wrapper = 0;
    const lines: string[] = [];
    for (const r of recs) {
      const hit = byStem.get(norm(r.stem));
      if (!hit) continue;
      const mine = optKey([r.optA, r.optB, r.optC, r.optD]);
      const same = hit.filter((h) => bankOpts(h.id) === mine);
      if (same.length) {
        exact++;
        lines.push(`  EXACT Q${r.n}  <- ${same[0].src} Q${same[0].n}`);
        continue;
      }
      // A STEM-only hit on a BOILERPLATE WRAPPER is not a duplicate candidate.
      // "Which one of the following pairs is not correctly matched?" carries the whole
      // question in its OPTIONS, which stem normalisation cannot see — so it collides with
      // every other paper's wrapper of the same shape. Measured on the LWS series: 15
      // stem-only hits went to adjudication and 8 were exactly this, pairing an Indian
      // physiography question against a chemistry one. Require the option sets to share
      // some vocabulary before calling it a candidate at all.
      const myWords = new Set(mine.split(/\W+/).filter((w) => w.length > 3));
      const overlaps = hit.some((h) => {
        const bw = new Set(bankOpts(h.id).split(/\W+/).filter((w) => w.length > 3));
        let shared = 0;
        for (const w of myWords) if (bw.has(w)) shared++;
        return shared >= 2 || (myWords.size <= 3 && shared >= 1);
      });
      if (!overlaps) {
        wrapper++;
        continue;
      }
      stemOnly++;
      lines.push(`  STEM  Q${r.n}  <- ${hit[0].src} Q${hit[0].n}  (options differ)`);
    }
    console.log(
      `${basename(f)}: ${recs.length} candidates -> EXACT=${exact} STEM=${stemOnly}` +
        ` (+${wrapper} stem-only hits suppressed as boilerplate wrappers with no option overlap)`,
    );
    lines.slice(0, 40).forEach((l) => console.log(l));
    if (lines.length > 40) console.log(`  ... ${lines.length - 40} more`);
    console.log();
  }

  // Duplicates BETWEEN the candidate files.
  const seen = new Map<string, string[]>();
  for (const { f, recs } of parsed)
    for (const r of recs) {
      const k = norm(r.stem);
      if (k.length < 25) continue;
      if (!seen.has(k)) seen.set(k, []);
      seen.get(k)!.push(`${basename(f).split(".")[0]} Q${r.n}`);
    }
  const cross = [...seen.entries()].filter(([, v]) => v.length > 1);
  console.log(`WITHIN-SERIES duplicate stems: ${cross.length}`);
  for (const [k, v] of cross) console.log(`  ${v.join("  =  ")}   | ${k.slice(0, 70)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
