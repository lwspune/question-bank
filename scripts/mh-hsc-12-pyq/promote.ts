/**
 * Promote an authoring pass's output from out/ (derived, gitignored) into data/
 * (reviewed, committed), validating on the way.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/promote.ts <chapterId>          # dry-run
 *   npx tsx scripts/mh-hsc-12-pyq/promote.ts <chapterId> --apply
 *
 * Reads   out/<id>.assigned.json   [{ref, subtopic, why?}]
 *         out/<id>.solutions.json  [{ref, answer, key?, difficulty, twin?, flag?}]
 * Writes  data/<id>.subtopics.json
 *         data/<id>.solutions.json
 *         data/<id>.keys.json      (MCQ rows only)
 *
 * The out/ -> data/ boundary is the review gate: everything under out/ is
 * regenerable and unreviewed, everything under data/ is committed and stands as
 * the source of truth. Nothing crosses without passing every check below, and a
 * single failure blocks the whole chapter rather than promoting the good rows —
 * a half-promoted chapter is harder to reason about than one that did not move.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { OUT, DATA, requireChapter } from "./config";
import type { Draft } from "./extract";
import { probeRow } from "./textProbes";

type Assigned = { ref: string; subtopic: string; why?: string };
type Sol = { ref: string; answer: string; key?: string | null; difficulty: string; twin?: string | null; flag?: string };

const DIFFICULTIES = new Set(["EASY", "MODERATE", "HARD"]);

function main() {
  const id = process.argv[2];
  const apply = process.argv.includes("--apply");
  const ch = requireChapter(id);

  const need = (p: string) => {
    if (!existsSync(p)) throw new Error(`missing ${p}`);
    return JSON.parse(readFileSync(p, "utf8"));
  };
  const draft = need(join(OUT, `${id}.draft.json`)) as Draft[];
  const assigned = (need(join(OUT, `${id}.assigned.json`)) as Assigned[]).filter((a) => !a.ref.startsWith("_"));
  const sols = (need(join(OUT, `${id}.solutions.json`)) as Sol[]).filter((s) => !s.ref.startsWith("_"));

  const byRef = new Map(draft.map((d) => [d.ref, d]));
  const problems: string[] = [];

  // Diff the SETS, both ways. A count matches under a permutation, and a
  // permutation here would silently file every question under its neighbour's
  // subtopic — which reads perfectly plausibly row by row.
  const diff = (name: string, got: string[]) => {
    const g = new Set(got);
    for (const r of byRef.keys()) if (!g.has(r)) problems.push(`${name}: ${r} missing`);
    for (const r of g) if (!byRef.has(r)) problems.push(`${name}: ${r} is not in this chapter`);
    if (g.size !== got.length) problems.push(`${name}: duplicate refs`);
  };
  diff("assigned", assigned.map((a) => a.ref));
  diff("solutions", sols.map((s) => s.ref));

  const known = new Set(ch.subtopics);
  for (const a of assigned) {
    if (!known.has(a.subtopic)) problems.push(`${a.ref}: subtopic "${a.subtopic}" is not on ${ch.chapterName}'s axis`);
  }

  const solByRef = new Map(sols.map((s) => [s.ref, s]));
  for (const d of draft) {
    const s = solByRef.get(d.ref);
    if (!s) continue;
    if (!DIFFICULTIES.has((s.difficulty ?? "").toUpperCase())) {
      problems.push(`${d.ref}: difficulty "${s.difficulty}" not EASY|MODERATE|HARD`);
    }
    if (!s.answer?.trim()) problems.push(`${d.ref}: empty answer`);
    if (d.format === "mcq") {
      if (s.key === undefined) problems.push(`${d.ref}: mcq with no key field (use null if none is correct)`);
      else if (s.key !== null && !d.options?.some((o) => o.label === s.key)) {
        problems.push(`${d.ref}: key "${s.key}" names no option`);
      }
    } else if (s.key != null) {
      problems.push(`${d.ref}: a key on a subjective row`);
    }
    for (const p of probeRow(d.ref, [["answer", s.answer ?? ""]])) {
      problems.push(`${p.ref} ${p.field}: ${p.reason}`);
    }
  }

  // A field where every row carries the same value is a judgement nobody made.
  const diffs = new Set(sols.map((s) => (s.difficulty ?? "").toUpperCase()));
  if (sols.length > 4 && diffs.size === 1) {
    problems.push(`difficulty is "${[...diffs][0]}" on all ${sols.length} rows — not a judgement`);
  }

  if (problems.length) throw new Error(`REFUSING (${problems.length}):\n  ${problems.join("\n  ")}`);

  const subtopics: Record<string, string> = {};
  for (const a of assigned) subtopics[a.ref] = a.subtopic;
  const keys: Record<string, { key: string; basis: string; difficulty: string; defect?: boolean }> = {};
  const answers: Sol[] = [];
  for (const s of sols) {
    const d = byRef.get(s.ref)!;
    if (d.format === "mcq" && s.key) {
      keys[s.ref] = {
        key: s.key,
        basis: s.flag ?? "derived; see the model answer for the working",
        difficulty: s.difficulty.toUpperCase(),
        ...(s.flag ? { defect: true } : {}),
      };
    }
    answers.push({ ref: s.ref, answer: s.answer, difficulty: s.difficulty.toUpperCase(), twin: s.twin ?? null, ...(s.flag ? { flag: s.flag } : {}) });
  }

  // A flag naming an EXTRACTION artifact goes stale the moment the artifact is
  // fixed, and it then ships as a "this question is defective" note about a
  // perfectly sound question. Authoring and repair run concurrently here, so
  // this is the normal case rather than an edge one: two chapters carried
  // flags reading "the stored stem carries a trailing ' \ ####'... the question
  // itself is sound" after that residue had already been removed.
  // Dropped only when the row now passes the text probe clean — a flag about a
  // defect that is STILL present is kept.
  const ARTIFACT = /artifact|####|extraction|OPTION_LEAK|blockquote/i;
  const dropped: string[] = [];
  for (const s of answers) {
    if (!s.flag || !ARTIFACT.test(s.flag)) continue;
    const d = byRef.get(s.ref)!;
    const stillBroken = probeRow(s.ref, [
      ["stem", d.stem],
      ...((d.options ?? []).map((o) => [`option ${o.label}`, o.text] as [string, string])),
    ]);
    if (!stillBroken.length) {
      delete s.flag;
      dropped.push(s.ref);
    }
  }

  const unkeyed = draft.filter((d) => d.format === "mcq" && !keys[d.ref]).map((d) => d.ref);
  const flagged = answers.filter((s) => s.flag).map((s) => s.ref);
  const tally = new Map<string, number>();
  for (const a of assigned) tally.set(a.subtopic, (tally.get(a.subtopic) ?? 0) + 1);

  console.log(`${ch.chapterName}: ${draft.length} rows`);
  for (const st of ch.subtopics) console.log(`  ${String(tally.get(st) ?? 0).padStart(3)}  ${st}`);
  console.log(`  keys ${Object.keys(keys).length}/${draft.filter((d) => d.format === "mcq").length} mcq | answers ${answers.length}`);
  console.log(`  difficulty: ${[...new Set(sols.map((s) => s.difficulty))].sort().join(" ")}`);
  if (dropped.length) console.log(`  stale artifact flags dropped (now clean): ${dropped.join(", ")}`);
  if (unkeyed.length) console.log(`  NO KEY (stay PRIVATE): ${unkeyed.join(", ")}`);
  if (flagged.length) console.log(`  FLAGGED as defective: ${flagged.join(", ")}`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to promote into data/.");
    return;
  }
  writeFileSync(join(DATA, `${id}.subtopics.json`), JSON.stringify(subtopics, null, 2) + "\n");
  writeFileSync(join(DATA, `${id}.solutions.json`), JSON.stringify(answers, null, 2) + "\n");
  writeFileSync(join(DATA, `${id}.keys.json`), JSON.stringify({ keys }, null, 2) + "\n");
  console.log(`\npromoted into ${DATA}`);
}

main();
