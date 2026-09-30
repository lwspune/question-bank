/**
 * Offline half of the /guide/jee-mains-maths checks. The live half (subtopic names resolve in the
 * bank) is tests/guide-jee-mains-maths-playbooks.test.ts; the grid itself is pinned by
 * `npm run jee:matrix -- --check`.
 *
 * What this file guards:
 *   - TIER MEMBERSHIP is derived from the generated grid, so an ingest can move a chapter across a
 *     line with no diff to the guide. The membership is pinned here, so that move fails in review and
 *     the strategy prose that names chapters gets re-read.
 *   - every slug in playbook details, formulas and traps resolves, and each playbook has one of each;
 *   - PROSE CARRIES NO FIGURES: editorial text written by us has no digits at all, and the deep-dives
 *     (where maths values are legitimate) carry no count, share or year;
 *   - each trends callout's direction still agrees with the grid.
 */
import { describe, expect, it } from "vitest";
import { CHAPTER_TABLE, ROUTES } from "@/app/guide/jee-mains-maths/_data/jee-mains-maths";
import {
  CHAPTER_NOTES,
  DROPPED_CHAPTERS,
  STRATEGY_TIERS,
  TIME_PLAN,
  tierOf,
} from "@/app/guide/jee-mains-maths/_data/strategy";
import { PLAYBOOKS, PLAYBOOK_SLUGS } from "@/app/guide/jee-mains-maths/_data/playbooks";
import { PLAYBOOK_DETAILS } from "@/app/guide/jee-mains-maths/_data/playbook-details";
import { FORMULA_GROUPS } from "@/app/guide/jee-mains-maths/_data/formulas";
import { TRAP_SHAPES } from "@/app/guide/jee-mains-maths/_data/traps";
import { DRIFT_CALLOUTS } from "@/app/guide/jee-mains-maths/_data/trends";
import { CHAPTER_MATRIX } from "@/app/guide/jee-mains-maths/_data/matrix.generated";

/** A count, a share or a year: the figures that go stale after an ingest. */
const BANK_FIGURE = /\b\d+(\.\d+)?\s*(%|per ?cent|questions?\b|PYQs?\b|papers?\b|sittings?\b|shifts?\b)|\b20[12]\d\b/i;

describe("jee-mains-maths guide — tiers", () => {
  it("pins the current tier membership (an ingest that moves one must re-read the strategy prose)", () => {
    const byTier = Object.fromEntries(STRATEGY_TIERS.map((t) => [t.id, t.chapters.map((c) => c.chapter).sort()]));
    expect(byTier.cornerstone).toEqual(
      ["Conic Sections", "Relations and Functions", "Sequences and Series", "Three Dimensional Geometry"].sort(),
    );
    expect(byTier.core).toEqual(
      [
        "Application of Integrals",
        "Binomial Theorem",
        "Complex Numbers",
        "Definite Integration",
        "Differential Equations",
        "Permutations and Combinations",
        "Probability",
        "Quadratic Equations",
        "Vector Algebra",
      ].sort(),
    );
    expect(DROPPED_CHAPTERS.map((c) => c.chapter).sort()).toEqual(
      ["Height & Distance", "Mathematical Reasoning", "Properties of Triangle"].sort(),
    );
  });

  it("accounts for every chapter in the grid exactly once", () => {
    const placed = [...STRATEGY_TIERS.flatMap((t) => t.chapters), ...DROPPED_CHAPTERS].map((c) => c.chapter);
    expect(placed.sort()).toEqual(CHAPTER_MATRIX.map((r) => r.chapter).sort());
  });

  it("orders a tier heaviest first", () => {
    for (const t of STRATEGY_TIERS) {
      const rates = t.chapters.map((c) => c.recentPerPaper);
      expect(rates, t.id).toEqual([...rates].sort((a, b) => b - a));
    }
  });

  it("tierOf draws the lines where the prose says", () => {
    expect(tierOf(1.5)).toBe("cornerstone");
    expect(tierOf(1.49)).toBe("core");
    expect(tierOf(1)).toBe("core");
    expect(tierOf(0.99)).toBe("longtail");
    expect(tierOf(0.01)).toBe("longtail");
    expect(tierOf(0)).toBe("dropped");
  });

  it("the recent rates add up to one 25-question paper", () => {
    const sum = CHAPTER_TABLE.reduce((s, r) => s + r.recentPerPaper, 0);
    expect(sum).toBeCloseTo(25, 0);
  });
});

