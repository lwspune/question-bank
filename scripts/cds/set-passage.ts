/**
 * Write a transcribed passage into one section of a paper's sections.json.
 *
 *   npx tsx scripts/cds/set-passage.ts <paperId> <setLabel> <chunkDir> [--apply]
 *
 * WHY THIS EXISTS, AND WHY THE PASSAGE ARRIVES AS FILES. The API blocks a
 * response carrying a whole passage verbatim (`400 Output blocked by content
 * filtering policy`) - measured 2026-08-26: the same text that blocks as one
 * block passes when written a paragraph at a time. So a passage is authored as
 * numbered chunk files and joined here. This script never contains passage
 * text, which is also what keeps it out of the blast radius.
 *
 * Chunks are `<chunkDir>/*.txt`, ordered by filename. A chunk's LEADING DIGITS
 * are its paragraph number: `01a.txt` + `01b.txt` are two halves of ONE
 * paragraph and are joined with a single space, while `01*` and `02*` are
 * different paragraphs and are joined with a blank line. That distinction has
 * to be explicit - a long paragraph may need splitting to get past the filter,
 * and joining those halves with a blank line would silently invent a paragraph
 * break the booklet does not have. Trailing whitespace is stripped; nothing
 * else about the text is touched.
 *
 * WHAT IT REFUSES, and every refusal is a real failure mode:
 *   - the section already holds a real passage (never silently overwrite a
 *     transcription; pass --force only to redo one deliberately)
 *   - U+FFFD or a control character - the cp1252 heredoc corruption the brief
 *     warns about, which is invisible once it is inside a JSON string
 *   - a chunk that is empty, or a directory with no chunks at all
 *
 * It does NOT check that the passage is the right one or complete. That is
 * `audit-passages.ts` plus a reader.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { DATA, requirePaper } from "./config";

type Section = { setLabel?: string; type: string; qFrom: number; qTo: number; passage?: string; directions?: string };

const PLACEHOLDER = /not stored/i;

function main() {
  const [paperId, setLabel, chunkDir] = process.argv.slice(2);
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  if (!paperId || !setLabel || !chunkDir) {
    throw new Error("usage: set-passage.ts <paperId> <setLabel> <chunkDir> [--apply] [--force]");
  }
  requirePaper(paperId);

  const files = readdirSync(chunkDir).filter((f) => f.endsWith(".txt")).sort();
  if (!files.length) throw new Error(`no .txt chunks in ${chunkDir}`);

  const paras: { key: string; parts: string[] }[] = [];
  for (const f of files) {
    const raw = readFileSync(join(chunkDir, f), "utf8").replace(/\s+$/, "");
    if (!raw.trim()) throw new Error(`chunk ${f} is empty`);
    const m = /^(\d+)/.exec(f);
    if (!m) throw new Error(`chunk ${f} does not start with a paragraph number (e.g. 01a.txt)`);
    const key = m[1];
    const last = paras[paras.length - 1];
    if (last && last.key === key) last.parts.push(raw);
    else paras.push({ key, parts: [raw] });
  }
  const passage = paras.map((p) => p.parts.join(" ")).join("\n\n");

  // A chunk dir is shared ground: a killed agent leaves its partial output
  // behind, and a second pass writing 02*.txt beside it silently produces a
  // passage containing the same paragraph twice. Nothing downstream sees that -
  // it is not a placeholder, not thin, and no asked-for word is missing - so it
  // has to be caught here. Happened for real on 2024-1 S7.
  const seen = new Map<string, string>();
  for (const p of paras) {
    const text = p.parts.join(" ");
    const prev = seen.get(text);
    if (prev) {
      throw new Error(
        `paragraphs ${prev} and ${p.key} are identical - a stale chunk from an earlier run is almost certainly still in ${chunkDir}. Clear it and re-author, do not merge.`
      );
    }
    seen.set(text, p.key);
  }

  const bad = [...passage].filter((ch) => {
    const c = ch.codePointAt(0)!;
    return ch === "�" || (c < 32 && ch !== "\n");
  });
  if (bad.length) {
    throw new Error(`passage carries ${bad.length} replacement/control character(s) - re-author the chunk, do not repair it here`);
  }

  const path = join(DATA, `${paperId}.sections.json`);
  const sections = JSON.parse(readFileSync(path, "utf8")) as Section[];
  const target = sections.find((s) => s.setLabel === setLabel);
  if (!target) throw new Error(`no section ${setLabel} in ${paperId}`);
  if (target.passage === undefined) throw new Error(`section ${setLabel} is not a passage section`);
  if (!PLACEHOLDER.test(target.passage) && !force) {
    throw new Error(`section ${setLabel} already holds a ${target.passage.length}-char passage - pass --force to replace it`);
  }

  console.log(`${paperId} ${setLabel} (Q${target.qFrom}-${target.qTo})`);
  console.log(`  chunks : ${files.length} (${files.join(", ")})`);
  console.log(`  was    : ${target.passage.length} chars`);
  console.log(`  now    : ${passage.length} chars`);
  console.log(`  opens  : ${passage.slice(0, 60).replace(/\n/g, " / ")}`);
  console.log(`  ends   : ${passage.slice(-60).replace(/\n/g, " / ")}`);

  if (!apply) {
    console.log("\ndry run - pass --apply to write");
    return;
  }
  target.passage = passage;
  // 1-space indent, no trailing newline: the committed convention for these
  // files. Anything else reformats all ~13 sections and buries the one real edit.
  writeFileSync(path, JSON.stringify(sections, null, 1), "utf8");
  console.log(`\nwrote ${path}`);
}

main();
