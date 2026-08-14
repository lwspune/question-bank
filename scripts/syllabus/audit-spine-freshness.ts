/**
 * Is each bank spine still a description of the bank?
 *
 *   npx tsx scripts/syllabus/audit-spine-freshness.ts --subject=chemistry
 *   npx tsx scripts/syllabus/audit-spine-freshness.ts --subject=chemistry --ci
 *
 * A bank spine is a snapshot with the PYQ count baked into each row's name; the
 * corpus moves on every ingest and nothing re-derives it. JEE Chemistry ran eight
 * days showing 149 subtopics / 731 PYQ against a bank holding 202 / 3,455, and it
 * was found by a person doubting a number on the page rather than by any check.
 * This is that check.
 *
 * TRIAGE by default (exits 0). Drift is not automatically a defect: it is the
 * expected state between an ingest and the next spine refresh, and refreshing is
 * a deliberate multi-step operation that renumbers refs and needs its rulings
 * re-committed (see ingest-bank-spine.ts). Failing a build for a condition whose
 * remedy is "run a careful migration" would just train people to skip it.
 * `--ci` opts into a non-zero exit for a caller that wants a gate.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { splitPyqCount } from "../../src/lib/syllabus/summary";
import { bankSubjectNames } from "../../src/lib/syllabus/subjects";
import {
  diffSpine,
  isDrifted,
  missingPyq,
  type SpineEntry,
} from "../lib/spineFreshness";
import { requireSubjectArg } from "./subject-arg";

const EXAMS = ["JEE Mains", "MHT-CET", "NDA"] as const;

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

/** The live corpus, grouped exactly as ingest-bank-spine groups it. */
async function loadBank(
  db: SupabaseClient,
  subject: string,
): Promise<Map<string, SpineEntry[]>> {
  const counts = new Map<string, Map<string, SpineEntry>>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("exams!inner(name),subjects!inner(name),chapters!inner(name),subtopics!inner(name)")
      .in("subjects.name", bankSubjectNames(subject))
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as unknown as {
      exams: { name: string };
      chapters: { name: string };
      subtopics: { name: string };
    }[];
    for (const r of batch) {
      const exam = r.exams?.name ?? "";
      if (!(EXAMS as readonly string[]).includes(exam)) continue;
      const chapter = r.chapters?.name;
      const subtopic = r.subtopics?.name;
      if (!chapter || !subtopic) continue;
      const per = counts.get(exam) ?? new Map<string, SpineEntry>();
      counts.set(exam, per);
      const k = `${chapter}\t${subtopic}`;
      const hit = per.get(k);
      if (hit) hit.pyq += 1;
      else per.set(k, { chapter, subtopic, pyq: 1 });
    }
    if (batch.length < 1000) break;
  }
  return new Map([...counts].map(([exam, per]) => [exam, [...per.values()]]));
}

async function loadSpines(
  db: SupabaseClient,
  subject: string,
): Promise<Map<string, SpineEntry[]>> {
  const out = new Map<string, SpineEntry[]>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("syllabus_concepts")
      .select("source,chapter_name,concept")
      .eq("subject", subject)
      .like("source", "%bank taxonomy")
      .order("id", { ascending: true })
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const rows = (data ?? []) as unknown as {
      source: string;
      chapter_name: string;
      concept: string;
    }[];
    for (const r of rows) {
      const exam = r.source.replace(/ bank taxonomy$/, "");
      const { name, pyq } = splitPyqCount(r.concept);
      (out.get(exam) ?? out.set(exam, []).get(exam)!).push({
        chapter: r.chapter_name,
        subtopic: name,
        pyq,
      });
    }
    if (rows.length < 1000) break;
  }
  return out;
}

async function main() {
  const cfg = requireSubjectArg(process.argv);
  const ci = process.argv.includes("--ci");
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("service-role env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const [bank, spines] = await Promise.all([loadBank(db, cfg.subject), loadSpines(db, cfg.subject)]);

  console.log(`\n=== spine freshness — ${cfg.label} ===\n`);
  let drifted = 0;

  for (const exam of EXAMS) {
    const spine = spines.get(exam);
    const live = bank.get(exam) ?? [];
    if (!spine) {
      // Absent is not stale: plenty of (subject, exam) pairs have no spine yet,
      // and reporting that as drift would bury the pairs that do.
      if (live.length) console.log(`  ${exam.padEnd(10)} no spine for this subject (bank has ${live.length})`);
      continue;
    }
    const drift = diffSpine(spine, live);
    if (!isDrifted(drift)) {
      console.log(`  ${exam.padEnd(10)} OK — ${spine.length} subtopics match the bank`);
      continue;
    }
    drifted += 1;
    console.log(
      `  ${exam.padEnd(10)} DRIFTED — spine ${spine.length} subtopics, bank ${live.length}`,
    );
    if (drift.missing.length) {
      console.log(
        `      ${drift.missing.length} in the bank, NOT in the spine (${missingPyq(drift)} PYQ) — these render nowhere:`,
      );
      for (const m of [...drift.missing].sort((a, b) => b.pyq - a.pyq).slice(0, 10)) {
        console.log(`        ${String(m.pyq).padStart(4)}  ${m.subtopic}  [${m.chapter}]`);
      }
      if (drift.missing.length > 10) console.log(`        … ${drift.missing.length - 10} more`);
    }
    if (drift.stale.length) {
      console.log(`      ${drift.stale.length} in the spine, gone from the bank (rulings at risk):`);
      for (const s of drift.stale.slice(0, 10)) {
        console.log(`        ${s.subtopic}  [${s.chapter}]`);
      }
    }
    if (drift.changed.length) {
      console.log(`      ${drift.changed.length} PYQ count(s) stale — these ORDER the gap list`);
      for (const c of [...drift.changed]
        .sort((a, b) => Math.abs(b.bankPyq - b.spinePyq) - Math.abs(a.bankPyq - a.spinePyq))
        .slice(0, 5)) {
        console.log(`        ${c.spinePyq} -> ${c.bankPyq}  ${c.subtopic}  [${c.chapter}]`);
      }
      if (drift.changed.length > 5) console.log(`        … ${drift.changed.length - 5} more`);
    }
  }

  if (drifted) {
    console.log(
      `\n${drifted} spine(s) drifted. Refresh is a MIGRATION, not a re-run — see the\n` +
        `procedure in scripts/syllabus/ingest-bank-spine.ts before applying anything.`,
    );
  } else {
    console.log("\nAll spines match the bank.");
  }
  if (ci && drifted) process.exit(1);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
