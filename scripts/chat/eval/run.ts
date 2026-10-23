/**
 * Replay V's test cases through V's real code and model, check every reply,
 * store the run and write a report to read and mark (V_SPEC.md, migration 0176).
 *
 *   npm run v:eval                       every active case (SPENDS money: ~$0.0005 a case)
 *   npm run v:eval -- --case=a1b2,9e9e   only the cases whose id starts so: re-test a change on
 *                                        the cases it touches before running them all
 *   npm run v:eval -- --job=find         one job
 *   npm run v:eval -- --limit=10         the first N cases
 *   npm run v:eval -- --label="rule 7"   names the run in the report and the table
 *   npm run v:eval -- --dry              lists the cases, calls nothing, stores nothing
 *   npm run v:eval -- --recheck          re-applies the cases' current checks to the latest
 *                                        run's stored replies (--run=<id>): free, no model call
 *
 * The answer goes through lib/chat/answer.ts, the function the live route
 * uses, with V's live settings (explanations, plans). What it cannot replay it
 * stands in for, and the stand-ins WRITE NOTHING: a reveal is always allowed,
 * a plan or a save is kept in memory, the student has no results yet
 * and their recent questions empty. So a reflect case tests that V asks for
 * the results, not what it says about them.
 *
 * Report: generated-papers/v-eval/<date>-<run>.md (gitignored: it holds student
 * messages). It lists the score per job, what changed since the last run, the
 * automatic failures, and the replies a person must read (`judge`). Marks go
 * back with scripts/chat/eval/mark.ts. Needs ANTHROPIC_API_KEY in .env.local.
 *
 * NOT batched (tried 2026-10-23): Message Batches are half price, but a
 * batch's requests did not read the prompt cache, so each wrote V's 8,400-token
 * instructions afresh. The 41 find cases cost $0.053 batched against $0.021
 * here, where 4 cases at a time share the cache.
 */
import "../../lib/serverOnly";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { answerWithV, type VContextOptions } from "../../../src/lib/chat/answer";
import { readChatSettings } from "../../../src/lib/chat/settingsAdmin";
import { readExamStrategyUncached } from "../../../src/lib/chat/examStrategyServer";
import { loadExamCatalogPayload, shapeExamCatalog } from "../../../src/lib/exam/allExamStats";
import { getNotesExamGroups } from "../../../src/lib/notes/notesNav";
import { readChapterLandingsUncached } from "../../../src/lib/questions/landing";
import { readSubtopicIndexUncached, withSubtopics } from "../../../src/lib/chat/subtopicIndex";
import { loadSimilarId, loadVQuestion, searchVQuestions } from "../../../src/lib/chat/questionToolsServer";
import { conceptSources } from "../../../src/lib/chat/conceptSearchServer";
import { aiAnswerCostUsd } from "../../../src/lib/chat/interactions";
import type { ModelTurn } from "../../../src/lib/chat/conversation";
import type { SavedPlan } from "../../../src/lib/chat/weekPlan";
import { buildPerformance } from "../../../src/lib/performance/compute";
import { EMPTY_PERFORMANCE } from "../../../src/lib/performance/types";
import { checkReply, compareRuns, parseExpect, pickCases, scoreByJob, V_JOBS, type VJob } from "../../lib/vEval";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Case = {
  id: string;
  job: VJob;
  message: string;
  page_path: string | null;
  signed_in: boolean;
  profile_exams: string[];
  asked_question_id: string | null;
  asked_chose: string | null;
  history: ModelTurn[];
  reply_to: string | null;
  expect: unknown;
  good_reply: string;
};

type Result = {
  c: Case;
  reply: string;
  links: string[];
  tools: string[];
  toolCalls: unknown;
  failures: string[];
  autoPass: boolean;
  judge: boolean;
  cost: number;
};

const CONCURRENCY = 4;
const ZERO_SPAN = { answered: 0, right: 0, revealed: 0 };

function arg(name: string): string | null {
  const a = process.argv.find((x) => x.startsWith(`--${name}=`));
  return a ? a.slice(name.length + 3) : null;
}

function short(s: string, n = 400): string {
  const one = s.replace(/\s+/g, " ").trim();
  return one.length > n ? `${one.slice(0, n)}…` : one;
}

