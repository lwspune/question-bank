/**
 * V's test runner (V_SPEC.md, 2026-10-22): the checks a replayed reply must
 * pass, the per-job score and the change since the last run. Pure core
 * scripts/lib/vEval.ts; the runner is scripts/chat/eval/run.ts.
 */
import { describe, it, expect } from "vitest";
import { parseExpect, checkReply, scoreByJob, compareRuns, askedOf, pickCases, V_JOBS } from "../scripts/lib/vEval";

describe("askedOf", () => {
  const Q = "3bb486cc-61fa-47b6-ae1e-4e0d1cf009fa";
  const explain = [{ name: "explain_question", input: { question_id: Q, chose: "B" } }];

  it("takes the stored question and the pick from the Ask V message", () => {
    expect(askedOf({ message: "I picked (C). Explain this question.", askedQuestionId: Q, toolCalls: null })).toEqual({
      id: Q,
      chose: "C",
    });
  });

  it("before migration 0174 the id comes from the question tool V called", () => {
    expect(askedOf({ message: "Explain this question.", askedQuestionId: null, toolCalls: explain })).toEqual({
      id: Q,
      chose: null,
    });
    expect(
      askedOf({ message: "x", askedQuestionId: null, toolCalls: [{ name: "get_question", input: { question_id: Q } }] })
    ).toEqual({ id: Q, chose: null });
  });

  it("no question when neither the row nor a question tool names one", () => {
    expect(askedOf({ message: "Hi", askedQuestionId: null, toolCalls: [{ name: "find_chapters", input: {} }] })).toBeNull();
    expect(askedOf({ message: "Hi", askedQuestionId: null, toolCalls: [{ name: "explain_question", input: { question_id: "x" } }] })).toBeNull();
  });
});

const run = (over: Partial<{ reply: string; links: string[]; tools: string[] }> = {}) => ({
  reply: "Here is the chapter: /questions/mh-hsc-12/physics/electrostatics",
  links: ["/questions/mh-hsc-12/physics/electrostatics"],
  tools: ["find_chapters"],
  ...over,
});

describe("parseExpect", () => {
  it("accepts an empty object: the global checks still apply", () => {
    expect(parseExpect({})).toEqual({ ok: true, value: {} });
  });

  it("accepts every known key", () => {
    const raw = {
      tools: ["find_chapters"],
      noTools: ["plan_week"],
      anyTool: ["find_chapters", "find_question"],
      links: ["/board"],
      anyLink: ["/a", "/b"],
      noLinks: false,
      say: ["electrostatics"],
      notSay: ["couldn't find"],
      maxChars: 400,
      judge: true,
    };
    expect(parseExpect(raw)).toEqual({ ok: true, value: raw });
  });

  it("refuses an unknown key, so a typo cannot silently check nothing", () => {
    const r = parseExpect({ tool: ["find_chapters"] });
    expect(r.ok).toBe(false);
  });

  it("refuses a pattern that is not a valid regular expression", () => {
    expect(parseExpect({ say: ["("] }).ok).toBe(false);
  });

  it("refuses a link that is not a site path", () => {
    expect(parseExpect({ links: ["questions/x"] }).ok).toBe(false);
  });

  it("refuses wrong types", () => {
    expect(parseExpect({ tools: "find_chapters" }).ok).toBe(false);
    expect(parseExpect({ maxChars: 0 }).ok).toBe(false);
    expect(parseExpect(null).ok).toBe(false);
    expect(parseExpect([]).ok).toBe(false);
  });
});

