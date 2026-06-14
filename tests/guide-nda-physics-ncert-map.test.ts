/**
 * Integration test for the /guide/nda-physics/ncert-map page.
 *
 * The NCERT↔NDA map is curated editorial data (a TS module, like the
 * playbooks) joined to the live DB only by NDA chapter NAME at request time.
 * That join is the silent failure mode — a taxonomy rename leaves a row
 * pointing at a dead chapter and the BrowseLink dead-ends with no error. These
 * tests lock the invariants the page can't ship without:
 *   1. NCERT_MAP covers all 14 NDA Physics chapters, each name unique.
 *   2. Every NCERT ref is well-formed (non-empty name, cls ∈ {9,10,11,12}).
 *   3. NCERT chapter names are globally unique (many-NCERT → one-NDA mapping).
 *   4. Weak-signal tracking is only attached to Class-12 refs, and at least
 *      one 'live', one 'watch', and one 'dormant' exist — i.e. the detector is
 *      actually wired, not just declared.
 *   5. signalStatus() classifies recency correctly (the pure helper).
 *   6. Every ndaChapter resolves under the live NDA Physics taxonomy via
 *      resolveTaxonomy — catches the broken-BrowseLink failure mode after a
 *      taxonomy rename.
 *
 * Skips the live block if env vars aren't loaded (mirrors the playbooks test).
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  NCERT_MAP,
  signalStatus,
  type NcertRef,
} from "@/app/guide/nda-physics/_data/ncert-map";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const allRefs: NcertRef[] = NCERT_MAP.flatMap((r) => r.ncert);

describe("nda-physics ncert-map — pure signalStatus helper", () => {
  it("classifies a topic seen in the recent window as 'live'", () => {
    expect(signalStatus({ recentCount: 1, lastSeen: 2026 })).toBe("live");
    expect(signalStatus({ recentCount: 3, lastSeen: 2024 })).toBe("live");
  });

  it("classifies a historically-seen but recently-cold topic as 'watch'", () => {
    expect(signalStatus({ recentCount: 0, lastSeen: 2023 })).toBe("watch");
    expect(signalStatus({ recentCount: 0, lastSeen: 2017 })).toBe("watch");
  });

  it("classifies a mapped-but-never-seen topic as 'dormant'", () => {
    expect(signalStatus({ recentCount: 0, lastSeen: null })).toBe("dormant");
  });
});

describe("nda-physics ncert-map — static structure", () => {
  it("covers all 14 NDA Physics chapters, each name unique and non-empty", () => {
    expect(NCERT_MAP).toHaveLength(14);
    const names = NCERT_MAP.map((r) => r.ndaChapter);
    for (const n of names) expect(n, "empty ndaChapter").toBeTruthy();
    expect(new Set(names).size, "duplicate ndaChapter names").toBe(
      names.length
    );
  });

  it("every NCERT ref is well-formed (non-empty name, cls ∈ {9,10,11,12})", () => {
    for (const ref of allRefs) {
      expect(ref.name, "empty NCERT name").toBeTruthy();
      expect([9, 10, 11, 12], `bad cls for "${ref.name}"`).toContain(ref.cls);
    }
  });

  it("NCERT chapter names are globally unique (many-NCERT → one-NDA)", () => {
    const ncertNames = allRefs.map((r) => r.name);
    const dupes = ncertNames.filter((n, i) => ncertNames.indexOf(n) !== i);
    expect(dupes, `duplicate NCERT names: ${dupes.join(", ")}`).toEqual([]);
  });

  it("at least one chapter has no NCERT 9–12 source (honest gap, ncert: [])", () => {
    expect(NCERT_MAP.some((r) => r.ncert.length === 0)).toBe(true);
  });

  it("weak-signal tracking is attached only to Class-12 refs", () => {
    for (const ref of allRefs) {
      if (ref.signal) {
        expect(ref.cls, `signal on non-Cl12 ref "${ref.name}"`).toBe(12);
      }
    }
  });

  it("the detector is wired — at least one live, one watch, one dormant", () => {
    const statuses = allRefs
      .filter((r) => r.signal)
      .map((r) => signalStatus(r.signal!));
    expect(statuses, "no live signal").toContain("live");
    expect(statuses, "no watch signal").toContain("watch");
    expect(statuses, "no dormant signal").toContain("dormant");
  });
});

describe.skipIf(!HAS_ENV)(
  "nda-physics ncert-map — live taxonomy resolution",
  () => {
    let client: SupabaseClient;

    beforeAll(() => {
      client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );
    });

    it("every ndaChapter resolves under live NDA Physics taxonomy", async () => {
      const taxonomy = await resolveTaxonomy(client, "NDA", "Physics");

      const unresolved: string[] = [];
      for (const row of NCERT_MAP) {
        if (!taxonomy.chapters.get(row.ndaChapter)) {
          unresolved.push(row.ndaChapter);
        }
      }

      expect(
        unresolved,
        `unresolved NDA chapter names:\n  - ${unresolved.join("\n  - ")}`
      ).toEqual([]);
    });

    it("NCERT_MAP covers exactly the live NDA Physics chapter set", async () => {
      const taxonomy = await resolveTaxonomy(client, "NDA", "Physics");
      const live = new Set(taxonomy.chapters.keys());
      const mapped = new Set(NCERT_MAP.map((r) => r.ndaChapter));

      const missingFromMap = [...live].filter((c) => !mapped.has(c));
      const staleInMap = [...mapped].filter((c) => !live.has(c));

      expect(
        { missingFromMap, staleInMap },
        "NCERT_MAP drifted from live taxonomy"
      ).toEqual({ missingFromMap: [], staleInMap: [] });
    });
  }
);
