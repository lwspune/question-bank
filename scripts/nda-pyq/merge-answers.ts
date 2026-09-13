/**
 * Merge the per-range blind derivation files into `data/<id>.answers.json`.
 *
 *   npx tsx scripts/nda-pyq/merge-answers.ts 2026-2
 *   npx tsx scripts/nda-pyq/merge-answers.ts 2026-2 --apply
 *
 * The derivation is ONE pass, split into ranges purely for throughput — so
 * unlike `merge.ts` there is no overlap to reconcile and a question appearing in
 * two files is a dispatch error, not a disagreement to adjudicate. It is
 * reported as such.
 *
 * The glob is anchored to `<id>.d<name>.json` so it cannot swallow the derive
 * packet, the source key or any scratch artifact in data/ — a loose
 * `<id>.*.json` has silently ingested non-question files in two sibling
 * pipelines in this repo.
 *
 * GATES, all of them refusals rather than warnings:
 *  - every question 1..N present exactly once;
 *  - `answer` is A-D or explicitly null (null = no printed option is correct,
 *    which is a finding; `buildRecords` drops the row and the paper ships one
 *    short, which is TRUE, rather than carrying an invented answer);
 *  - `value`, `confidence` and `reasoning` present — `value` because it is what
 *    makes a later key disagreement legible, and a missing one cannot be
 *    reconstructed after the fact;
 *  - `solution` present, because that is the field a student reads;
 *  - no control characters and no double-escaped LaTeX, the two corruptions that
 *    survive review in this environment.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { DATA, QUESTIONS_PER_PAPER, dataPath, requirePaper } from "./config";
import { normalizeDerivations, findLatexImbalance, type Derivation } from "./lib";

const VALID_ANSWERS = new Set(["A", "B", "C", "D"]);
const VALID_CONF = new Set(["HIGH", "MED", "LOW"]);

function badChars(s: string): string | null {
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c < 32 && s[i] !== "\n") return `control character U+${c.toString(16).padStart(4, "0")} at ${i}`;
  }
  // `\\(` in the rendered string means the JSON carried `\\\\(` — a literal
  // backslash before the delimiter, which renders as a stray slash on the page.
  if (/\\\\[()]/.test(s)) return "double-escaped math delimiter";
  return null;
}

function main() {
  const paper = requirePaper(process.argv[2]);
  const apply = process.argv.includes("--apply");

  // `d\d+` and NOT `d[A-Za-z0-9]+`. The looser pattern matches `2026-2.derive.json`
  // — "d" + "erive" — so the blind PACKET was read back in as if it were a set of
  // derivations, and every question appeared twice. Caught on the first real run,
  // which is the only reason this file's own warning about loose globs is not
  // also its epitaph. Range files are named by this repo, so digits are enough.
  const re = new RegExp(`^${paper.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.d\\d+\\.json$`);
  const files = readdirSync(DATA).filter((f) => re.test(f)).sort();
  if (!files.length) throw new Error(`no derivation files matching ${paper.id}.d<N>.json in ${DATA}`);

  const errors: string[] = [];
  const byNumber = new Map<number, { d: Derivation; file: string }>();

  for (const f of files) {
    const raw = JSON.parse(readFileSync(`${DATA}/${f}`, "utf8"));
    const rows = normalizeDerivations(Array.isArray(raw) ? raw : (raw.derivations ?? [])) as Derivation[];
    // Fail CLOSED on shape as well as on name. A name filter goes stale the
    // moment someone adds an artifact, and the failure is silent: the packet
    // above parsed perfectly and simply had no answers in it.
    const shaped = rows.every(
      (r) => typeof r?.number === "number" && "answer" in r && typeof r?.confidence === "string"
    );
    if (!shaped) {
      errors.push(`${f}: rows are not derivations (need number + answer + confidence) — wrong file matched`);
      continue;
    }
    const ns = rows.map((r) => r.number);
    console.log(
      `  ${f.padEnd(22)} ${String(rows.length).padStart(3)} derivations  ` +
        (ns.length ? `${Math.min(...ns)}-${Math.max(...ns)}` : "(empty)")
    );
    for (const d of rows) {
      const prev = byNumber.get(d.number);
      if (prev) {
        errors.push(`Q${d.number}: derived twice, in ${prev.file} and ${f} — a dispatch error, not a disagreement`);
        continue;
      }
      byNumber.set(d.number, { d, file: f });
    }
  }

  for (let n = 1; n <= QUESTIONS_PER_PAPER; n++) {
    const hit = byNumber.get(n);
    if (!hit) {
      errors.push(`Q${n}: no derivation`);
      continue;
    }
    const d = hit.d;
    if (d.answer !== null && !VALID_ANSWERS.has(String(d.answer).toUpperCase())) {
      errors.push(`Q${n}: answer "${d.answer}" is not A-D or null`);
    }
    if (!d.value?.trim()) errors.push(`Q${n}: no \`value\` — a key disagreement on this row could not be read`);
    if (!VALID_CONF.has(String(d.confidence).toUpperCase())) {
      errors.push(`Q${n}: confidence "${d.confidence}" is not HIGH/MED/LOW`);
    }
    if (!d.reasoning?.trim()) errors.push(`Q${n}: no \`reasoning\``);
    if (!d.solution?.trim()) errors.push(`Q${n}: no \`solution\` — a student would see a bare letter`);
    for (const [field, val] of [["reasoning", d.reasoning], ["solution", d.solution], ["value", d.value]] as const) {
      if (!val) continue;
      const bad = badChars(val);
      if (bad) errors.push(`Q${n} ${field}: ${bad}`);
      const imbalance = findLatexImbalance(val);
      if (imbalance) errors.push(`Q${n} ${field}: ${imbalance}`);
    }
  }

  const derivations = [...byNumber.values()].map((v) => v.d).sort((a, b) => a.number - b.number);

  const conf = new Map<string, number>();
  for (const d of derivations) {
    const k = String(d.confidence).toUpperCase();
    conf.set(k, (conf.get(k) ?? 0) + 1);
  }
  console.log(`\n${derivations.length} derivations`);
  console.log(`confidence: ${[...conf.entries()].map(([k, v]) => `${k} ${v}`).join("  ")}`);

  const nulls = derivations.filter((d) => d.answer === null).map((d) => d.number);
  console.log(
    `no printed option correct: ${nulls.length ? `Q${nulls.join(", Q")} — these are DROPPED at commit and the paper ships short` : "none"}`
  );

  const letters = new Map<string, number>();
  for (const d of derivations) if (d.answer) letters.set(d.answer.toUpperCase(), (letters.get(d.answer.toUpperCase()) ?? 0) + 1);
  console.log(
    `answer distribution: ${["A", "B", "C", "D"].map((l) => `${l} ${letters.get(l) ?? 0}`).join("  ")}` +
      `   (informational — a real paper is not exactly uniform, so do NOT "fix" a skew)`
  );

  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
  }
  if (!apply) {
    console.log(`\n[dry-run] pass --apply to write ${paper.id}.answers.json. Nothing written.`);
    return;
  }
  if (errors.length) throw new Error("refusing to write an answers file with errors.");

  writeFileSync(
    dataPath(paper.id, "answers"),
    JSON.stringify({ reconciled: [], derivations }, null, 2) + "\n",
    "utf8"
  );
  console.log(`\nwrote ${dataPath(paper.id, "answers")}`);
}

main();
