/**
 * List the questions the "beat the crowd" message COULD fire on but cannot yet,
 * because no person has checked them: pooled attempted >= 20, wrong share >=
 * 70%, and no review in a crowd run (lib/celebrate/crowd CROWD_REVIEW_RUNS).
 * Each comes with stem, options, key, the crowd's picks and the stored
 * solution, for a by-hand key check. Read-only. `-- --all` includes the
 * questions already reviewed.
 *
 *   npm run itemstats:crowd-candidates > generated-papers/crowd-candidates.md
 *
 * A question most students get wrong is where wrong keys hide, so the message
 * stays off a question until it is checked. Record a run the way
 * scripts/reviews/apply-crowd-hard-fixes.ts did, and add its label to
 * CROWD_REVIEW_RUNS.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { CROWD_MIN_ATTEMPTS, CROWD_REVIEW_RUNS } from "../../src/lib/celebrate/crowd";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const MIN_N = CROWD_MIN_ATTEMPTS;
const ALL = process.argv.includes("--all");
const MIN_WRONG = 0.7;

type Stat = { question_id: string; attempted: number; correct: number; choice_counts: Record<string, number> | null; measured_content_hash: string | null };

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const stats: Stat[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("question_item_stats")
      .select("question_id, attempted, correct, choice_counts, measured_content_hash")
      .range(from, from + 999);
    if (error) throw error;
    stats.push(...((data ?? []) as Stat[]));
    if ((data ?? []).length < 1000) break;
  }

  const pooled = new Map<string, { a: number; c: number; picks: Record<string, number>; hashes: Set<string> }>();
  for (const s of stats) {
    const p = pooled.get(s.question_id) ?? { a: 0, c: 0, picks: {}, hashes: new Set<string>() };
    p.a += s.attempted ?? 0;
    p.c += s.correct ?? 0;
    for (const [k, v] of Object.entries(s.choice_counts ?? {})) p.picks[k.toUpperCase()] = (p.picks[k.toUpperCase()] ?? 0) + Number(v);
    if (s.measured_content_hash) p.hashes.add(s.measured_content_hash);
    pooled.set(s.question_id, p);
  }
  const reviewed = new Set<string>();
  if (!ALL) {
    const { data, error } = await db.from("question_reviews").select("question_id").in("run_label", [...CROWD_REVIEW_RUNS]);
    if (error) throw error;
    for (const r of data ?? []) reviewed.add((r as { question_id: string }).question_id);
  }
  const hard = [...pooled].filter(([id, p]) => p.a >= MIN_N && 1 - p.c / p.a >= MIN_WRONG && !reviewed.has(id));
  hard.sort((x, y) => x[1].c / x[1].a - y[1].c / y[1].a);

  const ids = hard.map(([id]) => id);
  const rows = new Map<string, any>();
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await db
      .from("questions")
      .select(
        "id, text, context, solution, image_url, content_hash, question_format, question_kind, pyq_year, pyq_month, pyq_note, source_file, derived_model, exam:exams(name), subject:subjects(name), chapter:chapters(name), options(label, text, is_correct, image_url)"
      )
      .in("id", ids.slice(i, i + 100));
    if (error) throw error;
    for (const r of data ?? []) rows.set((r as any).id, r);
  }

  console.log(`# Crowd-hard questions${ALL ? "" : " not yet reviewed"}: n>=${MIN_N}, wrong>=${MIN_WRONG * 100}% — ${hard.length}\n`);
  let i = 0;
  for (const [id, p] of hard) {
    const r = rows.get(id);
    i++;
    if (!r) {
      console.log(`## ${i}. ${id} — ROW NOT READABLE\n`);
      continue;
    }
    const opts = [...r.options].sort((a: any, b: any) => a.label.localeCompare(b.label));
    const key = opts.filter((o: any) => o.is_correct).map((o: any) => o.label).join(",");
    const stale = p.hashes.size > 0 && !p.hashes.has(r.content_hash);
    const picks = Object.entries(p.picks)
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}=${v}`)
      .join(" ");
    console.log(
      `## ${i}. ${id.slice(0, 8)} · ${r.exam?.name} · ${r.subject?.name} · ${r.chapter?.name} · ${r.pyq_year ?? ""} ${r.pyq_month ?? ""} ${r.question_kind}`
    );
    console.log(
      `id ${id} · n=${p.a} right=${p.c} (${Math.round((100 * p.c) / p.a)}%) · KEY=${key} · picks ${picks}${stale ? " · STALE(stats measured on an older version)" : ""}${r.image_url ? " · HAS IMAGE" : ""}${opts.some((o: any) => o.image_url) ? " · OPTION IMAGES" : ""}`
    );
    console.log(`note: ${r.pyq_note ?? ""} · model: ${r.derived_model ?? ""} · file: ${r.source_file ?? ""}`);
    if (r.context) console.log(`CONTEXT: ${r.context}`);
    console.log(`Q: ${r.text}`);
    for (const o of opts) console.log(`  ${o.label}${o.is_correct ? "*" : " "} ${o.text}`);
    console.log(`SOL: ${(r.solution ?? "").slice(0, 700)}\n`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
