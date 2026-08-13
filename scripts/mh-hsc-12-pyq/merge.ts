/**
 * Fold the reviewed keys, model answers and errata brackets into
 * data/<id>.questions.json — the committed source of truth.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/merge.ts <chapterId>
 *
 * Inputs, all under data/ and all reviewed:
 *   <id>.questions.json   stems + options + subtopic (from assign.ts)
 *   <id>.keys.json        the derived MCQ keys, each with its basis
 *   <id>.solutions.json   the model answers + per-row difficulty
 *   <id>.errata.json      brackets appended to a defective question's answer
 *
 * ORDER MATTERS AND IS ENFORCED HERE: the errata bracket is appended LAST, in
 * the same pass that writes the answer. The sibling stateboard pipeline keeps
 * these as two scripts and running apply-solutions AFTER apply-errata silently
 * stripped 7 of its 27 brackets (2026-08-12). Doing both in one pass removes
 * the ordering hazard rather than documenting it.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { DATA, requireChapter, questionsJsonPath } from "./config";
import type { PyqQuestion } from "./lib";
import { probeRow } from "./textProbes";

type Keys = {
  keys: Record<string, { key: string; basis: string; defect?: boolean; difficulty?: string }>;
};
type Solution = { ref: string; answer: string; difficulty?: string; flag?: string };
type Erratum = { ref: string; bracket: string };

const readJson = <T>(p: string): T | null =>
  existsSync(p) ? (JSON.parse(readFileSync(p, "utf8")) as T) : null;

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);

  const rows = JSON.parse(readFileSync(questionsJsonPath(id), "utf8")) as PyqQuestion[];
  const keys = readJson<Keys>(join(DATA, `${id}.keys.json`))?.keys ?? {};
  // Subjective answers and MCQ answers are authored in separate passes (one by
  // agent, one by hand) and land in separate files; merged here, refs deduped.
  const sols = [
    ...(readJson<Solution[]>(join(DATA, `${id}.mcq-solutions.json`)) ?? []),
    ...(readJson<Solution[]>(join(DATA, `${id}.solutions.json`)) ?? []),
  ].filter((s) => !s.ref.startsWith("_"));
  const errata = readJson<Erratum[]>(join(DATA, `${id}.errata.json`)) ?? [];

  const byRef = new Map(rows.map((r) => [r.ref, r]));
  const problems: string[] = [];
  const check = (ref: string, what: string) => {
    if (!byRef.has(ref)) problems.push(`${what} names ${ref}, which is not in the chapter`);
  };
  for (const ref of Object.keys(keys)) if (!ref.startsWith("_")) check(ref, "keys.json");
  for (const s of sols) check(s.ref, "solutions.json");
  for (const e of errata) check(e.ref, "errata.json");
  if (problems.length) throw new Error(`REFUSING:\n  ${problems.join("\n  ")}`);

  // A ref in BOTH answer files is not a precedence question, it is a mistake:
  // building a Map would silently let whichever file was concatenated last win,
  // which is how the corrupted heredoc-authored copies nearly shipped over the
  // clean ones. Refuse and make the duplicate visible.
  const solByRef = new Map<string, Solution>();
  for (const s of sols) {
    if (solByRef.has(s.ref)) problems.push(`${s.ref}: answered in BOTH answer files — delete one`);
    solByRef.set(s.ref, s);
  }
  if (problems.length) throw new Error(`REFUSING:\n  ${problems.join("\n  ")}`);
  let keyed = 0;
  let answered = 0;

  for (const r of rows) {
    const k = keys[r.ref];
    if (k) {
      if (r.format !== "mcq") throw new Error(`${r.ref}: a key on a ${r.format} row`);
      if (!r.options?.some((o) => o.label === k.key)) {
        throw new Error(`${r.ref}: key "${k.key}" names no option`);
      }
      r.answer = k.key;
      keyed++;
    }

    const s = solByRef.get(r.ref);
    // An MCQ's `basis` IS its worked derivation, so it becomes the solution when
    // no separately-authored one exists. A subjective row's answer is required.
    const body = s?.answer ?? k?.basis;
    if (body) {
      r.solution = body;
      answered++;
    }
    // Subjective rows are rated by the authoring pass, MCQ rows alongside their
    // key — both against the same anchors, so the chapter is on one scale.
    if (s?.difficulty) r.difficulty = s.difficulty;
    else if (k?.difficulty) r.difficulty = k.difficulty;
    // Every ingest so far has defaulted difficulty when none was judged, which
    // makes the field read as a verdict nobody reached. Refuse instead.
    if (!r.difficulty) problems.push(`${r.ref}: no difficulty — nobody judged this row`);

    // LAST, so nothing can overwrite it. See the header.
    const e = errata.find((x) => x.ref === r.ref);
    if (e) r.solution = `${r.solution ?? ""}\n\n${e.bracket}`.trim();
  }

  const unkeyed = rows.filter((r) => r.format === "mcq" && !r.answer).map((r) => r.ref);
  const unanswered = rows.filter((r) => !r.solution).map((r) => r.ref);

  // Text-defect probe over the FINAL text, after every substitution. Placed here
  // rather than at authoring time because the corruption this catches is
  // introduced by the tooling in between — see textProbes.ts.
  const defects = rows.flatMap((r) =>
    probeRow(r.ref, [
      ["stem", r.stem],
      ["solution", r.solution ?? ""],
      ...((r.options ?? []).map((o) => [`option ${o.label}`, o.text] as [string, string])),
    ]),
  );
  for (const d of defects) problems.push(`${d.ref} ${d.field}: ${d.reason}`);
  if (problems.length) throw new Error(`REFUSING:\n  ${problems.join("\n  ")}`);

  writeFileSync(questionsJsonPath(id), JSON.stringify(rows, null, 2) + "\n");
  console.log(`${ch.chapterName}: ${rows.length} rows`);
  console.log(`  keyed      ${keyed}/${rows.filter((r) => r.format === "mcq").length} mcq`);
  console.log(`  answered   ${answered}/${rows.length}`);
  console.log(`  errata     ${errata.length}`);
  if (unkeyed.length) console.log(`  UNKEYED (stay PRIVATE): ${unkeyed.join(", ")}`);
  if (unanswered.length) console.log(`  UNANSWERED (stay PRIVATE): ${unanswered.join(", ")}`);
  console.log(`\n-> ${questionsJsonPath(id)}`);
}

main();
