/**
 * Rewrite a paper's answers file so the LETTER comes from the official UPSC key,
 * keeping the derivation's working.
 *
 *   npx tsx scripts/upsc/apply-key.ts 2025-p1
 *   npx tsx scripts/upsc/apply-key.ts 2025-p1 --apply
 *
 * Reads   data/<paperId>.key.json      the official key, Series A
 *         data/<paperId>.answers.json  whatever the answers currently are
 * Writes  data/<paperId>.answers.json  (in place)
 *
 * WHY THIS IS SEPARATE FROM keycheck.ts. `keycheck --apply` builds an answers
 * file from a raw derivation PASS. This one applies the key over answers that
 * ALREADY EXIST — the case where a paper was committed under the no-key regime
 * (two blind passes plus hand adjudication) and a key turned up afterwards. It
 * keeps the reasoning that was written, which is the expensive part and which the
 * key does not supply.
 *
 * AFTER RUNNING THIS THE PAPER MUST BE DELETED AND RE-COMMITTED, not patched.
 * `content_hash` is sha256(stem + sorted options + ANSWER), so changing an answer
 * changes the row's identity: a re-commit would INSERT a new row and leave the
 * old one behind. Deleting by `source_file` first is what keeps the paper whole.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dataPath, pattern, paperById } from "./config";
import { applyOfficialKey, compareToKey, parseOfficialKey, type Derivation } from "./lib";

function main() {
  const args = process.argv.slice(2);
  const paper = paperById(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const pat = pattern(paper);

  const keyFile = dataPath(paper.id, "key");
  const ansFile = dataPath(paper.id, "answers");
  for (const f of [keyFile, ansFile]) {
    if (!existsSync(f)) throw new Error(`${f} not found`);
  }

  const key = parseOfficialKey(JSON.parse(readFileSync(keyFile, "utf8")), pat.questions);
  const current = JSON.parse(readFileSync(ansFile, "utf8"));
  const answers: Derivation[] = current.answers;

  const cmp = compareToKey(key, answers);
  const changed = cmp.filter((r) => r.verdict === "MISMATCH");
  const next = applyOfficialKey(key, answers);

  console.log(`${paper.id}  ${answers.length} answer(s) on file, key has ${key.total} question(s)`);
  console.log(`  dropped by UPSC : ${key.dropped.length}`);
  console.log(`  already correct : ${cmp.filter((r) => r.verdict === "MATCH").length}`);
  console.log(`  TO BE CORRECTED : ${changed.length}`);
  for (const r of changed) console.log(`    Q${r.number}  ${r.derived} -> ${r.official}`);

  if (!apply) {
    console.log(`\n[dry-run] pass --apply to rewrite ${ansFile}.`);
    return;
  }

  writeFileSync(
    ansFile,
    JSON.stringify(
      {
        paper: paper.id,
        source: "official UPSC answer key (Series A)",
        supersedes: current.source ?? "two independent blind derivations + hand adjudication",
        dropped: key.dropped,
        correctedFromKey: changed.map((r) => r.number),
        answers: next,
      },
      null,
      2
    ) + "\n"
  );
  console.log(`\nwrote ${ansFile}  (${next.length} answers, ${changed.length} corrected)`);
  console.log(
    `\nNEXT, and it is not optional: content_hash includes the ANSWER, so these rows\n` +
      `have new identities. DELETE this paper's rows by source_file, then re-commit:\n` +
      `  npx tsx scripts/upsc/commit.ts ${paper.id} --apply`
  );
}

main();
