/**
 * Apply reviewed solution rewrites to the database and mirror them to source.
 *
 *   npx tsx scripts/reviews/apply-solution-fixes.ts            # dry run + validate
 *   npx tsx scripts/reviews/apply-solution-fixes.ts --apply
 *
 * Reads every fix.*.out.json in the run's findings directory.
 *
 * `content_hash` deliberately EXCLUDES `solution`, so a solution-only rewrite
 * cannot change a row's identity — which is asserted here rather than assumed:
 * the hash is re-read after the write and must be unchanged. An option/stem edit
 * is a different operation and belongs in fix-option-text.ts.
 *
 * VALIDATION REFUSES, NEVER REPAIRS. Every check below fires on something that
 * has actually reached this database before, and silently repairing would just
 * move the defect somewhere quieter:
 *   - unbalanced \( \)            -> KaTeX drops the whole stem
 *   - a control character         -> a shell ate the backslash of \t or \n
 *   - a LaTeX command with no \   -> prints "dfrac{5}{sqrt{26}}" literally
 *   - unicode math                -> house convention is \(...\)
 *   - a build/triage marker       -> internal note leaking to a student
 *   - an option letter in a caveat-> the key-audit probe reads it as the answer
 *   - empty / unchanged text      -> a no-op fix is what a mangled needle looks like
 *
 * MIRRORING IS A SEPARATE STEP: run `mirror-solutions.ts` after this. A DB-only
 * fix is reverted by the next re-ingest, so the source JSON must be updated too —
 * but doing it here by JSON.parse -> JSON.stringify re-serialised whole files and
 * produced 1,500 lines of formatting churn around 24 real edits. mirror-solutions
 * edits the raw text instead, preserving byte-for-byte formatting. This script
 * reports which source files carry each row so an unmirrored fix is still visible.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const CHUNKS = join(process.cwd(), "scripts", "reviews", "data", "findings", "2026-08-16-papers");
const DATA_DIRS = [
  join(process.cwd(), "scripts", "practice", "data"),
  join(process.cwd(), "scripts", "stateboard", "data"),
  join(process.cwd(), "scripts", "mh-sb-11", "data"),
  join(process.cwd(), "scripts", "mh-hsc-12-pyq", "data"),
  join(process.cwd(), "scripts", "worksheets", "data"),
];

type Fix = { questionId: string; questionNumber: string; newSolution: string; whatChanged?: string; concern?: string };

const LOST = /(?<![\\A-Za-z])(dfrac|tfrac|frac|sqrt|bar|vec|hat|overline|begin|end|sum|int|binom)(?=[{_^])/g;
const UNICODE_MATH = /[√π≠×÷≤≥∞θαβγλΣ∫−±]/g;
const CONTROL = /[\t\v\f\b\r]/g;
const MARKER = /\[(MISMATCH|TODO|CHECK|FIXME|VERIFY)\b|REVIEW:|key-audit probe|the probe/i;

function validate(f: Fix, current: string | null): string[] {
  const s = f.newSolution ?? "";
  const errs: string[] = [];
  if (!s.trim()) errs.push("empty");
  if (current !== null && s === current) errs.push("identical to the stored text (a no-op fix is what a mangled edit looks like)");

  const open = (s.match(/\\\(/g) ?? []).length;
  const close = (s.match(/\\\)/g) ?? []).length;
  if (open !== close) errs.push(`unbalanced math delimiters: \\( x${open} vs \\) x${close}`);

  const ctrl = [...new Set(s.match(CONTROL) ?? [])];
  if (ctrl.length) errs.push(`control character(s) ${ctrl.map((c) => JSON.stringify(c)).join(",")} — a shell ate a backslash`);

  const outside = s.replace(/\\\([\s\S]*?\\\)/g, " ");
  const lost = [...new Set(Array.from(outside.matchAll(LOST), (m) => m[1]))];
  if (lost.length) errs.push(`LaTeX command(s) missing a backslash: ${lost.join(",")}`);

  const uni = [...new Set(s.match(UNICODE_MATH) ?? [])];
  if (uni.length) errs.push(`unicode math ${uni.join("")} — use \\(...\\)`);

  const mk = s.match(MARKER);
  if (mk) errs.push(`build/triage marker leaked: ${mk[0]}`);

  // An option letter inside a bracketed caveat makes audit:keys read it as the
  // concluded answer. Naming it in the final sentence is fine and expected.
  for (const m of s.matchAll(/\[[^\]]*?\boption\s*\(?([A-D])\)?/g)) {
    errs.push(`option letter (${m[1]}) named inside a caveat — name the VALUE instead`);
  }
  return errs;
}

/**
 * source_file -> data-file prefix, parsed from each pipeline's config.ts.
 *
 * WITHOUT THIS SCOPING THE MIRROR IS DESTRUCTIVE. A question number like
 * "Misc I Q.5" is NOT unique — it occurs in Differentiation, Indefinite
 * Integration and Line and Planes at once. Matching on the number alone made
 * 11 of 22 fixes land in up to 12 unrelated chapters' files, overwriting other
 * questions' solutions. Caught on a dry run; the chapter id is the discriminator.
 */
