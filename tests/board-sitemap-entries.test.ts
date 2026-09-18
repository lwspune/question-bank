/**
 * Spec for which /board URLs belong in the sitemap.
 *
 * WHY THE LEAVES GO IN — and why that is the OPPOSITE of the /mock decision
 * taken the day before (2026-09-17, tests/mock-sitemap-entries.test.ts). The
 * mock leaves came out because `/mock/<slug>` renders 98 words whose prose is
 * byte-identical across all 192 pages: the questions sit behind sign-in, so the
 * page is thin and near-duplicate. A board chapter page is the reverse.
 * Measured against production 2026-09-18, `/board/cbse-10/mathematics/real-numbers`
 * renders **4,969 words** of publicly-readable textbook solutions with no
 * sign-in gate, `index, follow` and a self-canonical. Same shape of decision,
 * opposite answer, because the underlying pages genuinely differ — the test is
 * "is the leaf substantive and public", not "is it a leaf".
 *
 * WHAT WAS ACTUALLY WRONG (found 2026-09-18): `src/app/sitemap.ts` did not
 * contain the string "board" at all. 283 chapter pages + 7 exam hubs + the
 * index — ~291 live, indexable, internally-linked URLs — were never advertised
 * for crawl. Not a regression; they were never added.
 *
 * THE DATING RULE, inherited from the /mock lesson: a hub is dated from the
 * leaves beneath it, never from the build clock. Here the leaves ARE emitted,
 * so the failure mode is subtler than the mock one — a naive implementation
 * emits the chapters with real dates and stamps the hubs with `new Date()`,
 * which is the exact over-claim src/lib/seo/lastmod.ts exists to prevent. The
 * "hub is dated from its newest chapter" cases below pin it.
 */
import { describe, it, expect } from "vitest";
import {
  buildBoardSitemapEntries,
  type BoardSitemapChapter,
  type BoardSitemapEntry,
} from "@/lib/board/sitemapEntries";

const EXAM_SLUGS = ["mh-hsc-12", "cbse-10"] as const;

const ch = (
  o: Partial<BoardSitemapChapter> & { examSlug: string; chapterSlug: string }
): BoardSitemapChapter => ({
  subjectRoute: "mathematics",
  iso: "2026-01-01T00:00:00.000Z",
  ...o,
});

const CHAPTERS: BoardSitemapChapter[] = [
  ch({ examSlug: "mh-hsc-12", chapterSlug: "matrices", iso: "2026-03-01T00:00:00.000Z" }),
  ch({ examSlug: "mh-hsc-12", chapterSlug: "vectors", iso: "2026-05-01T00:00:00.000Z" }),
  ch({ examSlug: "cbse-10", chapterSlug: "real-numbers", iso: "2026-02-01T00:00:00.000Z" }),
];

const pathsOf = (es: BoardSitemapEntry[]) => es.map((e) => e.path);
const find = (es: BoardSitemapEntry[], path: string) =>
  es.find((e) => e.path === path);

