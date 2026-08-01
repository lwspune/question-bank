/**
 * Apply `stripPandocArtifacts` to the OVERRIDE text stored in every
 * scripts/jee/papers/*.json.
 *
 *   npx tsx scripts/jee/clean-paper-overrides.ts          # dry-run
 *   npx tsx scripts/jee/clean-paper-overrides.ts --apply
 *
 * Why this is not optional: `resync.ts` writes `stemOverrides` / `optionOverrides`
 * to the DB VERBATIM (no repair pass). So a bank-wide artifact sweep that touches
 * only the database is silently revertible — the next resync would reinstate every
 * artifact still frozen in these files. The DB and the source-of-record have to be
 * cleaned together or the fix does not hold.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { stripPandocArtifacts } from "../lib/pandocArtifacts";

const DIR = join(process.cwd(), "scripts", "jee", "papers");

function main() {
  const apply = process.argv.includes("--apply");
  const files = readdirSync(DIR).filter((f) => f.endsWith(".json"));

  let filesChanged = 0;
  let fieldsChanged = 0;

  for (const file of files) {
    const path = join(DIR, file);
    const raw = readFileSync(path, "utf8");
    const paper = JSON.parse(raw) as Record<string, unknown>;
    let touched = 0;

    const stems = paper.stemOverrides as Record<string, string> | undefined;
    for (const k of Object.keys(stems ?? {})) {
      const fixed = stripPandocArtifacts(stems![k]);
      if (fixed !== stems![k]) {
        stems![k] = fixed;
        touched++;
      }
    }

    const opts = paper.optionOverrides as Record<string, Record<string, string>> | undefined;
    for (const q of Object.keys(opts ?? {})) {
      for (const label of Object.keys(opts![q] ?? {})) {
        const fixed = stripPandocArtifacts(opts![q][label]);
        if (fixed !== opts![q][label]) {
          opts![q][label] = fixed;
          touched++;
        }
      }
    }

    const sols = paper.authoredSolutions as Record<string, string> | undefined;
    for (const k of Object.keys(sols ?? {})) {
      const fixed = stripPandocArtifacts(sols![k]);
      if (fixed !== sols![k]) {
        sols![k] = fixed;
        touched++;
      }
    }

    if (!touched) continue;
    filesChanged++;
    fieldsChanged += touched;
    console.log(`  ${file}: ${touched} override field(s)`);
    if (apply) writeFileSync(path, JSON.stringify(paper, null, 2) + "\n", "utf8");
  }

  console.log(`\n${filesChanged} file(s), ${fieldsChanged} override field(s) carrying artifacts`);
  if (!apply) console.log(`[dry-run] pass --apply to write.`);
}

main();
