/**
 * The student-performance pure core. No I/O — every input is a literal.
 *
 * These tests are the specification for the rules imported from nda-tracker
 * (recency weighting, attempt quality, consistency, trend, expected-marks
 * projection) plus the two things the vault can do and the tracker cannot:
 * telling "seen and skipped" from "never reached", and knowing each paper's
 * REAL marking scheme instead of assuming NDA's.
 */
import { describe, it, expect } from "vitest";
import {
  recencyWeight,
  computeTrend,
  consistency,
  selectAttempts,
  buildPerformance,
  ENGAGEMENT_FLOOR,
  type PerfInput,
} from "@/lib/performance/compute";
import type { PerfAttempt, PerfFact } from "@/lib/performance/types";

// ── fixtures ────────────────────────────────────────────────────────────────

const DAY = 86_400_000;
const NOW = new Date("2026-09-15T12:00:00Z");
const daysAgo = (n: number) => new Date(NOW.getTime() - n * DAY).toISOString();

function attempt(over: Partial<PerfAttempt> = {}): PerfAttempt {
  return {
    attemptId: "A1",
    mockSlug: "nda-2025-apr-maths",
    mockTitle: "NDA I 2025 — Mathematics",
    examName: "NDA",
    paperCode: "maths",
    pyqYear: 2025,
    source: "pyq",
    scope: "full",
    sections: [{ key: "maths", label: "Mathematics", count: 4 }],
    totalQuestions: 4,
    totalMarks: 10,
    durationSecs: 9000,
    status: "submitted",
    startedAt: daysAgo(1),
    submittedAt: daysAgo(1),
    score: 5,
    maxScore: 10,
    ...over,
  };
}

/** NDA-style marking by default: +2.5 / −0.83. */
function fact(over: Partial<PerfFact> = {}): PerfFact {
  return {
    a: "A1", p: 1, q: "q1", s: 0, c: 0, t: 0,
    d: "MODERATE", f: "mcq",
    k: "A", kn: null, r: null, rn: null,
    g: false, m: 2.5, nm: -0.83, ts: 30, rc: true,
    ...over,
  };
}

/** Shorthand: a question answered correctly / wrongly / seen-blank / unreached. */
const right = (o: Partial<PerfFact> = {}) => fact({ k: "A", r: "A", rc: true, ...o });
const wrong = (o: Partial<PerfFact> = {}) => fact({ k: "A", r: "B", rc: true, ...o });
const blank = (o: Partial<PerfFact> = {}) => fact({ k: "A", r: null, rc: true, ...o });
const unseen = (o: Partial<PerfFact> = {}) => fact({ k: "A", r: null, rc: false, ts: 0, ...o });

function input(attempts: PerfAttempt[], facts: PerfFact[]): PerfInput {
  return {
    userId: "u1",
    attempts,
    facts,
    dims: { subjects: ["Mathematics"], chapters: ["Conics"], subtopics: ["Parabola"] },
    weightage: [],
  };
}

// ── recency weight ──────────────────────────────────────────────────────────

describe("recencyWeight", () => {
  it("is 1 for an attempt sat today and 0.5 at 30 days", () => {
    expect(recencyWeight(0)).toBe(1);
    expect(recencyWeight(30)).toBeCloseTo(0.5, 5);
  });

  it("floors at 0.2 and never reaches zero", () => {
    // An old attempt is weak evidence, not NO evidence. A zero floor would make
    // a student who stopped practising look untested rather than rusty.
    expect(recencyWeight(60)).toBe(0.2);
    expect(recencyWeight(5000)).toBe(0.2);
  });

  it("clamps a future date to 1 rather than exceeding it", () => {
    // Clock skew between the browser that stamped started_at and the server.
    // Un-clamped this weights a single attempt above every other.
    expect(recencyWeight(-3)).toBe(1);
  });
});

// ── trend ───────────────────────────────────────────────────────────────────

describe("computeTrend", () => {
  it("needs two points before it will claim a direction", () => {
    expect(computeTrend([])).toBe("unknown");
    expect(computeTrend([0.5])).toBe("unknown");
  });

  it("reads the last step, not the whole series", () => {
    expect(computeTrend([0.2, 0.9])).toBe("improving");
    expect(computeTrend([0.9, 0.2])).toBe("declining");
    expect(computeTrend([0.5, 0.52])).toBe("stable");
  });

  it("calls a wide 3+ point spread volatile before reading its last step", () => {
    expect(computeTrend([0.1, 0.9, 0.2])).toBe("volatile");
  });

  it("does not call two far-apart points volatile", () => {
    // Volatility is a claim about a pattern. Two points are a step, not a pattern.
    expect(computeTrend([0.05, 0.95])).toBe("improving");
  });
});

// ── consistency ─────────────────────────────────────────────────────────────

describe("consistency", () => {
  it("is unknown below two sittings", () => {
    expect(consistency([0.5])).toBeNull();
  });

  it("labels by spread, on POPULATION sigma — the same one nda-tracker uses", () => {
    expect(consistency([0.5, 0.52, 0.51])?.label).toBe("Consistent"); // sigma 0.008
    expect(consistency([0.35, 0.5, 0.65])?.label).toBe("Moderate"); //  sigma 0.122
    expect(consistency([0.1, 0.9, 0.4])?.label).toBe("Volatile"); //   sigma 0.330
  });

  it("divides by n, not n-1 — the boundary cases differ by a whole label", () => {
    // [0.4, 0.55, 0.62] is sigma 0.092 population (Consistent) but 0.112 sample
    // (Moderate). Pinned because picking the other one silently relabels real
    // students, and the tracker's stdDev is the population form.
    expect(consistency([0.4, 0.55, 0.62])?.sd).toBeCloseTo(0.0918, 4);
    expect(consistency([0.4, 0.55, 0.62])?.label).toBe("Consistent");
  });
});

// ── which attempts count ────────────────────────────────────────────────────

