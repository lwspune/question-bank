/**
 * /books/vocab/index/print — the back-of-book A–Z index.
 *
 * `index` IS A STATIC SEGMENT and therefore shadows `[chapterSlug]`, which is
 * safe only because no chapter is called "index" — asserted below rather than
 * assumed, since a future band named `index` would silently make this page
 * unreachable and its chapter unprintable.
 *
 * THE INDEX IS WHAT KEEPS ONE LOOKUP WORKING once the book is split four ways.
 * A reader who does not know whether the exams have ever asked a word — which
 * is often exactly what they are looking it up to find out — finds it here, and
 * the tag says which part to turn to.
 */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { CADET_VOCAB, indexTagFor } from "@/lib/vocab/registry";
import type { IndexRow } from "@/lib/vocab/index";
import VocabIndexPrint from "@/app/books/vocab/_print/VocabIndexPrint";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function VocabIndexPrintPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  if (CADET_VOCAB.chapters.some((c) => c.slug === "index")) {
    throw new Error(
      'A chapter is slugged "index", which this static route shadows — rename the chapter.'
    );
  }

  const db = createSupabaseAdminClient();
  const sectionOf = new Map(CADET_VOCAB.chapters.map((c) => [c.slug, c.section ?? null]));

  /**
   * PAGED. The finished book is ~3,700 entries and PostgREST truncates a raw
   * `.select()` at 1000 with no error — an index silently missing its last two
   * thirds would look complete and correct. `.order()` makes the paging stable.
   */
  const rows: IndexRow[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("vocab_entries")
      .select("word,part,chapter_slug,times_asked")
      .eq("book_slug", CADET_VOCAB.slug)
      .eq("excluded", false)
      .order("word")
      .range(from, from + 999);
    if (error) throw new Error(`vocab_entries: ${error.message}`);
    for (const r of data ?? []) {
      rows.push({
        word: r.word as string,
        partTag: indexTagFor(
          CADET_VOCAB,
          r.part as never,
          sectionOf.get(r.chapter_slug as string) ?? null
        ),
        timesAsked: (r.times_asked as number) ?? 0,
      });
    }
    if ((data ?? []).length < 1000) break;
  }

  return <VocabIndexPrint rows={rows} title={CADET_VOCAB.title} />;
}