describe("jee-mains-maths guide — slugs resolve", () => {
  it("has one playbook per chapter still on the paper, each with notes", () => {
    expect(PLAYBOOKS.length).toBe(CHAPTER_TABLE.length - DROPPED_CHAPTERS.length);
    for (const p of PLAYBOOKS) {
      expect(p.subtopics.length, p.slug).toBeGreaterThan(0);
      expect(p.notesHref).toBe(`/notes/jee-mains-maths/${p.slug}`);
    }
  });

  it("every playbook has exactly one deep-dive, and every deep-dive a playbook", () => {
    expect(Object.keys(PLAYBOOK_DETAILS).sort()).toEqual([...PLAYBOOK_SLUGS].sort());
    for (const [slug, d] of Object.entries(PLAYBOOK_DETAILS)) {
      expect(d.slug, slug).toBe(slug);
      for (const r of d.relatedSlugs) {
        expect(PLAYBOOK_SLUGS, `${slug} → ${r}`).toContain(r);
        expect(r, slug).not.toBe(slug);
      }
    }
  });

  it("the formula sheet has one group per playbook, named for its chapter", () => {
    expect(FORMULA_GROUPS.map((g) => g.playbookSlug).sort()).toEqual([...PLAYBOOK_SLUGS].sort());
    for (const g of FORMULA_GROUPS) {
      expect(PLAYBOOKS.find((p) => p.slug === g.playbookSlug)?.chapter).toBe(g.chapter);
      const ids = g.formulas.map((f) => f.id);
      expect(new Set(ids).size, g.chapter).toBe(ids.length);
    }
  });

  it("formulas are plain text, not LaTeX", () => {
    for (const g of FORMULA_GROUPS)
      for (const f of g.formulas)
        for (const t of [f.formula, f.notes ?? "", ...f.legend]) expect(t, `${g.chapter}/${f.id}`).not.toMatch(/\\/);
  });

  it("traps have unique ids and resolvable slugs; paper-wide ones affect no chapter", () => {
    const ids = TRAP_SHAPES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const t of TRAP_SHAPES) {
      for (const a of t.affects) expect(PLAYBOOK_SLUGS, `${t.id} → ${a}`).toContain(a);
      expect(t.affects.length === 0, t.id).toBe(t.bucket === "paper");
    }
  });
});

describe("jee-mains-maths guide — prose carries no figures", () => {
  it("our editorial text has no digits at all", () => {
    const texts: [string, string][] = [
      ...Object.entries(CHAPTER_NOTES).map(([k, v]) => [k, v.summary] as [string, string]),
      ...STRATEGY_TIERS.flatMap((t) => [t.pitch, ...t.approach].map((x) => [t.id, x] as [string, string])),
      ...TIME_PLAN.map((s) => [s.step, s.detail] as [string, string]),
      ...DRIFT_CALLOUTS.flatMap((c) => [[c.chapter, c.title], [c.chapter, c.description]] as [string, string][]),
      ...ROUTES.map((r) => [r.label, r.blurb.replace(/[+−-][14]\b/g, "")] as [string, string]),
    ];
    for (const [where, text] of texts) expect(text, where).not.toMatch(/\d/);
  });

  it("the deep-dives, formulas and traps state no count, share or year", () => {
    const texts: [string, string][] = [];
    for (const d of Object.values(PLAYBOOK_DETAILS)) {
      for (const x of [d.trigger, ...d.story]) texts.push([d.slug, x]);
      for (const s of [...d.subSkills, ...d.traps]) texts.push([d.slug, `${s.name} ${s.description}`]);
    }
    for (const t of TRAP_SHAPES) texts.push([t.id, `${t.title} ${t.mechanic} ${t.fix}`]);
    for (const g of FORMULA_GROUPS) for (const f of g.formulas) texts.push([f.id, f.notes ?? ""]);
    for (const [where, text] of texts) expect(text, where).not.toMatch(BANK_FIGURE);
  });

  it("a stray unit is still caught", () => {
    expect("It sets 3 questions a paper").toMatch(BANK_FIGURE);
    expect("down 12%").toMatch(BANK_FIGURE);
    expect("since 2024").toMatch(BANK_FIGURE);
    expect("|2A| = 8|A| for a 3 × 3 matrix").not.toMatch(BANK_FIGURE);
  });
});

describe("jee-mains-maths guide — trends callouts agree with the grid", () => {
  it("each callout's direction matches its early and recent rates", () => {
    for (const c of DRIFT_CALLOUTS) {
      const row = CHAPTER_TABLE.find((r) => r.chapter === c.chapter);
      expect(row, c.chapter).toBeDefined();
      if (c.direction === "up") expect(row!.recentPerPaper, c.chapter).toBeGreaterThan(row!.earlyPerPaper);
      else expect(row!.recentPerPaper, c.chapter).toBeLessThan(row!.earlyPerPaper);
    }
  });
});

describe("jee-mains-maths guide — typed figures outside the data modules", () => {
  it("the trends report claim states the bank's current question count", async () => {
    const { trendsReportFor } = await import("@/lib/guide/trendsReports");
    const { OVERVIEW } = await import("@/app/guide/jee-mains-maths/_data/jee-mains-maths");
    const claim = trendsReportFor("/guide/jee-mains-maths/trends")?.claim ?? "";
    expect(claim).toContain(OVERVIEW.totalQ.toLocaleString("en-IN"));
  });

  it("the formula sheet follows the playbook order", () => {
    expect(FORMULA_GROUPS.map((g) => g.playbookSlug)).toEqual([...PLAYBOOK_SLUGS]);
  });
});