describe("selectAttempts", () => {
  it("keeps only the FIRST sitting of each paper", () => {
    // A retake is contaminated: the review screen shows the answers. 23% of
    // graded attempts on production are retakes.
    const first = attempt({ attemptId: "A1", startedAt: daysAgo(10) });
    const retake = attempt({ attemptId: "A2", startedAt: daysAgo(2) });
    const facts = [
      ...[1, 2, 3, 4].map((p) => right({ a: "A1", p })),
      ...[1, 2, 3, 4].map((p) => right({ a: "A2", p })),
    ];
    const r = selectAttempts([first, retake], facts);
    expect(r.kept.map((a) => a.attemptId)).toEqual(["A1"]);
    expect(r.retakesDropped).toBe(1);
  });

  it("keeps the earliest even when the payload is out of order", () => {
    const late = attempt({ attemptId: "LATE", startedAt: daysAgo(1) });
    const early = attempt({ attemptId: "EARLY", startedAt: daysAgo(9) });
    const facts = [...[1, 2, 3, 4].flatMap((p) => [right({ a: "LATE", p }), right({ a: "EARLY", p })])];
    expect(selectAttempts([late, early], facts).kept[0].attemptId).toBe("EARLY");
  });

  it("drops an attempt that answered less than the engagement floor", () => {
    // 45 graded attempts on production answered ZERO questions. An abandoned
    // browser tab is not a student skipping a hard item.
    const a = attempt({ attemptId: "A1" });
    const facts = [right({ p: 1 }), unseen({ p: 2 }), unseen({ p: 3 }), unseen({ p: 4 })];
    expect(ENGAGEMENT_FLOOR).toBe(0.2);
    const r = selectAttempts([a], facts); // 1 of 4 = 25% — above the floor
    expect(r.kept).toHaveLength(1);

    const empty = selectAttempts([a], [unseen({ p: 1 }), unseen({ p: 2 }), unseen({ p: 3 }), unseen({ p: 4 })]);
    expect(empty.kept).toHaveLength(0);
    expect(empty.belowFloor).toBe(1);
  });

  it("never counts an in-progress attempt as evidence", () => {
    const live = attempt({ attemptId: "LIVE", status: "in_progress", score: null, maxScore: null });
    const r = selectAttempts([live], []);
    expect(r.kept).toHaveLength(0);
    expect(r.inProgress).toBe(1);
    // ...and it is not reported as a dropped retake or an abandonment either.
    expect(r.retakesDropped).toBe(0);
    expect(r.belowFloor).toBe(0);
  });
});

// ── the four response states ────────────────────────────────────────────────

describe("coverage — seen-and-skipped vs never reached", () => {
  it("separates the two, because only one of them is a weakness", () => {
    // The whole reason the RPC expands the paper snapshot. Collapsing these
    // reports "weak in Conics" for a student who ran out of time at Q80.
    const facts = [right({ p: 1 }), wrong({ p: 2 }), blank({ p: 3 }), unseen({ p: 4 })];
    const { lanes } = buildPerformance(input([attempt()], facts), NOW);
    const c = lanes[0].coverage;
    expect(c.inPaper).toBe(4);
    expect(c.reached).toBe(3);
    expect(c.answered).toBe(2);
    expect(c.seenBlank).toBe(1);
    expect(c.neverReached).toBe(1);
    // The four states must partition the paper exactly.
    expect(c.answered + c.seenBlank + c.neverReached).toBe(c.inPaper);
  });

  it("reports median time over questions the student actually reached", () => {
    // An unreached question has ts=0. Folding those in would report a median of
    // ~0s for anyone who ran out of time — fast, when they were in fact absent.
    const facts = [
      right({ p: 1, ts: 40 }), wrong({ p: 2, ts: 60 }), blank({ p: 3, ts: 20 }), unseen({ p: 4, ts: 0 }),
    ];
    expect(buildPerformance(input([attempt()], facts), NOW).lanes[0].coverage.medianSecs).toBe(40);
  });
});

// ── attempt quality + score delta ───────────────────────────────────────────

describe("summary", () => {
  it("scores attempt quality over ATTEMPTED questions, never the whole paper", () => {
    // correct / (correct + wrong). A skipped question is not a wrong answer,
    // and on a negatively-marked paper the difference is the whole skill.
    const facts = [right({ p: 1 }), right({ p: 2 }), wrong({ p: 3 }), unseen({ p: 4 })];
    expect(buildPerformance(input([attempt()], facts), NOW).summary.attemptQuality).toBe(67);
  });

  it("reports the score delta in percentage POINTS, not raw marks", () => {
    // Vault papers run 100/300/600 maxima. 5.5/10 then 5/5 is 55% -> 100%, a
    // 45-point GAIN, but reads as "-0.5" in marks. Same trap StudentView hits.
    const older = attempt({ attemptId: "A1", mockSlug: "m1", startedAt: daysAgo(9), score: 5.5, maxScore: 10 });
    const newer = attempt({ attemptId: "A2", mockSlug: "m2", startedAt: daysAgo(1), score: 5, maxScore: 5 });
    const facts = [
      ...[1, 2, 3, 4].map((p) => right({ a: "A1", p })),
      ...[1, 2, 3, 4].map((p) => right({ a: "A2", p })),
    ];
    const s = buildPerformance(input([older, newer], facts), NOW).summary;
    expect(s.deltaPoints).toBe(45);
    expect(s.latest?.attemptId).toBe("A2");
  });

  it("returns null, never zero, when nothing has been graded", () => {
    // "No score yet" is not "scored zero". A 0 here is an assertion we cannot
    // support and it sorts as the worst student in the cohort.
    const s = buildPerformance(input([], []), NOW).summary;
    expect(s.attemptQuality).toBeNull();
    expect(s.consistency).toBeNull();
    expect(s.latest).toBeNull();
    expect(s.deltaPoints).toBeNull();
  });
});

// ── grace + missing key, via verdictFor ─────────────────────────────────────

describe("verdict is delegated, never re-implemented", () => {
  it("awards a grace question to everyone, including a blank", () => {
    const facts = [fact({ p: 1, g: true, r: null, rc: true }), right({ p: 2 }), right({ p: 3 }), right({ p: 4 })];
    const lane = buildPerformance(input([attempt()], facts), NOW).lanes[0];
    expect(lane.accuracy).toBe(100);
  });

  it("treats a missing answer key as blank, never as wrong", () => {
    // validatePaperRows refuses to build such a paper, but if one ever existed
    // the student must not be penalised for OUR defect.
    const facts = [fact({ p: 1, k: null, kn: null, r: "B" }), right({ p: 2 }), right({ p: 3 }), right({ p: 4 })];
    const lane = buildPerformance(input([attempt()], facts), NOW).lanes[0];
    expect(lane.chapters[0].wrong).toBe(0);
    expect(lane.accuracy).toBe(100);
  });

  it("grades a numeric (NAT) response by value, not by label", () => {
    const facts = [
      fact({ p: 1, f: "numeric", k: null, kn: 17280, r: null, rn: 17280 }),
      fact({ p: 2, f: "numeric", k: null, kn: 12, r: null, rn: 13 }),
      right({ p: 3 }), right({ p: 4 }),
    ];
    const lane = buildPerformance(input([attempt()], facts), NOW).lanes[0];
    expect(lane.chapters[0].correct).toBe(3);
    expect(lane.chapters[0].wrong).toBe(1);
  });
});

