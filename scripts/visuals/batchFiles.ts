/** Every verdict recorded in scripts/visuals/data/*.json (lib/visuals/batch.ts), for the coverage report and the ingestion gate. */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Verdict, VisualBatch } from "../../src/lib/visuals/batch";

export function verdictsFromBatchFiles(dir = join(__dirname, "data")): Map<string, Verdict> {
  const out = new Map<string, Verdict>();
  for (const f of readdirSync(dir).filter((n) => n.endsWith(".json")).sort()) {
    const b = JSON.parse(readFileSync(join(dir, f), "utf8")) as VisualBatch;
    for (const d of b.decided ?? []) out.set(d.id, d.verdict);
  }
  return out;
}
