/**
 * Gate: is CLAUDE.md still within its token budget?
 *
 *   npx tsx scripts/docs-budget.ts [--json]
 *
 * Exits 1 on a hard violation (a byte ceiling, an entry two months stale, or a
 * file this gate could not parse), 0 otherwise. Warnings never fail the run.
 *
 * Rationale, ceilings and the not-grandfathered rule: scripts/lib/docsBudget.ts.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { auditDocsBudget, LIMITS } from "./lib/docsBudget";

const CLAUDE_MD = resolve(process.cwd(), "CLAUDE.md");

function main() {
  const json = process.argv.includes("--json");
  let md: string;
  try {
    md = readFileSync(CLAUDE_MD, "utf8");
  } catch {
    console.error(`docs:budget — cannot read ${CLAUDE_MD}`);
    process.exit(1);
  }

  const today = new Date().toISOString().slice(0, 10);
  const r = auditDocsBudget(md, today, LIMITS);

  if (json) {
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.ok ? 0 : 1);
  }

  const pct = (n: number, max: number) => `${((n / max) * 100).toFixed(0)}%`;
  const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;

  console.log("CLAUDE.md token budget");
  console.log(
    `  whole file      ${kb(r.fileBytes).padStart(9)}  of ${kb(LIMITS.fileMaxBytes)}  (${pct(r.fileBytes, LIMITS.fileMaxBytes)})`,
  );
  console.log(
    `  Decisions log   ${kb(r.decisionsBytes).padStart(9)}  of ${kb(LIMITS.decisionsMaxBytes)}  (${pct(r.decisionsBytes, LIMITS.decisionsMaxBytes)}, ${r.entries.length} entries)`,
  );
  console.log(`  ~tokens         ${Math.round(r.fileBytes / 4).toLocaleString()} per session, every session`);

  if (r.warnings.length) {
    const bySize = r.warnings.filter((w) => w.rule === "entry-size");
    const byAge = r.warnings.filter((w) => w.rule === "entry-age");
    console.log("");
    if (bySize.length) console.log(`  warn  ${bySize.length} entr${bySize.length === 1 ? "y" : "ies"} over the ${LIMITS.perEntryMaxBytes}-byte digest target`);
    for (const w of byAge) console.log(`  warn  ${w.message}`);
  }

  if (!r.ok) {
    console.error("");
    for (const e of r.errors) console.error(`  FAIL  [${e.rule}] ${e.message}`);
    console.error("");
    console.error("  Fix by ARCHIVING (move entries to DECISIONS_HISTORY.md), not by raising the ceiling.");
    process.exit(1);
  }
  console.log("\n  OK");
}

main();
