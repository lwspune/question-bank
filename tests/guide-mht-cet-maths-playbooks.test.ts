/**
 * Integration test for the /guide/mht-cet-maths playbook tree (Template C).
 *
 * Mirrors tests/guide-nda-physics-playbooks.test.ts and locks the invariants
 * this guide cannot ship without:
 *   1. PLAYBOOK_SLUGS lists every playbook slug exactly once.
 *   2. Every playbook has slug, chapter, >=1 subtopic, positive counts.
 *   3. Strand sizes match what the strategy page claims.
 *   4. The cornerstone claim ("6 chapters are ~47% of the paper") is arithmetic
 *      on the data, not prose that can silently rot.
 *   5. Every playbook's `chapter` + `subtopics[]` resolves under the live
 *      MHT-CET Maths taxonomy — catches the silent broken-CTA failure mode
 *      after a taxonomy rename, which is the documented way these guides rot.
 *
 * PROD-CONTRACT: matches the `tests/guide-*.test.ts` glob in
 * tests/prodContractFiles.ts, so it is excluded from the default `npm test`
 * (which targets the seeded test project, where this content does not exist)
 * and runs under `npm run test:prod-contract`.
 *
 * NOTE the subject name is "Maths", not "Mathematics". MHT-CET and JEE Mains
 * both use "Maths" while NDA uses "Mathematics"; resolveTaxonomy matches the
 * DB literal, so getting this wrong yields "Subject not found" rather than a
 * silent empty result.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  PLAYBOOKS,
  PLAYBOOK_SLUGS,
  playbooksInBucket,
} from "@/app/guide/mht-cet-maths/_data/playbooks";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { STRATEGY_STRANDS, TAIL_CHAPTERS } from "@/app/guide/mht-cet-maths/_data/strategy";
import { DRIFT_ROWS, DRIFT_CALLOUTS } from "@/app/guide/mht-cet-maths/_data/trends";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe("mht-cet-maths playbooks — static structure", () => {
  it("PLAYBOOK_SLUGS lists every playbook slug exactly once", () => {
    expect(PLAYBOOK_SLUGS).toHaveLength(PLAYBOOKS.length);
    expect(new Set(PLAYBOOK_SLUGS).size).toBe(PLAYBOOK_SLUGS.length);
    for (const p of PLAYBOOKS) {
      expect(PLAYBOOK_SLUGS).toContain(p.slug);
    }
  });

  it("every playbook is structurally complete", () => {
    for (const p of PLAYBOOKS) {
      expect(p.slug, "playbook missing slug").toBeTruthy();
      expect(p.chapter, `playbook "${p.slug}" missing chapter`).toBeTruthy();
      expect(
        p.subtopics.length,
        `playbook "${p.slug}" has no subtopics`
      ).toBeGreaterThan(0);
      expect(p.qCount, `playbook "${p.slug}" has zero qCount`).toBeGreaterThan(
        0
      );
      expect(
        p.qPerPaper,
        `playbook "${p.slug}" has zero qPerPaper`
      ).toBeGreaterThan(0);
      expect(
        p.summary.length,
        `playbook "${p.slug}" has a stub summary`
      ).toBeGreaterThan(60);
    }
  });

  it("each chapter appears in exactly one playbook", () => {
    const chapters = PLAYBOOKS.map((p) => p.chapter);
    expect(new Set(chapters).size).toBe(chapters.length);
  });

  it("strand sizes match what the strategy page claims", () => {
    expect(playbooksInBucket("cornerstone")).toHaveLength(6);
    expect(playbooksInBucket("quickwin")).toHaveLength(5);
    expect(playbooksInBucket("longtail")).toHaveLength(11);
    expect(PLAYBOOKS).toHaveLength(22);
  });

  it("the cornerstone claim is arithmetic on the data, not prose", () => {
    // "6 chapters carry ~47% of a 50-question paper" is the guide's headline.
    // Derive it here so an edited qPerPaper cannot leave the copy stranded.
    const cornerstoneQ = playbooksInBucket("cornerstone").reduce(
      (sum, p) => sum + p.qPerPaper,
      0
    );
    expect(cornerstoneQ).toBeGreaterThan(23);
    expect(cornerstoneQ).toBeLessThan(24);
    expect(Math.round((cornerstoneQ / 50) * 100)).toBe(47);
  });

  it("quick-win chapters really are the low-difficulty ones", () => {
    // The strand's whole promise is cheap marks. If a quickwin ever drifts
    // above the cheapest longtail chapter, the recommendation is wrong.
    const maxQuickWin = Math.max(
      ...playbooksInBucket("quickwin").map((p) => p.pctHard)
    );
    expect(maxQuickWin).toBeLessThanOrEqual(31); // Mathematical Logic, see its summary
  });

  it("no playbook ships below the 0.9 q/paper inclusion line", () => {
    for (const p of PLAYBOOKS) {
      expect(
        p.qPerPaper,
        `playbook "${p.slug}" is below the documented 0.9 q/paper line`
      ).toBeGreaterThanOrEqual(0.9);
    }
  });
});

describe.skipIf(!HAS_ENV)(
  "mht-cet-maths playbooks — live taxonomy resolution",
  () => {
    let client: SupabaseClient;

    beforeAll(() => {
      client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );
    });

    it("every playbook's chapter + subtopic names resolve under live MHT-CET Maths taxonomy", async () => {
      const taxonomy = await resolveTaxonomy(client, "MHT-CET", "Maths");

      const unresolved: string[] = [];
      for (const p of PLAYBOOKS) {
        const chap = taxonomy.chapters.get(p.chapter);
        if (!chap) {
          unresolved.push(`chapter "${p.chapter}" (in playbook "${p.slug}")`);
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

    it("a covered chapter enumerates ALL of its live subtopics", async () => {
      // A playbook that lists only some of its chapter's subtopics ships a
      // drill that silently under-covers the chapter — invisible in the UI.
      const taxonomy = await resolveTaxonomy(client, "MHT-CET", "Maths");

      const missing: string[] = [];
      for (const p of PLAYBOOKS) {
        const chap = taxonomy.chapters.get(p.chapter);
        if (!chap) continue; // covered by the test above
        for (const liveSub of chap.subtopics.keys()) {
          if (!p.subtopics.includes(liveSub)) {
            missing.push(`"${liveSub}" in chapter "${p.chapter}"`);
          }
        }
      }

      expect(
        missing,
        `subtopics live in the bank but absent from their playbook:\n  - ${missing.join(
          "\n  - "
        )}`
      ).toEqual([]);
    });
  }
);

describe.skipIf(!HAS_ENV)(
  "mht-cet-maths — EVERY taxonomy reference in the guide resolves",
  () => {
    let client: SupabaseClient;

    beforeAll(() => {
      client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );
    });

    it("resolves chapter/subtopic names from strategy, trends AND playbooks", async () => {
      // BrowseLink FAILS SILENTLY: an unresolvable chapter or subtopic name
      // degrades to an exam-wide filter rather than erroring, so a typo ships
      // as a drill CTA that quietly returns the wrong question set. The
      // playbook test above covers playbook names only — these targets live
      // in strategy strands, the tail block and the trends callouts, and
      // several name chapters that have NO playbook (Conic Sections, Measures
      // of Dispersion), so nothing else would catch them.
      const taxonomy = await resolveTaxonomy(client, "MHT-CET", "Maths");

      const refs: { where: string; chapter: string; subtopic?: string }[] = [];

      for (const strand of STRATEGY_STRANDS) {
        for (const c of strand.chapters) {
          refs.push({ where: `strategy/${strand.id}`, chapter: c.chapter });
          for (const st of [
            ...c.mustDrill,
            ...(c.skipSubtopics ?? []),
            ...(c.targetHard ?? []),
          ]) {
            refs.push({
              where: `strategy/${strand.id}/${c.chapter}`,
              chapter: c.chapter,
              subtopic: st,
            });
          }
        }
      }
      for (const t of TAIL_CHAPTERS) {
        refs.push({ where: "strategy/tail", chapter: t.chapter });
      }
      for (const r of DRIFT_ROWS) {
        refs.push({ where: "trends/drift", chapter: r.chapter });
      }
      for (const c of DRIFT_CALLOUTS) {
        if (!c.drill) continue;
        refs.push({
          where: "trends/callout",
          chapter: c.drill.chapter,
          subtopic: c.drill.subtopic,
        });
      }

      const unresolved = refs
        .filter((r) => {
          const chap = taxonomy.chapters.get(r.chapter);
          if (!chap) return true;
          return r.subtopic ? !chap.subtopics.has(r.subtopic) : false;
        })
        .map(
          (r) =>
            `${r.where}: chapter "${r.chapter}"${
              r.subtopic ? ` / subtopic "${r.subtopic}"` : ""
            }`
        );

      expect(refs.length).toBeGreaterThan(40); // guard against an empty sweep
      expect(
        unresolved,
        `unresolvable drill targets (BrowseLink would silently widen these): ${unresolved.join(
          " | "
        )}`
      ).toEqual([]);
    });

    it("accounts for all 27 live chapters across playbooks + tail", () => {
      const covered = new Set([
        ...PLAYBOOKS.map((p) => p.chapter),
        ...TAIL_CHAPTERS.map((t) => t.chapter),
      ]);
      expect(covered.size).toBe(27);
    });
  }
);
