/**
 * No method note reaches a student (owner, 2026-11-19, and again 2026-11-22):
 * a line on HOW an answer was got ("[Answer worked out by PYQ Vault: ... Two
 * independent solutions agreed.]", "[Derived answer — ... Verify before
 * relying on it.]") tells a student nothing about the question, and in a book it
 * only adds pages. The fact belongs in question_reviews, never in `solution`.
 *
 * Two guards: the pure splitter the one-off cleanup uses (and the DB CHECK
 * mirrors), and a scan of the ingestion scripts so a lane copied from an old one
 * cannot start writing the note again.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { METHOD_NOTE_OPENINGS, hasMethodNote, splitMethodNotes } from "@/lib/questions/methodNotes";

const NOTES = [
  "[Answer worked out by PYQ Vault: MSTA has not published a key for this paper. Two independent solutions agreed.]",
  "[Answer worked out by PYQ Vault: the Rashtriya Military Schools have not published a key for this paper. Two independent solutions disagreed; the answer was settled by hand.]",
  "[उत्तर PYQ Vault ने निकाला है: इस प्रश्नपत्र की उत्तर-कुंजी प्रकाशित नहीं हुई है। दो स्वतंत्र हलों का उत्तर एक आया।]",
  "[One sample answer written by PYQ Vault: this writing task has no single right answer.]",
  "[Derived answer — this booklet carries no official key. Two independent blind derivations agreed; confidence: MED. Verify before relying on it.]",
  "[Derived answer. This booklet carries no official key.]",
  "[Answer derived from the printed UPSC paper, which carries no answer key; the answer stored here before was wrong.]",
  "[Answer from the official UPSC provisional answer key for this sitting. The explanation was written blind before the key was opened and checked against it.]",
];

describe("splitMethodNotes", () => {
  it.each(NOTES.map((n) => [n.slice(0, 40), n]))("cuts %s… from the end of a solution and keeps the working", (_label, note) => {
    const working = "Frequency = \\(\\frac{1}{T}\\) = 500 Hz.";
    expect(splitMethodNotes(`${working} ${note}`)).toEqual({ solution: working, notes: [note.slice(1, -1)] });
    expect(splitMethodNotes(`${working}\n\n${note}`).solution).toBe(working);
  });

  it("cuts a note in the middle and keeps the text on both sides", () => {
    const out = splitMethodNotes(`**Note:** misprint.\n\n${NOTES[4]}\n\nAnswer: (b) because 2 + 2 = 4.`);
    expect(out.solution).toBe("**Note:** misprint.\n\nAnswer: (b) because 2 + 2 = 4.");
    expect(out.notes).toHaveLength(1);
  });

  it("leaves a solution with no method note untouched, display maths and textbook notes included", () => {
    const keep = [
      "Use \\[ v = f\\lambda \\] so f = 660 Hz.",
      "[Textbook answer-key error: the printed key gives r = 45.] The ratio reduces to 56.",
      "Answer: (c). [Figure: a convex lens]",
    ];
    for (const s of keep) expect(splitMethodNotes(s)).toEqual({ solution: s, notes: [] });
  });

  it("returns null for a solution that was only a method note, and passes null through", () => {
    expect(splitMethodNotes(NOTES[0]).solution).toBeNull();
    expect(splitMethodNotes(null)).toEqual({ solution: null, notes: [] });
  });

  it("hasMethodNote agrees with the splitter", () => {
    for (const n of NOTES) expect(hasMethodNote(`x ${n}`)).toBe(true);
    expect(hasMethodNote("[Textbook answer-key error: r = 45.]")).toBe(false);
    expect(hasMethodNote(null)).toBe(false);
  });
});

describe("migration 0280 refuses the same notes", () => {
  it("lists exactly METHOD_NOTE_OPENINGS, on questions and on translations", () => {
    const sql = readFileSync("supabase/migrations/0280_no_method_notes.sql", "utf8");
    const lists = [...sql.matchAll(/!~\* '\\\[\(([^)]*)\)'/g)].map((m) => m[1].split("|"));
    expect(lists).toHaveLength(2);
    for (const l of lists) expect(l).toEqual([...METHOD_NOTE_OPENINGS]);
  });
});

/** Every .ts file under a folder. */
function tsFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "node_modules" ? [] : tsFiles(p);
    return p.endsWith(".ts") || p.endsWith(".tsx") ? [p] : [];
  });
}

describe("no script writes a method note into a solution", () => {
  // The note's opening after an UNESCAPED bracket, on a line that is not a comment:
  // a string or template being built. A regex literal escapes the bracket (\[).
  const WRITE = /(?<!\\)\[(?:Answer worked out by PYQ Vault|One sample answer written by PYQ Vault|उत्तर PYQ Vault|Derived answer|Answer derived from the printed|Answer from the official)/;
  const ALLOWED = new Set([join("src", "lib", "questions", "methodNotes.ts")]);

  it("finds none in scripts/ or src/", () => {
    const hits = [...tsFiles("scripts"), ...tsFiles("src")]
      .filter((f) => !ALLOWED.has(f))
      .flatMap((f) =>
        readFileSync(f, "utf8")
          .split("\n")
          .map((line, i) => ({ f, i: i + 1, line: line.trim() }))
          .filter(({ line }) => !line.startsWith("*") && !line.startsWith("//") && WRITE.test(line))
          .map(({ f, i }) => `${f}:${i}`)
      );
    expect(hits).toEqual([]);
  }, 180_000);
});
