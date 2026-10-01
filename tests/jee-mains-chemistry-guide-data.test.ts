/**
 * Offline half of the /guide/jee-mains-chemistry checks. The live half (subtopic names resolve in the
 * bank) is tests/guide-jee-mains-chemistry-playbooks.test.ts; the grid itself is pinned by
 * `npm run jee:matrix -- --subject=Chemistry --check`.
 *
 * What this file guards:
 *   - STRAND MEMBERSHIP. The strands are kinds of work, and the Calculate strand is drawn on a measured
 *     line: every Calculate chapter is at or above CALC_LINE per cent calculation rows, every other
 *     playbook chapter below it. The grid moves on every ingest, so a chapter crossing the line fails
 *     here and the strategy prose that names it gets re-read.
 *   - THE SYLLABUS CUT. The eight chapters with no notes left the syllabus; their recent rate stays
 *     near zero (the few 2025-26 rows filed under them are on live topics — SUGGESTIONS.md ledger).
 *   - every slug in deep-dives, reference groups and traps resolves, and each playbook has one of each;
 *   - PROSE CARRIES NO FIGURES: editorial text written by us has no digits at all, and the deep-dives
 *     (where chemistry values are legitimate) carry no count, share or year;
 *   - each trends callout's direction still agrees with the grid.
 */
import { describe, expect, it } from "vitest";
import { CHAPTER_TABLE, ROUTES } from "@/app/guide/jee-mains-chemistry/_data/jee-mains-chemistry";
import {
  CALC_LINE,
  CHAPTER_NOTES,
  LEFT_CHAPTERS,
  LEFT_MAX_RECENT,
  PLAYBOOK_LINE,
  STRATEGY_STRANDS,
  TAIL_CHAPTERS,
  TIME_PLAN,
  FORMAT_RULES,
} from "@/app/guide/jee-mains-chemistry/_data/strategy";
import { PLAYBOOKS, PLAYBOOK_SLUGS } from "@/app/guide/jee-mains-chemistry/_data/playbooks";
import { PLAYBOOK_DETAILS } from "@/app/guide/jee-mains-chemistry/_data/playbook-details";
import { REFERENCE_GROUPS } from "@/app/guide/jee-mains-chemistry/_data/reference";
import { TRAP_SHAPES } from "@/app/guide/jee-mains-chemistry/_data/traps";
import { DRIFT_CALLOUTS } from "@/app/guide/jee-mains-chemistry/_data/trends";
import { CHAPTER_MATRIX } from "@/app/guide/jee-mains-chemistry/_data/matrix.generated";

/** A count, a share or a year: the figures that go stale after an ingest. */
const BANK_FIGURE = /\b\d+(\.\d+)?\s*(%|per ?cent|questions?\b|PYQs?\b|papers?\b|sittings?\b|shifts?\b)|\b20[12]\d\b/i;

const byStrand = () =>
  Object.fromEntries(STRATEGY_STRANDS.map((s) => [s.id, s.chapters.map((c) => c.chapter).sort()]));

