/**
 * The /notes chapter hero collapses its intro behind a "Read more".
 *
 * WHY THE HERO AND NOTHING ELSE. `intro` is the ONE long-form string on the
 * chapter landing — measured across the 85 shipped chapters it runs a median of
 * 1,035 chars (~165 words), p90 1,359, max 1,673 (nda-physics/light-optics, 267
 * words). On a phone that is 15-18 lines before the reader reaches a single
 * link. Every OTHER hero on the surface is already short by construction — the
 * subtopic hero renders `oneLineDefinition`, the subject hero a generated
 * ~250-char line, and the ~85 /guide heroes one-liners — so the collapse is
 * OPT-IN per call site rather than a length heuristic inside GuideHero. A
 * heuristic would silently restyle 85 unrelated pages the day someone wrote a
 * long guide subtitle.
 *
 * WHAT THESE TESTS CAN AND CANNOT PROVE. The repo has no jsdom, no
 * testing-library and no Playwright, and a "Read more" is click-gated UI on an
 * auth-free but INTERACTION-gated control — so its layout and its toggle are
 * not provable here (the same blindness CLAUDE.md records for modals and
 * popovers). What IS provable, and is what these tests pin:
 *
 *   1. the clamp is never a no-op — every shipped intro genuinely overflows it;
 *   2. the opt-in is wired at exactly the one call site that wants it;
 *   3. the full text is rendered unconditionally, so it stays in the
 *      prerendered HTML.
 *
 * (3) is the SEO-load-bearing one. These 85 pages are ISR-static
 * (`revalidate = 86400`) and the intro is real indexable body copy; a collapse
 * that renders the tail only after a click would delete it from the HTML that
 * Google fetches. CSS may hide it. JS may not withhold it.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";

const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");

const HERO = ["src", "app", "guide", "_components", "GuideHero.tsx"];
const PROSE = ["src", "app", "guide", "_components", "ExpandableProse.tsx"];
const LANDING = ["src", "app", "notes", "_components", "NotesChapterLanding.tsx"];

/**
 * The DESKTOP clamp is the wider of the two (`sm:line-clamp-4`), so it is the
 * one an intro has to beat for the control to mean anything. Four lines of the
 * hero's `max-w-2xl` serif at `text-lg` is ~65 chars a line before wrapping
 * losses — 260 is that budget rounded down, i.e. deliberately generous to the
 * intro. The shortest shipped intro is 362 chars, so there is real headroom;
 * this fails the day someone ships a one-liner and leaves a dead control on it.
 */
const DESKTOP_CLAMP_BUDGET_CHARS = 260;

describe("notes chapter hero — the collapse is never a no-op", () => {
  it("has chapters to check at all", () => {
    // An empty registry would pass every per-chapter assertion below.
    expect(NOTES_CHAPTERS.length).toBeGreaterThanOrEqual(80);
  });

  it("every shipped intro overflows the desktop clamp", () => {
    const tooShort = NOTES_CHAPTERS.filter(
      (c) => c.chapter.intro.trim().length <= DESKTOP_CLAMP_BUDGET_CHARS
    ).map((c) => `${c.subjectRoute}/${c.chapterSlug} (${c.chapter.intro.trim().length}c)`);
    expect(tooShort).toEqual([]);
  });
});

describe("notes chapter hero — the opt-in is wired where it belongs", () => {
  it("the chapter landing opts in", () => {
    expect(read(...LANDING)).toContain("collapsibleSubtitle");
  });

  it("GuideHero does not default it on", () => {
    const src = read(...HERO);
    expect(src).toContain("collapsibleSubtitle");
    // A defaulted-true prop would restyle every other hero on the site. The
    // destructure must not assign it a value.
    expect(src).not.toMatch(/collapsibleSubtitle\s*=\s*(true|1)/);
  });

  it("no OTHER surface turns it on", () => {
    // The scope claim in this file's header, asserted rather than asserted-in-
    // prose: /guide, /mock, the homepage and the two sibling /notes heroes all
    // keep today's plain <p>. Anything that wants the collapse has to come
    // back here and say so.
    const callers = [
      ["src", "app", "notes", "_components", "NotesSubjectLanding.tsx"],
      ["src", "app", "notes", "_components", "NotesSubtopicPage.tsx"],
      ["src", "app", "notes", "page.tsx"],
      ["src", "app", "guide", "page.tsx"],
      ["src", "app", "page.tsx"],
    ];
    for (const c of callers) {
      expect({ file: c.join("/"), optedIn: read(...c).includes("collapsibleSubtitle") })
        .toEqual({ file: c.join("/"), optedIn: false });
    }
  });
});

describe("ExpandableProse — CSS hides the tail, JS never withholds it", () => {
  it("renders the text unconditionally", () => {
    const src = read(...PROSE);
    // The text is a direct child of the paragraph with nothing between it and
    // the braces. A `{expanded && text}` or `{expanded ? text : head}` would
    // strip the tail from the prerendered HTML.
    expect(src).toContain(">{text}<");
    expect(src).not.toMatch(/\{\s*expanded\s*(&&|\?)[^}]*text/);
  });

  it("clamps 2 lines on mobile and 4 from the sm breakpoint up", () => {
    const src = read(...PROSE);
    expect(src).toContain("line-clamp-2");
    expect(src).toContain("sm:line-clamp-4");
  });

  it("the control is a real disclosure button, not a styled div", () => {
    const src = read(...PROSE);
    expect(src).toContain("<button");
    expect(src).toContain("aria-expanded");
    expect(src).toContain("aria-controls");
  });
});
