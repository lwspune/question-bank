/**
 * The two kinds of link the performance page mints, and the wall between them.
 *
 *   A — "your questions"  /browse?extras=<their question ids>
 *   B — "this topic"      /browse?...&subtopicIds=<uuid>
 *
 * They answer different questions and they fail differently. A is exact but
 * empty for a subtopic the student never touched; B always resolves but says
 * nothing about them. The audits and the chapter accordion use A, because a row
 * only appears there when there is evidence. The PROJECTION uses B: measured on
 * production, HALF its subtopic rows (2,484 of 4,939) have `judged === 0` —
 * they rank high precisely BECAUSE the student has never scored there, so an
 * "open their mistakes" button would open nothing on every other row.
 */
import { describe, it, expect } from "vitest";
import {
  OPEN_LIMIT,
  browseExtrasHref,
  openLabel,
  taxonomyKey,
  goPracticeHref,
  UNCLASSIFIED,
  topicHref,
  type TaxonomyLinks,
} from "@/lib/performance/links";

const ids = (n: number, p = "id") =>
  Array.from({ length: n }, (_, i) => `${p}-${i + 1}`);

describe("browseExtrasHref", () => {
  it("puts the exact question ids on /browse", () => {
    expect(browseExtrasHref(["a", "b"])).toBe("/browse?extras=a%2Cb");
  });

  it("returns null for an empty list rather than a link to everything", () => {
    // `?extras=` with no value parses to zero extra ids, which drops the filter
    // entirely and lands the reader on the unfiltered bank — the opposite of
    // what the button promised.
    expect(browseExtrasHref([])).toBeNull();
  });

  it("caps the ids it sends", () => {
    // A long `.in()` list rides in the URL, and PostgREST answers a bare
    // `Bad Request` once the request line is too long (measured at 833 ids).
    const href = browseExtrasHref(ids(OPEN_LIMIT + 17))!;
    expect(href.split("%2C")).toHaveLength(OPEN_LIMIT);
  });

  it("keeps the ids in their given order, worst first", () => {
    expect(browseExtrasHref(["z", "a"])).toBe("/browse?extras=z%2Ca");
  });
});

describe("openLabel", () => {
  it("names the count when everything fits", () => {
    expect(openLabel(6)).toBe("Open 6");
    expect(openLabel(OPEN_LIMIT)).toBe(`Open ${OPEN_LIMIT}`);
  });

  it("says how many it will actually open once capped", () => {
    // The label used to read the FULL length while the href sliced 50. Nothing
    // in production crosses the cap today (max measured: 34 wrong, 33 skipped
    // per subtopic across the 12 heaviest students), so the day it starts
    // lying, it lies silently.
    expect(openLabel(OPEN_LIMIT + 17)).toBe(`Open ${OPEN_LIMIT} of ${OPEN_LIMIT + 17}`);
  });
});

describe("taxonomyKey", () => {
  it("cannot be confused by a name containing the separator", () => {
    // Subtopic names are unique only WITHIN a chapter, so the key is the pair.
    expect(taxonomyKey("A", "B")).not.toBe(taxonomyKey("A|", "|B"));
  });
});

describe("topicHref", () => {
  const links: TaxonomyLinks = {
    examId: "exam-1",
    subjectId: "subj-1",
    chapters: { Conics: "ch-1" },
    subtopics: { [taxonomyKey("Conics", "Parabola")]: "st-1" },
  };

  it("links a chapter with its exam and subject in scope", () => {
    const href = topicHref(links, "Conics")!;
    expect(href).toContain("examId=exam-1");
    expect(href).toContain("subjectId=subj-1");
    expect(href).toContain("chapterIds=ch-1");
    expect(href).not.toContain("subtopicIds");
  });

  it("narrows to the subtopic when one resolves", () => {
    expect(topicHref(links, "Conics", "Parabola")).toContain("subtopicIds=st-1");
  });

  it("falls back to the chapter when the subtopic does not resolve", () => {
    // `(unclassified)` is minted by the RPC, not by the taxonomy, so it has no
    // id by construction — and a chapter link still lands somewhere useful.
    const href = topicHref(links, "Conics", "(unclassified)")!;
    expect(href).toContain("chapterIds=ch-1");
    expect(href).not.toContain("subtopicIds");
  });

  it("returns null when the chapter itself does not resolve", () => {
    // A chapter renamed since the attempt was sat. No link beats a link to the
    // whole bank under a heading naming one chapter.
    expect(topicHref(links, "Renamed Away")).toBeNull();
  });

  it("omits exam and subject when they are unknown rather than sending empties", () => {
    const bare: TaxonomyLinks = { examId: null, subjectId: null, chapters: { C: "ch" }, subtopics: {} };
    expect(topicHref(bare, "C")).toBe("/browse?chapterIds=ch");
  });
});

/**
 * Link C — "practise this topic" by NAME, resolved at CLICK time.
 *
 * A third shape, and the reason it exists rather than reusing topicHref: B
 * needs a TaxonomyLinks map, which costs one `getTaxonomyLinks` round trip per
 * (exam, subject) lane. The mock result page names up to three subtopics that
 * can span three subjects — on a GAT paper the lanes cover nine — so B would
 * add up to three DB reads to a page that already runs the full performance
 * RPC. C costs the page NOTHING: /go/practice resolves the names against the
 * live taxonomy when the link is actually followed, and its documented
 * fallback chain (subtopic → chapter → bare /browse) never dead-ends.
 *
 * The trade is that C cannot be verified at render time, so a stale name lands
 * one level up instead of showing as a missing link. That is the correct trade
 * for a page nobody has clicked yet, and the wrong one for the performance page
 * itself, which keeps B.
 */
describe("goPracticeHref — link C", () => {
  it("names the whole location, in resolution order", () => {
    expect(goPracticeHref("NDA", "Mathematics", "Algebra", "Quadratics")).toBe(
      "/go/practice?exam=NDA&subject=Mathematics&chapter=Algebra&subtopic=Quadratics"
    );
  });

  it("degrades to the chapter when there is no subtopic", () => {
    expect(goPracticeHref("NDA", "Mathematics", "Algebra")).toBe(
      "/go/practice?exam=NDA&subject=Mathematics&chapter=Algebra"
    );
  });

  it("drops the RPC's `(unclassified)` rather than asking the route to resolve it", () => {
    // Minted by get_student_performance's coalesce, never by the taxonomy, so
    // it has no row to resolve to. Sending it would make the route fall back —
    // same destination, one pointless attempt. Chapter-level by construction.
    expect(goPracticeHref("NDA", "Mathematics", "Algebra", UNCLASSIFIED)).toBe(
      "/go/practice?exam=NDA&subject=Mathematics&chapter=Algebra"
    );
  });

  it("escapes names that carry URL punctuation", () => {
    // Real bank names: "Probability & Statistics", "Applications of Derivatives
    // (Maxima/Minima)". An unescaped & would truncate every parameter after it.
    const href = goPracticeHref("NDA", "Mathematics", "Probability & Statistics", "Bayes' Theorem");
    expect(href).toContain("chapter=Probability+%26+Statistics");
    expect(new URL(href, "https://x.test").searchParams.get("chapter")).toBe(
      "Probability & Statistics"
    );
  });
});
