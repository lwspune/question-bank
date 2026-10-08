/**
 * Print every self-check (and optionally every worked example) of one IMAT
 * notes chapter folder compactly, for a reviewer to re-derive the answers.
 * Read-only.
 *
 *   npx tsx scripts/imat/notes/show-selfchecks.ts <subject>/<chapter-folder> [--worked]
 */
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { SubtopicNote } from "../../../src/app/notes/_types";

async function main() {
  const folder = process.argv[2];
  const worked = process.argv.includes("--worked");
  const dir = join(__dirname, "..", "..", "..", "src", "lib", "sites", "imat", "notes", folder);
  const mod = (await import(pathToFileURL(join(dir, "index.ts")).href)) as Record<string, unknown>;
  const key = Object.keys(mod).find((k) => k.endsWith("_NOTES"))!;
  const notes = mod[key] as Record<string, SubtopicNote>;
  for (const [slug, note] of Object.entries(notes)) {
    console.log(`\n## ${slug}: ${note.title}`);
    for (const k of note.concepts) {
      const sc = k.selfCheckExample;
      console.log(`\n- ${k.slug} (${k.kind})`);
      if (worked && k.kind === "formula") {
        console.log(`  WORKED: ${k.authoredExample.prompt}`);
        console.log(`  -> ${k.authoredExample.answer}`);
      }
      if (!sc) continue;
      console.log(`  Q: ${sc.prompt}`);
      (sc.options ?? []).forEach((o, i) => console.log(`   ${String.fromCharCode(65 + i)}. ${o}`));
      console.log(`  ANS: ${sc.answer}`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
