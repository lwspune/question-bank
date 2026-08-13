/**
 * Compare the two independent MCQ derivations and report every disagreement.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/reconcile-keys.ts <blindFile> [<blindFile> ...]
 *
 * There is NO answer key in this source, so a key is only as good as the
 * derivations behind it. Two passes run on every MCQ:
 *   - the AUTHORING pass, which sees the chapter's textbook corpus and writes
 *     the model answer (out/<id>.solutions.json, `key` field);
 *   - a BLIND pass, which sees stem and options only (out/blind-keys-*.json).
 * This script diffs them.
 *
 * IT IS A WORK LIST, NOT AN ADJUDICATOR. It never picks a winner: an agreement
 * is evidence, a disagreement is a question for a human, and `null` on either
 * side ("no option is correct") is a substantive claim rather than a missing
 * value — three questions in this corpus turned out to have no correct option,
 * two of them our own transcription error and one a genuine board misprint.
 * Nothing here writes to data/.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { OUT, DATA, CHAPTERS } from "./config";

type Blind = { ref: string; key: string | null; confidence?: string; derivation?: string; flag?: string };
type Sol = { ref: string; key?: string | null; flag?: string };

function main() {
  const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const blindFiles = files.length
    ? files
    : readdirSync(OUT).filter((f) => f.startsWith("blind-keys") && f.endsWith(".json")).map((f) => join(OUT, f));
  if (!blindFiles.length) throw new Error("no blind-key files found in out/");

  const blind = new Map<string, Blind>();
  for (const f of blindFiles) {
    for (const b of JSON.parse(readFileSync(f, "utf8")) as Blind[]) {
      if (b.ref.startsWith("_")) continue;
      if (blind.has(b.ref)) throw new Error(`${b.ref} appears in two blind files`);
      blind.set(b.ref, b);
    }
  }

  const authored = new Map<string, Sol>();
  for (const id of Object.keys(CHAPTERS)) {
    const p = join(OUT, `${id}.solutions.json`);
    if (!existsSync(p)) continue;
    for (const s of JSON.parse(readFileSync(p, "utf8")) as Sol[]) {
      if (!s.ref.startsWith("_")) authored.set(s.ref, s);
    }
  }

  // A blind derivation made BEFORE the row's stem or options were corrected was
  // reasoning about a different question, so a mismatch is stale input rather
  // than a disagreement. Without this the reconciliation reports five conflicts
  // that are all explained, and a later reader has no way to tell them from real
  // ones. Rows corrected by the printed page are listed in defects.json.
  const defects = JSON.parse(readFileSync(join(DATA, "defects.json"), "utf8")) as {
    stemsMistranscribed: { fixes: { ref: string }[] };
    optionsMistranscribed: { fixes: { ref: string }[] };
  };
  const corrected = new Set([
    ...defects.stemsMistranscribed.fixes.map((f) => f.ref),
    ...defects.optionsMistranscribed.fixes.map((f) => f.ref),
    // line-planes#5 is the dropped half of a duplicate pair; its corrected text
    // is what vectors#20 now carries.
    "vectors-12-pyq#20",
  ]);

  const agree: string[] = [];
  const stale: string[] = [];
  const disagree: string[] = [];
  const bothNull: string[] = [];
  const onlyOne: string[] = [];

  for (const [ref, b] of blind) {
    const a = authored.get(ref);
    if (!a || a.key === undefined) { onlyOne.push(`${ref}: blind says ${b.key ?? "null"}, no authored key`); continue; }
    if (b.key === null && a.key === null) { bothNull.push(ref); continue; }
    if (b.key === a.key) { agree.push(ref); continue; }
    if (corrected.has(ref)) {
      stale.push(`${ref}: blind=${b.key ?? "null"} (pre-correction) vs authored=${a.key ?? "null"}`);
      continue;
    }
    disagree.push(
      `${ref}: blind=${b.key ?? "null"} vs authored=${a.key ?? "null"}` +
        (b.confidence ? ` [blind confidence ${b.confidence}]` : "") +
        (b.derivation ? `\n      blind: ${b.derivation.slice(0, 220)}` : ""),
    );
  }
  for (const [ref, a] of authored) {
    if (a.key !== undefined && !blind.has(ref)) onlyOne.push(`${ref}: authored says ${a.key ?? "null"}, no blind derivation`);
  }

  const checked = agree.length + disagree.length + bothNull.length;
  console.log(`double-derived ${checked} MCQ key(s) across ${blindFiles.length} blind file(s)`);
  console.log(`  agree              ${agree.length}`);
  console.log(`  both say NO ANSWER ${bothNull.length}${bothNull.length ? ` (${bothNull.join(", ")})` : ""}`);
  console.log(`  stale blind input  ${stale.length} — the row was corrected against the printed page AFTER the blind pass ran`);
  for (const s2 of stale) console.log(`    ${s2}`);
  console.log(`  DISAGREE           ${disagree.length}`);
  for (const d of disagree) console.log(`    ${d}`);
  if (onlyOne.length) {
    console.log(`  only one derivation (${onlyOne.length}):`);
    for (const o of onlyOne) console.log(`    ${o}`);
  }
  console.log(
    disagree.length
      ? "\nAdjudicate each disagreement against the printed paper before promoting. This script does not choose."
      : "\nNo disagreements. Note that agreement is evidence, not proof — both passes can be wrong the same way.",
  );
}

main();
