/**
 * Integration test for the /guide/nda-current-affairs single-page Template D.
 *
 * Template D — Theme-Prep Checklist for short-half-life subjects. The strand
 * axis here is recurrence-strength (not skill, not strategic priority):
 *   - Anchor themes (appears in 5+ years of papers) — deep prep checklists.
 *   - Recurring themes (appears in 3–4 years) — lighter prep.
 *   - Occasional themes (appears in 1–2 years) — drill if time permits.
 *
 * Invariants the page can't ship without:
 *   1. Theme slugs are unique across all three buckets (one ID space).
 *   2. qCount across all themes sums to the full bank (180) — no orphans.
 *   3. Anchor themes meet recurrence definition: yearsAppearing >= 5.
 *   4. Recurring themes meet definition: yearsAppearing in [3, 4].
 *   5. Occasional themes meet definition: yearsAppearing <= 2.
 *   6. Every theme has slug, name, chapter, ≥1 drillSubtopic, positive qCount.
 *   7. Every theme's chapter appears in CHAPTER_TABLE.
 *   8. CHAPTER_TABLE qCount sums to the full bank (chapter-level coverage).
 *   9. Every anchor theme carries a non-empty shape + checklist.
 *  10. Every theme's chapter + drillSubtopics resolve under live NDA Current
 *      Affairs taxonomy — catches silent broken-CTA failure mode after a
 *      taxonomy rename.
 *
 * Skips the live integration block if env vars aren't loaded.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  OVERVIEW,
  CHAPTER_TABLE,
  ANCHOR_THEMES,
  RECURRING_THEMES,
  OCCASIONAL_THEMES,
} from "@/app/guide/nda-current-affairs/_data/nda-current-affairs";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe("nda-current-affairs themes — static structure", () => {
  it("OVERVIEW totalQ matches sum of CHAPTER_TABLE qCount", () => {
    const sum = CHAPTER_TABLE.reduce((acc, c) => acc + c.qCount, 0);
    expect(sum).toBe(OVERVIEW.totalQ);
  });

  it("theme slugs are unique across all three buckets", () => {
    const all = [
      ...ANCHOR_THEMES.map((t) => t.slug),
      ...RECURRING_THEMES.map((t) => t.slug),
      ...OCCASIONAL_THEMES.map((t) => t.slug),
    ];
    const dups = all.filter((s, i) => all.indexOf(s) !== i);
    expect(dups, `duplicate slugs: ${dups.join(", ")}`).toEqual([]);
    expect(new Set(all).size).toBe(all.length);
  });

  it("theme qCount sums to OVERVIEW.totalQ (full bank coverage)", () => {
    const anchorSum = ANCHOR_THEMES.reduce((a, t) => a + t.qCount, 0);
    const recurringSum = RECURRING_THEMES.reduce((a, t) => a + t.qCount, 0);
    const occasionalSum = OCCASIONAL_THEMES.reduce((a, t) => a + t.qCount, 0);
    expect(anchorSum + recurringSum + occasionalSum).toBe(OVERVIEW.totalQ);
  });

  it("every anchor theme has yearsAppearing >= 5", () => {
    for (const t of ANCHOR_THEMES) {
      expect(
        t.yearsAppearing,
        `anchor "${t.slug}" yearsAppearing < 5`
      ).toBeGreaterThanOrEqual(5);
    }
  });

  it("every recurring theme has yearsAppearing in [3, 4]", () => {
    for (const t of RECURRING_THEMES) {
      expect(t.yearsAppearing, `recurring "${t.slug}"`).toBeGreaterThanOrEqual(3);
      expect(t.yearsAppearing, `recurring "${t.slug}"`).toBeLessThanOrEqual(4);
    }
  });

  it("every occasional theme has yearsAppearing <= 2", () => {
    for (const t of OCCASIONAL_THEMES) {
      expect(
        t.yearsAppearing,
        `occasional "${t.slug}" yearsAppearing > 2`
      ).toBeLessThanOrEqual(2);
    }
  });

  it("every theme has slug, name, chapter, ≥1 drillSubtopic, positive qCount", () => {
    const all = [...ANCHOR_THEMES, ...RECURRING_THEMES, ...OCCASIONAL_THEMES];
    for (const t of all) {
      expect(t.slug, "missing slug").toBeTruthy();
      expect(t.name, `theme "${t.slug}" missing name`).toBeTruthy();
      expect(t.chapter, `theme "${t.slug}" missing chapter`).toBeTruthy();
      expect(
        t.drillSubtopics.length,
        `theme "${t.slug}" has no drillSubtopics`
      ).toBeGreaterThan(0);
      expect(
        t.qCount,
        `theme "${t.slug}" has zero qCount`
      ).toBeGreaterThan(0);
    }
  });

  it("every theme's chapter exists in CHAPTER_TABLE", () => {
    const knownChapters = new Set(CHAPTER_TABLE.map((c) => c.chapter));
    const all = [...ANCHOR_THEMES, ...RECURRING_THEMES, ...OCCASIONAL_THEMES];
    for (const t of all) {
      expect(
        knownChapters.has(t.chapter),
        `theme "${t.slug}" references unknown chapter "${t.chapter}"`
      ).toBe(true);
    }
  });

  it("every anchor theme has a non-empty shape and checklist", () => {
    for (const t of ANCHOR_THEMES) {
      expect(t.shape, `anchor "${t.slug}" missing shape`).toBeTruthy();
      expect(
        t.checklist.length,
        `anchor "${t.slug}" has empty checklist`
      ).toBeGreaterThan(0);
    }
  });
});

describe.skipIf(!HAS_ENV)(
  "nda-current-affairs themes — live taxonomy resolution",
  () => {
    let client: SupabaseClient;

    beforeAll(() => {
      client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );
    });

    it("every theme's chapter + drillSubtopics resolve under live NDA Current Affairs taxonomy", async () => {
      const taxonomy = await resolveTaxonomy(
        client,
        "NDA",
        "Current Affairs"
      );

      const unresolved: string[] = [];
      const all = [
        ...ANCHOR_THEMES,
        ...RECURRING_THEMES,
        ...OCCASIONAL_THEMES,
      ];
      for (const t of all) {
        const chap = taxonomy.chapters.get(t.chapter);
        if (!chap) {
          unresolved.push(`chapter "${t.chapter}" (theme "${t.slug}")`);
          continue;
        }
        for (const sub of t.drillSubtopics) {
          if (!chap.subtopics.has(sub)) {
            unresolved.push(
              `subtopic "${sub}" in chapter "${t.chapter}" (theme "${t.slug}")`
            );
          }
        }
      }

      expect(
        unresolved,
        `unresolved taxonomy refs:\n  - ${unresolved.join("\n  - ")}`
      ).toEqual([]);
    });
  }
);
