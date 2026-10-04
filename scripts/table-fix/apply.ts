/**
 * Replace tables stored as dashed ASCII grids (audit:text DASHED_TABLE) with
 * GFM pipe-tables, from a reviewed manifest. Runbook: ./README.md.
 *
 *   npx tsx scripts/table-fix/apply.ts            # dry run + review page
 *   npx tsx scripts/table-fix/apply.ts --apply    # write
 *
 * The manifest (manifest.json) is the record of what changed and why. Each edit
 * replaces one span of one field: `from` when given, else the table itself
 * (first to last run of 8+ dashes). Every guard below must pass for a question,
 * or nothing of that question is written:
 *   - `from` occurs exactly once in the current value (a re-run after a
 *     successful apply finds the field already fixed and skips it);
 *   - the new value is no longer a dashed table, has no literal \n, every math
 *     segment renders in KaTeX, and a value meant to hold a table parses as one;
 *   - JEE stems and NDA mock stems/options own their content_hash, so the hash
 *     is recomputed the way their resync tools do it, and refused if another
 *     row of the exam already holds it;
 *   - NDA rows are written only once scripts/nda-mock/config.ts carries the
 *     same text as an errata entry, so a later resync reproduces the fix
 *     instead of undoing it. JEE stem overrides are written by this tool.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../../src/components/math/parseLatex";
import { parseTableBlocks } from "../../src/components/math/parseTableBlocks";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { isDashedTable } from "../lib/textProbes";
import { stripEmptyMath } from "../jee/lib";
import { requirePaper } from "../nda-mock/config";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Pipeline = "mhtcet" | "jee" | "jee-solution" | "nda";
type Edit = {
  id: string;
  pipeline: Pipeline;
  source_file: string;
  question_number: string;
  ref: { paper: string; q: string | number } | null;
  field: string; // text | context | solution | option:<label>
  from?: string;
  to: string;
  note: string;
};
type Opt = { id: string; label: string; text: string; is_correct: boolean };
type Row = {
  id: string;
  exam_id: string;
  org_id: string;
  text: string;
  context: string | null;
  solution: string | null;
  content_hash: string;
  options: Opt[];
};

const DIR = join(process.cwd(), "scripts", "table-fix");
const manifest = JSON.parse(readFileSync(join(DIR, "manifest.json"), "utf8")) as { batch: string; rows: Edit[] };

function tableSpan(value: string): string | null {
  const runs = [...value.matchAll(/-{8,}/g)];
  if (!runs.length) return null;
  const last = runs[runs.length - 1];
  return value.slice(runs[0].index!, last.index! + last[0].length);
}

/** The table sits on its own lines; surrounding prose keeps its own text. */
function splice(value: string, from: string, to: string): string {
  const at = value.indexOf(from);
  const before = value.slice(0, at).trimEnd();
  const after = value.slice(at + from.length).trimStart();
  return (before ? before + "\n" : "") + to + (after ? "\n" + after : "");
}

function mathOk(text: string): boolean {
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch {
      return false;
    }
  }
  return true;
}

function count(hay: string, needle: string): number {
  let n = 0;
  for (let i = hay.indexOf(needle); i >= 0; i = hay.indexOf(needle, i + 1)) n++;
  return n;
}

// ── review page: an approximation of BlockText (tables + KaTeX), for eyeballing ──
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function inline(s: string): string {
  return parseLatex(s)
    .map((seg) =>
      seg.type === "text"
        ? esc(seg.content).replace(/\n/g, "<br>")
        : katex.renderToString(seg.content, { throwOnError: false, strict: false, output: "mathml", displayMode: seg.type === "block" })
    )
    .join("");
}
function render(s: string): string {
  return parseTableBlocks(s)
    .map((b) =>
      b.kind === "table"
        ? "<table><thead><tr>" + b.headers.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead><tbody>" +
          b.rows.map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>").join("") + "</tbody></table>"
        : `<div>${inline(b.text)}</div>`
    )
    .join("");
}

