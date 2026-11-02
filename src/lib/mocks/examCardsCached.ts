import { unstable_cache } from "next/cache";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { getPublishedMocks } from "./query";
import { buildMockExamCards, type MockExamCard } from "./mocksNav";

/**
 * Every exam's mock card (counts by type, past-paper years), cached for a page
 * rendered per request: /pricing reads one card, and getPublishedMocks reads
 * every published mock row. Anon client, so PUBLIC rows only and one copy is
 * safe to share. Keyed by UTC day as well as the hour's revalidate, the same
 * guard as the homepage counts (lib/exam/allExamStats.ts), so a copy that
 * stops refreshing cannot outlive its day.
 */
export function getMockExamCardsCached(now: Date = new Date()): Promise<MockExamCard[]> {
  return unstable_cache(
    async () => buildMockExamCards(await getPublishedMocks(createSupabaseAnonClient())),
    ["mock-exam-cards-v1", now.toISOString().slice(0, 10)],
    { revalidate: 3600 }
  )();
}
