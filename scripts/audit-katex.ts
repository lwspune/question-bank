/**
 * Bank-wide KaTeX-validity audit of every PUBLIC question — `npm run audit:katex`.
 * Reuses the renderer's own math extraction (parseLatex) + katex throwOnError,
 * plus delimiter-balance / trailing-backslash / sentinel / literal-\n artifact
 * checks. Paginates past the PostgREST 1000-row cap. Read-only; writes a
 * grouped report to generated-papers/katex-sweep.md (gitignored).
 *
 * Catches the extraction-corruption class that shipped into the bank before
 * this probe existed (an unrestored `\tan`-protection sentinel + eaten `\\`
 * row-separator on an NDA-2023 determinant). Run after any new ingest; too
 * heavy (25k KaTeX renders) for the prepush gate, so it's an on-demand audit.
 */
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import katex from "katex";
import { parseLatex } from "../src/components/math/parseLatex";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Opt = { label: string; text: string | null };
type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  set_id: string | null;
  text: string;
  context: string | null;
  solution: string | null;
  options: Opt[];
};

type Finding = {
  id: string;
  qnum: string | null;
  source: string | null;
  field: string;
  kind: string;
  detail: string;
};

const cnt = (s: string, re: RegExp) => (s.match(re) || []).length;

function katexBroken(text: string): string | null {
  for (const seg of parseLatex(text)) {
    if (seg.type === "text") continue;
    try {
      katex.renderToString(seg.content, { throwOnError: true, strict: false });
    } catch (e) {
      return `${seg.content.slice(0, 50)} :: ${String((e as Error).message).slice(0, 60)}`;
    }
  }
  return null;
}

async function main() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const PAGE = 1000;
  let from = 0;
  let total = 0;
  const findings: Finding[] = [];
  // tally per kind
  const tally: Record<string, number> = {};
  const bump = (k: string) => (tally[k] = (tally[k] ?? 0) + 1);

  for (;;) {
    const { data, error } = await client
      .from("questions")
      .select("id, question_number, source_file, set_id, text, context, solution, options(label, text)")
      .eq("visibility", "PUBLIC")
      .order("id")
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as Row[];
    if (rows.length === 0) break;
    total += rows.length;

    for (const r of rows) {
      const fields: [string, string | null][] = [
        ["text", r.text],
        ["context", r.context],
        ["solution", r.solution],
        ...r.options.map((o) => [`opt ${o.label}`, o.text] as [string, string | null]),
      ];
      for (const [field, valRaw] of fields) {
        if (!valRaw) continue;
        const val = valRaw;
        const push = (kind: string, detail: string) => {
          bump(kind);
          findings.push({ id: r.id, qnum: r.question_number, source: r.source_file, field, kind, detail });
        };

        const kb = katexBroken(val);
        if (kb) push("katex-broken", kb);

        if (cnt(val, /\\\(/g) !== cnt(val, /\\\)/g) || cnt(val, /\\\[/g) !== cnt(val, /\\\]/g))
          push("unbalanced-delim", `...${val.slice(-45)}`);

        if (/(?<!\\)\\\s*$/.test(val)) push("trailing-backslash", `...${val.slice(-45)}`);

        if (/PLACEHOLDER/.test(val)) push("sentinel-leak", `...${val.slice(Math.max(0, val.indexOf("PLACEHOLDER") - 15), val.indexOf("PLACEHOLDER") + 20)}...`);

        if (/\\n(?![a-zA-Z])/.test(val) && /(?<!\\)\\n/.test(val)) {
          // literal backslash-n that is not \nabla / \ne etc. — heuristic
          if (/(?<![\\a-zA-Z])\\n(?![a-zA-Z])/.test(val)) push("literal-backslash-n", `...${val.slice(-45)}`);
        }

        if (/!\[\]\(|<!--|\{width=/.test(val)) push("markdown-leak", `...${val.slice(-45)}`);
      }
    }

    process.stderr.write(`  scanned ${total}\r`);
    if (rows.length < PAGE) break;
    from += PAGE;
  }

  // Deduplicate identical (id, field, kind) — set-shared context repeats across siblings
  const seen = new Set<string>();
  const uniq = findings.filter((f) => {
    const k = `${f.id}|${f.field}|${f.kind}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const lines: string[] = [];
  lines.push(`# Bank-wide KaTeX-validity sweep`);
  lines.push(``);
  lines.push(`PUBLIC questions scanned: ${total}`);
  lines.push(`Total findings (raw): ${findings.length} | unique (id×field×kind): ${uniq.length}`);
  lines.push(``);
  lines.push(`## By kind`);
  for (const [k, n] of Object.entries(tally).sort((a, b) => b[1] - a[1])) lines.push(`- ${k}: ${n}`);
  lines.push(``);
  lines.push(`## Findings (unique)`);
  // group by source_file
  const bySource: Record<string, Finding[]> = {};
  for (const f of uniq) (bySource[f.source ?? "(null)"] ??= []).push(f);
  for (const [src, fs] of Object.entries(bySource).sort((a, b) => b[1].length - a[1].length)) {
    lines.push(``);
    lines.push(`### ${src}  (${fs.length})`);
    for (const f of fs) lines.push(`- [${f.kind}] Q${f.qnum ?? "?"} ${f.field} :: ${f.detail}  {${f.id}}`);
  }

  const outPath = join(process.cwd(), "generated-papers", "katex-sweep.md");
  writeFileSync(outPath, lines.join("\n"));

  console.log(`\n\nPUBLIC scanned: ${total}`);
  console.log(`Findings by kind:`, tally);
  console.log(`Unique findings: ${uniq.length}`);
  console.log(`Report: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
