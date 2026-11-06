/**
 * Practice evidence on the mastery map (2026-11-06). Pure core, no I/O.
 *
 * WHY. The map read only the first sitting of each mock. 596 of the 846
 * students with graded practice answers had never sat one, so they saw an
 * empty map, and a mistake fixed in the drill never moved a dot although the
 * map ("Fixing mistakes moves the dots") and the homepage both say it does.
 *
 * WHAT COUNTS is migration 0221's evidence: the latest graded answer to each
 * question on the bank, the board reader, the question of the day or the
 * drill. An answer read without picking an option is not evidence.
 *
 * OWNER RULINGS (2026-11-06):
 *   - per question, the LATEST answer counts, wherever it was given. A
 *     practice answer given after a mock replaces that question's mock answer
 *     (it is the same question, so it is counted once, not twice); one given
 *     before the mock is superseded by it.
 *   - a practice answer weighs the same as a mock answer, by the same recency
 *     rule (recencyWeight), through the same tally code (addToTally /
 *     finishRow), so there is one definition of the ability score, not two.
 *
 * WHAT IT TOUCHES: the chapter and subtopic BAND numbers (judged, right,
 * wrong, accuracy, weightedScore) and the lane's judged total. Everything that
 * needs a timed sitting with marks (projection, clock, difficulty, coverage,
 * the wrong/skip audits, markScore, trend, the sitting summary) stays exactly
 * as the mocks made it. That is why only the mastery map applies this:
 * /performance is the report on papers, and mixing practice into its chapter
 * list alone would make that list disagree with the cards beside it.
 *
 * Spec: tests/performance-practice.test.ts.
 */
import {
  addToTally,
  byWeakestMeasured,
  countedFacts,
  emptyLane,
  emptyTally,
  finishRow,
  MIN_JUDGED_FOR_CLAIM,
  recencyWeight,
  verdictOfFact,
  type ChapterRow,
  type Lane,
  type PerfInput,
  type Performance,
  type SubtopicRow,
  type Tally,
} from "./compute";
import { factRef, type PerfFact, type PracticeEvidence, type PracticeRow } from "./types";

const DAY_MS = 86_400_000;

type Bucket = { tally: Tally; practice: number };
type ChapterAcc = Bucket & { subs: Map<string, Bucket> };
type LaneAcc = { exam: string; subject: string; chapters: Map<string, ChapterAcc> };
type Place = { exam: string; subject: string; chapter: string; subtopic: string };

// The separator is the ESCAPE, never a raw NUL byte (see compute.ts).
const laneKey = (exam: string, subject: string) => `${exam}\u0000${subject}`;

/** A practice answer in the shape addToTally reads: reached, answered, untimed, no marks. */
function practiceFact(q: string, ok: boolean): PerfFact {
  return {
    a: "practice", p: 0, q, s: 0, c: 0, t: 0,
    d: "MODERATE", f: "mcq",
    k: "A", kn: null, r: ok ? "A" : "B", rn: null,
    g: false, m: 0, nm: 0, ts: 0, rc: true,
  };
}

/** Latest row per question. The RPC already returns one, but the rule is cheap to hold here too. */
function latestByQuestion(rows: PracticeRow[]): Map<string, PracticeRow> {
  const latest = new Map<string, PracticeRow>();
  for (const r of rows) {
    const cur = latest.get(r.q);
    if (!cur || Date.parse(r.at) > Date.parse(cur.at)) latest.set(r.q, r);
  }
  return latest;
}

