// Settle one two-pass exam-twin run by the calibrated method (README.md, "Calibration").
//
//   npx tsx scripts/cross-exam/settle.ts <plan file> <slug>              # write the review sheet
//   npx tsx scripts/cross-exam/settle.ts <plan file> <slug> --write      # write the settled run
//
// Reads generated-papers/cross-exam/<slug>-a and -b (both passes, all slices validated,
// both prepared by prep.ts from the same evidence).
//   * firm in both passes with the same kind: accepted as is;
//   * firm in both with different kinds, or firm in one pass only: listed, numbered and
//     grouped under their exam question in generated-papers/cross-exam/<slug>-review.md,
//     with both questions printed, for a person;
//   * "unsure" only: dropped.
// The person answers in generated-papers/cross-exam/<slug>-decisions.json:
//   { "1": "numbers", "2": "reject", ... }  (exact | numbers | similar | reject; every item answered)
// and --write produces scripts/cross-exam/data/<slug>-<today>.json (-2, -3 ... for a second
// run that day) for commit.ts. The file records every question the run READ (evidence/ids.json),
// matched or not, so a later run never reads those comparisons again.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { nextRunName, type IdSets } from "@/lib/crossExam/pending";
import { validateSettled, type SettledFile, type SettledPair } from "@/lib/crossExam/settled";
import type { TwinKind } from "@/lib/crossExam/summary";
import { DATA_DIR, WORK_DIR, dataFileNames, planRun, readPlan, runRefs } from "./bank";

type Draft = { matches: { board: string; target: string; kind: TwinKind; why: string }[] };

const KINDS = ["exact", "numbers", "similar", "reject"] as const;

function readPass(dir: string): Map<string, { kind: TwinKind; why: string }> {
  const out = new Map<string, { kind: TwinKind; why: string }>();
  const evidence = readdirSync(join(dir, "evidence")).filter((f) => /^board-\d+\.md$/.test(f)).length;
  const drafts = readdirSync(join(dir, "out")).filter((f) => /^board-\d+\.json$/.test(f));
  if (drafts.length !== evidence) throw new Error(`${dir}: ${drafts.length} drafts for ${evidence} slices`);
  for (const f of drafts) {
    const d = JSON.parse(readFileSync(join(dir, "out", f), "utf8")) as Draft;
    for (const m of d.matches) out.set(`${m.board}>${m.target}`, { kind: m.kind, why: m.why });
  }
  return out;
}

function readIds(dir: string): IdSets {
  const path = join(dir, "evidence/ids.json");
  if (!existsSync(path)) throw new Error(`${path} is missing: prepare the run with prep.ts --plan`);
  return JSON.parse(readFileSync(path, "utf8")) as IdSets;
}

const sameSet = (a: string[], b: string[]) => a.length === b.length && [...a].sort().join() === [...b].sort().join();

/** "### <id> | header\nbody" -> id -> one line of text for the review sheet. */
function questions(dir: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const f of readdirSync(join(dir, "evidence")).filter((x) => x.endsWith(".md"))) {
    for (const block of readFileSync(join(dir, "evidence", f), "utf8").split(/^### /m).slice(1)) {
      const [head, ...rest] = block.split("\n");
      const body = rest.join(" ").replace(/\s+/g, " ").trim();
      out.set(head.slice(0, 36), `${head.slice(39).split(" | ").slice(0, 2).join(" | ")}: ${body.slice(0, 600)}`);
    }
  }
  return out;
}

function main() {
  const [planPath, slug] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const write = process.argv.includes("--write");
  if (!planPath || !slug) throw new Error("usage: settle.ts <plan file> <slug> [--write]");
  const plan = readPlan(planPath);
  const refs = runRefs(plan, planRun(plan, slug));

  const dirA = join(WORK_DIR, `${slug}-a`);
  const dirB = join(WORK_DIR, `${slug}-b`);
  const read = readIds(dirA);
  const readB = readIds(dirB);
  if (!sameSet(read.targets, readB.targets) || !sameSet(read.board, readB.board))
    throw new Error(`${slug}: the two passes read different questions; prepare both with one prep.ts run`);

  const A = readPass(dirA);
  const B = readPass(dirB);
  const accepted: SettledPair[] = [];
  const review: { source: string; target: string; a?: TwinKind; b?: TwinKind; why: string }[] = [];
  for (const key of new Set([...A.keys(), ...B.keys()])) {
    const a = A.get(key);
    const b = B.get(key);
    const [source, target] = key.split(">");
    if (a && b && a.kind === b.kind) accepted.push({ source, target, kind: a.kind, why: a.why });
    else review.push({ source, target, a: a?.kind, b: b?.kind, why: (a ?? b)!.why });
  }
  // Grouped by exam question, so every board question proposed for one exam question is read together.
  review.sort((x, y) => x.target.localeCompare(y.target) || x.source.localeCompare(y.source));

  if (!write) {
    const q = questions(dirA);
    let s = `# ${slug}: ${accepted.length} accepted (both passes, same kind); ${review.length} to read\n\n`;
    s += `Answer in ${WORK_DIR}/${slug}-decisions.json: { "1": "numbers", ... } with exact | numbers | similar | reject.\n`;
    let last = "";
    review.forEach((r, i) => {
      if (r.target !== last) s += `\n=== EXAM ${q.get(r.target)}\n`;
      last = r.target;
      s += `  [${i + 1}] A: ${r.a ?? "-"} · B: ${r.b ?? "-"} · ${r.why}\n      BOARD ${q.get(r.source)}\n`;
    });
    writeFileSync(join(WORK_DIR, `${slug}-review.md`), s);
    console.log(`${slug}: ${accepted.length} accepted, ${review.length} to read -> ${WORK_DIR}/${slug}-review.md`);
    return;
  }

  const decisionsPath = join(WORK_DIR, `${slug}-decisions.json`);
  const decisions = review.length ? (JSON.parse(readFileSync(decisionsPath, "utf8")) as Record<string, string>) : {};
  const pairs = [...accepted];
  review.forEach((r, i) => {
    const d = decisions[String(i + 1)];
    if (!KINDS.includes(d as (typeof KINDS)[number])) throw new Error(`decision ${i + 1} missing or not one of ${KINDS.join(", ")}`);
    if (d === "reject") return;
    pairs.push({ source: r.source, target: r.target, kind: d as TwinKind, why: r.why });
  });
  pairs.sort((x, y) => (x.source + x.target).localeCompare(y.source + y.target));
  const today = new Date().toISOString().slice(0, 10);
  const file: SettledFile = {
    run: nextRunName(slug, today, dataFileNames()),
    settledOn: today,
    targets: refs.targets,
    board: refs.board,
    reviewed: { targets: [...read.targets].sort(), board: [...read.board].sort() },
    pairs,
  };
  const errors = validateSettled(file);
  if (errors.length) throw new Error(errors.join("\n"));
  const out = join(DATA_DIR, `${file.run}.json`);
  writeFileSync(out, `${JSON.stringify(file, null, 1)}\n`);
  const kinds: Record<string, number> = {};
  pairs.forEach((p) => (kinds[p.kind] = (kinds[p.kind] ?? 0) + 1));
  console.log(`${out}: ${pairs.length} pairs ${JSON.stringify(kinds)}; read ${read.targets.length} exam x ${read.board.length} board`);
}

main();
