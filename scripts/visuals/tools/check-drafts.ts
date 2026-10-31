/**
 * Check agent drafts against the scene itself, with no database: each draft's
 * params must parse, and the scene's own check must give the draft's
 * answer.value. Read-only; for agents to run on their own output before
 * handing it back (the assembler and visuals:run repeat every check later).
 *
 *   npx tsx scripts/visuals/tools/check-drafts.ts --scene=letterStrip <draft.json> [...]
 *
 * Prints one line per problem and a count; exits 1 when any draft fails.
 */
import { readFileSync } from "node:fs";
import { getScene } from "../../../src/lib/visuals/registry";

const sceneId = process.argv.find((a) => a.startsWith("--scene="))?.slice(8);
const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const scene = sceneId ? getScene(sceneId) : undefined;
if (!scene || !files.length) {
  console.error("usage: check-drafts.ts --scene=<id> <draft.json> ...");
  process.exit(2);
}

let ok = 0;
let bad = 0;
for (const f of files) {
  const drafts = JSON.parse(readFileSync(f, "utf8")) as { n?: number; id?: string; skip?: boolean; params?: unknown; answer?: { value?: number } }[];
  for (const d of drafts) {
    if (d.skip) continue;
    const tag = `#${d.n ?? "?"} ${String(d.id ?? "").slice(0, 8)}`;
    const p = scene.parse(d.params);
    if (p && typeof p === "object" && "error" in p) {
      console.log(`${tag}: ${(p as { error: string }).error}`);
      bad++;
      continue;
    }
    const v = scene.check(p);
    if (v !== d.answer?.value) {
      console.log(`${tag}: the scene gives ${v}, the draft says ${d.answer?.value} (${scene.checkText(p, v)})`);
      bad++;
      continue;
    }
    ok++;
  }
}
console.log(`${ok} ok, ${bad} with problems`);
process.exit(bad ? 1 : 0);