// ── lanes split by SUBJECT, not by section ──────────────────────────────────

describe("lanes", () => {
  it("splits an NDA GAT paper into its real subjects", () => {
    // The paper declares 2 sections (english, gk) but `gk` holds 100 questions
    // across 8 subjects. 103 students currently see one lumped GK number where
    // the actionable fact is per-subject.
    const gat = attempt({
      attemptId: "G1", examName: "NDA", paperCode: "gat", totalQuestions: 4, totalMarks: 16,
      sections: [
        { key: "english", label: "English", count: 2 },
        { key: "gk", label: "General Knowledge", count: 2 },
      ],
    });
    const facts = [
      right({ a: "G1", p: 1, s: 0 }), wrong({ a: "G1", p: 2, s: 0 }),
      right({ a: "G1", p: 3, s: 1 }), right({ a: "G1", p: 4, s: 2 }),
    ];
    const payload = {
      ...input([gat], facts),
      dims: { subjects: ["English", "Physics", "History"], chapters: ["Conics"], subtopics: ["Parabola"] },
    };
    const lanes = buildPerformance(payload, NOW).lanes;
    expect(lanes.map((l) => l.subject).sort()).toEqual(["English", "History", "Physics"]);
    expect(lanes.find((l) => l.subject === "English")!.accuracy).toBe(50);
    expect(lanes.find((l) => l.subject === "Physics")!.accuracy).toBe(100);
  });

  it("keeps the same subject in two exams apart", () => {
    // NDA English and CDS English are different papers with different levels;
    // pooling them would average away exactly the difference a teacher wants.
    const nda = attempt({ attemptId: "N1", examName: "NDA", mockSlug: "nda-eng", totalQuestions: 2 });
    const cds = attempt({ attemptId: "C1", examName: "CDS", mockSlug: "cds-eng", totalQuestions: 2 });
    const facts = [
      right({ a: "N1", p: 1 }), right({ a: "N1", p: 2 }),
      wrong({ a: "C1", p: 1 }), wrong({ a: "C1", p: 2 }),
    ];
    const lanes = buildPerformance(input([nda, cds], facts), NOW).lanes;
    expect(lanes).toHaveLength(2);
    expect(lanes.map((l) => `${l.exam}·${l.accuracy}`).sort()).toEqual(["CDS·0", "NDA·100"]);
  });
});

// ── projection uses each paper's REAL marking ───────────────────────────────

describe("projection", () => {
  // The fixture paper is 4 questions at 2.5 marks = a 10-mark ceiling, which is
  // what `attempt()` really carries. The ceiling is DERIVED from the marks of
  // the questions in the lane, never read off `totalMarks`, so that a GAT
  // subject gets its own slice of 600 rather than the whole paper.
  // Weightage arrives at SUBTOPIC grain (migration 0100); a chapter's share is
  // the SUM of its subtopics. Conics is split across two subtopics and Vectors
  // sits in one, so every chapter-level assertion below is also a parity check:
  // the chapter numbers must not care how the bank rows were grained.
  const weightage = [
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Parabola", q: 30 },
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Ellipse", q: 20 },
    { exam: "NDA", subject: "Mathematics", chapter: "Vectors", subtopic: "Dot Product", q: 50 },
  ];

  it("derives the lane ceiling from the questions sat, not from totalMarks", () => {
    const facts = [right({ p: 1 }), wrong({ p: 2 }), right({ p: 3 }), wrong({ p: 4 })];
    const p = buildPerformance({ ...input([attempt()], facts), weightage }, NOW).lanes[0]
      .projection!;
    expect(p.ceiling).toBe(10); // 4 questions x 2.5
    const conics = p.rows.find((r) => r.chapter === "Conics")!;
    expect(conics.marksAtStake).toBe(5); // 50 of 100 bank questions, 10 marks
  });

  it("penalises a wrong answer on a negatively-marked paper", () => {
    const facts = [right({ p: 1 }), wrong({ p: 2 }), right({ p: 3 }), wrong({ p: 4 })];
    const p = buildPerformance({ ...input([attempt()], facts), weightage }, NOW)
      .lanes[0].projection!;
    // All four sit in Conics/Parabola, which holds 30 of the 100 bank questions
    // on a 10-mark ceiling = 3 marks. Two right, two wrong, nothing blank, so
    // accuracy and wrong-rate are both 50% of the four REACHED.
    const parabola = p.subtopicRows.find((r) => r.subtopic === "Parabola")!;
    expect(parabola.projected).toBeCloseTo(0.5 * 3 - 0.5 * 3 * (0.83 / 2.5), 5);
    expect(parabola.projected).toBeLessThan(0.5 * 3);
    // REWRITTEN 2026-09-15. It read the CHAPTER and expected 50% spent across
    // all 5 of its marks — that was the pooled behaviour, and pooling is what
    // credited Ellipse, which this student has never been shown. A chapter is
    // now its subtopics' SUM, so Conics is Parabola alone.
    const conics = p.rows.find((r) => r.chapter === "Conics")!;
    expect(conics.marksAtStake).toBe(5);
    expect(conics.projected).toBeCloseTo(parabola.projected, 5);
  });

  it("does NOT penalise on MHT-CET, which has zero negative marking", () => {
    // The contrast is the point: identical accuracy and wrong-rate, and the
    // CET student keeps the full 50% because a wrong answer costs them nothing.
    // nda-tracker hardcodes NDA's 0.33 — right for its one exam, wrong for four
    // of the five marking schemes that appear in a single production payload.
    const cetFacts = [
      right({ p: 1, m: 1, nm: 0 }), wrong({ p: 2, m: 1, nm: 0 }),
      right({ p: 3, m: 1, nm: 0 }), wrong({ p: 4, m: 1, nm: 0 }),
    ];
    const cet = attempt({ examName: "MHT-CET", totalMarks: 4 });
    const p = buildPerformance(
      {
        ...input([cet], cetFacts),
        weightage: [
          { exam: "MHT-CET", subject: "Mathematics", chapter: "Conics", subtopic: "Parabola", q: 50 },
        ],
      },
      NOW
    ).lanes[0].projection!;
    expect(p.ceiling).toBe(4); // 4 questions x 1 mark
    // 50% accuracy of 4 marks, with no deduction at all.
    expect(p.rows[0].projected).toBeCloseTo(2, 5);
  });

  it("ranks by recoverable marks, not by accuracy", () => {
    // "What do I study tonight" is a marks question. A 20%-accuracy chapter
    // worth 1 mark is not the priority a 60% chapter worth 150 marks is.
    const p = buildPerformance(
      {
        ...input([attempt()], [right({ p: 1 }), wrong({ p: 2 }), right({ p: 3 }), right({ p: 4 })]),
        weightage,
      },
      NOW
    ).lanes[0].projection!;
    expect(p.rows[0].gap).toBeGreaterThanOrEqual(p.rows[1].gap);
  });

  it("keeps an untested chapter visible with its full marks at stake", () => {
    // Dropping it would hide the largest gap of all — a chapter the student has
    // never once been tested on still carries every one of its marks.
    const facts = [right({ p: 1 }), right({ p: 2 }), right({ p: 3 }), right({ p: 4 })];
    const p = buildPerformance({ ...input([attempt()], facts), weightage }, NOW).lanes[0]
      .projection!;
    const vectors = p.rows.find((r) => r.chapter === "Vectors")!;
    expect(vectors.tested).toBe(false);
    expect(vectors.projected).toBe(0);
    expect(vectors.gap).toBe(5);
    // ...and it outranks the chapter they aced, which is the entire point.
    expect(p.rows[0].chapter).toBe("Vectors");
  });

  it("is null when the bank has no weightage for the lane", () => {
    // Better no card than a projection out of an unknown denominator.
    const facts = [right({ p: 1 }), right({ p: 2 }), right({ p: 3 }), right({ p: 4 })];
    expect(buildPerformance(input([attempt()], facts), NOW).lanes[0].projection).toBeNull();
  });
});

