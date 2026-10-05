/**
 * Em-dash audit (the AI-voice tell). TRIAGE, always exits 0.
 *
 *   npm run audit:voice                     # rate per site area + the worst files
 *   npm run audit:voice -- guide/nda-polity # every hit in files matching a path substring
 *   npm run audit:voice -- --update         # rewrite scripts/voice/dash-baseline.json
 *   npm run audit:voice -- --solutions      # PUBLIC solutions in the DB, per exam (read-only)
 *
 * The GATE is tests/voice-ratchet.test.ts (no file may gain a dash). This is
 * the report you read to decide what to rewrite. Why the em dash at all, and
 * what counts as visible text: scripts/lib/voiceProbe.ts.
 *
 * Human baseline to compare against: printed exam stems run 0.11 per 1,000
 * words. Text written since late September 2026 runs about 1.5.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";
import { scanTree, toBaseline, type FileScan } from "./lib/voiceProbe";

const ROOT = process.cwd();
const BASELINE = path.join(ROOT, "scripts/voice/dash-baseline.json");
const DASH = /—/g;

/** The area a file's text shows up in. Staff-only pages are reported apart: no visitor sees them. */
function area(file: string): string {
  const f = file.replace(/^src\//, "");
  let m: RegExpMatchArray | null;
  if ((m = f.match(/^app\/guide\/([^/]+)\//))) return `guide/${m[1]}`;
  if ((m = f.match(/^app\/notes\/([^/]+)\//))) return `notes/${m[1]}`;
  if (/^app\/(dashboard|superadmin|upload|uploads|books)\b/.test(f)) return "staff-only";
  if (f.startsWith("app/api/")) return "api";
  if (f.startsWith("lib/email/")) return "email";
  if (f.startsWith("app/")) return "app (other pages)";
  if (f.startsWith("components/")) return "components";
  return "lib (other)";
}

const rate = (d: number, w: number) => (w ? (1000 * d) / w : 0).toFixed(1);

function report(scans: Record<string, FileScan>) {
  const areas = new Map<string, { dashes: number; words: number; files: number }>();
  for (const [file, s] of Object.entries(scans)) {
    const a = areas.get(area(file)) ?? { dashes: 0, words: 0, files: 0 };
    a.dashes += s.dashes;
    a.words += s.words;
    if (s.dashes) a.files++;
    areas.set(area(file), a);
  }
  const rows = [...areas.entries()].sort((x, y) => y[1].dashes - x[1].dashes);
  let dashes = 0;
  let words = 0;
  console.log(`${"area".padEnd(28)}${"dashes".padStart(8)}${"words".padStart(10)}${"/1k".padStart(7)}  files`);
  for (const [name, a] of rows) {
    dashes += a.dashes;
    words += a.words;
    console.log(`${name.padEnd(28)}${String(a.dashes).padStart(8)}${String(a.words).padStart(10)}${rate(a.dashes, a.words).padStart(7)}  ${a.files}`);
  }
  console.log(`${"TOTAL".padEnd(28)}${String(dashes).padStart(8)}${String(words).padStart(10)}${rate(dashes, words).padStart(7)}`);
  console.log("\nHuman baseline (printed exam stems): 0.11 per 1,000 words.\n\nWorst files:");
  Object.entries(scans)
    .filter(([, s]) => s.dashes)
    .sort((x, y) => y[1].dashes - x[1].dashes)
    .slice(0, 25)
    .forEach(([file, s]) => console.log(`${String(s.dashes).padStart(6)}  ${rate(s.dashes, s.words).padStart(6)}/1k  ${file}`));
}

function hits(scans: Record<string, FileScan>, filter: string) {
  let n = 0;
  for (const [file, s] of Object.entries(scans)) {
    if (!file.includes(filter) || !s.dashes) continue;
    console.log(`\n${file}  (${s.dashes})`);
    for (const h of s.hits) {
      n++;
      console.log(`  ${String(h.line).padStart(5)}: ${h.text.replace(/\s+/g, " ").trim().slice(0, 160)}`);
    }
  }
  console.log(`\n${n} strings with a dash tell in files matching "${filter}".`);
}

async function solutions() {
  const local = path.join(ROOT, ".env.local");
  if (fs.existsSync(local)) require("dotenv").config({ path: local, override: true });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("missing NEXT_PUBLIC_SUPABASE_URL / key in .env.local");
    return;
  }
  const db = createClient(url, key, { auth: { persistSession: false } });
  const { data: exams, error } = await db.from("exams").select("id, name");
  if (error || !exams) {
    console.error("exams:", error?.message);
    return;
  }

  // Only rows that HAVE a dash are fetched (~11k of ~85k); the totals come
  // from count headers, never from a payload (the PostgREST 1000-row cap).
  const dashesByExam = new Map<string, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error: e } = await db
      .from("questions")
      .select("id, exam_id, solution")
      .eq("visibility", "PUBLIC")
      .like("solution", "%—%")
      .order("id")
      .range(from, from + 999);
    if (e) {
      console.error("questions:", e.message);
      return;
    }
    for (const r of data ?? []) {
      dashesByExam.set(r.exam_id, (dashesByExam.get(r.exam_id) ?? 0) + (r.solution.match(DASH) ?? []).length);
    }
    if (!data || data.length < 1000) break;
  }

  const rows: { name: string; total: number; dashed: number; dashes: number }[] = [];
  for (const ex of exams) {
    const base = () => db.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", ex.id).eq("visibility", "PUBLIC");
    const [{ count: total }, { count: dashed }] = await Promise.all([base(), base().like("solution", "%—%")]);
    if (total) rows.push({ name: ex.name, total, dashed: dashed ?? 0, dashes: dashesByExam.get(ex.id) ?? 0 });
  }
  rows.sort((a, b) => b.dashed - a.dashed);
  console.log(`${"exam".padEnd(36)}${"rows".padStart(8)}${"w/ dash".padStart(9)}${"share".padStart(7)}${"dashes".padStart(8)}`);
  for (const r of rows) {
    const share = `${Math.round((100 * r.dashed) / r.total)}%`;
    console.log(`${r.name.slice(0, 35).padEnd(36)}${String(r.total).padStart(8)}${String(r.dashed).padStart(9)}${share.padStart(7)}${String(r.dashes).padStart(8)}`);
  }
  console.log("\nA DB edit to a solution is undone by the next re-ingest unless the source JSON changes too.");
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--solutions")) return solutions();
  const scans = scanTree(ROOT);
  if (args.includes("--update")) {
    const baseline = toBaseline(scans);
    fs.mkdirSync(path.dirname(BASELINE), { recursive: true });
    fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + "\n");
    const total = Object.values(baseline).reduce((a, b) => a + b, 0);
    console.log(`baseline written: ${Object.keys(baseline).length} files, ${total} dashes -> ${path.relative(ROOT, BASELINE)}`);
    return;
  }
  const filter = args.find((a) => !a.startsWith("--"));
  if (filter) hits(scans, filter);
  else report(scans);
}

main();
