/**
 * notes:lint reads the database in BULK, not once per note.
 *
 * Until 2026-10-26 the lint awaited ~6 lookups per subtopic note, one after
 * another. At 2,220 notes that was ~13,000 round trips (~30 min locally), and
 * the daily prod-contract job was cancelled at its 25-minute limit every day
 * from 2026-10-05, the day the lint joined it. These tests run the real loader
 * + checks over an in-memory fake that behaves like PostgREST where it matters
 * (1000-row cap, ~200-value `.in()` limit) and:
 *   1. pin every verdict the lint gives, in its per-note order;
 *   2. fail if the request count grows with the number of notes.
 */
import { describe, expect, it } from "vitest";
import type { SubtopicNote } from "../src/app/notes/_types";
import { checkNotes, loadLintSnapshot, type NoteRef } from "../src/lib/notes/lintNotes";

type Row = Record<string, unknown>;
type Tables = Record<string, Row[]>;

/** A PostgREST-shaped fake: select/eq/in/order/range, thenable, counting requests. */
function fakeDb(tables: Tables) {
  const requests: string[] = [];
  const failOn = new Set<string>();
  const client = {
    from(table: string) {
      const filters: ((r: Row) => boolean)[] = [];
      const orders: string[] = [];
      let range: [number, number] | null = null;
      const b = {
        select: () => b,
        eq(col: string, v: unknown) {
          filters.push((r) => r[col] === v);
          return b;
        },
        in(col: string, vs: unknown[]) {
          if (vs.length > 200) throw new Error(`.in(${col}) with ${vs.length} values would overflow the URL`);
          const set = new Set(vs);
          filters.push((r) => set.has(r[col]));
          return b;
        },
        order(col: string) {
          orders.push(col);
          return b;
        },
        range(from: number, to: number) {
          range = [from, to];
          return b;
        },
        then(resolve: (v: unknown) => unknown, reject?: (e: unknown) => unknown) {
          requests.push(table);
          if (failOn.has(table)) return Promise.resolve({ data: null, error: { message: `boom on ${table}` } }).then(resolve, reject);
          let rows = (tables[table] ?? []).filter((r) => filters.every((f) => f(r)));
          rows = [...rows].sort((a, z) => {
            for (const c of orders) {
              const x = String(a[c]);
              const y = String(z[c]);
              if (x !== y) return x < y ? -1 : 1;
            }
            return 0;
          });
          const [from, to] = range ?? [0, rows.length - 1];
          rows = rows.slice(from, Math.min(to + 1, from + 1000)); // PostgREST's silent cap
          return Promise.resolve({ data: rows, error: null }).then(resolve, reject);
        },
      };
      return b;
    },
  };
  return { client, requests, failOn };
}

function formula(slug: string, pyqExampleId?: string, prompt = "Find x if x + 1 = 2.") {
  return {
    kind: "formula",
    slug,
    name: `Concept ${slug}`,
    pyqExampleId,
    authoredExample: { prompt },
  };
}

function ref(i: number, over: Partial<NoteRef> = {}, concepts: unknown[] = [formula(`c${i}`, `q${i}`)]): NoteRef {
  return {
    path: `maths/ch/s${i}`,
    subtopicSlug: `s${i}`,
    exam: "NDA",
    subject: "Mathematics",
    chapter: "Algebra",
    note: { subtopicName: `Sub ${i}`, concepts } as unknown as SubtopicNote,
    ...over,
  };
}

/** A bank where notes 0..n-1 all resolve, each with one PUBLIC featured PYQ and one tag. */
function cleanBank(n: number): Tables {
  return {
    exams: [{ id: "e1", name: "NDA" }],
    subjects: [{ id: "sj1", exam_id: "e1", name: "Mathematics" }],
    chapters: [{ id: "ch1", subject_id: "sj1", name: "Algebra" }],
    subtopics: Array.from({ length: n }, (_, i) => ({ id: `st${i}`, chapter_id: "ch1", name: `Sub ${i}` })),
    questions: Array.from({ length: n }, (_, i) => ({
      id: `q${i}`,
      visibility: "PUBLIC",
      subtopic_id: `st${i}`,
      text: "Solve 7y = 91.",
    })),
    question_concept_tags: Array.from({ length: n }, (_, i) => ({
      question_id: `q${i}`,
      subtopic_slug: `s${i}`,
      concept_slug: `c${i}`,
    })),
  };
}

async function lint(notes: NoteRef[], tables: Tables) {
  const db = fakeDb(tables);
  const snap = await loadLintSnapshot(db.client as never, notes);
  return { issues: checkNotes(notes, snap), requests: db.requests };
}