describe("projection — subtopic level", () => {
  // Two chapters, three subtopics. The Conics split is uneven on purpose so a
  // subtopic's marks cannot be mistaken for "chapter marks / subtopic count".
  const weightage = [
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Parabola", q: 30 },
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Ellipse", q: 20 },
    { exam: "NDA", subject: "Mathematics", chapter: "Vectors", subtopic: "Dot Product", q: 50 },
  ];

  const dims = {
    subjects: ["Mathematics"],
    chapters: ["Conics", "Vectors"],
    subtopics: ["Parabola", "Ellipse", "Dot Product"],
  };

  /** Four Conics questions: two Parabola (both wrong), two Ellipse (both right). */
  const facts = [
    wrong({ p: 1, c: 0, t: 0 }), wrong({ p: 2, c: 0, t: 0 }),
    right({ p: 3, c: 0, t: 1 }), right({ p: 4, c: 0, t: 1 }),
  ];

  const projectionOf = () =>
    buildPerformance({ ...input([attempt()], facts), dims, weightage }, NOW).lanes[0].projection!;

  it("splits a chapter's marks across its subtopics in the bank's own proportion", () => {
    // Conics is 50 of 100 bank questions on a 10-mark ceiling = 5 marks, and
    // Parabola holds 30 of those 100, so 3 marks — NOT half of the chapter.
    const p = projectionOf();
    const parabola = p.subtopicRows.find((r) => r.subtopic === "Parabola")!;
    const ellipse = p.subtopicRows.find((r) => r.subtopic === "Ellipse")!;
    expect(parabola.marksAtStake).toBeCloseTo(3, 5);
    expect(ellipse.marksAtStake).toBeCloseTo(2, 5);
    expect(parabola.chapter).toBe("Conics");
  });

  it("makes a chapter's marks the EXACT sum of its subtopics'", () => {
    // The two levels are one number read at two grains. If they disagree, one
    // of the cards behind the same toggle is lying.
    const p = projectionOf();
    for (const chapter of p.rows) {
      const subs = p.subtopicRows.filter((r) => r.chapter === chapter.chapter);
      const summed = subs.reduce((n, r) => n + r.marksAtStake, 0);
      expect(summed).toBeCloseTo(chapter.marksAtStake, 5);
    }
  });

  it("makes a chapter's PROJECTED marks the sum of its subtopics'", () => {
    // The marks POOL was already pinned above; the projection was not, and the
    // two do not follow from each other. `expectedMarks` is linear in marks but
    // accuracy is a RATIO, so pooling a chapter weights its subtopics by how
    // much the student engaged, while summing them weights by bank share. The
    // clamp then compounds it: Sum(max(0, x)) >= max(0, Sum(x)), so a negative
    // subtopic is discarded on its own but eats a positive sibling once pooled.
    //
    // This fixture is the minimal case. Conics = 5 marks, Parabola 3 (two WRONG)
    // and Ellipse 2 (two RIGHT). Pooled, the wrong pair drags the chapter down;
    // summed, Parabola clamps to 0 and Ellipse keeps its 2 marks intact.
    //
    // On production this ran to 7.84 marks on one student — the card showed a
    // headline of 94 over subtopic rows adding to 86.55.
    const p = projectionOf();
    for (const chapter of p.rows) {
      const subs = p.subtopicRows.filter((r) => r.chapter === chapter.chapter);
      const summed = subs.reduce((n, r) => n + r.projected, 0);
      expect(summed).toBeCloseTo(chapter.projected, 5);
    }
  });

  it("makes the headline total reconcile at BOTH grains", () => {
    // The card renders one `projection.total` and lets the reader switch the
    // rows underneath it. If the two grains sum differently, one of the two
    // views is showing a total that its own rows do not support.
    const p = projectionOf();
    const fromChapters = p.rows.reduce((n, r) => n + r.projected, 0);
    const fromSubtopics = p.subtopicRows.reduce((n, r) => n + r.projected, 0);
    expect(fromSubtopics).toBeCloseTo(fromChapters, 5);
    expect(Math.round(fromSubtopics)).toBe(p.total);
  });

  it("ranks subtopics FLAT across chapters, not within them", () => {
    // "Which subtopic anywhere is worth the most" — the one idea worth taking
    // wholesale from nda-tracker's card. A per-chapter ranking cannot answer
    // the question the card is for.
    const p = projectionOf();
    const gaps = p.subtopicRows.map((r) => r.gap);
    expect([...gaps].sort((a, b) => b - a)).toEqual(gaps);
    // The untested Dot Product (5 marks, none recoverable) outranks everything.
    expect(p.subtopicRows[0].subtopic).toBe("Dot Product");
  });

  it("keeps an untested subtopic visible with its full marks at stake", () => {
    const dot = projectionOf().subtopicRows.find((r) => r.subtopic === "Dot Product")!;
    expect(dot.tested).toBe(false);
    expect(dot.projected).toBe(0);
    expect(dot.gap).toBeCloseTo(5, 5);
  });

  it("marks a subtopic resting on too little evidence as thin", () => {
    // Ranking is by marks, so a subtopic scored off ONE answer can still sort
    // high. The row has to say what it rests on — the same rule the chapter
    // accordion follows.
    const p = projectionOf();
    const parabola = p.subtopicRows.find((r) => r.subtopic === "Parabola")!;
    expect(parabola.judged).toBe(2);
    expect(parabola.thin).toBe(true);
    const dot = p.subtopicRows.find((r) => r.subtopic === "Dot Product")!;
    expect(dot.judged).toBe(0);
    expect(dot.thin).toBe(true);
  });

  it("reports a bank subtopic the student has never seen, not just ones they have", () => {
    // The weightage side is the bank's taxonomy; the performance side is what
    // they sat. A subtopic present only in the bank is the biggest gap there
    // is, so it must come from the BANK list, not from the student's rows.
    expect(projectionOf().subtopicRows.map((r) => r.subtopic).sort()).toEqual([
      "Dot Product", "Ellipse", "Parabola",
    ]);
  });

  const asOneRowPerChapter = [
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "All", q: 50 },
    { exam: "NDA", subject: "Mathematics", chapter: "Vectors", subtopic: "All", q: 50 },
  ];
  const coarseProjection = () =>
    buildPerformance(
      { ...input([attempt()], facts), dims, weightage: asOneRowPerChapter },
      NOW
    ).lanes[0].projection!;

  it("still splits a chapter's MARKS identically however the bank is grained", () => {
    // What SURVIVES of the old "PARITY GUARANTEE". Marks are additive, so the
    // pool a chapter plays for cannot care how the bank rows were grained.
    const byName = (p: { rows: { chapter: string; marksAtStake: number }[] }) =>
      p.rows.map((r) => [r.chapter, r.marksAtStake] as const).sort();
    expect(byName(coarseProjection())).toEqual(byName(projectionOf()));
    expect(coarseProjection().ceiling).toBe(projectionOf().ceiling);
  });

  it("no longer holds a chapter's PROJECTION steady when the bank is re-grained", () => {
    // NARROWED 2026-09-15, deliberately. The old test asserted every chapter
    // number byte-identical across grainings; that guarantee is gone, because
    // it cannot coexist with scoring a subtopic from its own questions.
    // `expectedMarks` is linear in marks but accuracy is a RATIO: pooling
    // weights a chapter's subtopics by how much the STUDENT engaged with each,
    // summing weights them by BANK SHARE. Only one can be the chapter's number,
    // and pooling spends a tested subtopic's accuracy on subtopics the student
    // has never been shown a question from.
    //
    // Here the coarse bank names a subtopic ("All") matching nothing in the
    // student's taxonomy, so no subtopic row resolves and Conics projects 0
    // though four questions were answered in it.
    //
    // The row is SELF-CONTRADICTORY, and that is the tell worth pinning: it
    // still reports tested=true and a 50% accuracy off its own chapter tally,
    // while projecting nothing — because only `projected` and `gap` come from
    // the subtopics. A future reader seeing "50% accuracy, 0.0 of 5.0 marks"
    // should land here rather than re-derive it.
    //
    // It does not occur on live data: `perf:smoke` asserts every answered
    // chapter resolves at least one bank subtopic (899 of 899 at last run).
    const coarse = coarseProjection();
    const conics = coarse.rows.find((r) => r.chapter === "Conics")!;
    expect(conics.marksAtStake).toBe(5);
    expect(conics.projected).toBe(0);
    expect(conics.gap).toBe(5);
    expect({ tested: conics.tested, accuracy: conics.accuracy }).toEqual({
      tested: true,
      accuracy: 50,
    });
    expect(coarse.total).not.toBe(projectionOf().total);
  });
});

