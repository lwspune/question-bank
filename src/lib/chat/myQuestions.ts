/**
 * The questions a student has just been working on, for V (2026-10-20).
 *
 * "REMIND OF DOING Q 44 RETRY": V could not tell which question "Q 44" was,
 * since it is told the page and never the screen, and it could not set a
 * reminder. The student had opened that question seven minutes before and
 * saved it themselves the same minute. So:
 *
 * - recent_questions: the questions the student opened in the last few hours
 *   (their own user_activity), newest first, with how each went. V asks
 *   whether the one they mean is the first, quoting its start.
 * - save_question: saves one to /saved, the site's own "keep for later". V
 *   offers this whenever a student asks to be reminded.
 *
 * Both read and write only through the student's own login (wired in the
 * route); signed out they say "sign in" and touch nothing. The tool list is
 * part of V's cached prompt, so both are always offered.
 *
 * Pure. Spec: tests/chat-my-questions.test.ts.
 */
import type { VTool } from "./anthropic";

export type RecentActivity = {
  questionId: string;
  kind: "question_practiced" | "answer_wrong" | "question_bookmarked";
  at: string;
  /** question_practiced only: right or wrong when an option was picked, absent when the answer was just shown. */
  correct?: boolean;
};

export type RecentEntry = { id: string; at: string; outcome: "right" | "wrong" | "seen"; saved: boolean };
export type RecentQuestion = RecentEntry & { snippet: string; where: string };

export type SaveResult = { kind: "saved" } | { kind: "limit"; message: string } | { kind: "missing" };

export type MyQuestionDeps = {
  signedIn: boolean;
  now: () => Date;
  loadRecent: () => Promise<RecentQuestion[]>;
  save: (questionId: string) => Promise<SaveResult>;
};

/** How far back "the question I just did" reaches. */
export const RECENT_HOURS = 3;
export const RECENT_MAX = 5;

/** Each question once, newest first: wrong if any answer was wrong, right if one was right, else seen. */
export function recentQuestionList(acts: readonly RecentActivity[], max = RECENT_MAX): RecentEntry[] {
  const byId = new Map<string, RecentEntry>();
  for (const a of acts) {
    const e = byId.get(a.questionId) ?? { id: a.questionId, at: a.at, outcome: "seen" as const, saved: false };
    if (a.at > e.at) e.at = a.at;
    if (a.kind === "question_bookmarked") e.saved = true;
    if (a.kind === "answer_wrong" || a.correct === false) e.outcome = "wrong";
    else if (a.correct === true && e.outcome === "seen") e.outcome = "right";
    byId.set(a.questionId, e);
  }
  return [...byId.values()].sort((x, y) => y.at.localeCompare(x.at)).slice(0, max);
}

const OUTCOME: Record<RecentEntry["outcome"], string> = {
  right: "answered right",
  wrong: "answered wrong",
  seen: "answer seen, no option picked",
};

function ago(at: string, now: Date): string {
  const min = Math.max(0, Math.round((now.getTime() - new Date(at).getTime()) / 60_000));
  return min < 60 ? `${min} min ago` : `${Math.round(min / 60)} h ago`;
}

export function formatRecent(list: readonly RecentQuestion[], now: Date): string {
  if (list.length === 0) {
    return `No question opened in the last ${RECENT_HOURS} hours. Ask them to open it on the site and tap Ask V on it, or to paste it.`;
  }
  const lines = list.map(
    (q, i) => `${i + 1}. ${q.id} | ${q.where} | ${ago(q.at, now)} | ${OUTCOME[q.outcome]}${q.saved ? " | saved" : ""} | starts: ${q.snippet}`
  );
  return `The questions this student opened lately, newest first:\n${lines.join("\n")}\nAsk whether the one they mean is the first, quoting its start; to explain one, use its id.`;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SIGN_IN = "The student is signed out: tell them to sign in (free) so V can see and save their questions.";

export function myQuestionTools(d: MyQuestionDeps): VTool[] {
  return [
    {
      name: "recent_questions",
      description:
        "List the questions this student opened in the last few hours, newest first, with how each went. Use when they mean a question on their screen ('this question', 'Q 44', 'the one I just did') or want to retry or save one.",
      input_schema: { type: "object", properties: {} },
      run: async () => {
        if (!d.signedIn) return SIGN_IN;
        return formatRecent(await d.loadRecent(), d.now());
      },
    },
    {
      name: "save_question",
      logResult: true,
      description:
        "Save a question to the student's saved list (/saved), to come back to later. Use when they ask to be reminded, to retry later, or to keep a question.",
      input_schema: {
        type: "object",
        properties: { question_id: { type: "string", description: "The question's id, from recent_questions or the question named at the end." } },
        required: ["question_id"],
      },
      run: async (input) => {
        if (!d.signedIn) return SIGN_IN;
        const id = (input as { question_id?: unknown } | null)?.question_id;
        if (typeof id !== "string" || !UUID_RE.test(id)) return "That is not a question id. Call recent_questions first and use an id it gives.";
        const r = await d.save(id);
        if (r.kind === "limit") return `It could not be saved: ${r.message} Say so kindly; the Premium Pass at /pricing has no limit.`;
        if (r.kind === "missing") return "That question could not be found. Call recent_questions and check the id.";
        return "Saved. Tell them it is waiting at /saved, where they can retry it any time. V cannot send reminders.";
      },
    },
  ];
}
