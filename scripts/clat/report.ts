/**
 * MAIN SESSION ONLY (it reads the key): the key table against its notification,
 * then the blind solver against the key.
 *
 *   npx tsx scripts/clat/report.ts <year>            # summary + every disagreement
 *   npx tsx scripts/clat/report.ts <year> --key      # the key check alone (before any solving)
 */
import { KEY_NOTICES, type ClatYear } from "./config";
import { loadAdjudications, loadDerived, loadKey, loadPaper } from "./io";
import { crosscheck, keyNoticeIssues } from "./lib";

function main() {
  const year = Number(process.argv[2]) as ClatYear;
  const key = loadKey(year);
  const notice = KEY_NOTICES[year];
  const kIssues = keyNoticeIssues(key, notice);
  const odd = Object.entries(key).filter(([, v]) => !/^[A-D]$/.test(v));
  console.log(`${year} key: ${Object.keys(key).length} answers; not single: ${odd.map(([q, v]) => `Q${q}=${v}`).join(", ") || "none"}`);
  console.log(`  notice: ${notice.source}`);
  console.log(kIssues.length ? `  KEY DISAGREES WITH NOTICE:\n    ${kIssues.join("\n    ")}` : "  key table agrees with the notice.");
  if (process.argv.includes("--key")) return;

  const paper = loadPaper(year);
  const derived = loadDerived(year);
  const c = crosscheck(paper, key, derived);
  const adj = new Set(loadAdjudications(year).map((a) => a.ref));
  const bySection = new Map<string, { a: number; n: number }>();
  for (const r of c.rows) {
    if (r.verdict !== "AGREE" && r.verdict !== "DISAGREE") continue;
    const s = bySection.get(r.section) ?? { a: 0, n: 0 };
    s.n++;
    if (r.verdict === "AGREE") s.a++;
    bySection.set(r.section, s);
  }
  console.log(`\nsolver vs key: ${c.agree}/${c.scored} agree (${((100 * c.agree) / Math.max(1, c.scored)).toFixed(1)}%)`);
  for (const [s, v] of bySection) console.log(`  ${s}: ${v.a}/${v.n}`);
  const missing = c.rows.filter((r) => r.verdict === "MISSING").map((r) => r.ref);
  if (missing.length) console.log(`  MISSING derivations: ${missing.join(", ")}`);
  for (const r of c.rows.filter((x) => x.verdict === "DISAGREE")) {
    console.log(`  Q${r.ref} [${r.section.split(" ")[0]}] solver ${r.derived} key ${r.key} (${r.confidence})${adj.has(r.ref) ? " ADJUDICATED" : ""}${r.flag ? ` flag: ${r.flag.slice(0, 140)}` : ""}`);
  }
  for (const r of c.rows.filter((x) => x.verdict === "WITHDRAWN" || x.verdict === "EITHER")) {
    console.log(`  Q${r.ref} ${r.verdict} (key ${r.key}); solver ${r.derived}`);
  }
}

main();
