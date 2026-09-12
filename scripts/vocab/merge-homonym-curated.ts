/**
 * Fold the curated confusable pairs into the Part 5 list.
 *
 *   npx tsx scripts/vocab/merge-homonym-curated.ts            # dry run
 *   npx tsx scripts/vocab/merge-homonym-curated.ts --apply
 *
 * TWO SOURCES, ONE LIST, AND THEY ARE NOT EQUAL EVIDENCE. The 112 sets already
 * in `homonym-list.json` come from a question paper that ASKS about them: a real
 * exam asserted those words are confusable. A curated pair is OUR judgement that
 * a candidate would confuse them. Both belong in Part 5 — a reader needs the
 * warning either way — but the file records which is which in `source`, so the
 * weaker claim can be found again and is never silently promoted.
 *
 * EVERY PAIR MUST NAME WORDS THE BOOK DEFINES. Part 5 prints no meanings, so a
 * set naming an absent word is a dead cross-reference that still prints. Checked
 * here AND standing in `verify.ts`.
 *
 * IT REFUSES RATHER THAN MERGES a curated pair that is already covered by a
 * source set — the paper's grouping wins, and a pair silently absorbed into a
 * triple would make the counts unreconcilable.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";

const DATA = join(__dirname, "data");
const APPLY = process.argv.includes("--apply");

type Set_ = { words: string[]; q?: number; source?: string };
type Curated = { words: string[]; keep: boolean; why?: string };

(async () => {
  const existing = JSON.parse(readFileSync(join(DATA, "homonym-list.json"), "utf8")) as Set_[];
  const files = readdirSync(DATA).filter((f) => /^homonym-curated-\d+\.json$/.test(f)).sort();
  if (!files.length) throw new Error("no homonym-curated-*.json found");

  const curated: Curated[] = [];
  for (const f of files) curated.push(...(JSON.parse(readFileSync(join(DATA, f), "utf8")) as Curated[]));
  const kept = curated.filter((c) => c.keep);
  console.log(`${files.length} packet(s): ${curated.length} judged, ${kept.length} kept (${((kept.length / curated.length) * 100).toFixed(0)}%)`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const rows: { word: string }[] = [];
  for (let f = 0; ; f += 1000) {
    const { data, error } = await db.from("vocab_entries").select("word")
      .eq("book_slug", "cadet-vocab").order("word").range(f, f + 999);
    if (error) throw new Error(error.message);
    rows.push(...(data ?? [])); if ((data ?? []).length < 1000) break;
  }
  const have = new Set(rows.map((r) => r.word.toLowerCase()));

  const key = (ws: string[]) => ws.map((w) => w.toLowerCase()).sort().join("|");
  const seen = new Map<string, Set_>();
  for (const s of existing) seen.set(key(s.words), s);
  // A curated PAIR whose words both sit inside an existing SET is already taught.
  const covered = (ws: string[]) =>
    existing.some((s) => ws.every((w) => s.words.some((x) => x.toLowerCase() === w.toLowerCase())));

  const added: Set_[] = [];
  const dangling: string[] = [];
  const dup: string[] = [];
  for (const c of kept) {
    const ws = c.words.map((w) => w.trim());
    const missing = ws.filter((w) => !have.has(w.toLowerCase()));
    if (missing.length) { dangling.push(`${ws.join(" / ")}  (no entry: ${missing.join(", ")})`); continue; }
    if (seen.has(key(ws)) || covered(ws)) { dup.push(ws.join(" / ")); continue; }
    const s: Set_ = { words: ws, source: "curated" };
    seen.set(key(ws), s);
    added.push(s);
  }
  console.log(`  naming a word the book does not define: ${dangling.length}`);
  for (const d of dangling) console.log(`     !! ${d}`);
  console.log(`  already covered by a source set: ${dup.length}`);
  for (const d of dup.slice(0, 8)) console.log(`     - ${d}`);
  console.log(`  NEW sets to add: ${added.length}`);

  if (dangling.length) throw new Error("a curated pair names a word with no entry — REFUSING");

  const out = [...existing.map((s) => ({ ...s, source: s.source ?? "paper" })), ...added]
    .sort((a, b) => a.words[0].toLowerCase().localeCompare(b.words[0].toLowerCase()));
  console.log(`\nPart 5: ${existing.length} -> ${out.length} sets` +
    `  (paper ${out.filter((s) => s.source === "paper").length}, curated ${out.filter((s) => s.source === "curated").length})`);

  if (!APPLY) { console.log("\n[dry-run] pass --apply to write homonym-list.json."); return; }
  writeFileSync(join(DATA, "homonym-list.json"), JSON.stringify(out, null, 1) + "\n", "utf8");
  console.log("written.");
})();
