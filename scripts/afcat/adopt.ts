// Group D (Cadetprep): turn the main session's blind verdicts into pass-1
// output, adopting the source's worked solution wherever the blind letter
// agrees with the key and the solution meets the publishing contract.
//
//   npx tsx scripts/afcat/adopt.ts <chapterId> --files=<key>
//
// Reads out/<chapter>/blind-NN.json (written BEFORE this is run: it is the
// evidence the pass was blind), data/<chapter>/<key>.authored.json (solutions
// written by hand, committed) and data/<chapter>.overrides.json. A row the
// overrides exclude gets a placeholder verdict (it is never built); a row whose
// override reason says "key stands" adopts the source solution under the key.
// Prints every row still needing a decision WITH its key and source solution
// (the blind file already exists, so this no longer contaminates anything) and
// writes out/<chapter>/derived-NN-1.json only when that list is empty.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT, DATA, fileIndexOf } from "./config";
import { filesArg, qid } from "./read";
import { adoptVerdicts, type AuthoredSolution, type SourceFile } from "./lib";
import { loadOverrides } from "./build";

const chapter = requireChapter(process.argv[2]);
const only = filesArg();
if (!only) throw new Error("pass --files=<key>");
const overrides = loadOverrides(chapter);
let blocked = false;

for (const file of chapter.files.filter((f) => only.includes(f.key))) {
  if (file.group !== "D") throw new Error(`${file.key}: adopt is for Group D files`);
  if (!file.subtopic || !chapter.subtopics.includes(file.subtopic)) throw new Error(`${file.key}: subtopic "${file.subtopic}" not in the chapter list`);
  const nn = String(fileIndexOf(chapter, file)).padStart(2, "0");
  const blindPath = join(OUT, chapter.id, `blind-${nn}.json`);
  if (!existsSync(blindPath)) throw new Error(`${blindPath}: write the blind verdicts first`);
  const blind = JSON.parse(readFileSync(blindPath, "utf8")) as Record<string, [string, string] | [string, string, string]>;
  delete (blind as Record<string, unknown>)._note;
  const authoredPath = join(DATA, chapter.id, `${file.key}.authored.json`);
  const authored = existsSync(authoredPath) ? (JSON.parse(readFileSync(authoredPath, "utf8")) as Record<string, AuthoredSolution>) : {};
  const src = JSON.parse(readFileSync(join(DATA, chapter.id, `${file.key}.source.json`), "utf8")) as SourceFile;
  const fi = fileIndexOf(chapter, file);
  const byId = new Map(src.questions.map((q) => [qid(fi, q.n), q]));

  const excluded: string[] = [];
  const records = [];
  for (const q of src.questions) {
    const id = qid(fi, q.n);
    const ov = overrides[id];
    if (ov?.exclude) {
      excluded.push(id);
      continue;
    }
    if (ov?.reason && /key stands/i.test(ov.reason) && blind[id]) blind[id] = [q.key ?? "X", ...blind[id].slice(1)] as [string, string];
    records.push({ id, key: q.key ?? "X", keySolution: q.keySolution ?? "", difficulty: q.difficulty ?? "Medium", options: q.options });
  }
  for (const id of excluded) delete blind[id];
  const { derived, todo } = adoptVerdicts({ blind, records, authored, subtopic: file.subtopic });

  console.log(`${file.key}: ${src.questions.length} rows, ${derived.length} ready (${derived.filter((d) => d.note.startsWith("blind agrees")).length} with the source solution), ${excluded.length} excluded, ${todo.length} to do`);
  for (const t of todo) {
    const q = byId.get(t.id)!;
    console.log(`\n--- ${t.id}: ${t.reason}`);
    console.log(`Q: ${q.stem}`);
    q.options.forEach((o, i) => console.log(`   ${"ABCD"[i]}) ${o}`));
    console.log(`key ${q.key}; blind ${blind[t.id]?.join(" / ") ?? "none"}`);
    console.log(`source solution: ${(q.keySolution ?? "").replace(/\s+/g, " ").slice(0, 600)}`);
  }
  if (todo.length) {
    blocked = true;
    continue;
  }
  const placeholders = excluded.map((id) => ({
    id, derived: "X", value: "", confidence: "high", note: "excluded by override", subtopic: file.subtopic!, difficulty: "MODERATE", solution: "Excluded from the bank: see the override.",
  }));
  const out = join(OUT, chapter.id, `derived-${nn}-1.json`);
  writeFileSync(out, JSON.stringify([...derived, ...placeholders], null, 1) + "\n");
  console.log(`wrote ${out}`);
}
if (blocked) {
  console.log("\nNOT WRITTEN for the files above with rows to do: add overrides and/or <key>.authored.json entries, then re-run.");
  process.exit(1);
}
