/**
 * Crosstab the two independent blind derivation passes for one paper.
 *
 *   npx tsx scripts/cds-maths/crosstab.ts <paperId> <passA> <passB>
 *   npx tsx scripts/cds-maths/crosstab.ts 2020-1 passA passB
 *
 * Reads data/<paperId>.questions.json and data/<paperId>.<pass>.json, and prints
 * the work list for hand adjudication. It writes NOTHING and it never picks a
 * winner: a DISPUTE is resolved by a human against the printed page, because
 * two plausible derivations disagreeing is exactly the case where an automatic
 * rule would launder a coin-flip into a committed answer.
 *
 * TWIN is broken out from DISPUTE deliberately. When the two passes name
 * different LETTERS but the option text at those letters is equivalent, the
 * paper printed its answer twice — the defect is in the page, and the repair is
 * to the OPTION, never to the answer. On the Worksheets corpus that distinction
 * was the difference between a real wrong key and a cosmetic duplicate, and they
 * need opposite fixes.
 */
import { existsSync, readFileSync } from "node:fs";
import { dataPath, requirePaper } from "./config";
import { crosstab, normalizeQuestions, type Derivation, type TQ } from "./lib";

function load<T>(path: string, what: string): T {
  if (!existsSync(path)) throw new Error(`missing ${path} — ${what}`);
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const passAName = process.argv[3] ?? "passA";
  const passBName = process.argv[4] ?? "passB";

  const questions: TQ[] = normalizeQuestions(
    load(dataPath(paper.id, "questions"), "run merge.ts first")
  );
  const a = load<Derivation[]>(dataPath(paper.id, passAName), `derivation pass "${passAName}" not found`);
  const b = load<Derivation[]>(dataPath(paper.id, passBName), `derivation pass "${passBName}" not found`);

  const rows = crosstab(a, b, questions);
  const by = (v: string) => rows.filter((r) => r.verdict === v);

  const agree = by("AGREE");
  const twin = by("TWIN");
  const dispute = by("DISPUTE");
  const missing = by("MISSING");

  const pct = (n: number) => ((n / rows.length) * 100).toFixed(1);
  console.log(`${paper.id}: ${rows.length} questions, passes "${passAName}" vs "${passBName}"`);
  console.log(`  AGREE   ${String(agree.length).padStart(3)}  (${pct(agree.length)}%)`);
  console.log(`  TWIN    ${String(twin.length).padStart(3)}  — option printed twice; repair the option`);
  console.log(`  DISPUTE ${String(dispute.length).padStart(3)}  — adjudicate by hand against the page`);
  console.log(`  MISSING ${String(missing.length).padStart(3)}`);

  // Agreement by confidence: the useful readout, because it says where the
  // disagreements actually live. On the sibling corpora every disagreement fell
  // in MED or LOW, which is what makes the flag a review router.
  const bandOf = (n: number) => {
    const da = a.find((d) => d.number === n);
    const db = b.find((d) => d.number === n);
    const rank = { HIGH: 3, MED: 2, LOW: 1 } as Record<string, number>;
    const ca = rank[(da?.confidence ?? "").toUpperCase()] ?? 0;
    const cb = rank[(db?.confidence ?? "").toUpperCase()] ?? 0;
    return ["?", "LOW", "MED", "HIGH"][Math.min(ca, cb)];
  };
  const bands = new Map<string, { total: number; agreed: number }>();
  for (const r of rows) {
    const band = bandOf(r.number);
    const cur = bands.get(band) ?? { total: 0, agreed: 0 };
    cur.total += 1;
    if (r.verdict === "AGREE") cur.agreed += 1;
    bands.set(band, cur);
  }
  console.log(`\nagreement by LOWER of the two confidences:`);
  for (const band of ["HIGH", "MED", "LOW", "?"]) {
    const v = bands.get(band);
    if (!v) continue;
    console.log(`  ${band.padEnd(5)} ${String(v.agreed).padStart(3)}/${String(v.total).padEnd(3)}`);
  }

  for (const [title, list] of [
    ["TWINS — repair the OPTION text, not the answer", twin],
    ["DISPUTES — adjudicate against the printed page", dispute],
    ["MISSING", missing],
  ] as const) {
    if (!list.length) continue;
    console.log(`\n## ${title}`);
    for (const r of list) {
      console.log(`\nQ${r.number}${r.note ? `  (${r.note})` : ""}`);
      if (r.a) console.log(`  ${passAName}: ${r.a.answer}  value="${r.a.value}"  [${r.a.confidence}]  ${r.a.reasoning}`);
      if (r.b) console.log(`  ${passBName}: ${r.b.answer}  value="${r.b.value}"  [${r.b.confidence}]  ${r.b.reasoning}`);
    }
  }

  console.log(
    `\nNext: adjudicate every TWIN and DISPUTE by hand against the page, then write ` +
      `data/${paper.id}.answers.json ({ reconciled: [...], derivations: [...] }).`
  );
}

main();