async function main() {
  const apply = process.argv.includes("--apply");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const ids = [...new Set(manifest.rows.map((r) => r.id))];
  const { data, error } = await db
    .from("questions")
    .select("id, exam_id, org_id, text, context, solution, content_hash, options(id, label, text, is_correct)")
    .in("id", ids);
  if (error) throw new Error(error.message);
  const rows = new Map((data as Row[]).map((r) => [r.id, r]));

  const backupPath = join(DIR, "backup", `${manifest.batch}.before.json`);
  const jeeTouched = new Map<string, { path: string; data: Record<string, unknown> & { stemOverrides?: Record<string, string> } }>();
  const review: string[] = [];
  // Full new value of every edited field, so an NDA errata entry (which replaces
  // the WHOLE stem/context/option) can be copied from it exactly.
  const values: { id: string; ref: Edit["ref"]; field: string; value: string }[] = [];
  let failed = 0;
  let written = 0;
  let skipped = 0;
  const backup: Row[] = [];

  for (const id of ids) {
    const row = rows.get(id);
    const edits = manifest.rows.filter((e) => e.id === id);
    const head = `${edits[0].source_file} Q${edits[0].question_number} (${id.slice(0, 8)})`;
    if (!row) {
      console.log(`✗ ${head}: not found`);
      failed++;
      continue;
    }

    const next: { text: string; context: string | null; solution: string | null } = {
      text: row.text,
      context: row.context,
      solution: row.solution,
    };
    const nextOpts = new Map(row.options.map((o) => [o.label, o.text]));
    const problems: string[] = [];
    let changed = 0;

    for (const e of edits) {
      const isOpt = e.field.startsWith("option:");
      const label = isOpt ? e.field.slice(7) : "";
      const current = isOpt ? nextOpts.get(label) ?? null : (next as Record<string, string | null>)[e.field];
      if (current == null) {
        problems.push(`${e.field}: empty`);
        continue;
      }
      if (!isDashedTable(current) && !e.from) {
        continue; // already fixed by an earlier apply
      }
      const from = e.from ?? tableSpan(current);
      if (!from || count(current, from) !== 1) {
        if (e.from && count(current, e.from) === 0 && current.includes(e.to)) continue; // already fixed
        problems.push(`${e.field}: span found ${from ? count(current, from) : 0} times`);
        continue;
      }
      const value = isOpt && from === current ? e.to : splice(current, from, e.to);
      if (isDashedTable(value)) problems.push(`${e.field}: still a dashed table`);
      if (normalizeNewlines(value) !== value) problems.push(`${e.field}: literal \\n`);
      if (!mathOk(value)) problems.push(`${e.field}: KaTeX error`);
      if (e.to.includes("|---|") && !parseTableBlocks(value).some((b) => b.kind === "table"))
        problems.push(`${e.field}: does not parse as a table`);
      values.push({ id, ref: e.ref, field: e.field, value });
      if (isOpt) nextOpts.set(label, value);
      else (next as Record<string, string | null>)[e.field] = value;
      changed++;
      review.push(
        `<section><h3>${esc(head)} · ${esc(e.field)}</h3><p class="note">${esc(e.note)}</p>` +
          `<div class="pair"><div><h4>Before</h4>${render(current)}</div><div><h4>After</h4>${render(value)}</div></div></section>`
      );
    }

    if (!changed && !problems.length) {
      console.log(`· ${head}: already fixed`);
      skipped++;
      continue;
    }

    // content_hash: recomputed only where the pipeline owns it.
    const pipeline = edits[0].pipeline;
    const answer = row.options.find((o) => o.is_correct)?.label ?? "";
    const ownsHash = pipeline === "jee" || (pipeline === "nda" && edits.some((e) => e.field === "text" || e.field.startsWith("option:")));
    let hash = row.content_hash;
    if (ownsHash) {
      const sorted = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
      hash = contentHash(next.text, sorted.map((o) => nextOpts.get(o.label)!), answer);
      if (hash !== row.content_hash) {
        const { data: clash } = await db
          .from("questions")
          .select("id")
          .eq("org_id", row.org_id)
          .eq("exam_id", row.exam_id)
          .eq("content_hash", hash)
          .neq("id", id);
        if (clash?.length) problems.push(`new content_hash already held by ${clash[0].id}`);
      }
    }

    // Source of record.
    for (const e of edits) {
      if (pipeline === "jee" && e.field === "text") {
        const path = join(process.cwd(), "scripts", "jee", "papers", `${e.ref!.paper}.json`);
        const entry = jeeTouched.get(path) ?? { path, data: JSON.parse(readFileSync(path, "utf8")) };
        jeeTouched.set(path, entry);
        if (normalizeNewlines(stripEmptyMath(next.text)) !== next.text) problems.push("stem is not resync-stable");
        entry.data.stemOverrides = { ...(entry.data.stemOverrides ?? {}), [String(e.ref!.q)]: next.text };
      }
      if (pipeline === "nda") {
        const errata = requirePaper(e.ref!.paper).errata?.[Number(e.ref!.q)];
        const want = e.field.startsWith("option:") ? errata?.options?.[e.field.slice(7)] : e.field === "text" ? errata?.stem : errata?.context;
        const have = e.field.startsWith("option:") ? nextOpts.get(e.field.slice(7)) : (next as Record<string, string | null>)[e.field];
        if (want !== have) problems.push(`config.ts ${e.ref!.paper} errata[${e.ref!.q}] does not carry the new ${e.field}`);
      }
    }

    if (problems.length) {
      console.log(`✗ ${head}: ${problems.join("; ")}`);
      failed++;
      continue;
    }
    console.log(`${apply ? "✓" : "→"} ${head}: ${changed} field(s)${hash !== row.content_hash ? ", content_hash recomputed" : ""}`);
    if (!apply) continue;

    backup.push(row);
    for (const o of row.options) {
      const t = nextOpts.get(o.label)!;
      if (t === o.text) continue;
      const { error: oErr } = await db.from("options").update({ text: t }).eq("id", o.id);
      if (oErr) throw new Error(`${head} option ${o.label}: ${oErr.message}`);
    }
    const { error: qErr } = await db
      .from("questions")
      .update({ text: next.text, context: next.context, solution: next.solution, content_hash: hash })
      .eq("id", id);
    if (qErr) throw new Error(`${head}: ${qErr.message}`);
    written++;
  }

  mkdirSync(join(process.cwd(), "generated-papers", "table-fix"), { recursive: true });
  writeFileSync(
    join(process.cwd(), "generated-papers", "table-fix", `${manifest.batch}.values.json`),
    JSON.stringify(values, null, 2)
  );
  const page = join(process.cwd(), "generated-papers", "table-fix", `${manifest.batch}.html`);
  writeFileSync(
    page,
    `<!doctype html><meta charset="utf-8"><title>Table repair review</title>` +
      `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css">` +
      `<style>body{font:15px/1.5 system-ui;margin:24px;max-width:1200px}section{border-top:1px solid #ddd;padding:12px 0}` +
      `h3{margin:0;font-size:15px}.note{color:#555;margin:4px 0 8px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}` +
      `.pair>div{background:#fafafa;padding:8px;overflow-x:auto;font-family:Georgia,serif}h4{margin:0 0 6px;font:600 12px system-ui;color:#888}` +
      `table{border-collapse:collapse;margin:6px 0}td,th{border:1px solid #bbb;padding:3px 8px}</style>` +
      `<h1>Table repair: ${manifest.batch}</h1><p>${review.length} edits</p>${review.join("")}`
  );

  if (apply) {
    for (const { path, data: d } of jeeTouched.values()) writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
    if (backup.length) {
      mkdirSync(join(DIR, "backup"), { recursive: true });
      if (!existsSync(backupPath)) writeFileSync(backupPath, JSON.stringify(backup, null, 2) + "\n");
    }
  }
  console.log(`\n${apply ? "written" : "ready"} ${apply ? written : ids.length - failed - skipped}, already fixed ${skipped}, failed ${failed}`);
  console.log(`review page: ${page}`);
  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