async function main() {
  const dry = process.argv.includes("--dry");
  const job = arg("job");
  const limit = arg("limit") ? Number(arg("limit")) : Infinity;
  const label = arg("label");
  if (job && !V_JOBS.includes(job as VJob)) throw new Error(`--job: one of ${V_JOBS.join(", ")}`);

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

  if (process.argv.includes("--recheck")) {
    await recheckRun(admin, arg("run"));
    return;
  }

  let q = admin.from("v_eval_cases").select("*").eq("active", true).order("created_at");
  if (job) q = q.eq("job", job);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  const cases = pickCases((data ?? []) as Case[], arg("case")).slice(0, limit);
  if (dry) {
    for (const c of cases) console.log(`${c.id.slice(0, 8)} ${c.job.padEnd(16)} ${short(c.message, 80)}`);
    console.log(`${cases.length} cases (dry run, nothing called).`);
    return;
  }

  const settings = await readChatSettings(admin);
  // The chapter list is the slow read: once for the whole run.
  const chapters = withSubtopics(await readChapterLandingsUncached(), await readSubtopicIndexUncached());
  // The exam catalogue is day-cached by Next in the app; here it is read once, uncached.
  const catalogPayload = await loadExamCatalogPayload(anon);
  const catalog = shapeExamCatalog(
    new Map(catalogPayload.counts),
    new Map(catalogPayload.ids),
    new Set(getNotesExamGroups().map((g) => g.slug))
  );

  function contextFor(c: Case): VContextOptions {
    let plan: SavedPlan | null = null;
    return {
      loadChapters: async () => chapters,
      loadStrategy: readExamStrategyUncached,
      loadExamCatalog: async () => catalog,
      page: c.page_path,
      signedIn: c.signed_in,
      profileExamSlugs: c.profile_exams,
      question: c.asked_question_id ? { id: c.asked_question_id, chose: c.asked_chose } : null,
      notesBrief: null,
      myQuestions: c.signed_in
        ? { now: () => new Date(), loadRecent: async () => [], save: async () => ({ kind: "saved" as const }) }
        : null,
      questionTools: settings.explainEnabled
        ? {
            loadQuestion: (id) => loadVQuestion(anon, id),
            spendReveal: c.signed_in ? async () => ({ kind: "ok" as const, counts: false }) : null,
            loadSimilar: (vq) => loadSimilarId(anon, vq, []),
            searchQuestions: (text, chapterId) => searchVQuestions(anon, text, chapterId),
            onSimilar: () => {},
            onMatch: () => {},
            onExplained: () => {},
          }
        : null,
      // A signed-in student with no mock results yet, as getOwnPerformance returns one (null means signed out).
      concepts: settings.explainEnabled ? conceptSources(anon) : null,
      loadOwnProgress: c.signed_in
        ? async () => buildPerformance({ userId: "v-eval", ...EMPTY_PERFORMANCE }, new Date())
        : undefined,
      planEnabled: settings.planEnabled,
      plan:
        c.signed_in && settings.planEnabled
          ? {
              now: () => new Date(),
              loadProfile: async () => ({ targetExams: c.profile_exams, examDate: null, weeklyGoal: null }),
              saveExamDate: async () => {},
              loadWeak: async () => [],
              loadDue: async () => 0,
              savePlan: async (p) => {
                plan = p;
              },
              loadPlan: async () => plan,
              loadPlanActivity: async () => ({ drills: 0, mocks: 0, chapterQuestions: {} }),
              onPlan: () => {},
            }
          : null,
      loadOwnPractice: c.signed_in ? async () => ({ today: ZERO_SPAN, week: ZERO_SPAN, all: ZERO_SPAN }) : undefined,
    };
  }

  async function runOne(c: Case): Promise<Result> {
    const parsed = parseExpect(c.expect);
    const expect = parsed.ok ? parsed.value : {};
    const r = await answerWithV({ anon, context: contextFor(c), message: c.message, replyTo: c.reply_to, history: c.history });
    const tools = r.toolCalls.map((t) => t.name);
    const reply = r.ok ? r.reply : "";
    const check = checkReply(expect, { reply, links: r.links, tools });
    const failures = [
      ...(parsed.ok ? [] : [`bad expect: ${parsed.error}`]),
      ...(r.ok ? [] : [`model call failed: ${r.error}`]),
      ...check.failures,
    ];
    return {
      c,
      reply,
      links: r.links,
      tools,
      toolCalls: r.toolCalls,
      failures,
      autoPass: failures.length === 0,
      judge: expect.judge === true,
      cost: aiAnswerCostUsd(r),
    };
  }

  const results: Result[] = [];
  let next = 0;
  async function worker() {
    while (next < cases.length) {
      const c = cases[next++];
      const res = await runOne(c).catch(
        (err): Result => ({
          c,
          reply: "",
          links: [],
          tools: [],
          toolCalls: null,
          failures: [`error: ${err instanceof Error ? err.message : String(err)}`],
          autoPass: false,
          judge: false,
          cost: 0,
        })
      );
      results.push(res);
      console.log(`${results.length}/${cases.length} ${res.autoPass ? "ok  " : "FAIL"} ${c.job.padEnd(16)} ${short(c.message, 60)}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, cases.length) }, worker));
  results.sort((a, b) => cases.indexOf(a.c) - cases.indexOf(b.c));

  // Each case's most recent earlier result, for what changed (a run may have covered one job only).
  const prev = await latestResults(admin, null);
  const changes = compareRuns(
    prev,
    results.map((r) => ({ caseId: r.c.id, autoPass: r.autoPass }))
  );

  const cost = results.reduce((s, r) => s + r.cost, 0);
  let sha: string | null = null;
  try {
    sha = execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    sha = null;
  }
  const { data: runRow, error: runErr } = await admin
    .from("v_eval_runs")
    .insert({ label, git_sha: sha, cases: results.length, cost_usd: Number(cost.toFixed(5)) })
    .select("id")
    .single();
  if (runErr) throw new Error(runErr.message);
  const runId = runRow.id as string;
  const { error: resErr } = await admin.from("v_eval_results").insert(
    results.map((r) => ({
      run_id: runId,
      case_id: r.c.id,
      reply: r.reply,
      links: r.links,
      tool_calls: r.toolCalls,
      failures: r.failures,
      auto_pass: r.autoPass,
      cost_usd: Number(r.cost.toFixed(6)),
    }))
  );
  if (resErr) throw new Error(resErr.message);

  writeReport({ runId, label, sha, cost, results, changes });
}

/** The run's report: score per job, what changed, automatic failures, then the replies a person must read. */
function writeReport(r: {
  runId: string;
  label: string | null;
  sha: string | null;
  cost: number;
  results: Result[];
  changes: ReturnType<typeof compareRuns>;
}) {
  const { runId, label, sha, cost, results, changes } = r;
  const perCase = results.length ? cost / results.length : 0;
  const score = scoreByJob(results.map((x) => ({ job: x.c.job, autoPass: x.autoPass, mark: null })));
  const id8 = (id: string) => id.slice(0, 8);
  const block = (x: Result) =>
    [
      `### ${id8(x.c.id)} · ${x.c.job}${x.c.page_path ? ` · ${x.c.page_path}` : ""}${x.c.signed_in ? "" : " · signed out"}`,
      "",
      `- **Student:** ${short(x.c.message, 600)}`,
      ...(x.c.history.length ? [`- **Earlier in the session:** ${x.c.history.length / 2} exchange(s)`] : []),
      `- **Good reply:** ${x.c.good_reply}`,
      `- **V:** ${short(x.reply, 1200) || "(none)"}`,
      `- **Tools:** ${x.tools.join(", ") || "none"} · **Links:** ${x.links.join(" ") || "none"}`,
      ...(x.failures.length ? [`- **Failed:** ${x.failures.join("; ")}`] : []),
      "",
    ].join("\n");

  const md = [
    `# V test run ${id8(runId)}${label ? `: ${label}` : ""}`,
    "",
    `${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC · commit ${sha ?? "?"} · ${results.length} cases · $${cost.toFixed(4)}, $${perCase.toFixed(5)} a case`,
    "",
    "| Job | Cases | Automatic pass |",
    "|---|---|---|",
    ...score.map((x) => `| ${x.job} | ${x.cases} | ${x.autoPass} (${Math.round((100 * x.autoPass) / x.cases)}%) |`),
    "",
    "## Since the last run",
    "",
    `- Started failing: ${changes.newlyFailing.map(id8).join(", ") || "none"}`,
    `- Started passing: ${changes.newlyPassing.map(id8).join(", ") || "none"}`,
    `- New cases: ${changes.newCases.length}`,
    "",
    "## Automatic failures",
    "",
    ...results.filter((x) => !x.autoPass).map(block),
    "## To read and mark (judge)",
    "",
    ...results.filter((x) => x.autoPass && x.judge).map(block),
  ].join("\n");
  const dir = join(process.cwd(), "generated-papers", "v-eval");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${new Date().toISOString().slice(0, 10)}-${id8(runId)}.md`);
  writeFileSync(file, md);
  console.log(`\nRun ${runId}: ${results.filter((x) => x.autoPass).length}/${results.length} pass automatic checks, $${cost.toFixed(4)}.`);
  console.log(`Report: ${file}`);
}

/** Each case's result in the most recent run before `before` (all runs when null). */
async function latestResults(admin: SupabaseClient, before: string | null): Promise<Map<string, { autoPass: boolean }>> {
  let q = admin.from("v_eval_runs").select("id").order("started_at", { ascending: false }).limit(20);
  if (before) q = q.lt("started_at", before);
  const { data: runs, error } = await q;
  if (error) throw new Error(error.message);
  const out = new Map<string, { autoPass: boolean }>();
  for (const r of runs ?? []) {
    const { data: rows, error: rowsErr } = await admin.from("v_eval_results").select("case_id, auto_pass").eq("run_id", r.id);
    if (rowsErr) throw new Error(rowsErr.message);
    for (const row of rows ?? []) {
      if (!out.has(row.case_id as string)) out.set(row.case_id as string, { autoPass: row.auto_pass as boolean });
    }
  }
  return out;
}

/**
 * --recheck: apply the cases' CURRENT expectations to a stored run's replies
 * (the latest, or --run=<id>), without calling the model. For when an
 * expectation was wrong, not V. Inactive cases are left out of the report.
 */
async function recheckRun(admin: SupabaseClient, runArg: string | null) {
  const { data: runs, error } = await admin
    .from("v_eval_runs")
    .select("id, label, git_sha, cost_usd, started_at")
    .order("started_at", { ascending: false });
  if (error) throw new Error(error.message);
  const idx = runArg ? (runs ?? []).findIndex((x) => (x.id as string).startsWith(runArg)) : 0;
  const run = (runs ?? [])[idx];
  if (!run) throw new Error("no such run");
  const { data: rows, error: rowsErr } = await admin
    .from("v_eval_results")
    .select("case_id, reply, links, tool_calls, failures, auto_pass, cost_usd, v_eval_cases(*)")
    .eq("run_id", run.id);
  if (rowsErr) throw new Error(rowsErr.message);

  const results: Result[] = [];
  let changed = 0;
  for (const row of rows ?? []) {
    const c = row.v_eval_cases as unknown as Case & { active: boolean };
    if (!c.active) continue;
    const parsed = parseExpect(c.expect);
    const expect = parsed.ok ? parsed.value : {};
    const tools = ((row.tool_calls as { name: string }[] | null) ?? []).map((t) => t.name);
    const reply = (row.reply as string | null) ?? "";
    const links = (row.links as string[]) ?? [];
    // A model or runner failure stays a failure: only the expectation checks are redone.
    const kept = ((row.failures as string[]) ?? []).filter((f) => f.startsWith("model call failed") || f.startsWith("error:"));
    const failures = [...(parsed.ok ? [] : [`bad expect: ${parsed.error}`]), ...kept, ...checkReply(expect, { reply, links, tools }).failures];
    const autoPass = failures.length === 0;
    if (autoPass !== row.auto_pass || failures.join("|") !== ((row.failures as string[]) ?? []).join("|")) {
      changed++;
      const { error: upErr } = await admin
        .from("v_eval_results")
        .update({ failures, auto_pass: autoPass })
        .eq("run_id", run.id)
        .eq("case_id", row.case_id);
      if (upErr) throw new Error(upErr.message);
    }
    results.push({ c, reply, links, tools, toolCalls: row.tool_calls, failures, autoPass, judge: expect.judge === true, cost: Number(row.cost_usd) });
  }
  results.sort((a, b) => a.c.job.localeCompare(b.c.job) || a.c.id.localeCompare(b.c.id));

  const prev = await latestResults(admin, run.started_at as string);
  console.log(`Rechecked run ${(run.id as string).slice(0, 8)}: ${changed} verdicts changed.`);
  writeReport({
    runId: run.id as string,
    label: (run.label as string | null) ?? null,
    sha: (run.git_sha as string | null) ?? null,
    cost: Number(run.cost_usd),
    results,
    changes: compareRuns(prev, results.map((x) => ({ caseId: x.c.id, autoPass: x.autoPass }))),
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
