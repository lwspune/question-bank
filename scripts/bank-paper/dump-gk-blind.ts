/**
 * BLIND dump of Foundation Course (+ NDA) candidates for the GAT Part-B build.
 *
 * Two differences from `dump-english-blind.ts`, both measured:
 *
 *  - Foundation Course rows carry NO set_id and NO context (0 of 2,852), so the
 *    directions-block rules that govern English do not apply and selection is
 *    plain per-chapter.
 *
 *  - They carry NO SOLUTION either (Physics 991/991, Chemistry 1012/1014,
 *    Biology 838/847 store a bare key). So this dump feeds a pass that is doing
 *    two jobs at once: re-deriving the key AS A CHECK, and producing the working
 *    that becomes the question's stored solution. The answer key of any paper
 *    built from this corpus is otherwise just letters.
 *
 * The key is withheld at dump time, not by asking the reader not to look.
 *
 * ~270 rows carry a figure. Those are dumped with `hasImage: true` so a deriver
 * can say "unanswerable without the figure" instead of guessing — a text-only
 * blind pass cannot see the diagram, and a confident guess there would be worse
 * than an abstention.
 *
 *   npx tsx scripts/bank-paper/dump-gk-blind.ts <configJson> <outDir>
 *
 * config: { "<chapterId>": { "label": "...", "want": 6 }, ... }
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const [configPath, outDir] = process.argv.slice(2);
if (!configPath || !outDir) throw new Error("usage: dump-gk-blind.ts <configJson> <outDir>");

type Cfg = Record<string, { label: string; want: number }>;
const cfg: Cfg = JSON.parse(readFileSync(configPath, "utf8"));

type Row = {
  id: string;
  chapter_id: string;
  difficulty: string;
  text: string;
  image_url: string | null;
  solution: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
};

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const chapterIds = Object.keys(cfg);

  const rows: Row[] = [];
  for (let from = 0; ; from += 500) {
    const { data, error } = await db
      .from("questions")
      .select("id, chapter_id, difficulty, text, image_url, solution, options(label, text, is_correct)")
      .in("chapter_id", chapterIds)
      .eq("visibility", "PUBLIC")
      .eq("question_format", "mcq")
      .order("id")
      .range(from, from + 499);
    if (error) throw new Error(error.message);
    rows.push(...((data ?? []) as unknown as Row[]));
    if (!data || data.length < 500) break;
  }

  // Exclude anything already committed to a paper — a student may have seen it,
  // and the builder will exclude it later anyway, so verifying it is wasted work.
  const used = new Set<string>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("paper_questions")
      .select("question_id")
      .order("question_id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) used.add(r.question_id as string);
    if (!data || data.length < 1000) break;
  }

  // Already-confirmed rows are usable as they stand; re-deriving them is waste.
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("question_reviews").select("question_id").eq("verdict", "confirmed")
      .order("question_id").range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) used.add(r.question_id as string);
    if (!data || data.length < 1000) break;
  }

  const blind: any[] = [];
  const keys: any[] = [];
  console.log("chapter".padEnd(44) + "want".padStart(6) + "pool".padStart(7) + "taken".padStart(7) + "figs".padStart(6));
  for (const [chapterId, { label, want }] of Object.entries(cfg)) {
    const pool = rows
      .filter((r) => r.chapter_id === chapterId && !used.has(r.id))
      // exactly four options with exactly one key — a structural defect must not
      // reach a deriver, who would waste a derivation on an unshippable row
      .filter((r) => r.options.length === 4 && r.options.filter((o) => o.is_correct).length === 1)
      .sort((a, b) => a.id.localeCompare(b.id));

    // Spread across difficulty rather than taking the first N by id, so the
    // verified pool can still satisfy a HARD quota at selection time.
    const byDiff: Record<string, Row[]> = { HARD: [], MODERATE: [], EASY: [] };
    for (const r of pool) (byDiff[r.difficulty] ??= []).push(r);
    const take: Row[] = [];
    let i = 0;
    while (take.length < want && i < pool.length) {
      for (const d of ["HARD", "MODERATE", "EASY"]) {
        const r = byDiff[d]?.[i];
        if (r && take.length < want) take.push(r);
      }
      i += 1;
    }

    for (const r of take) {
      blind.push({
        id: r.id,
        chapter: label,
        difficulty: r.difficulty,
        hasImage: !!r.image_url,
        stem: r.text,
        options: r.options
          .slice()
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((o) => ({ label: o.label, text: o.text })), // is_correct dropped
      });
      keys.push({
        id: r.id,
        storedKey: r.options.find((o) => o.is_correct)?.label ?? null,
        hasSolution: !!(r.solution ?? "").trim(),
      });
    }
    console.log(
      `${label.padEnd(44)}${String(want).padStart(6)}${String(pool.length).padStart(7)}` +
        `${String(take.length).padStart(7)}${String(take.filter((t) => t.image_url).length).padStart(6)}` +
        (take.length < want ? "   SHORT" : "")
    );
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "blind.json"), JSON.stringify(blind, null, 1), "utf8");
  writeFileSync(join(outDir, "stored-keys.json"), JSON.stringify(keys, null, 1), "utf8");
  console.log(`\n${blind.length} question(s), ${blind.filter((b) => b.hasImage).length} with a figure`);
  console.log(`-> ${join(outDir, "blind.json")}  (give THIS to the agents)`);
  console.log(`-> ${join(outDir, "stored-keys.json")}  (withhold)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
