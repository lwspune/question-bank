// Settle one two-pass exam-twin run by the calibrated method (README.md, "Calibration").
//
//   npx tsx scripts/cross-exam/settle.ts <pairs file> <slug>              # write the review sheet
//   npx tsx scripts/cross-exam/settle.ts <pairs file> <slug> --write      # write the settled run
//
// Reads generated-papers/cross-exam/<slug>-a and -b (both passes, all slices validated).
//   * firm in both passes with the same kind: accepted as is;
//   * firm in both with different kinds, or firm in one pass only: listed, numbered, in
//     generated-papers/cross-exam/<slug>-review.md with both questions printed, for a person;
//   * "unsure" only: dropped.
// The person answers in generated-papers/cross-exam/<slug>-decisions.json:
//   { "1": "numbers", "2": "reject", ... }  (exact | numbers | similar | reject; every item answered)
// and --write produces scripts/cross-exam/data/<slug>-<today>.json for commit.ts.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { validateSettled, type SettledFile, type SettledPair } from "@/lib/crossExam/settled";
import type { TwinKind } from "@/lib/crossExam/summary";

type Draft = { matches: { board: string; target: string; kind: TwinKind; why: string }[] };
type Run = { slug: string; targets: string[]; board: string[] };
type PairsFile = { exam: string; subject: string; boardExams: Record<string, string>; runs: Run[] };

const DIR = "generated-papers/cross-exam";
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
  const [pairsPath, slug] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const write = process.argv.includes("--write");
  if (!pairsPath || !slug) throw new Error("usage: settle.ts <pairs file> <slug> [--write]");
  const P = JSON.parse(readFileSync(pairsPath, "utf8")) as PairsFile;
  const run = P.runs.find((r) => r.slug === slug);
  if (!run) throw new Error(`no run ${slug} in ${pairsPath}`);

  const A = readPass(join(DIR, `${slug}-a`));
  const B = readPass(join(DIR, `${slug}-b`));
  const accepted: SettledPair[] = [];
  const review: { key: string; a?: TwinKind; b?: TwinKind; why: string }[] = [];
  for (const key of new Set([...A.keys(), ...B.keys()])) {
    const a = A.get(key);
    const b = B.get(key);
    const [source, target] = key.split(">");
    if (a && b && a.kind === b.kind) accepted.push({ source, target, kind: a.kind, why: a.why });
    else review.push({ key, a: a?.kind, b: b?.kind, why: (a ?? b)!.why });
  }
  review.sort((x, y) => x.key.localeCompare(y.key));

  if (!write) {
    const q = questions(join(DIR, `${slug}-a`));
    let s = `# ${slug}: ${accepted.length} accepted (both passes, same kind); ${review.length} to read\n\n`;
    s += `Answer in ${DIR}/${slug}-decisions.json: { "1": "numbers", ... } with exact | numbers | similar | reject.\n\n`;
    review.forEach((r, i) => {
      const [source, target] = r.key.split(">");
      s += `[${i + 1}] A: ${r.a ?? "-"} · B: ${r.b ?? "-"} · ${r.why}\n  BOARD ${q.get(source)}\n  EXAM  ${q.get(target)}\n\n`;
    });
    writeFileSync(join(DIR, `${slug}-review.md`), s);
    console.log(`${slug}: ${accepted.length} accepted, ${review.length} to read -> ${DIR}/${slug}-review.md`);
    return;
  }

  const decisionsPath = join(DIR, `${slug}-decisions.json`);
  const decisions = review.length ? (JSON.parse(readFileSync(decisionsPath, "utf8")) as Record<string, string>) : {};
  const pairs = [...accepted];
  review.forEach((r, i) => {
    const d = decisions[String(i + 1)];
    if (!KINDS.includes(d as (typeof KINDS)[number])) throw new Error(`decision ${i + 1} missing or not one of ${KINDS.join(", ")}`);
    if (d === "reject") return;
    const [source, target] = r.key.split(">");
    pairs.push({ source, target, kind: d as TwinKind, why: r.why });
  });
  pairs.sort((x, y) => (x.source + x.target).localeCompare(y.source + y.target));
  const today = new Date().toISOString().slice(0, 10);
  const file: SettledFile = {
    run: `${slug}-${today}`,
    settledOn: today,
    targets: run.targets.map((chapter) => ({ exam: P.exam, subject: P.subject, chapter })),
    board: run.board.map((b) => {
      const [cls, chapter] = b.split("|");
      return { exam: P.boardExams[cls], subject: P.subject, chapter };
    }),
    pairs,
  };
  const errors = validateSettled(file);
  if (errors.length) throw new Error(errors.join("\n"));
  const out = join("scripts/cross-exam/data", `${file.run}.json`);
  if (existsSync(out)) throw new Error(`${out} exists; settle each run once a day`);
  writeFileSync(out, `${JSON.stringify(file, null, 1)}\n`);
  const kinds: Record<string, number> = {};
  pairs.forEach((p) => (kinds[p.kind] = (kinds[p.kind] ?? 0) + 1));
  console.log(`${out}: ${pairs.length} pairs ${JSON.stringify(kinds)}`);
}

main();
