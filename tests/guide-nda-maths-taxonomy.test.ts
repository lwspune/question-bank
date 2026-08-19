/**
 * Integration test for the /guide/nda-maths drill targets.
 *
 * NDA Maths is Template A (principles-first), so it has no `playbooks.ts`
 * with a `subtopics[]` array like the other guides. Instead, three editorial
 * modules carry chapter/subtopic NAMES that are resolved to UUIDs at request
 * time via resolveTaxonomy to build every "Drill the N questions" CTA:
 *
 *   - principles.ts  — DOMAINS long-tail principles' `drill: {chapter, subtopic}`
 *   - compounds.ts   — COMPOUNDS' `drillFilter` / `soloA` / `soloB`
 *   - strategy.ts    — TIER_A/TIER_B `chapter` + `mustDrill[]` + `skipSubtopics[]`,
 *                      and SKIP_LIST `chapter`
 *
 * This is the same silent broken-CTA failure mode the playbook guides guard
 * against (a DB taxonomy rename leaves the TS pointing at a dead name, so the
 * CTA resolves to an empty filter). Mirrors guide-nda-physics-playbooks.test.ts.
 *
 * Skips the live integration block if env vars aren't loaded.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { TOP_PRINCIPLES, DOMAINS } from "@/app/guide/nda-maths/_data/principles";
import { COMPOUNDS } from "@/app/guide/nda-maths/_data/compounds";
import { TIER_A, TIER_B, SKIP_LIST } from "@/app/guide/nda-maths/_data/strategy";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type TaxonomyRef = { chapter: string; subtopic?: string; source: string };

/** Every (chapter, subtopic?) reference that becomes a /browse drill CTA. */
function collectRefs(): TaxonomyRef[] {
  const refs: TaxonomyRef[] = [];

  // principles.ts — long-tail (no-slug) principles carry a static drill[].
  for (const domain of DOMAINS) {
    for (const p of domain.principles) {
      for (const drill of p.drill ?? []) {
        refs.push({
          chapter: drill.chapter,
          subtopic: drill.subtopic,
          source: `principle "${p.name}" (domain ${domain.id})`,
        });
      }
    }
  }

  // compounds.ts — drillFilter + two solo filters per compound.
  for (const c of COMPOUNDS) {
    refs.push({
      chapter: c.drillFilter.chapter,
      subtopic: c.drillFilter.subtopic,
      source: `compound "${c.name}" drillFilter`,
    });
    refs.push({
      chapter: c.soloA.chapter,
      subtopic: c.soloA.subtopic,
      source: `compound "${c.name}" soloA`,
    });
    refs.push({
      chapter: c.soloB.chapter,
      subtopic: c.soloB.subtopic,
      source: `compound "${c.name}" soloB`,
    });
  }

  // strategy.ts — tier chapters + their must-drill / skip subtopics.
  for (const tier of [...TIER_A, ...TIER_B]) {
    for (const sub of tier.mustDrill) {
      refs.push({
        chapter: tier.chapter,
        subtopic: sub,
        source: `tier "${tier.chapter}" mustDrill`,
      });
    }
    for (const sub of tier.skipSubtopics ?? []) {
      refs.push({
        chapter: tier.chapter,
        subtopic: sub,
        source: `tier "${tier.chapter}" skipSubtopics`,
      });
    }
  }

  // strategy.ts — SKIP_LIST is chapter-only (no subtopic CTA).
  for (const s of SKIP_LIST) {
    refs.push({ chapter: s.chapter, source: `skip-list "${s.chapter}"` });
  }

  return refs;
}

describe("nda-maths drill targets — static structure", () => {
  it("every TOP_PRINCIPLES principle has a slug and no static drill (DB-tag-backed)", () => {
    for (const p of TOP_PRINCIPLES) {
      expect(p.slug, `TOP_PRINCIPLES principle "${p.name}" missing slug`).toBeTruthy();
      expect(
        p.drill,
        `TOP_PRINCIPLES principle "${p.name}" should not carry a static drill`
      ).toBeUndefined();
    }
  });

  it("every long-tail (no-slug) principle has a non-empty drill with a chapter", () => {
    for (const domain of DOMAINS) {
      for (const p of domain.principles) {
        if (p.slug) continue; // TOP_PRINCIPLES entries are DB-backed
        expect(
          p.drill && p.drill.length > 0,
          `long-tail principle "${p.name}" (domain ${domain.id}) has no drill target`
        ).toBe(true);
        for (const d of p.drill ?? []) {
          expect(d.chapter, `principle "${p.name}" drill missing chapter`).toBeTruthy();
        }
      }
    }
  });

  it("every compound + tier carries a chapter on each drill target", () => {
    for (const c of COMPOUNDS) {
      expect(c.drillFilter.chapter, `compound "${c.name}"`).toBeTruthy();
      expect(c.soloA.chapter, `compound "${c.name}" soloA`).toBeTruthy();
      expect(c.soloB.chapter, `compound "${c.name}" soloB`).toBeTruthy();
    }
    for (const tier of [...TIER_A, ...TIER_B]) {
      expect(tier.chapter, "tier chapter").toBeTruthy();
      expect(
        tier.mustDrill.length,
        `tier "${tier.chapter}" has no mustDrill`
      ).toBeGreaterThan(0);
    }
  });
});

describe.skipIf(!HAS_ENV)("nda-maths drill targets — live taxonomy resolution", () => {
  let client: SupabaseClient;

  beforeAll(() => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
  });

  it("every drill target's chapter + subtopic resolves under live NDA Mathematics taxonomy", async () => {
    const taxonomy = await resolveTaxonomy(client, "NDA", "Mathematics");

    const unresolved: string[] = [];
    for (const ref of collectRefs()) {
      const chap = taxonomy.chapters.get(ref.chapter);
      if (!chap) {
        unresolved.push(`chapter "${ref.chapter}" (${ref.source})`);
        continue;
      }
      if (ref.subtopic && !chap.subtopics.has(ref.subtopic)) {
        unresolved.push(
          `subtopic "${ref.subtopic}" in chapter "${ref.chapter}" (${ref.source})`
        );
      }
    }

    // De-dupe so a shared subtopic referenced by several sources lists once.
    const distinct = [...new Set(unresolved)];
    expect(
      distinct,
      `unresolved taxonomy refs:\n  - ${distinct.join("\n  - ")}`
    ).toEqual([]);
  });
});