describe("projection — blanks and the floor", () => {
  const weightage = [
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Parabola", q: 30 },
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", subtopic: "Ellipse", q: 20 },
    { exam: "NDA", subject: "Mathematics", chapter: "Vectors", subtopic: "Dot Product", q: 50 },
  ];
  const dims = {
    subjects: ["Mathematics"],
    chapters: ["Conics", "Vectors"],
    subtopics: ["Parabola", "Ellipse", "Dot Product"],
  };
  const P = 0.83 / 2.5; // the fixture's own marking scheme
  const projOf = (facts: PerfFact[]) =>
    buildPerformance({ ...input([attempt()], facts), dims, weightage }, NOW).lanes[0].projection!;
  const sub = (facts: PerfFact[], name: string) =>
    projOf(facts).subtopicRows.find((r) => r.subtopic === name)!;

  it("counts a reached-but-blank question in FULL, not at half weight", () => {
    // The half weight came from nda-tracker, whose data is INVIGILATED OMR: one
    // sitting, one hall, one clock, no retakes. There a blank means "couldn't do
    // it under the same pressure as everyone else", and discounting it is fair.
    // Here a student opens a paper at home and can answer the 35% they like the
    // look of. A blank earns zero marks in the real paper; the projection is
    // denominated in marks, so it counts as a zero.
    //
    // Parabola holds 30 of 100 bank questions on a 10-mark ceiling = 3 marks.
    // Two right, two blank: accuracy is 2/4, NOT 2/3 (which is what the half
    // weight gave — weightTotal 2 + 2x0.5 = 3).
    const facts = [
      right({ p: 1, c: 0, t: 0 }), right({ p: 2, c: 0, t: 0 }),
      blank({ p: 3, c: 0, t: 0 }), blank({ p: 4, c: 0, t: 0 }),
    ];
    const r = sub(facts, "Parabola");
    expect(r.accuracy).toBe(50);
    expect(r.projected).toBeCloseTo(0.5 * 3, 5);
  });

  it("measures the wrong-rate over questions REACHED, not just answered", () => {
    // The twin of the rule above, and they have to move together. Crediting a
    // blank as a zero but then charging the penalty at the ANSWERED-only wrong
    // rate models two different students in one expression: one who skips two
    // thirds of the paper, and one who answers all of it badly.
    //
    // 1 right, 1 wrong, 2 blank => reached 4. Both rates are 1/4.
    const facts = [
      right({ p: 1, c: 0, t: 0 }), wrong({ p: 2, c: 0, t: 0 }),
      blank({ p: 3, c: 0, t: 0 }), blank({ p: 4, c: 0, t: 0 }),
    ];
    const r = sub(facts, "Parabola");
    expect(r.accuracy).toBe(25);
    expect(r.wrongRate).toBe(25);
    expect(r.projected).toBeCloseTo(0.25 * 3 - 0.25 * 3 * P, 5);
  });

  it("leaves a NEVER-REACHED question out of both rates", () => {
    // Unchanged, and load-bearing: a question the clock ran out on says nothing
    // about the subtopic. Only `seenBlank` is evidence.
    const facts = [
      right({ p: 1, c: 0, t: 0 }), right({ p: 2, c: 0, t: 0 }),
      unseen({ p: 3, c: 0, t: 0 }), unseen({ p: 4, c: 0, t: 0 }),
    ];
    const r = sub(facts, "Parabola");
    expect(r.accuracy).toBe(100);
    expect(r.projected).toBeCloseTo(3, 5);
  });

  it("lets a row project NEGATIVE marks instead of flooring each one", () => {
    // Math.max(0, ..) per row is not grain-invariant: Sum(max(0,x)) >= max(0,Sum(x)),
    // so splitting a subtopic in two mechanically RAISES the projection. It also
    // deletes the most actionable line the card can print — "attempting this at
    // your current rate COSTS you marks" — and replaces it with an opportunity.
    // Negative is real here: this student scored -0.33 on a CDS paper.
    const facts = [
      wrong({ p: 1, c: 0, t: 0 }), wrong({ p: 2, c: 0, t: 0 }),
      wrong({ p: 3, c: 0, t: 0 }), wrong({ p: 4, c: 0, t: 0 }),
    ];
    const r = sub(facts, "Parabola");
    expect(r.projected).toBeCloseTo(-1 * 3 * P, 5);
    expect(r.projected).toBeLessThan(0);
  });

  it("floors the HEADLINE at zero, never a row", () => {
    // One guard, at the one place a negative would be nonsense to read.
    //
    // NOT inert, which I assumed before measuring: one production lane (72
    // answers at 17% accuracy on a negatively-marked paper) sums BELOW zero and
    // floors to 0 here. Deleting this would put a negative headline out of 300
    // in front of a student.
    const facts = [
      wrong({ p: 1, c: 0, t: 0 }), wrong({ p: 2, c: 0, t: 0 }),
      wrong({ p: 3, c: 0, t: 0 }), wrong({ p: 4, c: 0, t: 0 }),
    ];
    const p = projOf(facts);
    expect(p.subtopicRows.find((r) => r.subtopic === "Parabola")!.projected).toBeLessThan(0);
    expect(p.total).toBe(0);
  });
});

