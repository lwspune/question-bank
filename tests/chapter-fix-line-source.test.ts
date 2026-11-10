/**
 * The chapter pages' "Fix N mistakes in this chapter" line (2026-11-07) must
 * not cost the pages their cache, and must not prefetch the drill.
 *
 * The /questions and /board chapter pages are cached copies served to
 * everyone (revalidate), so anything about the student is fetched in the
 * BROWSER. Two things in a client component would quietly break that or cost
 * the server work nobody asked for (CLAUDE.md "Recurring pitfalls"):
 * - `useSearchParams()` bails a static prerender out to client rendering;
 * - `router.refresh()` re-serves the same cached copy, so it does nothing.
 * And the button links to /drill, a dynamic page that runs the drill's whole
 * read: prefetching it from a list page is the 2026-09-15 outage's shape.
 *
 * A source scan, because this repo renders no components in tests.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p), "utf8");
const count = (haystack: string, needle: string) => haystack.split(needle).length - 1;

const COMPONENT = ["src", "components", "drill", "ChapterFixLine.tsx"];

describe("ChapterFixLine", () => {
  const src = read(...COMPONENT);

  it("runs in the browser only", () => {
    expect(src.trimStart().startsWith('"use client"')).toBe(true);
  });

  it("never reads the address or refreshes the page", () => {
    expect(src).not.toMatch(/useSearchParams|router\.refresh|useRouter/);
  });

  it("opts every link out of prefetch", () => {
    const links = count(src, "<Link");
    expect(links).toBeGreaterThan(0);
    expect(count(src, "prefetch={false}")).toBe(links);
  });
});

describe("the three pages carry the line, each with its own tag", () => {
  it.each([
    [["src", "app", "questions", "[examSlug]", "[subjectSlug]", "[chapterSlug]", "page.tsx"], "CHAPTER_FIX_FROM.questions"],
    [["src", "app", "board", "[examSlug]", "[subjectRoute]", "[chapterSlug]", "page.tsx"], "CHAPTER_FIX_FROM.board"],
    [["src", "app", "browse", "renderBrowse.tsx"], "CHAPTER_FIX_FROM.browse"],
  ])("%s", (path, tag) => {
    const page = read(...path);
    expect(page).toContain("<ChapterFixLine");
    expect(page).toContain(tag);
  });
});

describe("V's explanation carries the line, tagged as V's (V_LEARNING_LOOP.md step 3, 2026-11-10)", () => {
  it("renders it in the chat with the explained question's chapter", () => {
    const chat = read("src", "components", "chat", "ChatWidget.tsx");
    expect(chat).toContain("<ChapterFixLine");
    expect(chat).toContain("CHAPTER_FIX_FROM.v");
    expect(chat).toContain("explainedChapterId");
  });

  it("closes the chat when its link is tapped, like V's own links", () => {
    const chat = read("src", "components", "chat", "ChatWidget.tsx");
    const at = chat.indexOf("<ChapterFixLine");
    expect(chat.slice(Math.max(0, at - 400), at)).toMatch(/onClickCapture=\{\(e\) => \{\s*if \(\(e\.target as HTMLElement\)\.closest\("a"\)\) close\(\);/);
  });
});

describe("on /questions the Fix line takes the place of the sign-in sentence (2026-11-07)", () => {
  it("passes the sentence as the line's fallback, so a signed-in student with mistakes sees one, not both", () => {
    const page = read("src", "app", "questions", "[examSlug]", "[subjectSlug]", "[chapterSlug]", "page.tsx");
    const open = page.indexOf("<ChapterFixLine");
    const sentence = page.indexOf("Try each question before you open its answer");
    const close = page.indexOf("</ChapterFixLine>");
    expect(open).toBeGreaterThan(-1);
    expect(sentence).toBeGreaterThan(open);
    expect(close).toBeGreaterThan(sentence);
  });

  it("the line renders its fallback when nothing is waiting", () => {
    expect(read(...COMPONENT)).toMatch(/if \(count === 0\) return <>\{children\}<\/>;/);
  });
});
