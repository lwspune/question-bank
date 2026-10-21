/**
 * What the grading scripts share about the prepared pages: running
 * scripts/grading/pages.py, and how many pages a pull prepared.
 */
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";

export const INBOX = join(process.cwd(), "grading-inbox");
const PAGES_SCRIPT = join("scripts", "grading", "pages.py");

/** `pages.py <command> <dir> [...rest]`. -E -P, not -I: isolated mode hides PyMuPDF on this machine. */
export function runPages(command: string, dir: string, ...rest: string[]): unknown {
  const r = spawnSync("python", ["-E", "-P", PAGES_SCRIPT, command, dir, ...rest], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(`pages.py ${command}: ${(r.stderr || r.error?.message || "failed").trim()}`);
  return JSON.parse(r.stdout);
}

function preparedPages(dir: string, id: string): { turns?: number }[] {
  const path = join(dir, "pages", "pages.json");
  if (!existsSync(path)) {
    throw new Error(`The pages were not prepared. Run npm run grading:pull -- --id=${id} (it keeps grade.json).`);
  }
  return JSON.parse(readFileSync(path, "utf8")) as { turns?: number }[];
}

export function preparedPageCount(dir: string, id: string): number {
  return preparedPages(dir, id).length;
}

/** Each prepared page's quarter-turns clockwise (grading:rotate), saved at commit for a regrade. */
export function preparedTurns(dir: string, id: string): number[] {
  return preparedPages(dir, id).map((p) => p.turns ?? 0);
}

export function previewStamp(dir: string): string | null {
  const path = join(dir, "preview", "stamp.json");
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as { stamp: string }).stamp : null;
}

export function fail(e: unknown): never {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}
