/**
 * Gate: are the ALWAYS-LOADED docs still within their token budget?
 *
 *   npx tsx scripts/docs-budget.ts [--json]
 *
 * Exits 1 on a hard violation (a byte ceiling, an entry two months stale, or a
 * file this gate could not parse), 0 otherwise. Warnings never fail the run.
 *
 * TWO files are measured, and only one of them is in this repo. MEMORY.md is
 * the memory INDEX under ~/.claude, loaded into context every session exactly
 * like CLAUDE.md, so it is the same kind of fixed cost — but it is a per-machine
 * artifact that does NOT exist in CI. Hence: read it if it is there, report
 * NOT MEASURED if it is not, and never let a green run imply it was checked.
 * Set CLAUDE_MEMORY_MD to point at it on a machine whose layout differs.
 *
 * Rationale, ceilings and the not-grandfathered rule: scripts/lib/docsBudget.ts.
 */
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { resolve, join } from "node:path";
import { auditDocsBudget, reconcileArchive, LIMITS } from "./lib/docsBudget";

const CLAUDE_MD = resolve(process.cwd(), "CLAUDE.md");
const HISTORY_MD = resolve(process.cwd(), "DECISIONS_HISTORY.md");

/**
 * Claude Code files a project's memory under a slug built from its absolute
 * path, with the drive colon, both path separators and underscores all folded
 * to "-" — so a project at "c:/Users/v/Downloads/Question_Bank" is stored under
 * "c--Users-v-Downloads-Question-Bank". If that scheme ever changes this
 * resolves to a path that does not exist and the gate reports NOT MEASURED,
 * which is the right way for it to fail.
 */
function memoryIndexPath(): string {
  const override = process.env.CLAUDE_MEMORY_MD;
  if (override) return override;
  // Backslash IS in this class (Windows cwd() uses them) and the drive letter
  // is lowercased first — "C:" folds to "c-", giving the leading "c--".
  const slug = process
    .cwd()
    .replace(/^[A-Za-z]:/, (d) => d.toLowerCase())
    .replace(/[:\\/_]/g, "-");
  return join(homedir(), ".claude", "projects", slug, "memory", "MEMORY.md");
}

/** The archive text, or null meaning "could not be read, so not checked". */
function readHistory(): string | null {
  try {
    return readFileSync(HISTORY_MD, "utf8");
  } catch {
    return null;
  }
}

/** The index text, or null meaning "not present on this machine". */
function readMemoryIndex(): string | null {
  try {
    return readFileSync(memoryIndexPath(), "utf8");
  } catch {
    return null;
  }
}

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
  const r = auditDocsBudget(md, today, LIMITS, readMemoryIndex());

  if (json) {
    console.log(JSON.stringify(r, null, 2));
    process.exit(r.ok ? 0 : 1);
  }

  const pct = (n: number, max: number) => `${((n / max) * 100).toFixed(0)}%`;
  const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;

  console.log("Always-loaded docs — token budget");
  console.log(
    `  whole file      ${kb(r.fileBytes).padStart(9)}  of ${kb(LIMITS.fileMaxBytes)}  (${pct(r.fileBytes, LIMITS.fileMaxBytes)})`,
  );
  console.log(
    `  Decisions log   ${kb(r.decisionsBytes).padStart(9)}  of ${kb(LIMITS.decisionsMaxBytes)}  (${pct(r.decisionsBytes, LIMITS.decisionsMaxBytes)}, ${r.entries.length} entries)`,
  );
  if (r.memoryBytes === null) {
    console.log(`  MEMORY.md         NOT MEASURED  (no index at ${memoryIndexPath()})`);
  } else {
    console.log(
      `  MEMORY.md       ${kb(r.memoryBytes).padStart(9)}  of ${kb(LIMITS.memoryMaxBytes)}  (${pct(r.memoryBytes, LIMITS.memoryMaxBytes)})`,
    );
  }
  const loaded = r.fileBytes + (r.memoryBytes ?? 0);
  const caveat = r.memoryBytes === null ? " (CLAUDE.md alone — MEMORY.md not counted)" : " (both files)";
  console.log(`  ~tokens         ${Math.round(loaded / 4).toLocaleString()} per session, every session${caveat}`);

  // Which live digests have no long form behind them — i.e. what an archive
  // sweep would DELETE rather than move. Warning only: it reports a debt in the
  // writing convention, and failing a push over it would block unrelated work.
  const unarchived = reconcileArchive(md, readHistory());
  if (unarchived === null) {
    console.log("  archive          NOT CHECKED  (no DECISIONS_HISTORY.md)");
  } else if (unarchived.length) {
    console.log("");
    console.log(
      `  warn  ${unarchived.length} of ${r.entries.length} entries have NO full narrative in DECISIONS_HISTORY.md —`,
    );
    console.log("        archiving one would DELETE it, not move it. Write the long form first:");
    for (const t of unarchived) console.log(`          ${t}`);
  }

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
