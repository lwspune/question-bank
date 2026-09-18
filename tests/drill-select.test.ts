/**
 * The drill's pure core: which of a student's past mistakes are due, and which
 * five they get. No DB, no React.
 *
 * The state machine is the user's call (2026-09-18): a question enters the pool
 * by being answered WRONG, leaves for a cooling period on the first correct,
 * and retires on the second. One correct answer a day later is weak evidence of
 * durable recall on a four-option MCQ with a 25% guessing floor — so "right
 * once" is deliberately not "fixed".
 */
import { describe, it, expect } from "vitest";
import {
  COOL_DOWN_DAYS,
  CORRECTS_TO_RETIRE,
  DRILL_SIZE,
  questionState,
  dueQuestions,
  selectDrill,
  attachRefs,
  type DrillEvent,
  type DueQuestion,
} from "@/lib/drill/select";

const NOW = new Date("2026-09-18T12:00:00Z");
const day = (n: number) => new Date(NOW.getTime() - n * 86400000).toISOString();

const wrong = (questionId: string, daysAgo: number): DrillEvent => ({
  questionId,
  correct: false,
  at: day(daysAgo),
});
const right = (questionId: string, daysAgo: number): DrillEvent => ({
  questionId,
  correct: true,
  at: day(daysAgo),
});

describe("questionState — the fold", () => {
  it("a question they missed and never revisited is due", () => {
    expect(questionState([wrong("q1", 30)], NOW)).toBe("due");
  });

  it("one correct answer puts it to sleep, it does not fix it", () => {
    expect(questionState([wrong("q1", 30), right("q1", 1)], NOW)).toBe("cooling");
  });

  it("wakes up again once the cooling period has passed", () => {
    expect(questionState([wrong("q1", 30), right("q1", COOL_DOWN_DAYS + 1)], NOW)).toBe("due");
  });

  it("retires on the second correct answer", () => {
    const events = [wrong("q1", 30), right("q1", 20), right("q1", 2)];
    expect(events.filter((e) => e.correct)).toHaveLength(CORRECTS_TO_RETIRE);
    expect(questionState(events, NOW)).toBe("retired");
  });

  it("a wrong answer sends a retired question straight back, streak reset", () => {
    // Not "back to cooling" — they have just demonstrated they do not have it,
    // so the next correct answer starts the ladder again from the bottom.
    const events = [wrong("q1", 60), right("q1", 50), right("q1", 40), wrong("q1", 3)];
    expect(questionState(events, NOW)).toBe("due");
    expect(questionState([...events, right("q1", 1)], NOW)).toBe("cooling");
  });

  it("is chronological regardless of the order it is handed", () => {
    // The read layer orders by created_at, but a fold that silently depends on
    // its input order is a bug waiting for a paginated query.
    const shuffled = [right("q1", 20), wrong("q1", 30), right("q1", 2)];
    expect(questionState(shuffled, NOW)).toBe("retired");
  });

  it("a question that was never missed is not drill material, however many corrects", () => {
    // It cannot arise today (only the drill emits a correct, and the drill only
    // serves misses) but the pool must be defined by a MISS, not by presence.
    expect(questionState([right("q1", 5), right("q1", 2)], NOW)).toBe("never-missed");
  });
});

describe("dueQuestions", () => {
  const events: DrillEvent[] = [
    wrong("due-1", 40),
    wrong("due-2", 10),
    wrong("sleeping", 30),
    right("sleeping", 1),
    wrong("fixed", 60),
    right("fixed", 50),
    right("fixed", 5),
  ];

  it("returns only the due ones", () => {
    expect(dueQuestions(events, NOW).map((d) => d.questionId)).toEqual(["due-1", "due-2"]);
  });

  it("orders oldest miss first — the most likely to have decayed", () => {
    const ids = dueQuestions([wrong("recent", 2), wrong("ancient", 90)], NOW).map(
      (d) => d.questionId
    );
    expect(ids).toEqual(["ancient", "recent"]);
  });

  it("carries the last-wrong timestamp so a caller can rank without re-folding", () => {
    expect(dueQuestions([wrong("q1", 5)], NOW)[0].lastWrongAt).toBe(day(5));
  });
});

