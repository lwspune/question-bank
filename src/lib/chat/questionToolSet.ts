/**
 * V's question tools (2026-10-19, study-partner Phase 1), over injected data
 * sources so the rules are tested without a database (lib/chat/questionToolsServer.ts
 * wires the real ones):
 *
 * - get_question: a hint. The question and its solution's first step, no key.
 * - explain_question: the key and the whole stored solution, after the
 *   free-answer check. Refused, with nothing given away, past the day's free
 *   answers or to a signed-out visitor.
 * - similar_question: another question from the same subtopic, handed to the
 *   chat window as a card the student answers there. V never sees its answer.
 * - find_question: pasted text matched to the bank. The best match is offered
 *   to the student as a card to confirm. On 2026-10-19 a silent pick would have
 *   explained the WRONG question, so V never explains a match on its own.
 *
 * Spec: tests/chat-question-toolset.test.ts.
 */
import type { VTool } from "./anthropic";
import { explainView, hintView, type RevealCheck, type VQuestion } from "./questionTools";

export type QuestionMatch = { id: string; snippet: string; where: string };

export type QuestionToolDeps = {
  loadQuestion: (id: string) => Promise<VQuestion | null>;
  /** null: signed out, so no explanation. */
  spendReveal: ((id: string) => Promise<RevealCheck>) | null;
  loadSimilar: (q: VQuestion) => Promise<string | null>;
  /** Matched within the page's chapter when there is one (a paste usually comes from the page it is on). */
  searchQuestions: (text: string, chapterId: string | null) => Promise<QuestionMatch[]>;
  /** The chapter of the page the student asked from, set by loadVContext. */
  pageChapterId?: string | null;
  /** The route collects these for the chat window. */
  onSimilar: (id: string) => void;
  /** A pasted question's best match, offered as a card to confirm. */
  onMatch: (id: string) => void;
  onExplained: (id: string) => void;
  /**
   * Files a slip V spotted in OUR solution as a question report (2026-10-23), one open per question.
   * Absent where nothing may be filed (V's test runner): report_solution_issue is then not offered.
   */
  reportSolution?: (id: string, issue: string) => Promise<"filed" | "already" | "failed">;
};

const ISSUE_MAX = 500;
const SLIP_GUIDANCE =
  "In your reply, explain with the correct working, add at most one short line saying the solution has a small mistake that will be fixed, and never say the answer is wrong.";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NOT_FOUND = "Question not found. Ask the student to tap Ask V on the question again.";
const LETTERS = new Set(["A", "B", "C", "D", "E"]);

function idOf(input: unknown): string | null {
  const id = (input as { question_id?: unknown } | null)?.question_id;
  return typeof id === "string" && UUID_RE.test(id) ? id : null;
}

const ID_SCHEMA = {
  type: "object",
  properties: { question_id: { type: "string", description: "The question's id, as given at the end of the instructions or by find_question." } },
  required: ["question_id"],
};

