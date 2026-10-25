/**
 * Turn agents' drafts into a batch file for visuals:run.
 *
 *   npm run visuals:assemble -- --scene=functionGraph --name=<batch> <draft.json> [<draft.json> ...]
 *
 * Each draft file is a JSON array of { n, id, skip, params, steps, answer } (or
 * { id, skip: true, reason }). The stored solution and the key are read from
 * the database here, never taken from the agent: lib/visuals/assemble adds the
 * fingerprint and runs the checks, and the MCQ option is the database key.
 * Writes data/<batch>.json with the drafts that pass and prints every one that
 * was dropped, with why. Then run visuals:run on it as usual. Read-only.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { assembleDraft } from "../../src/lib/visuals/assemble";

const arg = (name: string) => process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const scene = arg("scene");
  const name = arg("name");
  const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (!scene || !name || !files.length) throw new Error("usage: visuals:assemble -- --scene=<id> --name=<batch> <draft.json> ...");
  const drafts = files.flatMap((f) => JSON.parse(readFileSync(f, "utf8")) as { id: string; n?: number }[]);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  type Row = { id: string; solution: string | null; question_format: string; options: { label: string; is_correct: boolean }[] | null };
  const rows = new Map<string, Row>();
  const ids = [...new Set(drafts.map((d) => d.id))];
  for (let i = 0; i < ids.length; i += 150) {
    const { data, error } = await db.from("questions").select("id, solution, question_format, options(label, is_correct)").in("id", ids.slice(i, i + 150));
    if (error) throw new Error(error.message);
    for (const r of data as Row[]) rows.set(r.id, r);
  }

  const visuals: { id: string; option?: string; visual: unknown }[] = [];
  const skipped: string[] = [];
  const dropped: string[] = [];
  for (const d of drafts) {
    const row = rows.get(d.id);
    if (!row) {
      dropped.push(`${d.id}: no such question`);
      continue;
    }
    const r = assembleDraft(d, scene, row.solution);
    if (!r.ok) {
      (r.skipped ? skipped : dropped).push(`#${d.n ?? "?"} ${d.id}: ${r.reason}`);
      continue;
    }
    const correct = (row.options ?? []).filter((o) => o.is_correct).map((o) => o.label);
    if (row.question_format === "mcq" && correct.length !== 1) {
      dropped.push(`#${d.n ?? "?"} ${d.id}: the question does not have exactly one keyed option`);
      continue;
    }
    visuals.push({ id: d.id, ...(row.question_format === "mcq" ? { option: correct[0] } : {}), visual: r.visual });
  }

  const out = join(__dirname, "data", `${name}.json`);
  writeFileSync(out, JSON.stringify({ "//": `Assembled from agent drafts (${scene}).`, visuals, decided: [] }, null, 2) + "\n");
  console.log(`${name}: ${drafts.length} drafts -> ${visuals.length} visuals, ${skipped.length} skipped by the agent, ${dropped.length} dropped`);
  for (const s of dropped) console.log(`  dropped ${s}`);
  for (const s of skipped) console.log(`  skipped ${s}`);
  console.log(`next: npm run visuals:run -- ${name}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
