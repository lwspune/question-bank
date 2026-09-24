/**
 * Every public content surface must be reachable from the site-wide footer and
 * from the homepage — not merely present in the sitemap.
 *
 * WHY THIS IS A CORRECTNESS RULE AND NOT A PREFERENCE. On 2026-09-17 Search
 * Console reported 12 pages indexed out of 1,474 known, with 1,424 sitting in
 * "Discovered - currently not indexed" — Google knew the URLs and had not spent
 * a crawl on them. The Crawl stats export explained why: 1,173 requests over 51
 * days (23/day), of which only 17.48% were HTML (~4 pages/day) and only 1.79%
 * were DISCOVERY requests (~0.41/day). At that rate the backlog takes ~9.5 years.
 *
 * Discovery is driven by links, and the links were not there. The homepage
 * pointed at exactly two internal destinations. The footer listed the guides,
 * the two notes hubs, /formula, /blog and /about — and NOT /questions, /mock,
 * /board or /browse. So the 631-page /questions landing surface, built purely
 * for discovery, was reachable only via BrowseLanding.tsx and the sitemap: three
 * clicks deep, behind a dynamic uncacheable page. It drew 41 impressions and one
 * click in seven weeks; /mock drew one impression; the whole /notes tree drew one.
 *
 * A sitemap entry is a SUGGESTION. A footer link is on every page of the site,
 * so it is seen on every HTML fetch Google makes. That is the difference this
 * test protects, and re-orphaning a surface is invisible without it: nothing
 * else in the gate fails, no page 404s, and the damage shows up months later as
 * an absence in a report nobody diffs.
 *
 * The footer side reads `footerLinks()`, the pure model the component renders
 * from (since 2026-09-24 — before that this grepped Footer.tsx for literal
 * hrefs, which stopped being possible once the Guides/Notes columns were
 * derived from the registries). The homepage side is still a substring
 * assertion on the source rather than a JSX parse: attributes wrap across
 * lines and arrow functions contain `>`, so anything that tries to find a
 * tag's end is a probe that can quietly stop matching. See the same reasoning
 * in dashboard-students-no-prefetch.test.ts.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { footerLinks } from "@/lib/nav/footerLinks";

const FOOTER = join(process.cwd(), "src", "components", "Footer.tsx");
const HOME = join(process.cwd(), "src", "app", "page.tsx");
const footerHrefs = footerLinks().flatMap((g) => g.links.map((l) => l.href));

/**
 * The surfaces that carry indexable content and are NOT already reachable from
 * PrimaryNav's own hrefs. `/questions` leads the list deliberately: its index
 * links all ~631 chapter landings, so one footer link moves every one of them
 * from three clicks deep to two.
 */
const MUST_LINK = ["/questions", "/mock", "/board", "/browse"] as const;

describe("crawl entry points", () => {
  const footer = readFileSync(FOOTER, "utf8");
  const home = readFileSync(HOME, "utf8");

  it("found both files at all", () => {
    // An empty read would pass every assertion below.
    expect(footer.length).toBeGreaterThan(500);
    expect(home.length).toBeGreaterThan(500);
  });

  it("the component actually renders from the model this test reads", () => {
    // Otherwise the model could carry every link while the footer shows none.
    expect(footer).toContain("footerLinks()");
    expect(footerHrefs.length).toBeGreaterThan(10);
  });

  it.each(MUST_LINK)("the footer links %s", (href) => {
    expect(footerHrefs).toContain(href);
  });

  it("the homepage surface grid offers the two crawl-starved surfaces", () => {
    // /browse and /board are already cards; these two were the gap.
    expect(home).toContain(`href: "/questions"`);
    expect(home).toContain(`href: "/mock"`);
  });

  it("the footer still links the surfaces it already carried", () => {
    // Guards against a rewrite that adds the new links by replacing old ones.
    for (const href of ["/formula", "/blog", "/about", "/notes/nda"]) {
      expect(footerHrefs).toContain(href);
    }
  });
});