export function questionTools(d: QuestionToolDeps): VTool[] {
  async function load(input: unknown): Promise<VQuestion | null> {
    const id = idOf(input);
    return id ? d.loadQuestion(id) : null;
  }

  return [
    {
      name: "get_question",
      logResult: true,
      description:
        "Read the question for a HINT: its text, options and the first step of its solution, without the answer. Use when the student wants a hint, or to see the question before asking hint or full solution.",
      input_schema: ID_SCHEMA,
      run: async (input) => {
        const q = await load(input);
        return q ? hintView(q) : NOT_FOUND;
      },
    },
    {
      name: "explain_question",
      logResult: true,
      description:
        "Read the question's correct answer and whole solution, to explain it. Uses one of the student's free answers for the day. Use only when the student wants the full solution or the answer.",
      input_schema: {
        type: "object",
        properties: {
          ...ID_SCHEMA.properties,
          chose: { type: "string", description: "The option letter the student picked, if they said or it is given at the end." },
          entered: { type: "number", description: "The number the student entered on a numeric question, if they said or it is given at the end." },
        },
        required: ["question_id"],
      },
      run: async (input) => {
        const q = await load(input);
        if (!q) return NOT_FOUND;
        if (!d.spendReveal) return "The student is signed out: tell them to sign in (free) to get explanations, and give no answer.";
        const check = await d.spendReveal(q.id);
        if (check.kind === "limit") {
          return `The student has used today's ${check.limit} free answers. Tell them kindly, give no answer or hint, and say the Premium Pass at /pricing gives unlimited answers.`;
        }
        d.onExplained(q.id);
        const raw = (input as { chose?: unknown }).chose;
        const chose = typeof raw === "string" && LETTERS.has(raw.toUpperCase()) ? raw.toUpperCase() : null;
        const typed = (input as { entered?: unknown }).entered;
        const entered = typeof typed === "number" && Number.isFinite(typed) ? typed : null;
        return explainView(q, chose, entered);
      },
    },
    {
      name: "similar_question",
      description:
        "Give the student another question from the same subtopic to try, when they ask for one. It is shown to them as a card, which they answer there.",
      input_schema: ID_SCHEMA,
      run: async (input) => {
        const q = await load(input);
        if (!q) return NOT_FOUND;
        const id = await d.loadSimilar(q);
        if (!id) return "There is no other question to try from this subtopic right now. Suggest the chapter's questions page instead.";
        d.onSimilar(id);
        return `A similar question from ${q.subtopic ?? q.chapter} is shown to the student as a card. Do not describe it: a few words such as "Here is one to try." are enough. You do not know its answer, so give none.`;
      },
    },
    {
      name: "find_question",
      logResult: true,
      description:
        "Find a question in the bank from text the student pasted or typed out. The best match is shown to the student as a card to confirm.",
      input_schema: {
        type: "object",
        properties: { text: { type: "string", description: "The question text as the student wrote it." } },
        required: ["text"],
      },
      run: async (input) => {
        const text = (input as { text?: unknown } | null)?.text;
        const matches = typeof text === "string" && text.trim() ? await d.searchQuestions(text, d.pageChapterId ?? null) : [];
        if (matches.length === 0) {
          return "No question in the bank matched. Ask them to open the question on the site and tap Ask V on it.";
        }
        d.onMatch(matches[0].id);
        return `The closest match is shown to the student as a card asking whether it is their question; they tap it to have it explained. Do not explain it yet: ask them to check the card. It reads: ${matches[0].snippet} (${matches[0].where})`;
      },
    },
    ...(d.reportSolution ? [reportTool(d.reportSolution, load)] : []),
  ];
}

/**
 * A slip V spotted in our solution (a typo, a wrong step) while the answer is right: the team hears of it,
 * so the solution is fixed for everyone (owner, 2026-10-23: V told one student "-1 is listed twice").
 */
function reportTool(
  report: NonNullable<QuestionToolDeps["reportSolution"]>,
  load: (input: unknown) => Promise<VQuestion | null>
): VTool {
  return {
    name: "report_solution_issue",
    logResult: true,
    description:
      "Tell the team about a slip in the question's solution (a typo, a wrong step, a value written twice) when its answer is right. Never use it to say the answer is wrong.",
    input_schema: {
      type: "object",
      properties: {
        ...ID_SCHEMA.properties,
        issue: { type: "string", description: "What is wrong in the solution and what it should say, in one sentence." },
      },
      required: ["question_id", "issue"],
    },
    run: async (input) => {
      const raw = (input as { issue?: unknown } | null)?.issue;
      const issue = typeof raw === "string" ? raw.trim() : "";
      if (!issue || issue.length > ISSUE_MAX) return "Say what is wrong in the solution in one sentence, then call this again.";
      const q = await load(input);
      if (!q) return NOT_FOUND;
      const filed = await report(q.id, issue);
      return `${filed === "failed" ? "The note could not be saved." : "Noted for the team to fix."} ${SLIP_GUIDANCE}`;
    },
  };
}
