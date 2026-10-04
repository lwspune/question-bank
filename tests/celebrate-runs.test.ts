/**
 * "Right in a row" on the bank and the board reader (2026-10-04).
 *
 * The rule that makes a run worth praising: it counts only answers the student
 * PICKED before seeing the answer, each question once. A run built by revealing
 * first and tapping the key second would praise reading, not recall.
 */
import { describe, it, expect } from "vitest";
import { EMPTY_RUN, isRunLevel, runMessage, stepRun, type RunState } from "@/lib/celebrate/runs";

const right = (topic: string | null = "Probability") => ({ firstAct: true, correct: true as boolean | null, topic });
const wrong = (topic: string | null = "Probability") => ({ firstAct: true, correct: false as boolean | null, topic });

/** Feed a sequence and collect the levels it fired at. */
function play(steps: Parameters<typeof stepRun>[1][], start: RunState = EMPTY_RUN) {
  let state = start;
  const fired: number[] = [];
  for (const s of steps) {
    const r = stepRun(state, s);
    state = r.state;
    if (r.level !== null) fired.push(r.level);
  }
  return { state, fired };
}

describe("isRunLevel — 3, 5, 10 and every 10 after", () => {
  it("fires at 3, 5 and each multiple of 10 from 10", () => {
    const levels = Array.from({ length: 60 }, (_, i) => i + 1).filter(isRunLevel);
    expect(levels).toEqual([3, 5, 10, 20, 30, 40, 50, 60]);
  });
});

describe("stepRun", () => {
  it("counts consecutive right answers and fires once at each level", () => {
    const { state, fired } = play(Array.from({ length: 21 }, () => right()));
    expect(state.length).toBe(21);
    expect(fired).toEqual([3, 5, 10, 20]);
  });

  it("a wrong answer ends the run and fires nothing — a broken run is never announced", () => {
    const r = stepRun({ length: 4, topic: "Probability" }, wrong());
    expect(r.level).toBeNull();
    expect(r.state).toEqual(EMPTY_RUN);
  });

  it("starts again from zero after a miss, so 3 more fire the 3 again", () => {
    const { fired } = play([right(), right(), right(), wrong(), right(), right(), right()]);
    expect(fired).toEqual([3, 3]);
  });

  it("ignores anything that is not the first act on a question (re-picks, a pick after Show answer)", () => {
    const r = stepRun({ length: 2, topic: "Probability" }, { firstAct: false, correct: true, topic: "Probability" });
    expect(r.level).toBeNull();
    expect(r.state).toEqual({ length: 2, topic: "Probability" });
    // A repeat that is WRONG does not break the run either: it is not an attempt.
    const w = stepRun({ length: 2, topic: "Probability" }, { firstAct: false, correct: false, topic: "Probability" });
    expect(w.state.length).toBe(2);
  });

  it("a reveal with no verdict (Show answer, or a question with no single key) neither adds nor breaks", () => {
    const r = stepRun({ length: 2, topic: "Probability" }, { firstAct: true, correct: null, topic: "Probability" });
    expect(r.level).toBeNull();
    expect(r.state).toEqual({ length: 2, topic: "Probability" });
  });

  it("names the topic only while every answer in the run shares it", () => {
    const same = play([right("Vectors"), right("Vectors"), right("Vectors")]);
    expect(same.state.topic).toBe("Vectors");
    const mixed = play([right("Vectors"), right("Matrices"), right("Vectors")]);
    expect(mixed.state.topic).toBeNull();
  });

  it("returns the run's topic with the level so the message can name it", () => {
    const s = stepRun({ length: 2, topic: "Vectors" }, right("Vectors"));
    expect(s).toEqual({ state: { length: 3, topic: "Vectors" }, level: 3, topic: "Vectors" });
  });
});

describe("runMessage — V speaking (user, 2026-10-04)", () => {
  it("names the topic when there is one, and stays plain when there is not", () => {
    expect(runMessage(3, "Probability")).toBe("3 in a row on Probability! Keep going.");
    expect(runMessage(3, null)).toBe("3 in a row! Keep going.");
    expect(runMessage(5, "Vector Algebra")).toBe("5 in a row on Vector Algebra. You're on a roll.");
    expect(runMessage(5, null)).toBe("5 in a row! You're on a roll.");
    expect(runMessage(10, "Probability")).toBe("10 in a row! Probability is clicking for you.");
    expect(runMessage(10, null)).toBe("10 in a row! It's clicking for you.");
    expect(runMessage(20, "Probability")).toBe("20 in a row. That's serious form.");
    expect(runMessage(40, null)).toBe("40 in a row. That's serious form.");
  });

  it("never mentions a streak, points or other students", () => {
    for (const n of [3, 5, 10, 20, 50]) {
      const m = runMessage(n, "Probability").toLowerCase();
      expect(m).toContain(`${n} in a row`);
      expect(m).not.toMatch(/streak|points|xp|rank|others|students/);
    }
  });
});