function buildPrefixMap(): Map<string, { dir: string; id: string }> {
  const map = new Map<string, { dir: string; id: string }>();
  for (const dir of DATA_DIRS) {
    const cfg = join(dir, "..", "config.ts");
    if (!existsSync(cfg)) continue;
    const src = readFileSync(cfg, "utf8");
    // pair each `id: "x"` with the next `sourceFile: "y"` that follows it
    const re = /id:\s*"([^"]+)"[\s\S]{0,600}?sourceFile:\s*"([^"]+)"/g;
    for (const m of src.matchAll(re)) map.set(m[2], { dir, id: m[1] });
  }
  return map;
}
const PREFIX = buildPrefixMap();

/**
 * Report which source JSONs carry this row — READ ONLY. Writing is
 * mirror-solutions.ts's job; see the header for why the two are separate.
 */
function sourcesFor(qnum: string, sourceFile: string | null): { touched: string[]; scoped: boolean } {
  const entry = sourceFile ? PREFIX.get(sourceFile) : undefined;
  if (!entry) return { touched: [], scoped: false };

  const touched: string[] = [];
  for (const name of readdirSync(entry.dir)) {
    // `<id>.` prefix, so "circles" cannot also match "circles-11"
    if (!name.startsWith(`${entry.id}.`) || !name.endsWith(".json")) continue;
    let doc: unknown;
    try { doc = JSON.parse(readFileSync(join(entry.dir, name), "utf8")); } catch { continue; }
    if (!Array.isArray(doc)) continue;
    const hit = (doc as Record<string, unknown>[]).some((row) => {
      if (!row || typeof row !== "object" || !("solution" in row)) return false;
      const num = String(row.number ?? row.questionNumber ?? row.ref ?? "");
      return num === qnum || num.endsWith(`#${qnum}`);
    });
    if (hit) touched.push(`${entry.id}/${name}`);
  }
  return { touched, scoped: true };
}

(async () => {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const files = readdirSync(CHUNKS).filter((f) => f.startsWith("fix.") && f.endsWith(".out.json"));
  const fixes: Fix[] = files.flatMap((f) => JSON.parse(readFileSync(join(CHUNKS, f), "utf8")) as Fix[]);
  console.log(`\n${fixes.length} fix(es) from ${files.length} file(s): ${files.join(", ")}\n`);

  const ids = fixes.map((f) => f.questionId);
  const { data: rows, error } = await db.from("questions").select("id, question_number, source_file, content_hash, solution").in("id", ids);
  if (error) throw error;
  const byId = new Map((rows ?? []).map((r: any) => [r.id, r]));

  let bad = 0, ok = 0;
  const plan: { f: Fix; row: any; files: string[] }[] = [];

  for (const f of fixes) {
    const row: any = byId.get(f.questionId);
    if (!row) { console.log(`  ✗ ${f.questionNumber}: not found (${f.questionId})`); bad++; continue; }
    const errs = validate(f, row.solution);
    if (errs.length) {
      console.log(`  ✗ ${row.question_number}`);
      for (const e of errs) console.log(`      ${e}`);
      bad++; continue;
    }
    const { touched, scoped } = sourcesFor(row.question_number, row.source_file);
    plan.push({ f, row, files: touched });
    console.log(`  ✓ ${String(row.question_number).padEnd(18)} ${f.whatChanged ?? ""}`.slice(0, 110));
    console.log(`      source: ${touched.length ? touched.join(", ") : scoped ? "NONE MATCHED in this chapter's files" : `UNMAPPED source_file ${row.source_file}`}`);
    if (!touched.length) console.log(`      ! fix will be LOST on the next re-ingest`);
    if (f.concern) console.log(`      concern: ${f.concern}`.slice(0, 160));
    ok++;
  }

  console.log(`\n${ok} valid, ${bad} refused`);
  if (bad) { console.log(`\nRefusing to write while any fix is invalid. Correct them and re-run.\n`); process.exit(1); }
  if (!APPLY) { console.log(`\n(dry run — nothing written. re-run with --apply)\n`); return; }

  for (const { f, row } of plan) {
    const { error: e } = await db.from("questions").update({ solution: f.newSolution }).eq("id", row.id);
    if (e) throw e;
  }

  // content_hash excludes `solution` — assert it rather than trust it.
  const { data: after } = await db.from("questions").select("id, content_hash").in("id", plan.map((p) => p.row.id));
  const drift = (after ?? []).filter((a: any) => byId.get(a.id)?.content_hash !== a.content_hash);
  console.log(`\napplied ${plan.length} solution(s)`);
  console.log(drift.length ? `  !! content_hash CHANGED on ${drift.length} row(s) — investigate` : `  content_hash unchanged on all ${plan.length} (as expected)`);
  const mirrored = plan.filter((p) => p.files.length).length;
  console.log(`  mirrored to source on ${mirrored}/${plan.length}\n`);
})().catch((e) => { console.error(e instanceof Error ? e.message : JSON.stringify(e, null, 2)); process.exit(1); });
