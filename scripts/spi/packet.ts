/**
 * Write the verify lane's packet for one slice: stem, options and shared passage only, never
 * pass 1's answer, solution or classification (VERIFY_BRIEF.md).
 *
 *   npx tsx scripts/spi/packet.ts <paperId> --from=1 --to=38 [--file=<draft>]
 *
 * Reads the committed transcript, or a pass-1 draft with --file. Output:
 * out/<paperId>/verify/packet-<from>-<to>.txt
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parseTranscript } from "../ssc-cgl/lib";
import { OUT, TRANSCRIPTS, requirePaper } from "./config";
import { verifyPacket } from "./lib";

const args = process.argv.slice(2);
const flag = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const paper = requirePaper(args.find((a) => !a.startsWith("--")));
const from = Number(flag("from"));
const to = Number(flag("to"));
if (!Number.isInteger(from) || !Number.isInteger(to)) throw new Error("--from and --to are required");

const qs = parseTranscript(readFileSync(flag("file") ?? join(TRANSCRIPTS, `${paper.id}.txt`), "utf8")).filter(
  (q) => q.number >= from && q.number <= to
);
if (qs.length !== to - from + 1) throw new Error(`expected ${to - from + 1} blocks in ${from}-${to}, found ${qs.length}`);
const dir = join(OUT, paper.id, "verify");
mkdirSync(dir, { recursive: true });
const out = join(dir, `packet-${from}-${to}.txt`);
writeFileSync(out, verifyPacket(qs));
console.log(`wrote ${qs.length} blocks to ${out}`);
