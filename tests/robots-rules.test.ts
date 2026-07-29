/**
 * Spec for what crawlers may fetch.
 *
 * This is asserted through a matcher that implements the two things search
 * engines actually document — `*` wildcards and LONGEST-MATCH-WINS precedence
 * (Allow breaking ties) — rather than by checking that an array contains a
 * string, which would just restate the implementation.
 *
 * The precedence is the whole risk. `Allow: /` matches every URL on the site, so
 * every Disallow only works because it is longer and therefore more specific.
 * Adding `Disallow: /browse?*` alongside `Allow: /browse` is exactly the shape
 * that could silently take the site's most-visited page offline for Google if
 * the precedence went the other way.
 *
 * Why block the filtered variants at all: `/browse` already declares itself the
 * canonical URL for all of them, so they were never going to be indexed — but
 * crawlers still FETCH them, and `/browse` reads searchParams so every fetch is
 * an uncached server render. It is pure compute for zero indexing value. The
 * /questions landing pages now carry the discovery job instead.
 */
import { describe, it, expect } from "vitest";
import robots from "@/app/robots";
import { robotsAllows } from "@/lib/seo/robotsRules";

const rule = robots().rules;
const group = Array.isArray(rule) ? rule[0] : rule;
const allow = (Array.isArray(group.allow) ? group.allow : [group.allow ?? ""]) as string[];
const disallow = (
  Array.isArray(group.disallow) ? group.disallow : [group.disallow ?? ""]
) as string[];

const can = (path: string) => robotsAllows({ allow, disallow }, path);

describe("crawlable surfaces", () => {
  it("keeps the bare bank page crawlable", () => {
    // The load-bearing assertion: blocking the filter space must NOT take
    // /browse itself down.
    expect(can("/browse")).toBe(true);
  });

  it("keeps the public landing pages and their hub crawlable", () => {
    expect(can("/questions")).toBe(true);
    expect(can("/questions/nda/mathematics/vectors")).toBe(true);
  });

  it("keeps the content corpus crawlable", () => {
    expect(can("/")).toBe(true);
    expect(can("/notes/nda-maths/vectors")).toBe(true);
    expect(can("/guide/nda-biology/playbooks/cell-biology")).toBe(true);
    expect(can("/quiz/daily-vectors-1")).toBe(true);
  });
});

describe("blocked surfaces", () => {
  it("blocks the /browse filter space — uncached renders, zero indexing value", () => {
    expect(can("/browse?examId=abc")).toBe(false);
    expect(can("/browse?examId=abc&chapterIds=def&difficulty=HARD")).toBe(false);
    expect(can("/browse?page=2")).toBe(false);
  });

  it("still blocks the private surfaces", () => {
    expect(can("/dashboard")).toBe(false);
    expect(can("/dashboard/questions/xyz/edit")).toBe(false);
    expect(can("/upload")).toBe(false);
    expect(can("/api/export")).toBe(false);
  });
});

describe("robotsAllows precedence", () => {
  it("lets a longer Disallow beat a shorter Allow", () => {
    expect(robotsAllows({ allow: ["/"], disallow: ["/admin"] }, "/admin/x")).toBe(
      false
    );
  });

  it("lets a longer Allow beat a shorter Disallow (carve-out)", () => {
    expect(
      robotsAllows({ allow: ["/a/keep"], disallow: ["/a"] }, "/a/keep/me")
    ).toBe(true);
  });

  it("breaks an exact-length tie in favour of Allow", () => {
    expect(robotsAllows({ allow: ["/x"], disallow: ["/x"] }, "/x")).toBe(true);
  });

  it("allows anything no rule matches", () => {
    expect(robotsAllows({ allow: [], disallow: ["/nope"] }, "/fine")).toBe(true);
  });

  it("treats * as a wildcard and ? as a literal", () => {
    expect(robotsAllows({ allow: [], disallow: ["/a/*/c"] }, "/a/b/c")).toBe(false);
    expect(robotsAllows({ allow: [], disallow: ["/q?*"] }, "/q?x=1")).toBe(false);
    // No query string ⇒ the literal `?` can't match ⇒ not blocked.
    expect(robotsAllows({ allow: [], disallow: ["/q?*"] }, "/q")).toBe(true);
  });

  it("honours the $ end-anchor", () => {
    expect(robotsAllows({ allow: [], disallow: ["/only$"] }, "/only")).toBe(false);
    expect(robotsAllows({ allow: [], disallow: ["/only$"] }, "/only/more")).toBe(
      true
    );
  });
});
