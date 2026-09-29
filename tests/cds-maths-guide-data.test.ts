/**
 * /guide/cds-maths data modules against each other (offline). A slug typo in any of them renders a
 * dead cross-link with no error, so every reference is resolved here. The live-taxonomy check of the
 * subtopic NAMES is tests/guide-cds-maths-playbooks.test.ts (prod-contract suite).
 */
import { existsSync } from "node:fs";
import * as path from "node:path";
import { describe, expect, it } from "vitest";
import { PLAYBOOKS, PLAYBOOK_SLUGS } from "@/app/guide/cds-maths/_data/playbooks";
import { PLAYBOOK_DETAILS } from "@/app/guide/cds-maths/_data/playbook-details";
import { FORMULA_GROUPS } from "@/app/guide/cds-maths/_data/formulas";
import { TRAP_SHAPES } from "@/app/guide/cds-maths/_data/traps";
import { CHAPTER_TABLE, OVERVIEW } from "@/app/guide/cds-maths/_data/cds-maths";
import { STRATEGY_STRANDS, TAIL_CHAPTERS } from "@/app/guide/cds-maths/_data/strategy";

const slugs = new Set(PLAYBOOK_SLUGS);

describe("cds-maths guide data", () => {
  it("has one playbook per strand chapter, with unique slugs", () => {
    expect(PLAYBOOKS.length).toBe(OVERVIEW.playbooks);
    expect(slugs.size).toBe(PLAYBOOKS.length);
  });

  it("every playbook has a deep-dive, and no deep-dive is orphaned", () => {
    expect(new Set(Object.keys(PLAYBOOK_DETAILS))).toEqual(slugs);
    for (const [key, d] of Object.entries(PLAYBOOK_DETAILS)) expect(d.slug).toBe(key);
  });

  it("every cross-reference resolves to a playbook", () => {
    for (const d of Object.values(PLAYBOOK_DETAILS))
      for (const s of d.relatedSlugs) expect(slugs.has(s), `${d.slug} → ${s}`).toBe(true);
    for (const g of FORMULA_GROUPS) expect(slugs.has(g.playbookSlug), g.playbookSlug).toBe(true);
    for (const t of TRAP_SHAPES) for (const s of t.affects) expect(slugs.has(s), `${t.id} → ${s}`).toBe(true);
  });

  it("each formula group names its playbook's chapter", () => {
    const bySlug = new Map(PLAYBOOKS.map((p) => [p.slug, p.chapter]));
    for (const g of FORMULA_GROUPS) expect(g.chapter).toBe(bySlug.get(g.playbookSlug));
  });

  it("strands plus tail cover every chapter exactly once and sum to the bank", () => {
    const strandChapters = STRATEGY_STRANDS.flatMap((s) => s.chapters.map((c) => c.chapter));
    const all = [...strandChapters, ...TAIL_CHAPTERS.map((t) => t.chapter)];
    expect(new Set(all).size).toBe(all.length);
    expect(new Set(all)).toEqual(new Set(CHAPTER_TABLE.map((c) => c.chapter)));
    expect(STRATEGY_STRANDS.reduce((s, x) => s + x.qCount, 0) + TAIL_CHAPTERS.reduce((s, t) => s + t.qCount, 0)).toBe(
      OVERVIEW.totalQ
    );
  });

  it("the 1.5 q/paper playbook line holds both ways", () => {
    for (const row of CHAPTER_TABLE) {
      const pb = PLAYBOOKS.find((p) => p.chapter === row.chapter);
      expect(Boolean(pb), `${row.chapter} at ${row.qPerPaper}/paper`).toBe(row.qPerPaper >= 1.5);
      expect(row.qPerPaper, row.chapter).toBeCloseTo(row.qCount / OVERVIEW.papers, 2);
    }
  });

  it("every notes link points at a shipped notes page", () => {
    for (const p of PLAYBOOKS) {
      if (!p.notesHref) continue;
      expect(existsSync(path.join(process.cwd(), "src", "app", ...p.notesHref.split("/").filter(Boolean), "page.tsx")), p.notesHref).toBe(true);
    }
  });
});