export function withPractice(
  input: PerfInput,
  perf: Performance,
  practice: PracticeEvidence,
  now: Date
): Performance {
  if (practice.rows.length === 0) return perf;

  const latest = latestByQuestion(practice.rows);
  const { payload, keptById, facts } = countedFacts(input);
  const weightAt = (iso: string) => recencyWeight((now.getTime() - Date.parse(iso)) / DAY_MS);

  const lanes = new Map<string, LaneAcc>();
  const touched = new Set<string>();

  function add(place: Place, f: PerfFact, weight: number, at: string, fromPractice: boolean) {
    const key = laneKey(place.exam, place.subject);
    const lane = lanes.get(key) ?? { exam: place.exam, subject: place.subject, chapters: new Map() };
    const chap = lane.chapters.get(place.chapter) ?? { tally: emptyTally(), practice: 0, subs: new Map() };
    const sub = chap.subs.get(place.subtopic) ?? { tally: emptyTally(), practice: 0 };
    const verdict = verdictOfFact(f);
    addToTally(chap.tally, f, verdict, weight, at);
    addToTally(sub.tally, f, verdict, weight, at);
    if (fromPractice) {
      chap.practice++;
      sub.practice++;
      touched.add(key);
    }
    chap.subs.set(place.subtopic, sub);
    lane.chapters.set(place.chapter, chap);
    lanes.set(key, lane);
  }

  // When each question was last sat in a counted mock.
  const mockAt = new Map<string, number>();
  for (const f of facts) {
    const t = Date.parse(keptById.get(f.a)!.startedAt);
    mockAt.set(f.q, Math.max(mockAt.get(f.q) ?? -Infinity, t));
  }
  const supersededByPractice = (q: string) => {
    const p = latest.get(q);
    return p !== undefined && Date.parse(p.at) > (mockAt.get(q) ?? -Infinity);
  };

  // Mock facts, unless a later practice answer replaces the question. The
  // replacement is placed once, where the mock placed the question.
  const placed = new Set<string>();
  for (const f of facts) {
    const attempt = keptById.get(f.a)!;
    const place: Place = { exam: attempt.examName, ...factRef(f, payload.dims) };
    if (supersededByPractice(f.q)) {
      if (placed.has(f.q)) continue;
      const p = latest.get(f.q)!;
      add(place, practiceFact(f.q, p.ok), weightAt(p.at), p.at, true);
      placed.add(f.q);
      continue;
    }
    add(place, f, weightAt(attempt.startedAt), attempt.startedAt, false);
  }

  // Practice on questions no counted mock carries. A question a mock carries
  // was settled above: replaced when the practice came later, and left to the
  // mock when the practice came first.
  for (const [q, p] of latest) {
    if (placed.has(q) || mockAt.has(q)) continue;
    const place: Place = {
      exam: practice.dims.exams[p.e] ?? "",
      subject: practice.dims.subjects[p.s] ?? "",
      chapter: practice.dims.chapters[p.c] ?? "",
      subtopic: practice.dims.subtopics[p.t] ?? "",
    };
    // A row the dims cannot name is a payload fault; it is dropped, not shown blank.
    if (!place.exam || !place.subject || !place.chapter || !place.subtopic) continue;
    add(place, practiceFact(q, p.ok), weightAt(p.at), p.at, true);
  }

  const out: Lane[] = perf.lanes.map((lane) => {
    const key = laneKey(lane.exam, lane.subject);
    return touched.has(key) ? rebuildLane(lane, lanes.get(key)!) : lane;
  });
  const known = new Set(perf.lanes.map((l) => laneKey(l.exam, l.subject)));
  const added = [...touched]
    .filter((key) => !known.has(key))
    .map((key) => {
      const acc = lanes.get(key)!;
      return rebuildLane(emptyLane(acc.exam, acc.subject, now), acc);
    })
    .sort((a, b) => b.judged - a.judged || a.subject.localeCompare(b.subject));

  return { summary: perf.summary, lanes: [...out, ...added] };
}

/**
 * A row's band numbers from the combined tally; everything that needs a
 * timed sitting from the mock row, or "none" when there was no mock row.
 */
function mergeRow(combined: SubtopicRow, mock: SubtopicRow | undefined, practiceJudged: number): SubtopicRow {
  if (!mock) {
    return { ...combined, markScore: 0, trend: "unknown", medianSecs: null, timedCount: 0, practiceJudged };
  }
  return {
    ...combined,
    markScore: mock.markScore,
    trend: mock.trend,
    medianSecs: mock.medianSecs,
    timedCount: mock.timedCount,
    wrongQuestionIds: mock.wrongQuestionIds,
    seenBlankQuestionIds: mock.seenBlankQuestionIds,
    practiceJudged,
  };
}

function rebuildLane(base: Lane, acc: LaneAcc): Lane {
  const mockChapters = new Map(base.chapters.map((c) => [c.chapter, c]));

  const chapters: ChapterRow[] = [...acc.chapters.entries()]
    .map(([name, ch]) => {
      const mockCh = mockChapters.get(name);
      const mockSubs = new Map((mockCh?.subtopics ?? []).map((s) => [s.subtopic, s]));
      const subtopics = [...ch.subs.entries()]
        .map(([sName, s]) => mergeRow(finishRow(s.tally, name, sName), mockSubs.get(sName), s.practice))
        .sort(byWeakestMeasured);
      const row = mergeRow(
        finishRow(ch.tally, name, name),
        mockCh ? { ...mockCh, subtopic: name } : undefined,
        ch.practice
      );
      const { subtopic: _drop, ...rest } = row;
      void _drop;
      return { ...rest, subtopics };
    })
    .sort(byWeakestMeasured);

  const correct = chapters.reduce((n, c) => n + c.correct, 0);
  const wrong = chapters.reduce((n, c) => n + c.wrong, 0);
  const judged = correct + wrong;
  return {
    ...base,
    chapters,
    judged,
    thin: judged < MIN_JUDGED_FOR_CLAIM,
    accuracy: judged > 0 ? Math.round((correct / judged) * 100) : null,
  };
}

/**
 * The exam of the student's most recent evidence, paper or practice: the map
 * opens on it. Without this a practice-only student, who has no latest
 * sitting, would land on whichever exam sorts first.
 */
export function latestEvidenceExam(perf: Performance, practice: PracticeEvidence): string | null {
  let exam = perf.summary.latest?.exam ?? null;
  let at = perf.summary.latest ? Date.parse(perf.summary.latest.at) : -Infinity;
  for (const r of practice.rows) {
    const t = Date.parse(r.at);
    const name = practice.dims.exams[r.e];
    if (name && t > at) {
      at = t;
      exam = name;
    }
  }
  return exam;
}
