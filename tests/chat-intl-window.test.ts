/**
 * V's window on intl.pyqvault.com (owner, 2026-11-19). Until then the window
 * returned null on intl while its Ask V listeners stayed live: a tap sent the
 * question, V answered, and the student saw nothing. Source scans (no jsdom
 * here): the window shows on intl, offers no practice-test builder there (its
 * exams and pass checks are www's), and every link it draws itself stays on
 * the site the student is on.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (rel: string) => readFileSync(join(process.cwd(), rel), "utf8");
const widget = read("src/components/chat/ChatWidget.tsx");

describe("V's window on intl", () => {
  it("is not hidden on intl", () => {
    expect(widget).not.toMatch(/if \(placement\.hidden \|\| intl\) return null/);
    expect(widget).toMatch(/if \(placement\.hidden\) return null/);
  });

  it("offers Build a practice test only on www", () => {
    expect(widget).toMatch(/\{!intl && \(\s*<button[^]*?onClick=\{openBuilder\}/);
  });

  it("greets without pointing at a button intl does not have", () => {
    expect(widget).toMatch(/intl \? INTL_GREETING : GREETING/);
  });

  it("links progress to the student's own site (intl has no /performance)", () => {
    for (const rel of ["src/components/chat/VProgressCard.tsx", "src/components/chat/VDayCard.tsx"]) {
      const src = read(rel);
      expect(src, rel).toMatch(/progressPathFor\(/);
      expect(src, rel).not.toMatch(/href="\/performance"/);
    }
  });
});

// The same day: "Teach me the idea" under a wrong answer in a notes page's question list messaged V,
// because those cards carried no notes link. The list now hands its cards the page they are on.
describe("Teach me the idea in the notes question list", () => {
  it("the panel hands its cards the notes page they are on", () => {
    expect(read("src/app/notes/_components/NotesDrillPanel.tsx")).toMatch(/teachNotesHref=\{/);
  });

  it("a card's teach button falls back to that link when the card has no notes link of its own", () => {
    expect(read("src/app/browse/QuestionCard.tsx")).toMatch(/notesHref=\{resources\?\.notes\?\.href \?\? teachNotesHref \?\? null\}/);
  });
});
