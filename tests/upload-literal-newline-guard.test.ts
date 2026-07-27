/**
 * The write-boundary guard against literal `\n` (backslash + n) reaching the DB.
 *
 * Why REJECT rather than silently normalise: `content_hash` is computed by the
 * CALLER from the pre-normalisation text. If commitStaged quietly rewrote the
 * text at insert, the stored text would no longer be the hash's preimage — and
 * the next re-ingest from a corrected source file would compute a different
 * hash and insert duplicates. Failing loudly forces source ↔ DB ↔ hash to stay
 * consistent. (The Excel parser already normalises before hashing, so that path
 * never trips this.)
 *
 * Real incident: MH_SSC_10_Algebra_2020.pdf shipped 22 PUBLIC rows whose stems
 * and solutions carried literal `\n`, so their GFM pipe-tables never rendered.
 * Two students reported it.
 */
import { describe, it, expect } from "vitest";
import { literalNewlineFields } from "@/lib/upload/textGuard";

const clean = {
  text: "What is the mean?",
  context: null,
  solution: "Mean = 141/50 = 2.82 litre.",
};

describe("literalNewlineFields", () => {
  it("passes clean rows", () => {
    expect(literalNewlineFields(clean)).toEqual([]);
  });

  it("passes text carrying REAL newlines (a correct pipe-table)", () => {
    expect(
      literalNewlineFields({
        ...clean,
        text: "Data:\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\nFind the mean.",
      })
    ).toEqual([]);
  });

  it("flags a literal backslash-n in the stem", () => {
    expect(
      literalNewlineFields({ ...clean, text: "Data:\\n\\n| A | B |\\n|---|---|" })
    ).toEqual(["text"]);
  });

  it("flags a literal backslash-n in the solution", () => {
    expect(
      literalNewlineFields({ ...clean, solution: "Step 1.\\nStep 2." })
    ).toEqual(["solution"]);
  });

  it("flags context, and reports every offending field", () => {
    expect(
      literalNewlineFields({
        text: "A.\\nB.",
        context: "Passage.\\nMore.",
        solution: "Ans.\\nDone.",
      }).sort()
    ).toEqual(["context", "solution", "text"]);
  });

  it("does NOT flag LaTeX commands beginning with \\n inside math zones", () => {
    expect(
      literalNewlineFields({
        ...clean,
        text: "Given \\(a \\neq b\\) and \\(\\nabla f = 0\\), with \\(\\nu > 0\\).",
        solution: "Since \\(x \\notin A\\), done.",
      })
    ).toEqual([]);
  });

  it("does NOT flag a LaTeX matrix row separator", () => {
    expect(
      literalNewlineFields({
        ...clean,
        solution: "\\(\\begin{vmatrix}m&m&n\\\\1&0&1\\\\n&n&p\\end{vmatrix}=0\\)",
      })
    ).toEqual([]);
  });

  it("tolerates null/undefined optional fields", () => {
    expect(literalNewlineFields({ text: "x", context: null, solution: null })).toEqual([]);
    expect(literalNewlineFields({ text: "x" })).toEqual([]);
  });
});
