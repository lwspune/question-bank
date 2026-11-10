/**
 * Short intros under page headings (owner, 2026-11-10). On a phone the long
 * ones ran 4-7 lines and explained what the page shows right below them.
 *
 * - Homework plan pages show the stored summary's FIRST sentence plus "most
 *   asked first". The stored summary (homework_plans.summary) is unchanged;
 *   only the page shortens it, so no database row is rewritten.
 * - Notes subject hubs say how many chapters and how to start.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { planIntro } from "@/lib/homework/intro";
import { subjectNotesIntro } from "@/lib/notes/subjectIntro";

const DATA = join(process.cwd(), "scripts", "homework", "data");
const summaries = readdirSync(DATA)
  .filter((f) => f.endsWith(".json"))
  .map((f) => ({ file: f, summary: JSON.parse(readFileSync(join(DATA, f), "utf8")).summary as string }));

describe("planIntro (/homework/<plan>)", () => {
  it("has every plan's summary to check", () => {
    expect(summaries.length).toBeGreaterThanOrEqual(30);
  });

  it("CBSE Class 12 Maths reads as approved", () => {
    const s = summaries.find((x) => x.file === "cbse-12-mathematics.json")!.summary;
    expect(planIntro(s)).toBe(
      "CBSE Class 12 Mathematics board questions, 2022 to 2026, five a day, most asked first."
    );
  });

  it("every plan gets one short sentence: its opening line plus 'most asked first'", () => {
    const bad = summaries
      .map(({ file, summary }) => ({ file, intro: planIntro(summary), first: summary.split(". ")[0] }))
      .filter(({ intro, first }) => intro !== `${first}, most asked first.` || intro.length > 120);
    expect(bad).toEqual([]);
  });

  it("leaves a summary that is already one sentence as it is", () => {
    expect(planIntro("NDA Maths past questions, five a day.")).toBe("NDA Maths past questions, five a day.");
  });
});

describe("subjectNotesIntro (/notes/<subject>)", () => {
  it("reads as approved for a subject with several chapters", () => {
    expect(subjectNotesIntro(26, "CDS Mathematics")).toBe(
      "26 chapters of CDS Mathematics. Each stands alone, so start where you are weakest."
    );
  });

  it("does not say 'each' for a one-chapter subject", () => {
    const s = subjectNotesIntro(1, "CDS Economics");
    expect(s).toBe("One chapter of CDS Economics.");
    expect(s).not.toMatch(/each/i);
  });
});
