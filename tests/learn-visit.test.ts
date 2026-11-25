import { describe, it, expect } from "vitest";
import { MAX_SENDS_PER_VISIT, MIN_VISIT_SECONDS, hide, moveTo, report, show, startVisit, takeSend } from "@/lib/learn/visit";

// A 6-slide lesson whose last slide (index 5) is the questions slide.
const T0 = 1_000_000;
const s = (sec: number) => T0 + sec * 1000;
const fresh = (over: Partial<Parameters<typeof startVisit>[0]> = {}) =>
  startVisit({ slides: 6, questionsIndex: 5, now: T0, visible: true, ...over });

describe("a lesson visit: how far through the slides, and where it stopped", () => {
  it("starts on slide 1 with nothing reached", () => {
    const v = fresh();
    expect(report(v, s(10))).toEqual({ slides: 6, start: 1, furthest: 1, left: 1, leftSeconds: 10, seconds: 10, questions: false });
  });

  it("counts the furthest slide, the slide left from and the time on it", () => {
    const v = fresh();
    moveTo(v, 1, s(20), true);
    moveTo(v, 2, s(50), true);
    moveTo(v, 1, s(70), true); // back one
    expect(report(v, s(100))).toEqual({ slides: 6, start: 1, furthest: 3, left: 2, leftSeconds: 30, seconds: 100, questions: false });
  });

  it("says the questions were reached once the questions slide was", () => {
    const v = fresh();
    moveTo(v, 5, s(40), true);
    moveTo(v, 4, s(60), true);
    expect(report(v, s(80)).questions).toBe(true);
    expect(report(v, s(80)).furthest).toBe(6);
  });

  it("a lesson with no questions slide never reaches the questions", () => {
    const v = fresh({ questionsIndex: -1 });
    moveTo(v, 5, s(40), true);
    expect(report(v, s(80)).questions).toBe(false);
  });

  it("counts only time on screen: a hidden tab adds nothing, to the lesson or the slide", () => {
    const v = fresh();
    moveTo(v, 2, s(10), true);
    hide(v, s(30)); // 20 s on slide 3
    show(v, s(330)); // five minutes in another app
    expect(report(v, s(340))).toMatchObject({ seconds: 40, leftSeconds: 30 });
  });

  it("a visit opened in the background counts from when it shows", () => {
    const v = fresh({ visible: false });
    show(v, s(60));
    expect(report(v, s(75)).seconds).toBe(15);
  });

  it("hiding twice, or showing twice, changes nothing", () => {
    const v = fresh();
    hide(v, s(10));
    hide(v, s(20));
    show(v, s(30));
    show(v, s(40));
    expect(report(v, s(50)).seconds).toBe(30);
  });

  it("before the first move, a jump to the questions (a student who answered before) is the START, not progress", () => {
    const v = fresh();
    moveTo(v, 5, s(2), false);
    expect(report(v, s(30))).toMatchObject({ start: 6, furthest: 6, left: 6, questions: true });
    moveTo(v, 0, s(40), true); // then rereads from the top
    expect(report(v, s(50))).toMatchObject({ start: 6, furthest: 6, left: 1, leftSeconds: 10 });
  });

  it("an unmoved slide keeps its time when the stage reports it again", () => {
    const v = fresh();
    moveTo(v, 0, s(10), false);
    expect(report(v, s(20)).leftSeconds).toBe(20);
  });
});

describe("takeSend: when a visit is worth a row", () => {
  it("skips a visit shorter than the minimum", () => {
    const v = fresh();
    expect(takeSend(v, s(MIN_VISIT_SECONDS - 1))).toBeNull();
    expect(takeSend(v, s(MIN_VISIT_SECONDS))).not.toBeNull();
  });

  it("sends once per furthest slide and slide left from, so a repeat hide writes nothing", () => {
    const v = fresh();
    moveTo(v, 2, s(10), true);
    expect(takeSend(v, s(20))).not.toBeNull();
    expect(takeSend(v, s(60))).toBeNull(); // same place, later
    moveTo(v, 3, s(70), true);
    expect(takeSend(v, s(80))).toMatchObject({ furthest: 4, left: 4 });
  });

  it("stops after the cap however much the student moves", () => {
    const v = startVisit({ slides: 40, questionsIndex: 39, now: T0, visible: true });
    let sent = 0;
    for (let i = 1; i < 40; i++) {
      moveTo(v, i, s(10 * i), true);
      if (takeSend(v, s(10 * i + 5))) sent++;
    }
    expect(sent).toBe(MAX_SENDS_PER_VISIT);
  });
});