// ── audits ──────────────────────────────────────────────────────────────────

describe("audits", () => {
  it("ranks the wrong-answer audit by wrong count", () => {
    const dims = {
      subjects: ["Mathematics"],
      chapters: ["Conics"],
      subtopics: ["Parabola", "Ellipse"],
    };
    const facts = [
      wrong({ p: 1, t: 0 }), wrong({ p: 2, t: 0 }), wrong({ p: 3, t: 1 }), right({ p: 4, t: 1 }),
    ];
    const lane = buildPerformance({ ...input([attempt()], facts), dims }, NOW).lanes[0];
    expect(lane.wrongAudit[0].subtopic).toBe("Parabola");
    expect(lane.wrongAudit[0].wrong).toBe(2);
  });

  it("builds the skip audit from SEEN-blank only, never from unreached", () => {
    // This is the import that would have been wrong. A question the student
    // never got to says nothing about the subtopic.
    const dims = { subjects: ["Mathematics"], chapters: ["Conics"], subtopics: ["Parabola", "Ellipse"] };
    const facts = [
      blank({ p: 1, t: 0 }), right({ p: 2, t: 0 }),
      unseen({ p: 3, t: 1 }), unseen({ p: 4, t: 1 }),
    ];
    const lane = buildPerformance({ ...input([attempt()], facts), dims }, NOW).lanes[0];
    expect(lane.skipAudit.map((r) => r.subtopic)).toEqual(["Parabola"]);
    expect(lane.skipAudit[0].seenBlank).toBe(1);
  });

  it("carries the ids of both audits, and never crosses them", () => {
    // Both audits open the exact questions on /browse rather than a filter that
    // approximates them, so each row needs its own id list. Crossing the two
    // would send a student to revise questions they actually answered.
    const dims = { subjects: ["Mathematics"], chapters: ["Conics"], subtopics: ["Parabola"] };
    const facts = [
      blank({ p: 1, q: "seen-1" }),
      blank({ p: 2, q: "seen-2" }),
      wrong({ p: 3, q: "wrong-1" }),
      right({ p: 4, q: "right-1" }),
    ];
    const lane = buildPerformance({ ...input([attempt()], facts), dims }, NOW).lanes[0];
    expect(lane.skipAudit[0].seenBlankQuestionIds).toEqual(["seen-1", "seen-2"]);
    expect(lane.wrongAudit[0].wrongQuestionIds).toEqual(["wrong-1"]);
  });

  it("keeps NEVER-REACHED questions out of the skipped ids", () => {
    // The four-state model exists for exactly this. An id list that quietly
    // folded unreached questions in would hand back a \"revision set\" that is
    // really a record of where the clock ran out — and the card above it
    // promises the opposite in so many words.
    const dims = { subjects: ["Mathematics"], chapters: ["Conics"], subtopics: ["Parabola"] };
    const facts = [
      blank({ p: 1, q: "seen" }),
      unseen({ p: 2, q: "never-1" }),
      unseen({ p: 3, q: "never-2" }),
      right({ p: 4, q: "right-1" }),
    ];
    const lane = buildPerformance({ ...input([attempt()], facts), dims }, NOW).lanes[0];
    expect(lane.skipAudit[0].seenBlankQuestionIds).toEqual(["seen"]);
  });

  it("agrees with its own count at every grain", () => {
    // The badge reads the COUNT and the link reads the ID LIST. If they can
    // disagree, \"Open 7\" opens five questions and nothing reports it.
    const dims = {
      subjects: ["Mathematics"],
      chapters: ["Conics", "Vectors"],
      subtopics: ["Parabola", "Ellipse", "Dot Product"],
    };
    const facts = [
      blank({ p: 1, c: 0, t: 0, q: "b1" }), blank({ p: 2, c: 0, t: 1, q: "b2" }),
      wrong({ p: 3, c: 0, t: 0, q: "w1" }), wrong({ p: 4, c: 1, t: 2, q: "w2" }),
      blank({ p: 5, c: 1, t: 2, q: "b3" }), right({ p: 6, c: 1, t: 2, q: "r1" }),
      unseen({ p: 7, c: 0, t: 1, q: "u1" }),
    ];
    const lane = buildPerformance(
      { ...input([attempt({ totalQuestions: 7 })], facts), dims },
      NOW
    ).lanes[0];
    const rows = [...lane.chapters, ...lane.chapters.flatMap((c) => c.subtopics)];
    expect(rows.length).toBeGreaterThan(2);
    for (const r of rows) {
      expect(r.seenBlankQuestionIds).toHaveLength(r.seenBlank);
      expect(r.wrongQuestionIds).toHaveLength(r.wrong);
    }
  });
});

