/**
 * Compare pass 1's answers (the transcript) with the verify lane's blind answers.
 *
 *   npx tsx scripts/spi/compare.ts <paperId> [--file=<draft>]
 *
 * Reads every out/<paperId>/verify/answers-*.txt. Prints agreements as a count, then each
 * fidelity issue and each disagreement in full: those are the main session's to settle by
 * reading the page and re-deriving, never by picking a side. A question with a fidelity
 * issue is settled first, because a blind answer cannot catch a mis-transcribed option.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseTranscript } from "../ssc-cgl/lib";
import { OUT, TRANSCRIPTS, requirePaper } from "./config";
import { compareVerify, parseVerify, type VerifyRow } from "./lib";

const args = process.argv.slice(2);
const file = args.find((a) => a.startsWith("--file="))?.slice("--file=".length);
const paper = requirePaper(args.find((a) => !a.startsWith("--")));
const qs = parseTranscript(readFileSync(file ?? join(TRANSCRIPTS, `${paper.id}.txt`), "utf8"));

const dir = join(OUT, paper.id, "verify");
const verify: VerifyRow[] = readdirSync(dir)
  .filter((f) => /^answers-\d+-\d+\.txt$/.test(f))
  .flatMap((f) => parseVerify(readFileSync(join(dir, f), "utf8")));

const r = compareVerify(qs, verify);
console.log(`${paper.id}: ${qs.length} questions, ${verify.length} verify answers`);
console.log(`agree: ${r.agree.length}   disagree: ${r.disagree.length}   fidelity issues: ${r.fidelity.length}   not verified: ${r.missing.length}`);
if (r.missing.length) console.log(`not verified: ${r.missing.map((n) => `Q${n}`).join(", ")}`);
for (const f of r.fidelity) console.log(`FIDELITY Q${f.n}: ${f.issue}`);
for (const d of r.disagree) console.log(`DISAGREE Q${d.n}: pass1 ${d.ours}, blind ${d.blind}${d.why ? `  (${d.why})` : ""}`);
const unsure = verify.filter((v) => v.why?.toLowerCase().includes("unsure") && r.agree.includes(v.n));
for (const u of unsure) console.log(`UNSURE (agreed) Q${u.n}: ${u.why}`);