describe("buildBoardSitemapEntries", () => {
  it("emits the index, one hub per board exam, and every chapter leaf", () => {
    const entries = buildBoardSitemapEntries(CHAPTERS, EXAM_SLUGS);

    expect(pathsOf(entries)).toEqual([
      "/board",
      "/board/mh-hsc-12",
      "/board/cbse-10",
      "/board/mh-hsc-12/mathematics/matrices",
      "/board/mh-hsc-12/mathematics/vectors",
      "/board/cbse-10/mathematics/real-numbers",
    ]);
  });

  it("dates a chapter leaf from its own newest question", () => {
    const entries = buildBoardSitemapEntries(CHAPTERS, EXAM_SLUGS);

    expect(find(entries, "/board/mh-hsc-12/mathematics/matrices")?.iso).toBe(
      "2026-03-01T00:00:00.000Z"
    );
    expect(find(entries, "/board/cbse-10/mathematics/real-numbers")?.iso).toBe(
      "2026-02-01T00:00:00.000Z"
    );
  });

  it("dates an exam hub from its NEWEST chapter, not the build clock", () => {
    const entries = buildBoardSitemapEntries(CHAPTERS, EXAM_SLUGS);

    // mh-hsc-12 has Mar and May; the hub must carry May.
    expect(find(entries, "/board/mh-hsc-12")?.iso).toBe("2026-05-01T00:00:00.000Z");
    expect(find(entries, "/board/cbse-10")?.iso).toBe("2026-02-01T00:00:00.000Z");
  });

  it("dates the /board index from the newest chapter anywhere", () => {
    const entries = buildBoardSitemapEntries(CHAPTERS, EXAM_SLUGS);

    expect(find(entries, "/board")?.iso).toBe("2026-05-01T00:00:00.000Z");
  });

  it("emits an exam hub even when the exam has no backfilled chapters yet", () => {
    // Mirrors the /mock rule: an exam is emitted from the REGISTRY, so a
    // content gap cannot silently drop a registered board exam out of the
    // sitemap. It carries a null date rather than a manufactured one.
    const entries = buildBoardSitemapEntries(
      [ch({ examSlug: "cbse-10", chapterSlug: "real-numbers" })],
      EXAM_SLUGS
    );

    const hub = find(entries, "/board/mh-hsc-12");
    expect(hub).toBeDefined();
    expect(hub?.iso).toBeNull();
  });

  it("never invents a date — all-null chapters leave every entry null", () => {
    const entries = buildBoardSitemapEntries(
      [ch({ examSlug: "cbse-10", chapterSlug: "real-numbers", iso: null })],
      EXAM_SLUGS
    );

    expect(find(entries, "/board")?.iso).toBeNull();
    expect(find(entries, "/board/cbse-10")?.iso).toBeNull();
    expect(find(entries, "/board/cbse-10/mathematics/real-numbers")?.iso).toBeNull();
  });

  it("skips a chapter whose exam is not a registered board exam", () => {
    // A URL under an exam with no /board route would 404. Skipping is the only
    // safe answer; emitting it would advertise a dead page for crawl.
    const entries = buildBoardSitemapEntries(
      [
        ch({ examSlug: "cbse-10", chapterSlug: "real-numbers" }),
        ch({ examSlug: "nda", chapterSlug: "not-a-board-exam" }),
      ],
      EXAM_SLUGS
    );

    expect(pathsOf(entries)).not.toContain("/board/nda/mathematics/not-a-board-exam");
    expect(pathsOf(entries).some((p) => p.startsWith("/board/nda"))).toBe(false);
  });

  it("de-duplicates a chapter that appears twice, keeping the newer date", () => {
    const entries = buildBoardSitemapEntries(
      [
        ch({ examSlug: "cbse-10", chapterSlug: "real-numbers", iso: "2026-02-01T00:00:00.000Z" }),
        ch({ examSlug: "cbse-10", chapterSlug: "real-numbers", iso: "2026-06-01T00:00:00.000Z" }),
      ],
      EXAM_SLUGS
    );

    const leaves = pathsOf(entries).filter((p) =>
      p.startsWith("/board/cbse-10/")
    );
    expect(leaves).toHaveLength(1);
    expect(find(entries, "/board/cbse-10/mathematics/real-numbers")?.iso).toBe(
      "2026-06-01T00:00:00.000Z"
    );
  });

  it("separates chapters that share a slug across different subjects", () => {
    // Two subjects in one book can both have a chapter that slugifies the same
    // way; they are different pages and both must be advertised.
    const entries = buildBoardSitemapEntries(
      [
        ch({ examSlug: "cbse-10", subjectRoute: "mathematics", chapterSlug: "circles" }),
        ch({ examSlug: "cbse-10", subjectRoute: "physics", chapterSlug: "circles" }),
      ],
      EXAM_SLUGS
    );

    expect(pathsOf(entries)).toContain("/board/cbse-10/mathematics/circles");
    expect(pathsOf(entries)).toContain("/board/cbse-10/physics/circles");
  });

  it("gives leaves a lower priority than the hubs that link them", () => {
    const entries = buildBoardSitemapEntries(CHAPTERS, EXAM_SLUGS);

    const index = find(entries, "/board")!;
    const hub = find(entries, "/board/cbse-10")!;
    const leaf = find(entries, "/board/cbse-10/mathematics/real-numbers")!;

    expect(index.priority).toBeGreaterThan(hub.priority);
    expect(hub.priority).toBeGreaterThan(leaf.priority);
  });

  it("returns an empty-but-valid shape when there is no board content at all", () => {
    const entries = buildBoardSitemapEntries([], []);
    expect(pathsOf(entries)).toEqual(["/board"]);
    expect(find(entries, "/board")?.iso).toBeNull();
  });
});