// ── difficulty ──────────────────────────────────────────────────────────────

describe("accuracy by difficulty", () => {
  it("reports each band separately and leaves an untouched band null", () => {
    const facts = [
      right({ p: 1, d: "EASY" }), right({ p: 2, d: "EASY" }),
      wrong({ p: 3, d: "HARD" }), unseen({ p: 4, d: "MODERATE" }),
    ];
    const rows = buildPerformance(input([attempt()], facts), NOW).lanes[0].difficulty;
    const by = Object.fromEntries(rows.map((r) => [r.difficulty, r]));
    expect(by.EASY.accuracy).toBe(100);
    expect(by.HARD.accuracy).toBe(0);
    // Reached zero of them → null. Zero would read as "got them all wrong".
    expect(by.MODERATE.accuracy).toBeNull();
  });
});

// ── thin evidence ───────────────────────────────────────────────────────────

describe("thin evidence", () => {
  it("carries the denominator next to every accuracy", () => {
    // The biggest difference from nda-tracker's proctored OMR data: the median
    // attempt here answers 36% of its paper, so a chapter row routinely rests
    // on one or two questions. A bare "100%" off two answers is not a finding.
    const facts = [right({ p: 1 }), wrong({ p: 2 }), blank({ p: 3 }), unseen({ p: 4 })];
    const lane = buildPerformance(input([attempt()], facts), NOW).lanes[0];
    expect(lane.judged).toBe(2);
    expect(lane.thin).toBe(true);
    expect(lane.chapters[0].judged).toBe(2);
    expect(lane.chapters[0].thin).toBe(true);
  });

  it("stops calling a row thin once it has enough judged answers", () => {
    const facts = [right({ p: 1 }), right({ p: 2 }), wrong({ p: 3 }), unseen({ p: 4 })];
    const lane = buildPerformance(input([attempt()], facts), NOW).lanes[0];
    expect(lane.judged).toBe(3);
    expect(lane.thin).toBe(false);
  });

  it("does not float a NEVER-ANSWERED chapter to the top of the weakness list", () => {
    // A chapter the student skipped entirely scores a weighted 0, which sorts
    // as their worst topic when it is really a coverage gap. That belongs to
    // the skip audit; the weakness ranking is for chapters we measured.
    const dims = {
      subjects: ["Mathematics"],
      chapters: ["Untouched", "GenuinelyWeak"],
      subtopics: ["S1", "S2"],
    };
    const facts = [
      blank({ p: 1, c: 0, t: 0 }), blank({ p: 2, c: 0, t: 0 }),
      wrong({ p: 3, c: 1, t: 1 }), wrong({ p: 4, c: 1, t: 1 }),
    ];
    const lane = buildPerformance({ ...input([attempt()], facts), dims }, NOW).lanes[0];
    expect(lane.chapters.map((c) => c.chapter)).toEqual(["GenuinelyWeak", "Untouched"]);
    expect(lane.chapters[1].judged).toBe(0);
    // ...and the untouched chapter is still reported, via the skip audit.
    expect(lane.skipAudit.map((r) => r.chapter)).toContain("Untouched");
  });
});

// ── time analysis ───────────────────────────────────────────────────────────