describe("jee-mains-chemistry guide — strands", () => {
  it("pins the current strand membership (an ingest that moves one must re-read the strategy prose)", () => {
    const s = byStrand();
    expect(s.calculate).toEqual(
      [
        "Chemical Kinetics",
        "Chemical Thermodynamics",
        "Electrochemistry",
        "Equilibrium",
        "Solutions",
        "Some Basic Concepts of Chemistry",
        "Structure of Atom",
      ].sort(),
    );
    expect(s.reactions).toEqual(
      [
        "Alcohols, Phenols and Ethers",
        "Aldehydes, Ketones and Carboxylic Acids",
        "Amines",
        "Haloalkanes and Haloarenes",
        "Hydrocarbons",
      ].sort(),
    );
    expect(s.structure).toEqual(
      [
        "Biomolecules",
        "Chemical Bonding and Molecular Structure",
        "Classification of Elements and Periodicity",
        "Coordination Compounds",
        "Organic Chemistry - Some Basic Principles and Techniques",
        "The d- and f-Block Elements",
        "The p-Block Elements",
      ].sort(),
    );
    expect(TAIL_CHAPTERS.map((c) => c.chapter)).toEqual(["Organic Reaction Mechanisms"]);
    expect(LEFT_CHAPTERS.map((c) => c.chapter).sort()).toEqual(
      [
        "Chemistry in Everyday Life",
        "Environmental Chemistry",
        "General Principles and Processes of Isolation of Elements",
        "Hydrogen",
        "Polymers",
        "Solid State",
        "Surface Chemistry",
        "The s-Block Elements",
      ].sort(),
    );
  });

  it("the calculation line separates the Calculate strand from the rest", () => {
    for (const st of STRATEGY_STRANDS)
      for (const c of st.chapters) {
        if (st.id === "calculate") expect(c.pctCalc, c.chapter).toBeGreaterThanOrEqual(CALC_LINE);
        else expect(c.pctCalc, c.chapter).toBeLessThan(CALC_LINE);
      }
  });

  it("every playbook chapter clears the playbook line; the tail does not", () => {
    for (const st of STRATEGY_STRANDS)
      for (const c of st.chapters) expect(c.recentPerPaper, c.chapter).toBeGreaterThanOrEqual(PLAYBOOK_LINE);
    for (const c of TAIL_CHAPTERS) {
      expect(c.recentPerPaper, c.chapter).toBeLessThan(PLAYBOOK_LINE);
      expect(c.recentPerPaper, c.chapter).toBeGreaterThan(0);
    }
  });

  it("the chapters that left the syllabus have no notes and almost no recent questions", () => {
    for (const c of LEFT_CHAPTERS) {
      expect(c.notesHref, c.chapter).toBeNull();
      expect(c.recentPerPaper, c.chapter).toBeLessThan(LEFT_MAX_RECENT);
    }
  });

  it("accounts for every chapter in the grid exactly once", () => {
    const placed = [...STRATEGY_STRANDS.flatMap((s) => s.chapters), ...TAIL_CHAPTERS, ...LEFT_CHAPTERS].map(
      (c) => c.chapter,
    );
    expect(placed.sort()).toEqual(CHAPTER_MATRIX.map((r) => r.chapter).sort());
  });

  it("orders a strand heaviest first", () => {
    for (const st of STRATEGY_STRANDS) {
      const rates = st.chapters.map((c) => c.recentPerPaper);
      expect(rates, st.id).toEqual([...rates].sort((a, b) => b - a));
    }
  });

  it("has an editorial note for every chapter on the paper", () => {
    for (const c of [...STRATEGY_STRANDS.flatMap((s) => s.chapters), ...TAIL_CHAPTERS])
      expect(CHAPTER_NOTES[c.chapter], c.chapter).toBeDefined();
  });

  it("the recent rates add up to one 25-question paper", () => {
    const sum = CHAPTER_TABLE.reduce((s, r) => s + r.recentPerPaper, 0);
    expect(sum).toBeCloseTo(25, 0);
  });
});

