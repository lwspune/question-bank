/**
 * Build the English word games' word file from the bank (2026-11-17).
 *
 *   npm run play:words            # rewrite public/data/play-words.json + play-daily-words.json
 *   npm run play:words -- --check # exit 1 if the committed file is stale
 *
 * Reads PUBLIC past-year MCQs in every synonym/antonym subtopic (read-only,
 * service role), keeps the ones with one marked word, one right answer and an
 * explanation (lib/play/words/extract), one entry per word. Cancelled and
 * publish-blocked questions are left out: their keys are not to be trusted.
 * Committed rather than read at request time so the games cost the database
 * nothing and the Daily Word stays the same all day. Re-run after an English
 * ingest or a key fix in those subtopics.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { toWordEntry, dedupeWords, type BankWordRow } from "../../src/lib/play/words/extract";
import { isDailyCandidate } from "../../src/lib/play/words/daily";

const local = path.join(process.cwd(), ".env.local");
if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });

const OUT = path.join(process.cwd(), "public", "data", "play-words.json");
const OUT_DAILY = path.join(process.cwd(), "public", "data", "play-daily-words.json");
const PAGE = 1000;
const CHECK = process.argv.includes("--check");

type Raw = {
  id: string;
  text: string;
  context: string | null;
  solution: string | null;
  pyq_year: number | null;
  pyq_note: string | null;
  exams: { name: string } | null;
  subtopics: { name: string } | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

async function main() {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const { data: subs, error: e1 } = await sb.from("subtopics").select("id, name").or("name.ilike.%synonym%,name.ilike.%antonym%");
  if (e1) throw new Error(`subtopics: ${e1.message}`);
  const subIds = (subs ?? []).map((s) => s.id as string);
  if (subIds.length === 0) throw new Error("no synonym/antonym subtopics found");
  if (subIds.length > 200) throw new Error(`${subIds.length} subtopics: chunk the .in() filter`);

  const COLS =
    "id, text, context, solution, pyq_year, pyq_note, exams(name), subtopics(name), options(label, text, is_correct)";
  const base = (head = false) =>
    sb
      .from("questions")
      .select(head ? "id" : COLS, head ? { count: "exact", head: true } : undefined)
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .eq("question_format", "mcq")
      .is("publish_blocked", null)
      .is("cancelled_note", null)
      .in("subtopic_id", subIds);

  const { count, error: e2 } = await base(true);
  if (e2) throw new Error(`head count: ${e2.message}`);
  const expected = count ?? 0;
  if (expected === 0) throw new Error("the bank reports no questions in those subtopics: check the filters");

  const raw: Raw[] = [];
  for (let from = 0; from < expected; from += PAGE) {
    const { data, error } = await base()
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`page at ${from}: ${error.message}`);
    raw.push(...((data ?? []) as unknown as Raw[]));
  }
  if (raw.length !== expected) throw new Error(`short read: fetched ${raw.length}, the bank reports ${expected}`);

  const entries = raw.flatMap((r) => {
    const row: BankWordRow = {
      id: r.id,
      text: r.text,
      context: r.context,
      subtopic: r.subtopics?.name ?? "",
      exam: r.exams?.name ?? "",
      pyqYear: r.pyq_year,
      pyqNote: r.pyq_note,
      solution: r.solution,
      options: (r.options ?? []).map((o) => ({ label: o.label, text: o.text, isCorrect: o.is_correct })),
    };
    const e = toWordEntry(row);
    return e ? [e] : [];
  });
  const words = dedupeWords(entries);
  const body = JSON.stringify({ v: 1, words }) + "\n";

  const byGroup = words.reduce<Record<string, number>>((acc, w) => ((acc[w.group] = (acc[w.group] ?? 0) + 1), acc), {});
  console.log(
    `read ${raw.length} questions, ${entries.length} playable, ${words.length} words ` +
      `(${Object.entries(byGroup).map(([g, n]) => `${g} ${n}`).join(", ")}), ` +
      `${words.filter(isDailyCandidate).length} fit the Daily Word, ${(Buffer.byteLength(body) / 1024).toFixed(0)} KB`
  );

  // Daily Word needs only its own words: a separate, much smaller file.
  const dailyBody = JSON.stringify({ v: 1, words: words.filter(isDailyCandidate) }) + "\n";
  const files: [string, string][] = [
    [OUT, body],
    [OUT_DAILY, dailyBody],
  ];

  if (CHECK) {
    const stale = files.filter(([f, b]) => !fs.existsSync(f) || fs.readFileSync(f, "utf8") !== b);
    if (stale.length > 0) {
      console.error(`${stale.map(([f]) => path.basename(f)).join(", ")} stale: run npm run play:words and commit`);
      process.exit(1);
    }
    console.log("word files are current");
    return;
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  for (const [f, b] of files) {
    fs.writeFileSync(f, b);
    console.log(`wrote ${path.relative(process.cwd(), f)} (${(Buffer.byteLength(b) / 1024).toFixed(0)} KB)`);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
