import { describe, it, expect } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { searchVQuestions } from "@/lib/chat/questionToolsServer";

type Row = { id: string; text: string; chapter: { name: string } | null; exam: { name: string } | null };

/**
 * A fake anon client: a chapter read (`.eq("chapter_id")`) returns `chapterRows`,
 * a word search (`.textSearch`) returns `searchRows`. Only the branching is
 * under test here, not the SQL.
 */
function fakeClient(chapterRows: Row[], searchRows: Row[]): SupabaseClient {
  const from = () => {
    let kind: "chapter" | "search" | null = null;
    const builder = {
      select: () => builder,
      eq: (col: string) => {
        if (col === "chapter_id") kind = "chapter";
        return builder;
      },
      textSearch: () => {
        kind = "search";
        return builder;
      },
      limit: () => builder,
      then: (resolve: (v: { data: Row[]; error: null }) => unknown) =>
        resolve({ data: kind === "chapter" ? chapterRows : kind === "search" ? searchRows : [], error: null }),
    };
    return builder;
  };
  return { from } as unknown as SupabaseClient;
}

const row = (id: string, text: string): Row => ({ id, text, chapter: { name: "Vocabulary" }, exam: { name: "SSC CGL" } });

const PASTED = "Select the most appropriate synonym of the given word: Ephemeral";

describe("searchVQuestions", () => {
  it("matches inside the page's chapter when the stem is there", async () => {
    const client = fakeClient([row("a", PASTED)], []);
    const hits = await searchVQuestions(client, PASTED, "chapter-1");
    expect(hits.map((h) => h.id)).toEqual(["a"]);
  });

  /**
   * The chapter read stops at 1,000 rows (PostgREST's cap). SSC CGL English
   * Vocabulary passed it on 2026-10-30 (1,036 PUBLIC), so a pasted stem can be
   * one the chapter read never returned. The word search must still run when
   * the chapter rows hold no match, not only when there are none at all.
   */
  it("falls back to the word search when the chapter rows hold no match", async () => {
    const others = Array.from({ length: 5 }, (_, i) => row(`x${i}`, `Choose the antonym of the word number ${i}: Gregarious`));
    const client = fakeClient(others, [row("b", PASTED)]);
    const hits = await searchVQuestions(client, PASTED, "chapter-1");
    expect(hits.map((h) => h.id)).toEqual(["b"]);
  });
});
