/**
 * Resolve collisions between the independently-authored fill files, and report
 * what each rung is left short.
 *
 *   npx tsx scripts/vocab/resolve-fill-duplicates.ts
 *   npx tsx scripts/vocab/resolve-fill-duplicates.ts --apply
 *
 * ═══ WHY THE COLLISIONS ARE STRUCTURAL, NOT CARELESSNESS ═══
 *
 * Each rung is authored by its own agent against `out/_taken-words.txt`, which
 * is a SNAPSHOT taken before any of them started. So every author checked
 * correctly against the book and none could see the others' proposals — and
 * words at the boundary between two rungs are exactly the ones two authors both
 * reach for. 79 of 398 collided. The Class 10 author predicted this in its own
 * report before the run finished.
 *
 * The alternative — authoring the rungs in sequence, regenerating the taken list
 * between each — serialises seven agents to avoid a collision that is cheap to
 * resolve afterwards. This is the cheaper half.
 *
 * ═══ THE LOWER RUNG WINS ═══
 *
 * The ladder's rule is that a word sits at the class that should FIRST know it,
 * which is exactly how the 676 CBSE words were filed (lowest class that prints
 * them). Two authors proposing the same word have each judged it right for
 * their rung; the lower one is the one the ladder's own rule selects.
 *
 * ═══ THIS SCRIPT DOES NOT TOP THE RUNGS BACK UP ═══
 *
 * It reports the shortfall and stops. Filling it is an authoring pass, and
 * quietly shipping a rung of 94 where 130 was asked for would make "the rung is
 * short" and "the rung was meant to be smaller" indistinguishable — the failure
 * `build-fill-roster.ts` refuses for the same reason.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";
config({ path: ".env.local", override: true });
import { createClient } from "@supabase/supabase-js";
import { CADET_VOCAB } from "../../src/lib/vocab/registry";

const DATA = join(__dirname, "data");
const APPLY = process.argv.includes("--apply");
const CLASSES = [5, 6, 7, 8, 9, 10, 11, 12];

type Authored = { word: string; [k: string]: unknown };

(async () => {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const taken = new Set<string>();
  const have = new Map<number, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("word,part,school_class")
      .eq("book_slug", CADET_VOCAB.slug)
      .order("word")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    for (const r of data ?? []) {
      taken.add((r.word as string).toLowerCase());
      if (r.part === "school" && r.school_class != null) {
        have.set(r.school_class as number, (have.get(r.school_class as number) ?? 0) + 1);
      }
    }
    if ((data ?? []).length < 1000) break;
  }

  // Lowest rung first, so the earlier class claims a contested word.
  const claimed = new Map<string, number>();
  const kept = new Map<number, Authored[]>();
  const droppedBook: string[] = [];
  const droppedDupe: string[] = [];

  for (const cls of CLASSES) {
    const path = join(DATA, `fill-class-${cls}.json`);
    if (!existsSync(path)) continue;
    const rows: Authored[] = JSON.parse(readFileSync(path, "utf8"));
    const survivors: Authored[] = [];
    for (const r of rows) {
      const w = r.word.toLowerCase();
      if (taken.has(w)) {
        droppedBook.push(`Class ${cls}: "${w}" is already in the book`);
        continue;
      }
      const first = claimed.get(w);
      if (first !== undefined) {
        droppedDupe.push(`Class ${cls}: "${w}" kept at the lower Class ${first}`);
        continue;
      }
      claimed.set(w, cls);
      survivors.push(r);
    }
    kept.set(cls, survivors);
  }

  console.log(`dropped as already in the book : ${droppedBook.length}`);
  for (const d of droppedBook) console.log(`  - ${d}`);
  console.log(`dropped as a cross-rung duplicate: ${droppedDupe.length}`);

  console.log("");
  let shortfall = 0;
  for (const cls of CLASSES) {
    const rung = CADET_VOCAB.chapters.find((c) => c.part === "school" && c.schoolClass === cls);
    if (!rung) continue;
    const survivors = kept.get(cls) ?? [];
    const total = (have.get(cls) ?? 0) + survivors.length;
    const short = Math.max(0, rung.expected - total);
    shortfall += short;
    console.log(
      `  Class ${String(cls).padStart(2)}  cbse ${String(have.get(cls) ?? 0).padStart(3)}` +
        ` + fill ${String(survivors.length).padStart(3)}` +
        ` = ${String(total).padStart(3)} / ${rung.expected}` +
        (short ? `   SHORT ${short}` : "   ok")
    );
  }
  console.log(`\ntotal still to author: ${shortfall}`);

  if (!APPLY) {
    console.log("\n[dry-run] pass --apply to rewrite the fill files.");
    return;
  }
  for (const cls of CLASSES) {
    const survivors = kept.get(cls);
    if (!survivors) continue;
    writeFileSync(
      join(DATA, `fill-class-${cls}.json`),
      JSON.stringify(survivors, null, 2) + "\n"
    );
  }
  console.log("\nrewrote the fill files with collisions removed.");
})();
