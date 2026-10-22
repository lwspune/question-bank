/**
 * V's test runner, pure core (V_SPEC.md, 2026-10-22).
 *
 * A test case is a real message a student sent V, stored in v_eval_cases
 * (migration 0176) with the job it belongs to and what a good reply must do.
 * The runner (scripts/chat/eval/run.ts) replays it through V's real code and
 * this file decides:
 *   parseExpect  what a case expects, validated so a typo cannot check nothing
 *   checkReply   the automatic checks: tools called, tappable links, wording
 *   scoreByJob   pass counts per job, automatic and marked by a person
 *   compareRuns  which cases changed since the last run
 *
 * Automatic checks only cover what a machine can tell. Whether an explanation
 * is right, or a tone kind, is marked by a person reading the report
 * (`judge: true` asks for that); marking happens in a Claude Code session,
 * never through a paid grader model (owner, 2026-10-22).
 *
 * Spec: tests/v-eval.test.ts.
 */

/** The student's jobs, in report order. `chat` = greetings, off-topic, gibberish. */
export const V_JOBS = [
  "find",
  "explain_question",
  "explain_concept",
  "practise",
  "plan",
  "reflect",
  "help",
  "chat",
] as const;
export type VJob = (typeof V_JOBS)[number];

export type VExpect = {
  /** Each must be called. */
  tools?: string[];
  /** None may be called. */
  noTools?: string[];
  /** At least one must be called. */
  anyTool?: string[];
  /** Each must be a tappable link in the reply. */
  links?: string[];
  /** At least one must be. */
  anyLink?: string[];
  /** The reply may carry no tappable link. */
  noLinks?: boolean;
  /** Case-insensitive patterns the reply must match. */
  say?: string[];
  /** Case-insensitive patterns it must not match. */
  notSay?: string[];
  maxChars?: number;
  /** A person must read the reply (correctness, tone). Never fails on its own. */
  judge?: boolean;
};

export type VRunOutput = { reply: string; links: string[]; tools: string[] };
export type CheckResult = { pass: boolean; failures: string[] };

const LIST_KEYS = ["tools", "noTools", "anyTool", "links", "anyLink", "say", "notSay"] as const;
const PATH_KEYS = new Set(["links", "anyLink"]);
const PATTERN_KEYS = new Set(["say", "notSay"]);
const KNOWN = new Set<string>([...LIST_KEYS, "noLinks", "maxChars", "judge"]);
const PATH_RE = /^\/[A-Za-z0-9/_.~-]*$/;

export function parseExpect(raw: unknown): { ok: true; value: VExpect } | { ok: false; error: string } {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { ok: false, error: "not an object" };
  const obj = raw as Record<string, unknown>;
  for (const key of Object.keys(obj)) {
    if (!KNOWN.has(key)) return { ok: false, error: `unknown key: ${key}` };
  }
  for (const key of LIST_KEYS) {
    const v = obj[key];
    if (v === undefined) continue;
    if (!Array.isArray(v) || v.length === 0 || !v.every((s) => typeof s === "string" && s.length > 0)) {
      return { ok: false, error: `${key}: a non-empty list of strings` };
    }
    for (const s of v as string[]) {
      if (PATH_KEYS.has(key) && !PATH_RE.test(s)) return { ok: false, error: `${key}: not a site path: ${s}` };
      if (PATTERN_KEYS.has(key)) {
        try {
          new RegExp(s, "i");
        } catch {
          return { ok: false, error: `${key}: bad pattern: ${s}` };
        }
      }
    }
  }
  for (const key of ["noLinks", "judge"]) {
    if (obj[key] !== undefined && typeof obj[key] !== "boolean") return { ok: false, error: `${key}: true or false` };
  }
  if (obj.maxChars !== undefined && !(Number.isInteger(obj.maxChars) && (obj.maxChars as number) > 0)) {
    return { ok: false, error: "maxChars: a positive whole number" };
  }
  return { ok: true, value: obj as VExpect };
}

