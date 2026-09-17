/**
 * Spec for the Request-Indexing priority ranking.
 *
 * WHY A RANKING EXISTS AT ALL (2026-09-17). Search Console's manual
 * "Request Indexing" is capped at ~10-12 URLs per property per day, and the
 * sitemap holds 1,279. That is a 128-day queue, so the ORDER is the entire
 * deliverable -- a worklist worked in the wrong order spends its first month on
 * pages that cannot rank.
 *
 * THE LOAD-BEARING RULE, and the one most likely to be "corrected" later:
 * ranking is by WINNABILITY, not by content depth. A JEE Mains chapter with 346
 * questions is a worse submission than an NDA chapter with 63, because the JEE
 * SERP belongs to Allen, Vedantu and Physics Wallah and this domain went live
 * on 2026-06-04 with no backlinks. Sorting by question count feels right and is
 * wrong; these tests pin it so nobody re-derives it.
 */
import { describe, it, expect } from "vitest";
import {
  rankForIndexing,
  DEFAULT_HOLD_PREFIXES,
  type RankInput,
} from "@/lib/seo/indexingPriority";

const SITE = "https://www.pyqvault.com";
const u = (p: string) => `${SITE}${p}`;

const rank = (paths: string[], input: Partial<RankInput> = {}) =>
  rankForIndexing(paths.map(u), {
    site: SITE,
    holdPrefixes: DEFAULT_HOLD_PREFIXES,
    questionCounts: {},
    ...input,
  }).map((r) => r.path);

describe("rankForIndexing", () => {
  it("puts the homepage first and section indexes next", () => {
    const out = rank(["/questions/nda/mathematics/probability", "/guide", "/"]);
    expect(out[0]).toBe("/");
    expect(out[1]).toBe("/guide");
  });

  it("ranks a winnable exam above a deeper page on a contested one", () => {
    // NDA 63 q beats JEE 346 q. This is the rule the module exists for.
    const out = rank(
      ["/questions/jee-mains/maths/conic-sections", "/questions/nda/mathematics/height-distance"],
      {
        questionCounts: {
          "jee-mains/maths/conic-sections": 346,
          "nda/mathematics/height-distance": 63,
        },
      }
    );
    expect(out[0]).toBe("/questions/nda/mathematics/height-distance");
  });

  it("still uses question count to break ties WITHIN one exam", () => {
    const out = rank(
      ["/questions/nda/mathematics/logarithms", "/questions/nda/mathematics/probability"],
      {
        questionCounts: {
          "nda/mathematics/logarithms": 74,
          "nda/mathematics/probability": 412,
        },
      }
    );
    expect(out[0]).toBe("/questions/nda/mathematics/probability");
  });

  it("drops held prefixes entirely", () => {
    // /formula shipped 2026-09-17 with no browser pass. Indexing an unverified
    // surface is the definition-of-done failure in another costume.
    const out = rank(["/formula", "/formula/adjoint-determinant", "/guide"], {
      holdPrefixes: ["/formula"],
    });
    expect(out).toEqual(["/guide"]);
  });

  it("does not treat a prefix as held when it only shares a word stem", () => {
    // /notes/.../lens-formula must survive a "/formula" hold.
    const out = rank(["/notes/nda-physics/light-optics/opt-lenses-and-lens-formula"], {
      holdPrefixes: ["/formula"],
    });
    expect(out).toHaveLength(1);
  });

  it("drops individual mock pages, which left the sitemap for being thin", () => {
    const out = rank(["/mock", "/mock/nda-2017-apr-maths", "/mock/exam/nda"]);
    expect(out).toContain("/mock");
    expect(out).toContain("/mock/exam/nda");
    expect(out).not.toContain("/mock/nda-2017-apr-maths");
  });

  it("ranks utility pages last rather than dropping them", () => {
    // Nobody searches /privacy, but the list should stay a complete account of
    // the sitemap so a reader can tell "deprioritised" from "forgotten".
    const out = rank(["/privacy", "/request-access", "/guide/nda-maths"]);
    expect(out[out.length - 1]).toMatch(/privacy|request-access/);
    expect(out).toHaveLength(3);
  });

  it("resolves the exam from a compound notes/guide route segment", () => {
    // "mht-cet-chemistry" is MHT-CET, not a miss; "jee-mains-maths" is JEE.
    // Longest-prefix matching, else "mht-cet-x" resolves as unknown.
    const out = rank(["/notes/jee-mains-maths/matrices", "/notes/mht-cet-chemistry/ionic-equilibria"]);
    expect(out[0]).toBe("/notes/mht-cet-chemistry/ionic-equilibria");
  });

  it("ranks a hand-authored notes CHAPTER above a notes SUBTOPIC", () => {
    const out = rank([
      "/notes/nda-maths/statistics/stat-mean-median",
      "/notes/nda-maths/statistics",
    ]);
    expect(out[0]).toBe("/notes/nda-maths/statistics");
  });

  it("de-duplicates and is deterministic for equal scores", () => {
    const a = rank(["/guide/nda-maths", "/guide/nda-physics", "/guide/nda-maths"]);
    const b = rank(["/guide/nda-physics", "/guide/nda-maths", "/guide/nda-maths"]);
    expect(a).toEqual(b);
    expect(new Set(a).size).toBe(a.length);
  });

  it("ignores a URL belonging to another origin", () => {
    const out = rankForIndexing([u("/guide"), "https://example.com/guide"], {
      site: SITE,
      holdPrefixes: [],
      questionCounts: {},
    });
    expect(out.map((r) => r.path)).toEqual(["/guide"]);
  });
});
