/**
 * Integration test for the /guide/nda-chemistry playbook tree.
 *
 * Mirrors the equivalent english + physics tests — locks the invariants
 * the guide can't ship without:
 *   1. PLAYBOOK_SLUGS lists every playbook slug exactly once.
 *   2. Every detail entry's slug matches a playbook in the catalog.
 *   3. Every detail entry's relatedSlugs resolve to existing playbooks.
 *   4. Every playbook has slug, chapter, ≥1 subtopic, positive qCount.
 *   5. Every playbook's `chapter` + `subtopics[]` resolves under the live
 *      NDA Chemistry taxonomy via resolveTaxonomy — catches the silent
 *      broken-CTA failure mode after a taxonomy rename.
 *
 * Skips the live integration block if env vars aren't loaded (mirrors the
 * convention from filter-facets.test.ts and the english + physics tests).
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  PLAYBOOKS,
  PLAYBOOK_SLUGS,
} from "@/app/guide/nda-chemistry/_data/playbooks";
import { PLAYBOOK_DETAILS } from "@/app/guide/nda-chemistry/_data/playbook-details";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe("nda-chemistry playbooks — static structure", () => {
  it("PLAYBOOK_SLUGS lists every playbook slug exactly once", () => {
    expect(PLAYBOOK_SLUGS).toHaveLength(PLAYBOOKS.length);
    expect(new Set(PLAYBOOK_SLUGS).size).toBe(PLAYBOOK_SLUGS.length);
    for (const p of PLAYBOOKS) {
      expect(PLAYBOOK_SLUGS).toContain(p.slug);
    }
  });

  it("every detail entry's slug matches a playbook in the catalog", () => {
    for (const slug of Object.keys(PLAYBOOK_DETAILS)) {
      expect(PLAYBOOK_SLUGS).toContain(slug);
    }
  });

  it("every detail entry's relatedSlugs resolve to existing playbooks", () => {
    for (const [slug, detail] of Object.entries(PLAYBOOK_DETAILS)) {
      for (const related of detail.relatedSlugs) {
        expect(
          PLAYBOOK_SLUGS,
          `playbook "${slug}" references unknown related "${related}"`
        ).toContain(related);
      }
    }
  });

  it("every playbook has slug, chapter, at least one subtopic, positive qCount", () => {
    for (const p of PLAYBOOKS) {
      expect(p.slug, "missing slug").toBeTruthy();
      expect(p.chapter, "missing chapter").toBeTruthy();
      expect(
        p.subtopics.length,
        `playbook "${p.slug}" has no subtopics`
      ).toBeGreaterThan(0);
      expect(
        p.qCount,
        `playbook "${p.slug}" has zero qCount`
      ).toBeGreaterThan(0);
    }
  });
});

describe.skipIf(!HAS_ENV)(
  "nda-chemistry playbooks — live taxonomy resolution",
  () => {
    let client: SupabaseClient;

    beforeAll(() => {
      client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );
    });

    it("every playbook's chapter + subtopic names resolve under live NDA Chemistry taxonomy", async () => {
      const taxonomy = await resolveTaxonomy(client, "NDA", "Chemistry");

      const unresolved: string[] = [];
      for (const p of PLAYBOOKS) {
        const chap = taxonomy.chapters.get(p.chapter);
        if (!chap) {
          unresolved.push(
            `chapter "${p.chapter}" (in playbook "${p.slug}")`
          );
          continue;
        }
        for (const subName of p.subtopics) {
          if (!chap.subtopics.has(subName)) {
            unresolved.push(
              `subtopic "${subName}" in chapter "${p.chapter}" (playbook "${p.slug}")`
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
