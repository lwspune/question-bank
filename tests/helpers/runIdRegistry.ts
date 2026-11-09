/**
 * The run's id registry: every fixture id a test run hands out, kept as one
 * empty file per id in a folder the run's workers all share (the global setup
 * makes the folder and passes its path to the workers with vitest's
 * provide/inject). The global teardown reads it back and deletes ONLY rows
 * carrying one of these ids, so a run never deletes another live run's
 * fixtures. Spec: tests/test-run-ids.test.ts.
 *
 * One file per id, not one appended list: workers are separate processes, and
 * creating distinct files needs no locking.
 */
import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ID = /^[0-9a-f]{8}$/;

/** Record one id. Throws on anything that is not an 8-hex id (it names a file). */
export function recordRunId(dir: string, id: string): void {
  if (!ID.test(id)) throw new Error(`not a run id: ${JSON.stringify(id)}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, id), "");
}

/** A fresh 8-hex id, recorded when there is a registry. With none (a run
 *  without the global setup) it is still a valid id, swept only once stale. */
export function newRunId(dir: string | undefined): string {
  const id = randomUUID().slice(0, 8);
  if (dir) recordRunId(dir, id);
  return id;
}

/** Every id recorded in the folder; empty when the folder does not exist. */
export function readRunIds(dir: string): Set<string> {
  if (!existsSync(dir)) return new Set();
  return new Set(readdirSync(dir).filter((f) => ID.test(f)));
}
