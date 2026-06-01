/**
 * Cross-link integrity — guards the question→guide resolver and the
 * reference-table playbook links, the two cross-link surfaces NOT already
 * covered by the per-guide playbook tests.
 *
 *   - The per-guide `guide-nda-<subject>-playbooks.test.ts` files resolve each
 *     playbook's chapter/subtopic against live taxonomy (the editorial→DB
 *     join). They do NOT exercise `getQuestionResources` itself, so a
 *     regression in the resolver's routing (the switch / the future registry)
 *     would slip through. PART A locks that routing (pure, no DB).
 *   - PART B is a static check that every reference-table `playbookSlug` points
 *     at a real playbook in its sibling guide — previously unchecked anywhere.
 *   - PART C (live) confirms the single-page Economics + Current Affairs
 *     subjects still resolve under live taxonomy and route to their landing —
 *     catches a DB subject rename that would silently drop the /browse chip.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getQuestionResources } from "@/lib/links/questionResources";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";

import { PLAYBOOKS as PHYSICS_PB } from "@/app/guide/nda-physics/_data/playbooks";
import { PLAYBOOKS as CHEM_PB } from "@/app/guide/nda-chemistry/_data/playbooks";
import {
  PLAYBOOKS as BIO_PB,
  PLAYBOOK_SLUGS as BIO_SLUGS,
} from "@/app/guide/nda-biology/_data/playbooks";
import {
  PLAYBOOKS as GEO_PB,
  PLAYBOOK_SLUGS as GEO_SLUGS,
} from "@/app/guide/nda-geography/_data/playbooks";
import {
  PLAYBOOKS as HIST_PB,
  PLAYBOOK_SLUGS as HIST_SLUGS,
} from "@/app/guide/nda-history/_data/playbooks";
import {
  PLAYBOOKS as POL_PB,
  PLAYBOOK_SLUGS as POL_SLUGS,
} from "@/app/guide/nda-polity/_data/playbooks";
import { PLAYBOOKS as ENG_PB } from "@/app/guide/nda-english/_data/playbooks";

import { REFERENCE_CLUSTERS as BIO_CLUSTERS } from "@/app/guide/nda-biology/_data/reference-tables";
import { REFERENCE_CLUSTERS as GEO_CLUSTERS } from "@/app/guide/nda-geography/_data/reference-tables";
import { REFERENCE_CLUSTERS as POL_CLUSTERS } from "@/app/guide/nda-polity/_data/reference-tables";
import { REFERENCE_CLUSTERS as HIST_CLUSTERS } from "@/app/guide/nda-history/_data/timeline-and-pairs";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Subjects whose playbooks are keyed by chapter name. */
const CHAPTER_KEYED = [
  { subject: "Physics", guideSlug: "nda-physics", playbooks: PHYSICS_PB },
  { subject: "Chemistry", guideSlug: "nda-chemistry", playbooks: CHEM_PB },
  { subject: "Biology", guideSlug: "nda-biology", playbooks: BIO_PB },
  { subject: "Geography", guideSlug: "nda-geography", playbooks: GEO_PB },
  { subject: "History", guideSlug: "nda-history", playbooks: HIST_PB },
  { subject: "Polity", guideSlug: "nda-polity", playbooks: POL_PB },
] as const;

/** Guides with a multi-domain reference-tables page that links to playbooks. */
const REF_GUIDES = [
  { name: "biology", clusters: BIO_CLUSTERS, slugs: BIO_SLUGS },
  { name: "geography", clusters: GEO_CLUSTERS, slugs: GEO_SLUGS },
  { name: "history", clusters: HIST_CLUSTERS, slugs: HIST_SLUGS },
  { name: "polity", clusters: POL_CLUSTERS, slugs: POL_SLUGS },
] as const;

// ─── PART A — resolver routing (pure) ──────────────────────────────────────

describe("question→guide resolver routing", () => {
  it.each(CHAPTER_KEYED)(
    "$subject: every playbook chapter resolves to its playbook link",
    ({ subject, guideSlug, playbooks }) => {
      for (const p of playbooks) {
        const res = getQuestionResources({
          examName: "NDA",
          subjectName: subject,
          chapterName: p.chapter,
          subtopicName: null,
        });
        expect(res.guide, `${subject} / ${p.chapter}`).not.toBeNull();
        expect(res.guide!.href).toBe(
          `/guide/${guideSlug}/playbooks/${p.slug}`
        );
      }
    }
  );

  it("English: every playbook (chapter+subtopic) resolves to its playbook link", () => {
    for (const p of ENG_PB) {
      const res = getQuestionResources({
        examName: "NDA",
        subjectName: "English",
        chapterName: p.chapter,
        subtopicName: p.subtopics[0],
      });
      expect(
        res.guide,
        `English / ${p.chapter} / ${p.subtopics[0]}`
      ).not.toBeNull();
      expect(res.guide!.href).toBe(`/guide/nda-english/playbooks/${p.slug}`);
    }
  });

  it("Mathematics (no principle tag) routes to the strategy overview", () => {
    const res = getQuestionResources({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Statistics",
      subtopicName: "Central Tendency",
    });
    expect(res.guide?.href).toBe("/guide/nda-maths");
  });

  it.each([
    ["Economics", "/guide/nda-economics"],
    ["Current Affairs", "/guide/nda-current-affairs"],
  ])("%s routes to its single-page landing", (subject, href) => {
    const res = getQuestionResources({
      examName: "NDA",
      subjectName: subject,
      chapterName: "Any Chapter",
      subtopicName: null,
    });
    expect(res.guide?.href).toBe(href);
  });

  it("a non-NDA exam yields no guide link", () => {
    const res = getQuestionResources({
      examName: "MHT-CET",
      subjectName: "Physics",
      chapterName: "Optics (Ray)",
      subtopicName: null,
    });
    expect(res.guide).toBeNull();
  });
});

// ─── PART B — reference-table playbook links (static) ──────────────────────

describe("reference-table playbook links are valid", () => {
  it.each(REF_GUIDES)(
    "$name: every entry.playbookSlug exists in PLAYBOOK_SLUGS",
    ({ clusters, slugs }) => {
      const bad: string[] = [];
      for (const cluster of clusters) {
        for (const e of cluster.entries) {
          if (e.playbookSlug && !slugs.includes(e.playbookSlug)) {
            bad.push(`${cluster.theme} / ${e.name} → ${e.playbookSlug}`);
          }
        }
      }
      expect(
        bad,
        `unknown playbookSlug refs:\n  - ${bad.join("\n  - ")}`
      ).toEqual([]);
    }
  );
});

// ─── PART C — single-page subjects resolve under live taxonomy ─────────────

describe.skipIf(!HAS_ENV)(
  "single-page guide subjects resolve under live taxonomy",
  () => {
    let client: SupabaseClient;

    beforeAll(() => {
      client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );
    });

    it.each([
      ["Economics", "/guide/nda-economics"],
      ["Current Affairs", "/guide/nda-current-affairs"],
    ])(
      "%s: subject + chapters resolve and route to the landing",
      async (subject, href) => {
        // resolveTaxonomy throws if the DB subject name no longer matches.
        const taxonomy = await resolveTaxonomy(client, "NDA", subject);
        const chapterNames = [...taxonomy.chapters.keys()];
        expect(
          chapterNames.length,
          `no chapters resolved for "${subject}"`
        ).toBeGreaterThan(0);

        const res = getQuestionResources({
          examName: "NDA",
          subjectName: subject,
          chapterName: chapterNames[0],
          subtopicName: null,
        });
        expect(res.guide?.href).toBe(href);
      }
    );
  }
);
