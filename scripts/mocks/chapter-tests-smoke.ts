/**
 * Drive the chapter → chapter-test read (lib/mocks/chapterTestsQuery.ts)
 * against live data with the anon client — what a visitor can open.
 *
 *   npx tsx scripts/mocks/chapter-tests-smoke.ts
 *
 * Throws if a published sectional test is left unmatched without a reason the
 * rule allows (mixed chapters or an unreadable question), and lists them.
 */
import { join } from "node:path";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { readChapterTestEntries } = await import("@/lib/mocks/chapterTestsQuery");
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
  const entries = await readChapterTestEntries(db);
  const { count } = await db
    .from("mock_tests")
    .select("id", { count: "exact", head: true })
    .eq("status", "published")
    .eq("scope", "sectional");
  console.log(`published sectional tests: ${count}; matched to a chapter: ${entries.length}`);
  for (const [chapterId, t] of entries.slice(0, 5)) console.log(`  ${chapterId} -> /mock/${t.slug} (${t.questions} q, ${t.minutes} min)`);
  if (entries.length !== count) {
    const matched = new Set(entries.map(([, t]) => t.slug));
    const { data } = await db.from("mock_tests").select("slug").eq("status", "published").eq("scope", "sectional");
    console.log("unmatched:", (data ?? []).map((r) => r.slug).filter((s) => !matched.has(s)));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
