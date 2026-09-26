/**
 * Merge a paper's transcription batches and check them.
 *
 *   npx tsx scripts/mpsc/merge.ts 2024-b            # report only
 *   npx tsx scripts/mpsc/merge.ts 2024-b --write    # also write data/<id>.merged.json
 *   npx tsx scripts/mpsc/merge.ts 2024-b --show     # print each question's keyed option (both languages)
 *
 * Reads data/<id>.t*.json (the batches, in any order) + data/<id>.key.json.
 * Reports: coverage 1..100, duplicates, the EN/MR parity probe, and the literal
 * "\n" guard commitStaged would otherwise refuse at write time. `--show` is the
 * key-fit read: the keyed option printed beside its stem, so a shifted key or a
 * mis-numbered question is visible to a reader before anything is committed.
 *
 * data/<id>.waivers.json ({"55": "why"}) silences a parity flag that was READ
 * against the page and found to be a genuine print difference (e.g. Marathi
 * "८ व्या" where English prints "Eighth"). A waiver needs a reason, and a waived
 * flag is still counted in the summary so it never disappears.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA_DIR, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { parityIssues, type BilingualQuestion, type KeyLetter } from "./lib";

export function loadBatches(id: string): BilingualQuestion[] {
  const files = readdirSync(DATA_DIR).filter((f) => f.startsWith(`${id}.t`) && f.endsWith(".json")).sort();
  return files.flatMap((f) => JSON.parse(readFileSync(join(DATA_DIR, f), "utf8")) as BilingualQuestion[]);
}

function main() {
  const args = process.argv.slice(2);
  const paper = requirePaper(args.find((a) => !a.startsWith("--")));
  const qs = loadBatches(paper.id).sort((a, b) => a.n - b.n);
  const keyFile = dataPath(paper.id, "key");
  const key: Record<string, KeyLetter> = existsSync(keyFile) ? JSON.parse(readFileSync(keyFile, "utf8")).key : {};

  const seen = new Map<number, number>();
  for (const q of qs) seen.set(q.n, (seen.get(q.n) ?? 0) + 1);
  const dupes = [...seen].filter(([, c]) => c > 1).map(([n]) => n);
  const missing: number[] = [];
  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) if (!seen.has(n)) missing.push(n);

  const waiverFile = dataPath(paper.id, "waivers");
  const waivers: Record<string, string> = existsSync(waiverFile) ? JSON.parse(readFileSync(waiverFile, "utf8")) : {};
  let parity = 0;
  let waived = 0;
  let literal = 0;
  for (const q of qs) {
    const issues = parityIssues(q);
    for (const lang of ["en", "mr"] as const) {
      const v = q[lang];
      for (const s of [v.stem, v.context ?? "", ...v.options]) if (/\\n(?![a-z])/.test(s)) literal++;
    }
    if (issues.length && waivers[q.n]) {
      waived++;
    } else if (issues.length) {
      parity++;
      console.log(`Q${q.n}: ${issues.join(" · ")}`);
    }
    if (args.includes("--show")) {
      const k = key[q.n];
      const idx = k && k !== "#" ? "ABCD".indexOf(k) : -1;
      console.log(
        `Q${q.n} [${k ?? "?"}] ${q.en.stem.split("\n")[0].slice(0, 90)}\n    -> ${idx >= 0 ? q.en.options[idx] : "(cancelled)"}  |  ${idx >= 0 ? q.mr.options[idx] : ""}`
      );
    }
  }

  console.log(
    `\n${paper.id}: ${qs.length} transcribed · missing ${missing.length ? `[${missing.join(",")}]` : "none"}` +
      ` · dupes ${dupes.length ? `[${dupes.join(",")}]` : "none"} · parity flags ${parity} (waived ${waived}) · literal \\n ${literal}` +
      ` · figures ${qs.filter((q) => q.figure).length} · print notes ${qs.filter((q) => q.printNote).length}`
  );
  if (args.includes("--write")) {
    if (missing.length || dupes.length) throw new Error("refusing to write an incomplete or duplicated paper");
    writeFileSync(dataPath(paper.id, "merged"), JSON.stringify({ paper: paper.id, questions: qs }, null, 1));
    console.log(`wrote ${dataPath(paper.id, "merged")}`);
  }
}

if (/merge\.ts$/.test(process.argv[1] ?? "")) main();