/** Checks every case gets: V's own rule 11 (plain text, no em dashes) and a reply at all. */
function globalFailures(reply: string): string[] {
  if (reply.trim() === "") return ["empty reply"];
  const out: string[] = [];
  if (/\]\(\//.test(reply)) out.push("markdown link");
  if (reply.includes("—")) out.push("em dash");
  return out;
}

export function checkReply(expect: VExpect, run: VRunOutput): CheckResult {
  const failures = globalFailures(run.reply);
  const called = new Set(run.tools);
  const links = new Set(run.links);
  for (const t of expect.tools ?? []) if (!called.has(t)) failures.push(`tool not called: ${t}`);
  for (const t of expect.noTools ?? []) if (called.has(t)) failures.push(`tool called: ${t}`);
  if (expect.anyTool && !expect.anyTool.some((t) => called.has(t))) {
    failures.push(`none of these tools called: ${expect.anyTool.join(", ")}`);
  }
  for (const l of expect.links ?? []) if (!links.has(l)) failures.push(`link missing: ${l}`);
  if (expect.anyLink && !expect.anyLink.some((l) => links.has(l))) {
    failures.push(`none of these links: ${expect.anyLink.join(", ")}`);
  }
  if (expect.noLinks && run.links.length > 0) failures.push(`has links: ${run.links.join(", ")}`);
  for (const p of expect.say ?? []) if (!new RegExp(p, "i").test(run.reply)) failures.push(`does not say: ${p}`);
  for (const p of expect.notSay ?? []) if (new RegExp(p, "i").test(run.reply)) failures.push(`says: ${p}`);
  if (expect.maxChars !== undefined && run.reply.length > expect.maxChars) {
    failures.push(`longer than ${expect.maxChars} characters (${run.reply.length})`);
  }
  return { pass: failures.length === 0, failures };
}

/** `pass`: passed the automatic checks and was not marked fail by the person reading it. */
export type JobScore = { job: VJob; cases: number; autoPass: number; marked: number; markedPass: number; pass: number };

export function scoreByJob(rows: readonly { job: VJob; autoPass: boolean; mark: "pass" | "fail" | null }[]): JobScore[] {
  return V_JOBS.map((job) => {
    const mine = rows.filter((r) => r.job === job);
    return {
      job,
      cases: mine.length,
      autoPass: mine.filter((r) => r.autoPass).length,
      marked: mine.filter((r) => r.mark !== null).length,
      markedPass: mine.filter((r) => r.mark === "pass").length,
      pass: mine.filter((r) => r.autoPass && r.mark !== "fail").length,
    };
  }).filter((s) => s.cases > 0);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const QUESTION_TOOLS = new Set(["explain_question", "get_question"]);

/**
 * The question a stored message was about, for replaying it as an Ask V tap.
 * Since migration 0174 the row says so; before it, the question tool V called
 * names it. The pick comes from the message Ask V writes ("I picked (C). ...").
 */
export function askedOf(row: {
  message: string;
  askedQuestionId: string | null;
  toolCalls: readonly { name: string; input: unknown }[] | null;
}): { id: string; chose: string | null } | null {
  let id = row.askedQuestionId;
  if (!id) {
    for (const t of row.toolCalls ?? []) {
      const qid = (t.input as { question_id?: unknown } | null)?.question_id;
      if (QUESTION_TOOLS.has(t.name) && typeof qid === "string" && UUID_RE.test(qid)) {
        id = qid;
        break;
      }
    }
  }
  if (!id) return null;
  const pick = /^I picked \(([A-E])\)\./.exec(row.message);
  return { id, chose: pick ? pick[1] : null };
}

export function compareRuns(
  prev: ReadonlyMap<string, { autoPass: boolean }>,
  cur: readonly { caseId: string; autoPass: boolean }[]
): { newlyFailing: string[]; newlyPassing: string[]; newCases: string[] } {
  const out = { newlyFailing: [] as string[], newlyPassing: [] as string[], newCases: [] as string[] };
  for (const c of cur) {
    const p = prev.get(c.caseId);
    if (!p) out.newCases.push(c.caseId);
    else if (p.autoPass && !c.autoPass) out.newlyFailing.push(c.caseId);
    else if (!p.autoPass && c.autoPass) out.newlyPassing.push(c.caseId);
  }
  return out;
}