describe("jee-mains-chemistry guide — slugs resolve", () => {
  it("has one playbook per strand chapter, each with notes", () => {
    expect(PLAYBOOKS.length).toBe(STRATEGY_STRANDS.reduce((n, s) => n + s.chapters.length, 0));
    for (const p of PLAYBOOKS) {
      expect(p.subtopics.length, p.slug).toBeGreaterThan(0);
      expect(p.notesHref).toBe(`/notes/jee-mains-chemistry/${p.slug}`);
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

  it("the reference page has one group per playbook, in playbook order, named for its chapter", () => {
    expect(REFERENCE_GROUPS.map((g) => g.playbookSlug)).toEqual([...PLAYBOOK_SLUGS]);
    for (const g of REFERENCE_GROUPS) {
      expect(PLAYBOOKS.find((p) => p.slug === g.playbookSlug)?.chapter).toBe(g.chapter);
      const ids = g.formulas.map((f) => f.id);
      expect(new Set(ids).size, g.chapter).toBe(ids.length);
      expect(g.formulas.length, g.chapter).toBeGreaterThan(0);
    }
  });

  it("reference entries are plain text, not LaTeX", () => {
    for (const g of REFERENCE_GROUPS)
      for (const f of g.formulas)
        for (const t of [f.name, f.formula, f.notes ?? "", ...f.legend]) expect(t, `${g.chapter}/${f.id}`).not.toMatch(/\\/);
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

describe("jee-mains-chemistry guide — prose carries no figures", () => {
  it("our editorial text has no digits at all", () => {
    const texts: [string, string][] = [
      ...Object.entries(CHAPTER_NOTES).map(([k, v]) => [k, v.summary] as [string, string]),
      ...STRATEGY_STRANDS.flatMap((s) => [s.pitch, ...s.approach].map((x) => [s.id, x] as [string, string])),
      ...TIME_PLAN.map((s) => [s.step, s.detail] as [string, string]),
      ...FORMAT_RULES.map((f) => [f.format, `${f.how} ${f.why}`] as [string, string]),
      ...DRIFT_CALLOUTS.flatMap((c) => [[c.chapter, c.title], [c.chapter, c.description]] as [string, string][]),
      ...ROUTES.map((r) => [r.label, r.blurb.replace(/[+−-][14]\b/g, "")] as [string, string]),
    ];
    for (const [where, text] of texts) expect(text, where).not.toMatch(/\d/);
  });

  it("the deep-dives, reference notes and traps state no count, share or year", () => {
    const texts: [string, string][] = [];
    for (const d of Object.values(PLAYBOOK_DETAILS)) {
      for (const x of [d.trigger, ...d.story]) texts.push([d.slug, x]);
      for (const s of [...d.subSkills, ...d.traps]) texts.push([d.slug, `${s.name} ${s.description}`]);
    }
    for (const t of TRAP_SHAPES) texts.push([t.id, `${t.title} ${t.mechanic} ${t.fix}`]);
    for (const g of REFERENCE_GROUPS) for (const f of g.formulas) texts.push([f.id, f.notes ?? ""]);
    for (const [where, text] of texts) expect(text, where).not.toMatch(BANK_FIGURE);
  });
});

describe("jee-mains-chemistry guide — the trends report headline is measured", () => {
  it("states the bank's question count and the Calculate strand's early and recent rates", async () => {
    const { trendsReportFor } = await import("@/lib/guide/trendsReports");
    const { OVERVIEW } = await import("@/app/guide/jee-mains-chemistry/_data/jee-mains-chemistry");
    const claim = trendsReportFor("/guide/jee-mains-chemistry/trends")?.claim ?? "";
    expect(claim).toContain(OVERVIEW.totalQ.toLocaleString("en-IN"));
    const calc = STRATEGY_STRANDS.find((s) => s.id === "calculate")!.chapters;
    const early = Math.round(calc.reduce((n, c) => n + c.earlyPerPaper, 0));
    const recent = Math.round(calc.reduce((n, c) => n + c.recentPerPaper, 0));
    expect(claim).toContain(`from ${early} to ${recent} a paper`);
  });
});

describe("jee-mains-chemistry guide — trends callouts agree with the grid", () => {
  it("each callout's direction matches its early and recent rates", () => {
    for (const c of DRIFT_CALLOUTS) {
      const row = CHAPTER_TABLE.find((r) => r.chapter === c.chapter);
      expect(row, c.chapter).toBeDefined();
      if (c.direction === "up") expect(row!.recentPerPaper, c.chapter).toBeGreaterThan(row!.earlyPerPaper);
      else expect(row!.recentPerPaper, c.chapter).toBeLessThan(row!.earlyPerPaper);
    }
  });
});
