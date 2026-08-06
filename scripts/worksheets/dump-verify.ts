// Emit BLIND verification packets for a chapter — one JSON per worksheet file,
// carrying stem + options ONLY (no key, no solution — the source solutions
// conclude answers, so including them would break the blindness). The
// re-derivation agents read these and return their own answers.
//
// Pre-authored TEXT repairs (stem/options in data/<id>.overrides.json — e.g. the
// Clock Angle date-coercion reconstructions) ARE applied, so agents verify the
// text that will actually ship. Key overrides are NOT applied (nothing here
// carries a key), and excluded rows are dropped.
//
//   npx tsx scripts/worksheets/dump-verify.ts <chapterId>
//
// Writes out/<chapterId>/verify-<NN>.json
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { requireChapter, OUT, DATA } from "./config";
import { readChapterQuestions } from "./read";
import { questionId, type WorksheetOverride } from "./lib";

const chapter = requireChapter(process.argv[2]);
const dir = join(OUT, chapter.id);
mkdirSync(dir, { recursive: true });

const overridesPath = join(DATA, `${chapter.id}.overrides.json`);
const overrides: Record<string, WorksheetOverride> = existsSync(overridesPath)
  ? JSON.parse(readFileSync(overridesPath, "utf8"))
  : {};

const files = readChapterQuestions(chapter);
for (const f of files) {
  const packet = f.questions.flatMap((q) => {
    const id = questionId(f.fileIndex, q.row);
    const ov = overrides[id];
    if (ov?.exclude) return [];
    const opts = (["A", "B", "C", "D"] as const).map(
      (l, i) => ov?.options?.[l] ?? q.options[i]
    );
    return [
      {
        id,
        stem: ov?.stem ?? q.stem,
        options: { A: opts[0], B: opts[1], C: opts[2], D: opts[3] },
      },
    ];
  });
  const out = join(dir, `verify-${String(f.fileIndex).padStart(2, "0")}.json`);
  writeFileSync(out, JSON.stringify({ subtopic: f.subtopicName, questions: packet }, null, 2));
  console.log(`${out}  (${packet.length} q)`);
}
