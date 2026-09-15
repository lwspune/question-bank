/**
 * Score an authored Current-Affairs pool against the blueprint. TRIAGE.
 *
 *   npx tsx scripts/current-affairs/audit.ts nda-2-2026
 *   npx tsx scripts/current-affairs/audit.ts nda-2-2026 --source="Some Other Pool.docx"
 *
 * ALWAYS EXITS 0. A pool that misses its blueprint may be deliberately skewed — a
 * year with an unusually busy defence calendar is a real reason to over-fill
 * Defence — so this prints the numbers and a human decides. It is the sibling of
 * `audit:text` and `audit:keys`, not of `board:lint`.
 *
 * RUN IT BEFORE THE EXAM. Everything here was computable in August 2026 and
 * would have named all three of the Sep-2026 pool's misses; running it afterwards
 * only confirms a post-mortem. That is the whole value of the tool.
 */
import { caBlueprint, scorePool } from "@/lib/currentAffairs/blueprint";
import { evergreenCaveat, classifyGenre, poolWindow, WINDOW_BACK_MONTHS, FRESHNESS_CEILING_MONTHS } from "@/lib/currentAffairs/window";
import { admin, loadPyqHistory, loadBySourceFile } from "./db";
import { requireSitting } from "./config";

function flag(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.slice(name.length + 3);
}

function pct(x: number): string {
  return `${(x * 100).toFixed(0)}%`;
}

function monthLabel(index: number): string {
  const year = Math.floor((index - 1) / 12);
  const month = index - year * 12;
  return `${year}-${String(month).padStart(2, "0")}`;
}

async function main() {
  const sitting = requireSitting(process.argv[2]);
  const sourceFile = flag("source") ?? sitting.poolSourceFile;
  if (!sourceFile) {
    console.log(
      `${sitting.label} has no pool registered. Pass --source="<file>.docx", or add ` +
        `poolSourceFile to SITTINGS in scripts/current-affairs/config.ts.`
    );
    return;
  }

  const db = admin();
  const [history, pool] = await Promise.all([
    loadPyqHistory(db),
    loadBySourceFile(db, sourceFile),
  ]);

  const bp = caBlueprint(history);
  const span = poolWindow(sitting.examMonth);
  const score = scorePool(pool, bp, span);

  console.log(`\nCURRENT-AFFAIRS POOL AUDIT — ${sitting.label}`);
  console.log(`  pool     ${sourceFile} — ${score.poolSize} questions`);
  console.log(
    `  target   derived from ${bp.totalPyq} PYQs across ${bp.sittings} sittings`
  );
  console.log(
    `  window   ${monthLabel(span.fromIndex)} .. ${monthLabel(span.toIndex)} ` +
      `(T-${WINDOW_BACK_MONTHS}m .. T-${FRESHNESS_CEILING_MONTHS}m)`
  );

  if (score.poolSize === 0) {
    console.log(`\n  No rows carry source_file = ${JSON.stringify(sourceFile)}.`);
    console.log(`  Nothing to score. Check the spelling against the bank.`);
    return;
  }

  console.log(`\nCHAPTER MIX`);
  console.log(
    `  ${"chapter".padEnd(48)} ${"want".padStart(5)} ${"have".padStart(5)} ` +
      `${"delta".padStart(6)}   evergreen want/have`
  );
  for (const c of [...score.chapters].sort((a, b) => b.target - a.target)) {
    const delta = c.delta === 0 ? "-" : `${c.delta > 0 ? "+" : ""}${c.delta}`;
    console.log(
      `  ${c.chapter.slice(0, 48).padEnd(48)} ${String(c.target).padStart(5)} ` +
        `${String(c.actual).padStart(5)} ${delta.padStart(6)}   ` +
        `${c.targetEvergreen} / ${c.actualEvergreen}`
    );
  }

  console.log(`\nGENRE`);
  console.log(
    `  evergreen (no date named)  ${pct(score.genre.actualRate)} authored ` +
      `vs ${pct(score.genre.targetRate)} in the PYQ history`
  );

  console.log(`\nWINDOW  (dated rows only; evergreen rows have no date to place)`);
  console.log(`  inside            ${score.window.in}`);
  console.log(`  partial           ${score.window.partial}   bare year straddling a boundary`);
  console.log(`  outside           ${score.window.out}`);
  console.log(`  undated           ${score.window.undated}   evergreen — counted, not judged`);

  // The classifier is a regex over year tokens. These are the rows where it is
  // most likely to be wrong, surfaced rather than quietly folded into a total.
  const caveats = pool
    .map((r) => ({ r, why: evergreenCaveat(`${r.text} ${r.solution ?? ""}`) }))
    .filter((x) => x.why !== null);
  if (caveats.length) {
    console.log(`\nCLASSIFIER CAVEATS  (${caveats.length} rows — read, do not assume)`);
    for (const { r, why } of caveats.slice(0, 15)) {
      console.log(`  [${classifyGenre(`${r.text} ${r.solution ?? ""}`)}] ${r.text.replace(/\s+/g, " ").slice(0, 88)}`);
      console.log(`      ${why}`);
    }
    if (caveats.length > 15) console.log(`  ... and ${caveats.length - 15} more`);
  }

  console.log(`\nFINDINGS`);
  if (score.findings.length === 0) {
    console.log(`  none — the pool matches the blueprint within tolerance.`);
  } else {
    for (const f of score.findings) console.log(`  - ${f}`);
  }
  console.log(
    `\n  Triage, not a gate. A deliberate skew is a legitimate answer; an ` +
      `unnoticed one is what this exists to catch.\n`
  );
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
