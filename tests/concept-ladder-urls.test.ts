/**
 * PROD-CONTRACT: the "Learn on Concept Ladder" chip (src/lib/links/conceptLadder.ts) against
 * the two live things it joins: this bank's taxonomy and Concept Ladder's lessons.
 *
 * WHY IT EXISTS. The chip joins by NAME on our side (exam, subject, chapter, subtopic) and by
 * SLUG on Concept Ladder's. A renamed subtopic here silently drops a lesson to the chapter
 * fallback; a renamed lesson there turns the chip into a 404 on another site. Neither errors
 * anywhere. Registered in tests/prodContractFiles.ts, so it runs daily.
 */
import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { conceptLadderChapters, conceptLadderLinks } from "@/lib/links/conceptLadder";

const HAS_ENV = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);

describe.skipIf(!HAS_ENV)("the Concept Ladder map matches the live bank", () => {
  it("names real chapters and subtopics", async () => {
    const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    for (const [key, ch] of Object.entries(conceptLadderChapters)) {
      const [exam, subject, chapter] = key.split("::");
      const { data, error } = await db
        .from("subtopics")
        .select("name, chapters!inner(name, subjects!inner(name, exams!inner(name)))")
        .eq("chapters.name", chapter)
        .eq("chapters.subjects.name", subject)
        .eq("chapters.subjects.exams.name", exam);
      if (error) throw new Error(error.message);
      const live = (data ?? []).map((r) => r.name);
      expect(live.length, `${key} has subtopics`).toBeGreaterThan(0);
      expect(Object.keys(ch.bySubtopic).filter((s) => !live.includes(s)), key).toEqual([]);
    }
  });
});

describe("Concept Ladder serves every lesson the chip links to", () => {
  // Concept Ladder answers 200 even for a missing page (its not-found streams inside the
  // page's Suspense boundary), so the status proves nothing: read the page instead. A missing
  // one carries Next's 404 fallback marker; a real one is titled with the name the chip shows.
  it.each(conceptLadderLinks())("$href", async ({ href, title }) => {
    const html = await (await fetch(href)).text();
    expect(html).not.toContain("NEXT_HTTP_ERROR_FALLBACK;404");
    const pageTitle = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    expect(pageTitle.startsWith(title), `page title "${pageTitle}"`).toBe(true);
  }, 60_000);
});
