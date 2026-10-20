/**
 * The store's reads: active books only, through the anon client, so the
 * store pages are one cached copy for everyone (the buy box asks for the
 * per-visitor part separately, lib/ebooks/status).
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type StoreContentsEntry = { number: number; name: string; questions: number; page: number };

export type StoreEbook = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  pricePaise: number;
  pageCount: number | null;
  questionCount: number | null;
  contents: StoreContentsEntry[];
  hasSample: boolean;
};

const COLUMNS = "slug, title, subtitle, description, price_paise, page_count, question_count, contents, sample_path, sort_order";

function toStoreEbook(row: Record<string, unknown>): StoreEbook {
  const contents = Array.isArray(row.contents) ? (row.contents as StoreContentsEntry[]) : [];
  return {
    slug: row.slug as string,
    title: row.title as string,
    subtitle: (row.subtitle as string) ?? "",
    description: (row.description as string) ?? "",
    pricePaise: row.price_paise as number,
    pageCount: (row.page_count as number | null) ?? null,
    questionCount: (row.question_count as number | null) ?? null,
    contents,
    hasSample: !!row.sample_path,
  };
}

export async function listStoreEbooks(anon: SupabaseClient): Promise<StoreEbook[]> {
  const { data, error } = await anon.from("ebooks").select(COLUMNS).order("sort_order").order("title");
  if (error) {
    console.error("store: ebooks read failed:", error.message);
    return [];
  }
  return (data ?? []).map((r) => toStoreEbook(r as Record<string, unknown>));
}

export async function getStoreEbook(anon: SupabaseClient, slug: string): Promise<StoreEbook | null> {
  const { data, error } = await anon.from("ebooks").select(COLUMNS).eq("slug", slug).maybeSingle();
  if (error) console.error("store: ebook read failed:", error.message);
  return data ? toStoreEbook(data as Record<string, unknown>) : null;
}
