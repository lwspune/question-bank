/**
 * Repair pandoc-ingest artifacts in `questions.solution` for a set of papers.
 *
 *   npx tsx scripts/repair/solution-artifacts.ts --papers=<uuid,uuid>      # dry run
 *   npx tsx scripts/repair/solution-artifacts.ts --papers=<uuid> --apply
 *   npx tsx scripts/repair/solution-artifacts.ts --revert=<snapshot.json> --apply
 *
 * DRY RUN BY DEFAULT. `--apply` writes; every run first stores a snapshot of
 * the exact before-text of every row it will touch, so a revert is a file away.
 *
 * Only `solution` is written. That is safe because `solution` is excluded from
 * both dedup hashes, so no id is re-minted and no paper/mock reference can be
 * orphaned — see the header of scripts/lib/solutionArtifacts.ts.
 *
 * Devanagari is REPORTED, never repaired: translating is editorial work and
 * deleting the line would delete the reasoning.
 */
import { config } from "dotenv";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import {
  repairSolution,
  solutionArtifacts,
  type ArtifactKind,
} from "../lib/solutionArtifacts";

config({ path: ".env.local", override: true });

const args = process.argv.slice(2);
const APPLY = args.includes("--apply");
const papersArg = args.find((a) => a.startsWith("--papers="))?.slice(9) ?? "";
const revertArg = args.find((a) => a.startsWith("--revert="))?.slice(9) ?? "";
const SNAP_DIR = "scripts/repair/snapshots";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing Supabase env (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
const db = createClient(url, key, { auth: { persistSession: false } });

type Row = { id: string; solution: string | null; title: string; position: number };

async function loadRows(paperIds: string[]): Promise<Row[]> {
  const out: Row[] = [];
  for (const pid of paperIds) {
    const { data: paper, error: pe } = await db
      .from("papers").select("id,title").eq("id", pid).single();
    if (pe) throw pe;
    // Chunk the id filter at 200 — a long `.in()` list goes in the URL and
    // PostgREST answers a bare Bad Request past ~800 ids.
    const { data: links, error: le } = await db
      .from("paper_questions").select("question_id,position").eq("paper_id", pid);
    if (le) throw le;
    const ids = (links ?? []).map((l) => l.question_id as string);
    const posById = new Map((links ?? []).map((l) => [l.question_id as string, l.position as number]));
    for (let i = 0; i < ids.length; i += 200) {
      const { data, error } = await db
        .from("questions").select("id,solution").in("id", ids.slice(i, i + 200));
      if (error) throw error;
      for (const r of data ?? [])
        out.push({ id: r.id as string, solution: r.solution as string | null, title: paper.title as string, position: posById.get(r.id as string) ?? 0 });
    }
  }
  return out;
}

async function revert(file: string) {
  const snap = JSON.parse(readFileSync(file, "utf8")) as { id: string; before: string }[];
  console.log(`Reverting ${snap.length} rows from ${file}`);
  if (!APPLY) return console.log("DRY RUN — add --apply to write.");
  for (const r of snap) {
    const { error } = await db.from("questions").update({ solution: r.before }).eq("id", r.id);
    if (error) throw error;
  }
  console.log("Reverted.");
}

async function main() {
  if (revertArg) return revert(revertArg);
  const paperIds = papersArg.split(",").map((s) => s.trim()).filter(Boolean);
  if (paperIds.length === 0) throw new Error("Pass --papers=<uuid,uuid>");

  const rows = await loadRows(paperIds);
  console.log(`Scanned ${rows.length} questions across ${paperIds.length} paper(s).\n`);

  const tally = new Map<ArtifactKind, number>();
  const changes: { id: string; before: string; after: string; title: string; position: number; kinds: ArtifactKind[] }[] = [];
  const devanagari: { id: string; title: string; position: number }[] = [];

  for (const r of rows) {
    if (!r.solution) continue;
    const kinds = solutionArtifacts(r.solution);
    for (const k of kinds) tally.set(k, (tally.get(k) ?? 0) + 1);
    if (kinds.includes("devanagari")) devanagari.push({ id: r.id, title: r.title, position: r.position });
    const after = repairSolution(r.solution);
    if (after !== r.solution) changes.push({ id: r.id, before: r.solution, after, title: r.title, position: r.position, kinds });
  }

  console.log("Artifacts found (a row can carry several):");
  for (const [k, n] of [...tally].sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(18)} ${n}`);
  console.log(`\nRows to rewrite: ${changes.length}`);

  // Idempotence is a PROPERTY OF THE DATA, not just of the unit fixtures —
  // assert it on every real row before writing anything.
  const notIdempotent = changes.filter((c) => repairSolution(c.after) !== c.after);
  if (notIdempotent.length > 0) throw new Error(`REFUSING: ${notIdempotent.length} repairs are not idempotent (first: ${notIdempotent[0].id})`);

  // A repair must never destroy a math zone: count delimiters before/after.
  const zoneCount = (s: string) => (s.match(/\\\(|\\\[/g) ?? []).length;
  const lost = changes.filter((c) => zoneCount(c.after) < zoneCount(c.before));
  if (lost.length > 0) throw new Error(`REFUSING: ${lost.length} repairs LOSE a math zone (first: ${lost[0].id})`);

  // Every LaTeX environment must still balance. This is the check that catches
  // a mis-paired nested block — which renders as broken math while the zone
  // delimiters above stay perfectly balanced, so the zone count cannot see it.
  const unbalanced = (s: string) => {
    const counts = new Map<string, number>();
    for (const m of s.matchAll(/\\(begin|end)\{([a-zA-Z*]+)\}/g))
      counts.set(m[2], (counts.get(m[2]) ?? 0) + (m[1] === "begin" ? 1 : -1));
    return [...counts].filter(([, n]) => n !== 0).map(([k]) => k);
  };
  const broke = changes.filter(
    (c) => unbalanced(c.after).length > unbalanced(c.before).length
  );
  if (broke.length > 0)
    throw new Error(
      `REFUSING: ${broke.length} repairs leave an environment unbalanced (first: ${broke[0].id} → ${unbalanced(broke[0].after).join(", ")})`
    );

  if (devanagari.length > 0) {
    console.log(`\nDevanagari — reported, NOT repaired (needs an editorial rewrite):`);
    for (const d of devanagari) console.log(`  ${d.title} Q${d.position}  ${d.id}`);
  }

  console.log("\nSample diffs (first 3):");
  for (const c of changes.slice(0, 3)) {
    console.log(`\n--- ${c.title} Q${c.position} [${c.kinds.join(", ")}]`);
    console.log(`BEFORE: ${JSON.stringify(c.before.slice(0, 150))}`);
    console.log(`AFTER : ${JSON.stringify(c.after.slice(0, 150))}`);
  }

  if (!APPLY) return console.log("\nDRY RUN — add --apply to write.");

  mkdirSync(SNAP_DIR, { recursive: true });
  const snapFile = `${SNAP_DIR}/${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  writeFileSync(snapFile, JSON.stringify(changes.map((c) => ({ id: c.id, before: c.before })), null, 2));
  console.log(`\nSnapshot: ${snapFile}`);

  let n = 0;
  for (const c of changes) {
    // Assert the row still holds the text we planned against — refuse on drift.
    const { data, error: re } = await db.from("questions").select("solution").eq("id", c.id).single();
    if (re) throw re;
    if (data.solution !== c.before) throw new Error(`REFUSING: ${c.id} changed since the scan.`);
    const { error } = await db.from("questions").update({ solution: c.after }).eq("id", c.id);
    if (error) throw error;
    n++;
  }
  console.log(`Rewrote ${n} solutions.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
