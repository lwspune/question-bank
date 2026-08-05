/**
 * Gate helper: does the changeset between two refs warrant `next build`?
 *
 * Shared by the pre-push hook and CI so both use ONE rule (the pure core in
 * scripts/lib/needsBuild.ts, spec'd in tests/needs-build.test.ts). Duplicating
 * the path list in shell and in YAML is how the two gates drift apart.
 *
 *   npx tsx scripts/needs-build.ts <baseRef> <headRef>
 *
 * Prints a human-readable verdict; exits 0 when a build IS needed, 1 when it
 * can be skipped. Callers branch on the exit code.
 *
 * FAIL-SAFE: any reason we cannot determine the changeset — an unknown ref, a
 * brand-new branch whose base is the all-zeros SHA, a shallow clone missing the
 * base commit, git not on PATH — reports "needed". Never let a broken diff be
 * the reason the gate skipped a build.
 */
import { execFileSync } from "node:child_process";
import { needsBuild, buildRelevantPaths } from "./lib/needsBuild";

const ZERO_SHA = /^0{40}$/;

function changedFiles(base: string, head: string): string[] | null {
  if (!base || ZERO_SHA.test(base)) return null; // new branch: no base to diff
  try {
    const out = execFileSync("git", ["diff", "--name-only", `${base}`, `${head}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return out.split("\n");
  } catch {
    return null; // unknown/unreachable ref, shallow clone, git missing
  }
}

const [base, head = "HEAD"] = process.argv.slice(2);
const files = changedFiles(base ?? "", head);

if (files === null) {
  console.log("[needs-build] cannot resolve the changeset → building (fail-safe)");
  process.exit(0);
}

if (needsBuild(files)) {
  const why = buildRelevantPaths(files);
  console.log(
    `[needs-build] ${why.length} build-relevant file(s) changed → building` +
      `\n              e.g. ${why.slice(0, 3).join(", ")}`
  );
  process.exit(0);
}

const n = files.filter((f) => f.trim()).length;
console.log(
  `[needs-build] ${n} file(s) changed, none readable by next build → skipping build` +
    `\n              (docs / tests / scripts / supabase only — see scripts/lib/needsBuild.ts)`
);
process.exit(1);
