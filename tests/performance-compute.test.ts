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
  const weightage = [
    { exam: "NDA", subject: "Mathematics", chapter: "Conics", q: 50 },
    { exam: "NDA", subject: "Mathematics", chapter: "Vectors", q: 50 },
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
    const conics = buildPerformance({ ...input([attempt()], facts), weightage }, NOW)
      .lanes[0].projection!.rows.find((r) => r.chapter === "Conics")!;
    // 50% accuracy on 5 marks = 2.5, LESS 50% wrong-rate x 5 x (0.83/2.5).
    expect(conics.projected).toBeCloseTo(2.5 - 0.5 * 5 * (0.83 / 2.5), 5);
    expect(conics.projected).toBeLessThan(2.5);
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
        weightage: [{ exam: "MHT-CET", subject: "Mathematics", chapter: "Conics", q: 50 }],
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
