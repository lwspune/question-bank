/**
 * Spec-driven repair for JEE rows (any subject), persisted to the SOURCE OF RECORD
 * (scripts/jee/papers/<id>.json) and then to the DB.
 *
 *   npx tsx scripts/notes-pipeline/jee/fix.ts <spec.json> [--apply]
 *
 * spec: { dump: "_jee_con.json", fixes: [{ prefix, stem?: [[from,to],...], solution?, subtopic? }] }
 *  - stem: each `from` must occur exactly once in the LIVE text (or `to` already present = done).
 *          The fixed text goes into paper.stemOverrides[num]; the DB row is then rewritten by
 *          `scripts/jee/resync.ts <paper> --only=<nums> --apply` (the pipeline's own path —
 *          it recomputes content_hash from the override).
 *  - solution: paper.authoredSolutions[num] (wins over source on any attach-solutions re-run) + DB.
 *  - subtopic: paper.classification[num].subtopic + DB subtopic_id (subtopic created in the
 *          row's chapter if missing).
 * Dry run by default. Idempotent: a second --apply reports nothing to do.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { execFileSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../../../src/lib/text/normalizeNewlines";
require("dotenv").config({ path: path.join(process.cwd(), ".env.local"), override: true });

export type Fix = { prefix: string; stem?: [string, string][]; solution?: string; subtopic?: string; answer?: "A" | "B" | "C" | "D"; options?: Partial<Record<"A" | "B" | "C" | "D", string>> };
export type Spec = { dump: string; fixes: Fix[] };
const specPath = path.resolve(process.argv[2]);
const spec: Spec = specPath.endsWith(".ts") ? require(specPath).default : JSON.parse(fs.readFileSync(specPath, "utf8"));
const apply = process.argv.includes("--apply");
const dump = JSON.parse(fs.readFileSync(path.join("generated-papers", spec.dump), "utf8"));
const PAPERS = "scripts/jee/papers";
const CTRL = /[\x00-\x08\x0b\x0c\x0e-\x1f]/;

const bySource = new Map<string, string>();
for (const f of fs.readdirSync(PAPERS).filter((f) => f.endsWith(".json"))) {
  bySource.set(JSON.parse(fs.readFileSync(path.join(PAPERS, f), "utf8")).sourceFile, f);
}
const papers = new Map<string, { raw: string; data: any; dirty: boolean }>();
function paper(file: string) {
  if (!papers.has(file)) {
    const raw = fs.readFileSync(path.join(PAPERS, file), "utf8");
    papers.set(file, { raw, data: JSON.parse(raw), dirty: false });
  }
  return papers.get(file)!;
}

async function main() {
  const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const resync = new Map<string, Set<string>>();
  for (const f of spec.fixes) {
    const matches = dump.questions.filter((q: any) => q.id.startsWith(f.prefix));
    if (matches.length !== 1) throw new Error(`${f.prefix}: ${matches.length} dump rows`);
    const { data: q, error } = await sb.from("questions")
      .select("id,text,solution,source_file,question_number,chapter_id,subtopic_id").eq("id", matches[0].id).single();
    if (error) throw error;
    const file = bySource.get(q.source_file);
    if (!file) throw new Error(`${f.prefix}: no paper json for ${q.source_file}`);
    const p = paper(file);
    const num = String(q.question_number);
    const tag = `${f.prefix} ${file}#${num}`;

    if (f.stem) {
      let text = q.text as string;
      for (const [from, to] of f.stem) {
        if (CTRL.test(to)) throw new Error(`${tag}: control char in stem fix`);
        if (text.includes(to)) continue;
        const n = text.split(from).length - 1;
        if (n === 1) text = text.replace(from, () => to);
        else throw new Error(`${tag}: stem 'from' found ${n} times: ${from}`);
      }
      const cur = p.data.stemOverrides?.[num];
      if (text === q.text && cur === text) console.log(`${tag} stem: nothing to do`);
      else {
        console.log(`${tag} stem → override${text === q.text ? " (DB already fixed; recording)" : ""}`);
        p.data.stemOverrides = { ...(p.data.stemOverrides ?? {}), [num]: text };
        p.dirty = true;
        if (!resync.has(file)) resync.set(file, new Set());
        resync.get(file)!.add(num);
      }
    }

    if (f.options) {
      const { data: opts } = await sb.from("options").select("label,text").eq("question_id", q.id);
      const cur = Object.fromEntries(opts!.map((o: any) => [o.label, o.text]));
      const have = p.data.optionOverrides?.[num] ?? {};
      const todo = Object.entries(f.options).filter(([l, t]) => cur[l] !== t || have[l] !== t);
      for (const [, t] of todo) if (CTRL.test(t as string)) throw new Error(`${tag}: control char in option`);
      if (!todo.length) console.log(`${tag} options: nothing to do`);
      else {
        console.log(`${tag} options ${todo.map(([l, t]) => `${l}: ${cur[l]} → ${t}`).join(" | ")}`);
        p.data.optionOverrides = { ...(p.data.optionOverrides ?? {}), [num]: { ...have, ...f.options } };
        p.dirty = true;
        if (!resync.has(file)) resync.set(file, new Set());
        resync.get(file)!.add(num);
      }
    }

    if (f.answer) {
      const { data: opts } = await sb.from("options").select("label,is_correct").eq("question_id", q.id);
      const cur = opts!.find((o: any) => o.is_correct)?.label;
      if (cur === f.answer && p.data.answerOverrides?.[num] === f.answer) console.log(`${tag} answer: nothing to do`);
      else {
        console.log(`${tag} answer ${cur} → ${f.answer}`);
        p.data.answerOverrides = { ...(p.data.answerOverrides ?? {}), [num]: f.answer };
        p.dirty = true;
        if (!resync.has(file)) resync.set(file, new Set());
        resync.get(file)!.add(num);
      }
    }

    if (f.solution !== undefined) {
      if (CTRL.test(f.solution)) throw new Error(`${tag}: control char in solution`);
      const sol = normalizeNewlines(f.solution);
      if (q.solution === sol && p.data.authoredSolutions?.[num] === f.solution) console.log(`${tag} solution: nothing to do`);
      else {
        console.log(`${tag} solution → authored`);
        p.data.authoredSolutions = { ...(p.data.authoredSolutions ?? {}), [num]: f.solution };
        p.dirty = true;
        if (apply) {
          const { error: e } = await sb.from("questions").update({ solution: sol }).eq("id", q.id);
          if (e) throw e;
        }
      }
    }

    if (f.subtopic) {
      const cls = p.data.classification?.[num];
      if (!cls) throw new Error(`${tag}: no classification entry`);
      let { data: st } = await sb.from("subtopics").select("id").eq("chapter_id", q.chapter_id).eq("name", f.subtopic).maybeSingle();
      const needDb = !st || st.id !== q.subtopic_id;
      if (cls.subtopic === f.subtopic && !needDb) console.log(`${tag} subtopic: nothing to do`);
      else {
        console.log(`${tag} subtopic ${cls.subtopic} → ${f.subtopic}${st ? "" : " (NEW subtopic)"}`);
        cls.subtopic = f.subtopic;
        p.dirty = true;
        if (apply && needDb) {
          if (!st) {
            const { data: ins, error: e } = await sb.from("subtopics").insert({ chapter_id: q.chapter_id, name: f.subtopic }).select("id").single();
            if (e) throw e;
            st = ins;
          }
          const { error: e } = await sb.from("questions").update({ subtopic_id: st!.id }).eq("id", q.id);
          if (e) throw e;
        }
      }
    }
  }

  if (!apply) return console.log("\ndry run — nothing written");
  for (const [file, p] of papers) {
    if (!p.dirty) continue;
    const out = JSON.stringify(p.data, null, 2) + (p.raw.endsWith("\n") ? "\n" : "");
    fs.writeFileSync(path.join(PAPERS, file), out);
  }
  for (const [file, nums] of resync) {
    const id = file.replace(/\.json$/, "");
    const outp = execFileSync("npx", ["tsx", "scripts/jee/resync.ts", id, `--only=${[...nums].join(",")}`, "--apply"], { encoding: "utf8", shell: true });
    if (/NOT writing|not committed/.test(outp)) throw new Error(`resync ${id} refused:\n${outp}`);
    console.log(`resync ${id} --only=${[...nums].join(",")} ok`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
