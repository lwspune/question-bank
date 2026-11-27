/**
 * The Visuals viewer keeps the student in the feed (owner, 2026-11-25): "Read
 * in notes" opens the concept's notes in a panel (components/reveal/TeachPanel)
 * and "Practise" opens the drill panel, both over the visual, instead of
 * leaving for the notes page. A source scan: the viewer is behind a tap and
 * the repo has no DOM renderer.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";

const read = (...p: string[]) => readFileSync(path.resolve(__dirname, "..", ...p), "utf8");
const viewer = read("src", "app", "visuals", "[subjectRoute]", "GalleryViewer.tsx");

describe("the Visuals viewer's panels", () => {
  it("Read in notes opens the notes panel, not the notes page", () => {
    expect(viewer).not.toMatch(/<Link[^>]*href=\{notesHrefOf/);
    expect(viewer).toMatch(/<TeachPanel[\s\S]*?notesHref=\{notesHrefOf\(/);
    expect(viewer).toMatch(/closeHint="Close to go back to the visual"[\s\S]*?\/>/);
  });

  it("the notes panel does not send the student off to the diagram they just saw", () => {
    expect(viewer).toMatch(/<TeachPanel[\s\S]*?skipDiagramNoteFor=\{[^}]*conceptSlug\}/);
  });

  it("Escape closes only the open panel, never the viewer under it", () => {
    // React passes a portaled sheet's key presses up to the viewer's onKeyDown.
    expect(viewer).toMatch(/function onKeyDown[\s\S]*?if \(practice !== null \|\| reading !== null\) return;/);
  });

  it("a wrong answer's Teach me opens this visual's notes, not V", () => {
    expect(viewer).toMatch(/<NotesDrillPanel[\s\S]*?teachNotesHref=\{notesHrefOf\(practising\)\}/);
    const drill = read("src", "app", "notes", "_components", "NotesDrillPanel.tsx");
    expect(drill).toMatch(/teachNotesHrefProp \?\? \(parseNotesHref\(pagePath\)/);
  });

  it("the notes panel can name where closing goes and hand focus back", () => {
    const teach = read("src", "components", "reveal", "TeachPanel.tsx");
    expect(teach).toMatch(/closeHint = "Close to go back to your question"/);
    // Focus still goes back; since 2026-11-27 without scrolling ({ preventScroll: true }), so V can show Your turn.
    expect(teach).toMatch(/returnFocusTo\?\.current\?\.focus\((\{ preventScroll: true \})?\)/);
    expect(teach).toMatch(/diagramNoteShown\(c, skipDiagramNoteFor\)/);
  });
});
