/**
 * PROD-CONTRACT: the concept prerequisite graph vs the LIVE NDA Mathematics
 * taxonomy.
 *
 * This runs against PROD, not the test project, because the thing it checks —
 * the real chapter names — only exists there; the seeded test project carries
 * three chapters. Registered in tests/prodContractFiles.ts and run by
 * `npm run test:prod-contract`.
 *
 * WHY IT EXISTS. The graph joins to per-chapter accuracy by NAME. A node whose
 * spelling drifts from the bank — a Phase-D rename, a merged chapter — does not
 * error, does not blank the page, and does not empty a list. That chapter simply
 * stops ever being anybody's root cause, and the "Where to focus" card quietly
 * gets worse. This test is the only thing between a rename and a silently dead
 * feature, and it is the same class of check the guide playbook suites run.
 */
import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { CHAPTER_PREREQS, validateConceptGraph } from "@/lib/performance/conceptGraph";

const HAS_ENV = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

describe.skipIf(!HAS_ENV)("concept graph resolves against the live bank", () => {
  it("every node is a real NDA Mathematics chapter", async () => {
    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );
    const { data, error } = await db
      .from("chapters")
      .select("name, subjects!inner(name, exams!inner(name))")
      .eq("subjects.name", "Mathematics")
      .eq("subjects.exams.name", "NDA");
    if (error) throw new Error(error.message);

    const live = (data ?? []).map((r) => (r as unknown as { name: string }).name);
    // Sanity floor: NDA Maths carries 31 chapters. Without this the assertion
    // below passes trivially against an empty or wrongly-scoped read — which is
    // exactly what happened when this suite first ran against the test project.
    expect(live.length).toBeGreaterThan(20);

    const { unknownNodes } = validateConceptGraph(CHAPTER_PREREQS, live);
    expect(unknownNodes).toEqual([]);
  });
});