describe("checkReply", () => {
  it("passes a reply that meets every expectation", () => {
    const r = checkReply(
      { tools: ["find_chapters"], links: ["/questions/mh-hsc-12/physics/electrostatics"], say: ["chapter"] },
      run()
    );
    expect(r).toEqual({ pass: true, failures: [] });
  });

  it("names a required tool that was not called", () => {
    const r = checkReply({ tools: ["find_question"] }, run());
    expect(r.pass).toBe(false);
    expect(r.failures).toEqual(["tool not called: find_question"]);
  });

  it("names a forbidden tool that was called", () => {
    expect(checkReply({ noTools: ["find_chapters"] }, run()).failures).toEqual(["tool called: find_chapters"]);
  });

  it("anyTool needs one of the list", () => {
    expect(checkReply({ anyTool: ["find_question", "find_chapters"] }, run()).pass).toBe(true);
    expect(checkReply({ anyTool: ["find_question", "exam_strategy"] }, run()).failures).toEqual([
      "none of these tools called: find_question, exam_strategy",
    ]);
  });

  it("links are the tappable ones, matched exactly", () => {
    expect(checkReply({ links: ["/questions/mh-hsc-12/physics"] }, run()).failures).toEqual([
      "link missing: /questions/mh-hsc-12/physics",
    ]);
  });

  it("anyLink needs one of the list; noLinks needs none", () => {
    expect(checkReply({ anyLink: ["/board", "/questions/mh-hsc-12/physics/electrostatics"] }, run()).pass).toBe(true);
    expect(checkReply({ anyLink: ["/board"] }, run()).failures).toEqual(["none of these links: /board"]);
    expect(checkReply({ noLinks: true }, run()).failures).toEqual(["has links: /questions/mh-hsc-12/physics/electrostatics"]);
    expect(checkReply({ noLinks: true }, run({ reply: "Which exam?", links: [] })).pass).toBe(true);
  });

  it("say and notSay are case-insensitive patterns", () => {
    expect(checkReply({ say: ["ELECTROSTATICS"] }, run()).pass).toBe(true);
    expect(checkReply({ notSay: ["couldn'?t find|nothing matched"] }, run({ reply: "Nothing matched in X." })).failures).toEqual([
      "says: couldn'?t find|nothing matched",
    ]);
    expect(checkReply({ say: ["which exam"] }, run()).failures).toEqual(["does not say: which exam"]);
  });

  it("maxChars bounds the reply", () => {
    expect(checkReply({ maxChars: 10 }, run()).failures).toEqual([`longer than 10 characters (${run().reply.length})`]);
  });

  it("the global checks apply to every case", () => {
    expect(checkReply({}, run({ reply: "" })).failures).toEqual(["empty reply"]);
    expect(checkReply({}, run({ reply: "See [the page](/board)." })).failures).toEqual(["markdown link"]);
    expect(checkReply({}, run({ reply: "Yes — it is." })).failures).toEqual(["em dash"]);
    // 2026-10-23 (owner): "stored" is our word, not the student's: 39 of 218 replies said it.
    expect(checkReply({}, run({ reply: "The stored answer is 5." })).failures).toEqual(['says "stored"']);
    expect(checkReply({}, run({ reply: "Stored solution, step by step:" })).failures).toEqual(['says "stored"']);
    expect(checkReply({}, run({ reply: "Your access is restored." })).failures).toEqual([]);
  });

  it("a judge flag never fails on its own: it asks for a person to read the reply", () => {
    expect(checkReply({ judge: true }, run()).pass).toBe(true);
  });
});

describe("scoreByJob", () => {
  it("counts automatic passes and marks per job, in V_JOBS order, skipping empty jobs; `pass` = passed the checks and not marked fail", () => {
    const rows = [
      { job: "find" as const, autoPass: true, mark: null },
      { job: "find" as const, autoPass: false, mark: null },
      { job: "explain_question" as const, autoPass: true, mark: "pass" as const },
      { job: "explain_question" as const, autoPass: true, mark: "fail" as const },
    ];
    expect(scoreByJob(rows)).toEqual([
      { job: "find", cases: 2, autoPass: 1, marked: 0, markedPass: 0, pass: 1 },
      { job: "explain_question", cases: 2, autoPass: 2, marked: 2, markedPass: 1, pass: 1 },
    ]);
    expect(V_JOBS.indexOf("find")).toBeLessThan(V_JOBS.indexOf("explain_question"));
  });
});

describe("compareRuns", () => {
  it("names cases that started failing, started passing, or are new", () => {
    const prev = new Map([
      ["a", { autoPass: true }],
      ["b", { autoPass: false }],
      ["c", { autoPass: true }],
    ]);
    const cur = [
      { caseId: "a", autoPass: false },
      { caseId: "b", autoPass: true },
      { caseId: "c", autoPass: true },
      { caseId: "d", autoPass: false },
    ];
    expect(compareRuns(prev, cur)).toEqual({ newlyFailing: ["a"], newlyPassing: ["b"], newCases: ["d"] });
  });

  it("with no previous run every case is new", () => {
    expect(compareRuns(new Map(), [{ caseId: "a", autoPass: true }])).toEqual({
      newlyFailing: [],
      newlyPassing: [],
      newCases: ["a"],
    });
  });
});

describe("pickCases: --case runs only the cases named, by the start of their id", () => {
  const cases = [{ id: "a1b2c3d4-0000" }, { id: "a1ff0000-0000" }, { id: "9e9e9e9e-0000" }];

  it("keeps every case whose id starts with one of the given prefixes, in their order", () => {
    expect(pickCases(cases, "9e9e,a1b2").map((c) => c.id)).toEqual(["a1b2c3d4-0000", "9e9e9e9e-0000"]);
  });

  it("refuses a prefix that matches nothing or more than one case, so a typo cannot run the wrong set", () => {
    expect(() => pickCases(cases, "ffff")).toThrow(/ffff/);
    expect(() => pickCases(cases, "a1")).toThrow(/a1/);
  });

  it("keeps every case when no prefix is given", () => {
    expect(pickCases(cases, null)).toHaveLength(3);
  });
});
