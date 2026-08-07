/**
 * Run every standing syllabus-map probe, across every registered subject.
 *
 *   npm run syllabus:audit
 *
 * Exists because a probe that only runs when someone remembers catches drift
 * late: audit-directions sat at 129 (false) contradictions from the moment the
 * Maths pointers landed until an end-of-phase pass happened to run it
 * (2026-08-07). Run this after ANY syllabus commit (spine seed, rulings batch,
 * derive-board-status, taxonomy change).
 *
 * Exit semantics mirror each probe's own design:
 *   - audit-directions --ci   GATE (subject-scoped internally, audits ALL
 *                             subjects in one pass — the --subject flag is
 *                             accepted but ignored by design)
 *   - audit-alignment         GATE, per subject (fails if a paired alignment
 *                             row loses its authored backing)
 *   - audit-spine             TRIAGE, per subject (reports section holes and
 *                             prose-swallowed titles; a book may genuinely
 *                             skip a number, so it never fails the run)
 *
 * Deliberately NOT wired into prepush: these are live-DB scans, and the gate
 * chain must stay runnable without touching prod more than it already does.
 */
import { spawnSync } from "node:child_process";
import { syllabusSubjectKeys } from "../../src/lib/syllabus/subjects";

type Result = { label: string; gate: boolean; ok: boolean };

function run(label: string, gate: boolean, script: string, ...args: string[]): Result {
  console.log(`\n===== ${label} =====`);
  const r = spawnSync("npx", ["tsx", `scripts/syllabus/${script}`, ...args], {
    stdio: "inherit",
    shell: true, // Windows: resolves npx.cmd
  });
  return { label, gate, ok: r.status === 0 };
}

function main() {
  const results: Result[] = [];
  results.push(run("audit-directions (all subjects)", true, "audit-directions.ts", "--ci"));
  for (const key of syllabusSubjectKeys()) {
    results.push(run(`audit-alignment --subject=${key}`, true, "audit-alignment.ts", `--subject=${key}`));
    results.push(run(`audit-spine --subject=${key} (triage)`, false, "audit-spine.ts", `--subject=${key}`));
  }

  console.log("\n===== syllabus:audit summary =====");
  let failed = 0;
  for (const r of results) {
    const verdict = r.ok ? "ok" : r.gate ? "FAIL" : "reported findings (triage — not a failure)";
    if (!r.ok && r.gate) failed += 1;
    console.log(`  ${r.ok ? "✓" : r.gate ? "✗" : "!"} ${r.label}: ${verdict}`);
  }
  if (failed) {
    console.error(`\n${failed} gate probe(s) FAILED.`);
    process.exit(1);
  }
  console.log("\nAll gate probes green.");
}

main();
