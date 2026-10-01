/**
 * Live half of the /guide/jee-mains-physics checks (the offline half is
 * tests/jee-mains-physics-guide-data.test.ts; the grid itself is pinned by `npm run jee:matrix -- --check`).
 *
 * Two things only the live bank can prove:
 *   - every subtopic NAME the guide drills resolves in its chapter — a typo or a later re-cut renders
 *     an empty /browse drill and no error;
 *   - every subtopic that holds a PUBLIC PYQ is one the playbook drills, so no page of questions is
 *     left out of the guide. (Not equality: Trigonometric Identities keeps practice-only subtopics
 *     that carry no PYQ.)
 *
 * PROD-CONTRACT: matches the `tests/guide-*.test.ts` glob in tests/prodContractFiles.ts, so it runs
 * under `npm run test:prod-contract`, not the default `npm test`.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { resolveTaxonomy, type ResolvedTaxonomy } from "@/lib/guide/resolveTaxonomy";
import { PLAYBOOKS } from "@/app/guide/jee-mains-physics/_data/playbooks";
import { retryOnStatementTimeout } from "./helpers/retryTimeout";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

type Row = { subtopics: { name: string } | null };

describe.skipIf(!HAS_ENV)("jee-mains-physics guide — live taxonomy", () => {
  let sb: SupabaseClient;
  let tax: ResolvedTaxonomy;

  beforeAll(async () => {
    sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    tax = await resolveTaxonomy(sb, "JEE Mains", "Physics");
  });

  it("every drilled subtopic name resolves in its chapter", () => {
    const missing: string[] = [];
    for (const p of PLAYBOOKS) {
      const ch = tax.chapters.get(p.chapter);
      if (!ch) {
        missing.push(`chapter: ${p.chapter}`);
        continue;
      }
      for (const n of p.subtopics) if (!ch.subtopics.has(n)) missing.push(`${p.chapter} → ${n}`);
    }
    expect(missing).toEqual([]);
  });

  it("every subtopic holding a PUBLIC PYQ is drilled by its playbook", async () => {
    const left: string[] = [];
    for (const p of PLAYBOOKS) {
      const ch = tax.chapters.get(p.chapter);
      expect(ch, p.chapter).toBeDefined();
      const { data, error } = await retryOnStatementTimeout(() =>
        sb
          .from("questions")
          .select("subtopics(name)")
          .eq("chapter_id", ch!.id)
          .eq("visibility", "PUBLIC")
          .eq("question_kind", "pyq")
          .range(0, 999),
      );
      expect(error, error?.message).toBeNull();
      const rows = (data ?? []) as unknown as Row[];
      // The largest chapter is ~350 rows; fail loudly if one ever nears the page cap.
      expect(rows.length, `${p.chapter} hit the page cap`).toBeLessThan(1000);
      const names = new Set(rows.map((r) => r.subtopics?.name ?? "(none)"));
      for (const n of names) if (!p.subtopics.includes(n)) left.push(`${p.chapter} → ${n}`);
    }
    expect(left).toEqual([]);
  }, 120_000);
});
