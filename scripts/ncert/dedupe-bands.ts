/**
 * Resolve a cross-band DUPLICATE REF before merge.ts refuses the chapter.
 *
 *   npx tsx scripts/ncert/dedupe-bands.ts <chapterId>          # report only
 *   npx tsx scripts/ncert/dedupe-bands.ts <chapterId> --write  # drop the later copy
 *
 * WHY THIS EXISTS. Bands are cut at BLOCK boundaries, not page breaks — but the
 * two do not coincide. The recurring seam is the LAST WORKED EXAMPLE BEFORE THE
 * NEXT EXERCISE: by the ref convention it bands to the exercise it precedes
 * (`3.2 Eg.9` belongs to the Exercise 3.2 run-up), while physically it is printed
 * at the top of the NEXT band's first page, above that exercise's header. So the
 * band that owns the ref and the band that owns the page are different agents,
 * and both are right to claim it.
 *
 * Every agent that hit this chose to transcribe it and say so, on the reasoning
 * that A DUPLICATE IS VISIBLE AND A GAP IS NOT. That is the correct instinct and
 * this script is the other half of it: `merge.ts` throws on a duplicate ref (it
 * fails closed, which is why the seam is safe), and this resolves it.
 *
 * IT REFUSES TO CHOOSE WHEN THE COPIES DISAGREE. If two bands transcribed the
 * same ref to materially different text, that is not a duplicate — it is two
 * readings of one page, and silently keeping either would bury a transcription
 * disagreement exactly where nobody would look for it. Compare and decide by
 * hand. Only a near-identical pair is auto-resolved, keeping the copy from the
 * EARLIER band file (alphabetical), which is the one whose exercise run-up the
 * ref names.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, requireChapter } from "./config";

type Row = { ref: string; stem?: string; solution?: string; [k: string]: unknown };

/** Same SCRATCH exclusion merge.ts uses — a band fragment only. */
function bandFiles(id: string): string[] {
  return readdirSync(DATA)
    .filter((f) => f.startsWith(`${id}.`) && f.endsWith(".json"))
    .filter((f) => /\.band-[a-z]\.json$/.test(f))
    .sort();
}

/** Whitespace-insensitive compare — a reflowed line is not a disagreement. */
const norm = (s: unknown) => String(s ?? "").replace(/\s+/g, " ").trim();

function main() {
  const id = process.argv[2];
  const write = process.argv.includes("--write");
  requireChapter(id);

  const files = bandFiles(id);
  if (files.length < 2) {
    console.log(`${id}: ${files.length} band file(s) — nothing to reconcile.`);
    return;
  }

  // ref -> [{file, row}]
  const byRef = new Map<string, { file: string; row: Row }[]>();
  for (const f of files) {
    const rows: Row[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    for (const row of rows) {
      const list = byRef.get(row.ref) ?? [];
      list.push({ file: f, row });
      byRef.set(row.ref, list);
    }
  }

  const dups = [...byRef.entries()].filter(([, v]) => v.length > 1);
  console.log(`${id}: ${files.length} bands, ${byRef.size} distinct refs, ${dups.length} duplicated.`);
  if (!dups.length) return;

  const conflicts: string[] = [];
  const resolvable: { ref: string; keep: string; drop: string[] }[] = [];

  for (const [ref, copies] of dups) {
    const first = copies[0];
    const same = copies.every(
      (c) =>
        norm(c.row.stem) === norm(first.row.stem) &&
        norm(c.row.solution) === norm(first.row.solution)
    );
    const where = copies.map((c) => c.file.match(/band-([a-z])/)?.[1] ?? "?").join(",");
    if (same) {
      resolvable.push({ ref, keep: first.file, drop: copies.slice(1).map((c) => c.file) });
      console.log(`  OK   "${ref}" in bands ${where} — identical; keep ${first.file}`);
    } else {
      conflicts.push(ref);
      console.log(`  DIFF "${ref}" in bands ${where} — copies DISAGREE:`);
      for (const c of copies) {
        console.log(`         [${c.file}] stem: ${norm(c.row.stem).slice(0, 110)}`);
        if (c.row.solution) console.log(`         [${c.file}] soln: ${norm(c.row.solution).slice(0, 110)}`);
      }
    }
  }

  if (conflicts.length) {
    throw new Error(
      `refusing to write: ${conflicts.length} ref(s) transcribed DIFFERENTLY by two bands ` +
        `(${conflicts.join(", ")}). Two readings of one page is a finding, not a duplicate — ` +
        `compare the copies against the rendered page and keep the correct one by hand.`
    );
  }
  if (!write) {
    console.log(`\n[dry-run] pass --write to drop ${resolvable.length} duplicate row(s).`);
    return;
  }

  // Drop, file by file, only the refs assigned away from that file.
  const dropByFile = new Map<string, Set<string>>();
  for (const r of resolvable) {
    for (const f of r.drop) {
      const s = dropByFile.get(f) ?? new Set<string>();
      s.add(r.ref);
      dropByFile.set(f, s);
    }
  }
  for (const [f, refs] of dropByFile) {
    const rows: Row[] = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    const kept = rows.filter((r) => !refs.has(r.ref));
    if (kept.length !== rows.length - refs.size) {
      throw new Error(`${f}: expected to drop ${refs.size} rows, dropped ${rows.length - kept.length}`);
    }
    writeFileSync(join(DATA, f), JSON.stringify(kept, null, 2) + "\n", "utf8");
    console.log(`  ${f}: ${rows.length} → ${kept.length} rows (dropped ${[...refs].join(", ")})`);
  }
  console.log("\ndone. Re-run merge.ts.");
}

main();
