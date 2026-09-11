/**
 * The weekly item-statistics refresh, as ONE command.
 *
 *   npm run itemstats:refresh              # dry run end to end, writes nothing
 *   npm run itemstats:refresh -- --apply
 *   npm run itemstats:refresh -- --apply --tracker=../nda-tracker
 *
 * Three steps that must happen in order and in two different repos:
 *   1. nda-tracker  `node item_stats.js --out=item-stats.json`   (read-only there)
 *   2. here         ingest that file into question_item_stats
 *   3. here         roll up our own /mock responses
 *
 * WHY A SCRIPT RATHER THAN A CRON. No scheduler spans two repos, and the export
 * has to run where the tracker's `.env.local` is. The sibling-directory
 * assumption is not new: nda-tracker's own `migrate_question_ids.js` already
 * reads `../Question_Bank/.env.local`, so the pair is already laid out this way.
 * If it ever is not, `--tracker=` says so explicitly and the error names the
 * path it looked at rather than failing somewhere deeper.
 *
 * Every step is idempotent, so a half-finished run is fixed by running it again,
 * and a dry run genuinely writes nothing anywhere.
 */
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const APPLY = process.argv.includes("--apply");
const trackerFlag = process.argv.find((a) => a.startsWith("--tracker="));
const TRACKER = resolve(trackerFlag ? trackerFlag.slice("--tracker=".length) : "../nda-tracker");
const EXPORT_FILE = join(TRACKER, "item-stats.json");

// NO SHELL, and no `.cmd`. `shell: true` concatenates arguments instead of
// escaping them (Node DEP0190, a warning on every run), while spawning `npx.cmd`
// WITHOUT a shell is refused outright by Node 20+ (the CVE-2024-27980 fix) with
// a bare EINVAL. Both dead ends. The way out is to spawn the node binary we are
// already running: plain `node` for the tracker's script, and `node --import
// tsx` for the TypeScript ones here.
function runNode(label: string, args: string[], cwd: string) {
  console.log(`
=== ${label} ===`);
  console.log(`  node ${args.join(" ")}   (in ${cwd})`);
  execFileSync(process.execPath, args, { cwd, stdio: "inherit" });
}

const tsx = (script: string, args: string[]) => ["--import", "tsx", script, ...args];

function main() {
  if (!existsSync(join(TRACKER, "item_stats.js"))) {
    throw new Error(
      `no nda-tracker checkout at ${TRACKER}\n` +
        "Pass --tracker=<path>. The export must run there: it needs that repo's .env.local."
    );
  }

  // 1. Export. Read-only in the tracker — it writes to neither database.
  runNode("1/3  tracker export", ["item_stats.js", "--out=item-stats.json"], TRACKER);

  // 2 + 3. Ingest, then roll up. Both dry by default; --apply is threaded
  // through rather than assumed, so this whole script is safe to run blind.
  const applyArgs = APPLY ? ["--apply"] : [];
  runNode(
    "2/3  ingest the export",
    tsx("scripts/itemstats/ingest-tracker.ts", [`--file=${EXPORT_FILE}`, ...applyArgs]),
    process.cwd()
  );
  runNode(
    "3/3  roll up our own /mock responses",
    tsx("scripts/itemstats/rollup-vault.ts", applyArgs),
    process.cwd()
  );

  console.log(
    APPLY
      ? "\nDone. `npm run itemstats:report` for coverage + the leads queue."
      : "\nDRY RUN — nothing was written to either database. Re-run with `-- --apply`."
  );
}

try {
  main();
} catch (e) {
  console.error(`\nrefresh failed: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
}
