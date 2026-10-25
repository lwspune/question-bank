/**
 * PROD-CONTRACT (tests/prodContractFiles.ts): animated solutions are part of
 * ingestion (owner, 2026-10-25). For every exam in VISUAL_INGESTION_FROM, each
 * PUBLIC question created on or after its date must carry a visual or a
 * recorded verdict (scripts/visuals/data/*.json). Runs daily in
 * prod-contract.yml, because an ingest changes data without a code diff.
 */
import { describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { VISUAL_INGESTION_FROM } from "@/lib/visuals/launch";
import { verdictsFromBatchFiles } from "../scripts/visuals/batchFiles";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const ENTRIES = Object.entries(VISUAL_INGESTION_FROM);

describe("animated-solution ingestion gate", () => {
  it("names each exam with a real calendar date", () => {
    for (const [exam, date] of ENTRIES) {
      expect(exam.trim(), "exam name").not.toBe("");
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(date))).toBe(false);
    }
  });

  it.skipIf(!HAS_ENV || ENTRIES.length === 0)("finds no new PUBLIC question without a visual or a verdict", async () => {
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    const verdicts = verdictsFromBatchFiles();
    const missing: string[] = [];
    for (const [exam, date] of ENTRIES) {
      for (let from = 0; ; from += 1000) {
        const { data, error } = await db
          .from("questions")
          .select("id, solution_visual, exams!inner(name)")
          .eq("visibility", "PUBLIC")
          .eq("exams.name", exam)
          .gte("created_at", date)
          .order("id")
          .range(from, from + 999);
        if (error) throw new Error(error.message);
        for (const r of data as { id: string; solution_visual: unknown }[]) {
          if (r.solution_visual == null && !verdicts.has(r.id)) missing.push(`${exam}: ${r.id}`);
        }
        if (data.length < 1000) break;
      }
    }
    // Draft a verdict (and a visual where it is "animate") for each, then run visuals:run.
    expect(missing.slice(0, 20), `${missing.length} new questions have no animated-solution verdict`).toEqual([]);
  });
});