describe("selectDrill — interleaving", () => {
  /** n questions in one subtopic, all due, oldest first by index. */
  const group = (subtopic: string, n: number, chapter = `${subtopic} ch`): DueQuestion[] =>
    Array.from({ length: n }, (_, i) => ({
      questionId: `${subtopic}-${i}`,
      chapter,
      subtopic,
      lastWrongAt: day(100 - i),
    }));

  it("takes DRILL_SIZE questions", () => {
    expect(selectDrill(group("Algebra", 20))).toHaveLength(DRILL_SIZE);
  });

  it("spreads across subtopics rather than blocking on the biggest one", () => {
    // Interleaved practice beats blocked practice for transfer — the same
    // reason the /notes mastery checkpoint interleaves across concepts.
    const picked = selectDrill([...group("Big", 10), ...group("Small", 3)]);
    expect(new Set(picked.map((q) => q.subtopic)).size).toBe(2);
    expect(picked.filter((q) => q.subtopic === "Small").length).toBeGreaterThan(1);
  });

  it("never puts two questions from one subtopic back to back while others remain", () => {
    const picked = selectDrill([
      ...group("A", 4),
      ...group("B", 4),
      ...group("C", 4),
      ...group("D", 4),
      ...group("E", 4),
    ]);
    const subs = picked.map((q) => q.subtopic);
    expect(new Set(subs).size).toBe(DRILL_SIZE);
  });

  it("leads with the subtopic they have missed most — the deliberate-practice bias", () => {
    const picked = selectDrill([...group("Rare", 1), ...group("Worst", 9)]);
    expect(picked[0].subtopic).toBe("Worst");
  });

  it("takes the oldest miss within a subtopic", () => {
    const picked = selectDrill(group("Only", 6));
    expect(picked[0].questionId).toBe("Only-0");
  });

  it("returns everything it has when the pool is smaller than a drill", () => {
    expect(selectDrill(group("Thin", 2))).toHaveLength(2);
  });

  it("returns an empty drill rather than throwing on an empty pool", () => {
    expect(selectDrill([])).toEqual([]);
  });

  it("is deterministic — the same pool yields the same drill", () => {
    const pool = [...group("A", 5), ...group("B", 5)];
    expect(selectDrill(pool)).toEqual(selectDrill(pool));
  });
});

describe("attachRefs — the eligibility gate", () => {
  const due = [
    { questionId: "live", chapter: "", subtopic: "", lastWrongAt: "2026-09-01T00:00:00Z" },
    { questionId: "gone", chapter: "", subtopic: "", lastWrongAt: "2026-09-02T00:00:00Z" },
  ];

  it("drops a question the read layer could not resolve", () => {
    // Absence is the filter: a question flipped PRIVATE, deleted, or turned
    // subjective is one the drill cannot grade, so it must never be served.
    // The activity row stays in the log forever, so this cannot be a one-off.
    const refs = new Map([["live", { chapter: "Algebra", subtopic: "Quadratics" }]]);
    expect(attachRefs(due, refs).map((d) => d.questionId)).toEqual(["live"]);
  });

  it("carries the taxonomy through so the interleaver can group", () => {
    const refs = new Map([["live", { chapter: "Algebra", subtopic: "Quadratics" }]]);
    expect(attachRefs(due, refs)[0]).toMatchObject({
      chapter: "Algebra",
      subtopic: "Quadratics",
    });
  });

  it("returns nothing when the whole pool is unresolvable, rather than throwing", () => {
    expect(attachRefs(due, new Map())).toEqual([]);
  });
});

describe("selectDrill — spreads across CHAPTERS, not just subtopics", () => {
  /** n due questions in one (chapter, subtopic), oldest first by index. */
  const g = (chapter: string, subtopic: string, n: number): DueQuestion[] =>
    Array.from({ length: n }, (_, i) => ({
      questionId: `${chapter}-${subtopic}-${i}`,
      chapter,
      subtopic,
      lastWrongAt: `2026-0${(i % 9) + 1}-01T00:00:00Z`,
    }));

  it("does not fill a drill from one chapter's many subtopics", () => {
    // FOUND ON LIVE DATA (drill:smoke, 2026-09-18): a student drew three of
    // five from Grammar — Sentence Completion, Discourse Markers, Correct
    // Sentence Identification — because grouping on the (chapter, subtopic)
    // PAIR makes a chapter with many subtopics win the round-robin three times
    // over. Five distinct subtopics, and it still reads as blocked practice.
    const pool = [
      ...g("Grammar", "Sentence Completion", 4),
      ...g("Grammar", "Discourse Markers", 4),
      ...g("Grammar", "Correct Sentence", 4),
      ...g("Geography", "Earthquakes", 3),
      ...g("Geography", "Rocks", 3),
      ...g("Algebra", "Quadratics", 2),
      ...g("Biology", "Cell Organelles", 2),
    ];
    const chapters = selectDrill(pool).map((q) => q.chapter);
    expect(new Set(chapters).size).toBe(DRILL_SIZE > 4 ? 4 : new Set(chapters).size);
  });

  it("still prefers the subtopic they have missed most inside a chapter", () => {
    // Chapter spread is the outer rule; the deliberate-practice bias survives
    // as the inner one, so the Grammar slot goes to its worst subtopic.
    const pool = [
      ...g("Grammar", "Rare", 1),
      ...g("Grammar", "Worst", 9),
      ...g("Algebra", "Quadratics", 1),
    ];
    const grammar = selectDrill(pool).filter((q) => q.chapter === "Grammar");
    expect(grammar[0].subtopic).toBe("Worst");
  });

  it("falls back to a chapter's other subtopics when there is nothing else left", () => {
    // Spread is a preference, not a refusal: a student whose whole due pool is
    // one chapter still gets five questions.
    const pool = [...g("Grammar", "A", 3), ...g("Grammar", "B", 3)];
    expect(selectDrill(pool)).toHaveLength(DRILL_SIZE);
  });
});