describe("time analysis", () => {
  it("splits the clock across the same buckets the coverage card counts", () => {
    // The two cards read off one sitting, so a student who sees "654 left
    // blank" above and a blank time share that excluded some of them would be
    // looking at two different papers.
    const facts = [
      right({ p: 1, ts: 20 }),
      wrong({ p: 2, ts: 60 }),
      blank({ p: 3, ts: 10 }),
      unseen({ p: 4 }),
    ];
    const t = buildPerformance(input([attempt()], facts), NOW).lanes[0].time;
    expect(t.correctSecs).toBe(20);
    expect(t.wrongSecs).toBe(60);
    expect(t.blankSecs).toBe(10);
    expect(t.totalSecs).toBe(90);
  });

  it("excludes never-reached questions from the clock entirely", () => {
    // They carry ts 0 by construction (no answer row exists), so including
    // them would not change the total — but it WOULD drag every median down.
    const facts = [right({ p: 1, ts: 20 }), unseen({ p: 2 }), unseen({ p: 3 })];
    const t = buildPerformance(input([attempt()], facts), NOW).lanes[0].time;
    expect(t.totalSecs).toBe(20);
    expect(t.medianCorrectSecs).toBe(20);
  });

  it("keeps the buckets summing to the total, including unjudgeable answers", () => {
    // A question answered whose key the bank lost scores verdict 0. It is
    // neither right nor wrong, but the student still spent the time — dropping
    // it would make the bars under-account for the sitting.
    const facts = [
      right({ p: 1, ts: 10 }),
      wrong({ p: 2, ts: 20 }),
      blank({ p: 3, ts: 30 }),
      fact({ p: 4, k: null, r: "B", ts: 40 }),
    ];
    const t = buildPerformance(input([attempt()], facts), NOW).lanes[0].time;
    expect(t.unjudgedSecs).toBe(40);
    expect(t.correctSecs + t.wrongSecs + t.blankSecs + t.unjudgedSecs).toBe(t.totalSecs);
  });

  it("reports medians per outcome, which is the finding a mean would hide", () => {
    // Dwell is wall-clock on the question and includes idle: production holds
    // a single question at 6,131 seconds. One such row moves a mean and not
    // a median, so every reported figure here is a median.
    const facts = [
      right({ p: 1, ts: 10 }), right({ p: 2, ts: 20 }), right({ p: 3, ts: 6131 }),
      wrong({ p: 4, ts: 40 }), wrong({ p: 5, ts: 60 }),
    ];
    const t = buildPerformance(input([attempt({ totalQuestions: 5 })], facts), NOW).lanes[0].time;
    expect(t.medianCorrectSecs).toBe(20);
    expect(t.medianWrongSecs).toBe(50);
  });

  it("counts reached-but-zero-dwell rows and keeps them out of the medians", () => {
    // 3,577 production rows (6.8%) have an answer row and no recorded dwell.
    // A zero there is a measurement gap, not a zero-second solve — reporting
    // it as one would assert something we did not observe.
    const facts = [
      right({ p: 1, ts: 0 }), right({ p: 2, ts: 0 }), right({ p: 3, ts: 30 }),
    ];
    const t = buildPerformance(input([attempt()], facts), NOW).lanes[0].time;
    expect(t.zeroDwell).toBe(2);
    expect(t.medianCorrectSecs).toBe(30);
  });

  it("returns nulls, never zeros, when a bucket was never timed", () => {
    const facts = [right({ p: 1, ts: 30 })];
    const t = buildPerformance(input([attempt()], facts), NOW).lanes[0].time;
    expect(t.medianWrongSecs).toBeNull();
    expect(t.medianBlankSecs).toBeNull();
  });

  it("ranks the slowest chapters and carries the accuracy they bought", () => {
    // The point of the card: 74s a question at 56% is a time sink, 74s at 90%
    // is time well spent. The number is only a finding next to its accuracy.
    const dims = {
      subjects: ["Mathematics"],
      chapters: ["Slow", "Fast"],
      subtopics: ["S1", "S2"],
    };
    const facts = [
      wrong({ p: 1, c: 0, t: 0, ts: 70 }), wrong({ p: 2, c: 0, t: 0, ts: 80 }),
      right({ p: 3, c: 0, t: 0, ts: 90 }),
      right({ p: 4, c: 1, t: 1, ts: 10 }), right({ p: 5, c: 1, t: 1, ts: 12 }),
      right({ p: 6, c: 1, t: 1, ts: 14 }),
    ];
    const t = buildPerformance(
      { ...input([attempt({ totalQuestions: 6 })], facts), dims },
      NOW
    ).lanes[0].time;
    expect(t.slowest[0].chapter).toBe("Slow");
    expect(t.slowest[0].medianSecs).toBe(80);
    expect(t.slowest[0].accuracy).toBe(33);
    expect(t.slowest[0].judged).toBe(3);
  });

  it("keeps a chapter with too few timed questions out of the slowest list", () => {
    // One 600-second question is an abandoned tab, not the student's slowest
    // topic, and it would otherwise top the ranking on every paper.
    const dims = {
      subjects: ["Mathematics"],
      chapters: ["OneOff", "Real"],
      subtopics: ["S1", "S2"],
    };
    const facts = [
      right({ p: 1, c: 0, t: 0, ts: 600 }),
      right({ p: 2, c: 1, t: 1, ts: 30 }), right({ p: 3, c: 1, t: 1, ts: 31 }),
      right({ p: 4, c: 1, t: 1, ts: 32 }),
    ];
    const t = buildPerformance(
      { ...input([attempt({ totalQuestions: 4 })], facts), dims },
      NOW
    ).lanes[0].time;
    expect(t.slowest.map((s) => s.chapter)).toEqual(["Real"]);
  });

  it("times the pace curve on the paper's own positions, not the lane's", () => {
    // A GAT subject can sit anywhere inside the 150, so head-vs-tail is a fact
    // about the SITTING. Positions 1-2 of a 10-question paper are its head.
    const facts = [
      right({ p: 1, ts: 60 }), right({ p: 2, ts: 60 }),
      right({ p: 9, ts: 10 }), right({ p: 10, ts: 10 }),
    ];
    const lane = buildPerformance(input([attempt({ totalQuestions: 10 })], facts), NOW).lanes[0];
    expect(lane.coverage.headMedianSecs).toBe(60);
    expect(lane.coverage.tailMedianSecs).toBe(10);
  });

  it("is present and empty rather than absent when a lane was never timed", () => {
    // A GAT subject the student never got to. The lane exists — the paper
    // carried its questions — but there is no clock to report, and an absent
    // `time` block would make the card crash rather than say so.
    const dims = {
      subjects: ["Mathematics", "Physics"],
      chapters: ["Conics", "Optics"],
      subtopics: ["Parabola", "Lenses"],
    };
    const facts = [
      right({ p: 1, s: 0, c: 0, t: 0, ts: 30 }),
      right({ p: 2, s: 0, c: 0, t: 0, ts: 30 }),
      unseen({ p: 3, s: 1, c: 1, t: 1 }),
      unseen({ p: 4, s: 1, c: 1, t: 1 }),
    ];
    const lanes = buildPerformance({ ...input([attempt()], facts), dims }, NOW).lanes;
    const untimed = lanes.find((l) => l.subject === "Physics")!;
    expect(untimed.time.totalSecs).toBe(0);
    expect(untimed.time.slowest).toEqual([]);
    expect(untimed.time.medianCorrectSecs).toBeNull();
  });
});
