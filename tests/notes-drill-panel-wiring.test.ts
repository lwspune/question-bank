/**
 * Both notes drill links open the panel on the page (owner, 2026-11-15), not
 * /browse as a new page: "Drill N more on <concept>" under each concept card and
 * "Drill all N questions" at the foot of a topic. /browse stays one tap away as
 * the panel's "Open in the bank". A source scan: these are server components
 * on cached pages, and the repo has no DOM renderer.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (...p: string[]) => readFileSync(path.resolve(__dirname, "..", ...p), "utf8");

describe("notes drill links open the panel", () => {
  it("a concept card's drill is the panel button, not a link to /browse", () => {
    const src = read("src", "app", "notes", "_components", "ConceptUnitCard.tsx");
    expect(src).toMatch(/<NotesDrillButton[\s\S]*?link="concept"/);
    // /browse survives only as the panel's fullHref, never as the link itself.
    expect(src).not.toMatch(/<Link\s+href=\{buildBrowseUrl/);
    expect(src).toMatch(/fullHref=\{buildBrowseUrl\(\{\s*extraIds: drillQuestionIds/);
  });

  it("a topic's Drill all is the panel button, not a BrowseLink", () => {
    const src = read("src", "app", "notes", "_components", "NotesSubtopicPage.tsx");
    expect(src).toMatch(/<NotesDrillButton[\s\S]*?link="topic"/);
    expect(src).not.toMatch(/<BrowseLink/);
  });

  it("the panel keeps /browse one tap away and records leaving for it", () => {
    const src = read("src", "app", "notes", "_components", "NotesDrillPanel.tsx");
    expect(src).toMatch(/Open in the bank/);
    expect(src).toMatch(/onFullPage/);
  });
});
