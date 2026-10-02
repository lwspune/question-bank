/**
 * `npm run disk:preflight` — exit 1 when the disk this repo lives on has too
 * little room for `next build`. Runs first in the build variants of the
 * prepush gate (prepush, prepush:nonotes), so a full disk fails in a second
 * instead of after the whole test suite. Rule and floor: scripts/lib/diskPreflight.ts.
 *
 * LOCAL ONLY, on purpose. CI runs its steps one by one (.github/workflows/ci.yml),
 * not these scripts, on a fresh runner whose disk is not this machine's — the
 * same reasoning as guarding a test on a local path rather than on CI.
 */
import { existsSync, statfsSync } from "node:fs";
import { join } from "node:path";
import { buildFloorBytes, diskVerdict } from "./lib/diskPreflight";

const stats = statfsSync(process.cwd());
const warmCache = existsSync(join(process.cwd(), ".next", "cache", "webpack"));
const verdict = diskVerdict(stats.bavail * stats.bsize, buildFloorBytes(warmCache));
console.log(verdict.line);
process.exit(verdict.ok ? 0 : 1);
