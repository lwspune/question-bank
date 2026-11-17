/**
 * Move a RIMC GK paper's non-MCQ items (config RIMC_GK_SHORT) out of its band
 * files into the companion written paper `<gk id>-short`.
 *
 *   npx tsx scripts/milschool/split-short.ts rimc-2022-dec-gk            # dry run: shows the moves
 *   npx tsx scripts/milschool/split-short.ts rimc-2022-dec-gk --apply
 *
 * Each moved item becomes a one-mark written row: `number` renumbered 1..k in
 * paper order, `label` = its printed GK number (so the stored question_number
 * still says where it sat), options dropped. Printed choices are not lost: if
 * the item's `context` does not already carry them (a match box does), they are
 * appended to the stem as "Choose from: ...". Idempotent: an item already
 * moved is not in the GK bands any more, and the short file is rebuilt whole.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, dataPath, requirePaper } from "./config";

function main() {
  const args = process.argv.slice(2);
  const gk = requirePaper(args.find((a) => !a.startsWith("--")));
  const apply = args.includes("--apply");
  const shortId = `${gk.id}-short`;
  requirePaper(shortId);
  const held = new Set(gk.held?.numbers ?? []);
  if (!held.size) throw new Error(`${gk.id} holds no numbers: add its session to RIMC_GK_SHORT in config.ts`);

  const re = new RegExp(`^${gk.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\.b\\d+\\.json$`);
  const moved: Record<string, unknown>[] = [];
  const touched: { file: string; json: { questions: Record<string, unknown>[] } }[] = [];
  for (const f of readdirSync(DATA).filter((x) => re.test(x)).sort()) {
    const json = JSON.parse(readFileSync(join(DATA, f), "utf8"));
    const keep = json.questions.filter((q: { number: number }) => !held.has(q.number));
    const out = json.questions.filter((q: { number: number }) => held.has(q.number));
    if (out.length) {
      moved.push(...out);
      json.questions = keep;
      touched.push({ file: f, json });
    }
  }

  const shortFile = join(DATA, `${shortId}.b1.json`);
  if (!moved.length) {
    console.log(existsSync(shortFile) ? `${gk.id}: already split (${shortFile} exists).` : `${gk.id}: none of Q${[...held].join(", Q")} found in its bands.`);
    return;
  }
  const missing = [...held].filter((n) => !moved.some((q) => q.number === n));
  if (missing.length) throw new Error(`held Q${missing.join(", Q")} not found in ${gk.id}'s bands`);

  moved.sort((a, b) => (a.number as number) - (b.number as number));
  const items = moved.map((q, i) => {
    const opts = ((q.options as { label: string; text: string }[]) ?? []).filter((o) => o.text?.trim());
    const ctx = (q.context as string | undefined) ?? "";
    const covered = opts.every((o) => ctx.includes(o.text.trim()));
    const choices = opts.length && !covered ? `\nChoose from: ${opts.map((o) => `(${o.label.toLowerCase()}) ${o.text.trim()}`).join(", ")}` : "";
    const { options: _o, answer: _a, ...rest } = q as Record<string, unknown>;
    return { ...rest, number: i + 1, label: String(q.number), stem: `${q.stem}${choices}`, marks: 1 };
  });

  for (const it of items) console.log(`  GK Q${it.label} -> ${shortId} Q${it.number}: ${String(it.stem).replace(/\n/g, " / ").slice(0, 110)}`);
  if (!apply) {
    console.log(`\n[dry-run] ${items.length} item(s) would move. Pass --apply.`);
    return;
  }
  for (const t of touched) writeFileSync(join(DATA, t.file), JSON.stringify(t.json, null, 2) + "\n");
  writeFileSync(
    shortFile,
    JSON.stringify({ paper: shortId, band: "b1", pages: gk.pages, bandReport: { notes: `split from ${gk.id} by split-short.ts` }, questions: items }, null, 2) + "\n"
  );
  console.log(`\nmoved ${items.length} item(s) to ${shortFile}; ${dataPath(gk.id, "merged")} needs a fresh merge.`);
}

main();