describe("notes:lint verdicts", () => {
  it("a clean bank gives no issues", async () => {
    const notes = [0, 1, 2].map((i) => ref(i));
    expect((await lint(notes, cleanBank(3))).issues).toEqual([]);
  });

  it("missing exam / subject / chapter stops that note; a missing subtopic does not", async () => {
    const bank = cleanBank(4);
    bank.subtopics = bank.subtopics.filter((s) => s.id !== "st3");
    const notes = [
      ref(0, { exam: "CDS" }),
      ref(1, { subject: "Physics" }),
      ref(2, { chapter: "Calculus" }),
      ref(3),
    ];
    const { issues } = await lint(notes, bank);
    expect(issues.map((i) => [i.severity, i.note, i.message])).toEqual([
      ["error", "maths/ch/s0", "exam not found: CDS"],
      ["error", "maths/ch/s1", "subject not found: Physics under exam NDA"],
      ["error", "maths/ch/s2", "chapter not found: Calculus under Mathematics"],
      ["error", "maths/ch/s3", 'subtopic not found: "Sub 3". The taxonomy may have been renamed or merged'],
    ]);
  });

  it("featured PYQs: not found, PRIVATE, wrong subtopic", async () => {
    const bank = cleanBank(3);
    bank.questions = [
      { id: "q1", visibility: "PRIVATE", subtopic_id: "st1", text: "x" },
      { id: "q2", visibility: "PUBLIC", subtopic_id: "st0", text: "x" },
    ];
    const { issues } = await lint([0, 1, 2].map((i) => ref(i)), bank);
    const msgs = issues.map((i) => `${i.note}: ${i.message}`);
    expect(msgs).toEqual([
      'maths/ch/s0: pyqExampleId not found in bank: q0 (concept "Concept c0", concept)',
      'maths/ch/s1: pyqExampleId is PRIVATE, so students won\'t see it: q1 (concept "Concept c1", concept)',
      expect.stringContaining('maths/ch/s2: pyqExampleId q2 lives in a different subtopic than "Sub 2"'),
    ]);
  });

  it("reference tables: column count, empty table, ragged row; row-level PYQ ids are checked", async () => {
    const bank = cleanBank(1);
    bank.question_concept_tags.push({ question_id: "q0", subtopic_slug: "s0", concept_slug: "r" });
    const table = {
      kind: "reference",
      slug: "r",
      name: "Ref",
      table: { columns: ["a"], rows: [{ cells: ["1", "2"], pyqExampleId: "missing" }] },
    };
    const { issues } = await lint([ref(0, {}, [formula("c0", "q0"), table])], bank);
    expect(issues.map((i) => i.message)).toEqual([
      'reference concept "Ref" has 1 columns; must be 2–5',
      'reference concept "Ref" row 0 has 2 cells but table declares 1 columns',
      'pyqExampleId not found in bank: missing (concept "Ref", table.row0)',
    ]);
  });

  it("tags: orphan concept_slug is an error, untagged concept a warning, foundation concepts exempt", async () => {
    const bank = cleanBank(1);
    bank.question_concept_tags = [
      { question_id: "q9", subtopic_slug: "s0", concept_slug: "gone" },
      { question_id: "q0", subtopic_slug: "OTHER", concept_slug: "c0" },
    ];
    const { issues } = await lint([ref(0, {}, [formula("c0", "q0"), formula("foundation")])], bank);
    expect(issues.map((i) => [i.severity, i.message])).toEqual([
      ["error", 'DB tag has unknown concept_slug "gone" (question q9). Was the concept renamed or removed?'],
      ["warn", 'concept "Concept c0" (slug "c0") has 0 tagged questions in question_concept_tags. Run a tagging session'],
    ]);
  });

  it("warns when a worked example re-uses the featured PYQ's numbers", async () => {
    const bank = cleanBank(1);
    bank.questions[0].text = "If 37x + 112 = 1999, find x when y = 4.5.";
    const { issues } = await lint([ref(0, {}, [formula("c0", "q0", "Solve 37x + 112 = 1999 with y = 4.5.")])], bank);
    expect(issues).toHaveLength(1);
    expect(issues[0].severity).toBe("warn");
    expect(issues[0].message).toContain("worked example re-uses the featured PYQ's numbers");
  });

  it("reads past PostgREST's 1000-row cap (an orphan on tag row 1,500 is still found)", async () => {
    const bank = cleanBank(1);
    bank.question_concept_tags = Array.from({ length: 1500 }, (_, i) => ({
      question_id: `t${String(i).padStart(5, "0")}`,
      subtopic_slug: "s0",
      concept_slug: i === 1499 ? "orphan" : "c0",
    }));
    const { issues } = await lint([ref(0)], bank);
    expect(issues.map((i) => i.message)).toEqual([
      expect.stringContaining('unknown concept_slug "orphan" (question t01499)'),
    ]);
  });

  it("a database error fails the run instead of reading as 'not found'", async () => {
    const db = fakeDb(cleanBank(1));
    db.failOn.add("subtopics");
    await expect(loadLintSnapshot(db.client as never, [ref(0)])).rejects.toThrow(/boom on subtopics/);
  });
});

describe("notes:lint request count", () => {
  it("does not grow with the number of notes", async () => {
    const small = await lint([0, 1, 2].map((i) => ref(i)), cleanBank(3));
    const big = await lint(
      Array.from({ length: 900 }, (_, i) => ref(i)),
      cleanBank(900)
    );
    expect(big.issues).toEqual([]);
    // Bulk reads cost one request per ~200-value chunk or 1000-row page, so
    // 900 notes may add a handful; a per-note loop would add thousands.
    expect(small.requests.length).toBeLessThanOrEqual(8);
    expect(big.requests.length).toBeLessThanOrEqual(30);
  });
});
