/**
 * The store experiment's numbers, per book, for /dashboard/growth (2026-10-20).
 * Service-role: purchases and downloads are not readable any other way.
 *
 * Counts use `count: "exact", head: true` and revenue pages through the rows,
 * so nothing here is silently capped at PostgREST's 1,000 rows.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type EbookStoreRow = {
  slug: string;
  title: string;
  active: boolean;
  /** Signed-in students who opened the book's page (header reading views, path /store/<slug>). */
  openedBy: number;
  /** Signed-in students who took its free sample (the sample route's ebookSampleEvent). */
  sampledBy: number;
  /** Accounts holding the book now (active purchases). */
  buyers: number;
  /** Sum of what active purchases paid. */
  revenuePaise: number;
  refunds: number;
  /** Buyers who tapped "Want this as a printed book?". */
  printInterest: number;
  withPincode: number;
  downloads: number;
};

const PAGE = 1000;

type Query = {
  order: (col: string) => Query;
  range: (from: number, to: number) => PromiseLike<{ data: unknown[] | null; error: { message: string } | null }>;
};

/** Every row a query returns, paged past PostgREST's 1,000-row cap; `order` must be unique, for a stable page. */
async function allRows<T>(build: () => unknown, what: string, order: string[] = ["id"]): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const q = order.reduce((acc, col) => acc.order(col), build() as Query);
    const { data, error } = await q.range(from, from + PAGE - 1);
    if (error) throw new Error(`ebook readout ${what}: ${error.message}`);
    out.push(...((data ?? []) as T[]));
    if (!data || data.length < PAGE) return out;
  }
}

/**
 * One read per table, grouped by book here (2026-10-26). It read about six
 * times per book, one after another, which was fine at 7 books and timed out
 * at 41 once the board books joined the store.
 */
export async function loadEbookStoreReadout(admin: SupabaseClient): Promise<EbookStoreRow[]> {
  const { data: books, error } = await admin.from("ebooks").select("slug, title, active").order("sort_order");
  if (error) throw new Error(`ebook readout books: ${error.message}`);
  const [purchases, views, interest, downloads] = await Promise.all([
    allRows<{ id: string; ebook_slug: string; amount_paise: number; status: string }>(
      () => admin.from("ebook_purchases").select("id, ebook_slug, amount_paise, status"),
      "purchases"
    ),
    // A book page's views and sample taps: path /store/<slug>, never /store itself.
    allRows<{ user_id: string; surface: string; path: string }>(
      () =>
        admin
          .from("user_activity")
          .select("id, user_id, surface:metadata->>surface, path:metadata->>path")
          .eq("kind", "surface_viewed")
          .in("metadata->>surface", ["store", "ebook_sample"])
          .like("metadata->>path", "/store/%"),
      "views"
    ),
    // Keyed by (user_id, ebook_slug): it has no id column.
    allRows<{ ebook_slug: string; pincode: string | null }>(
      () => admin.from("ebook_print_interest").select("user_id, ebook_slug, pincode"),
      "print interest",
      ["user_id", "ebook_slug"]
    ),
    // Downloads of every purchase, refunded ones included.
    allRows<{ purchase_id: string }>(() => admin.from("ebook_downloads").select("id, purchase_id"), "downloads"),
  ]);

  const slugOfPurchase = new Map(purchases.map((p) => [p.id, p.ebook_slug]));
  const downloadsBySlug = new Map<string, number>();
  for (const d of downloads) {
    const slug = slugOfPurchase.get(d.purchase_id);
    if (slug) downloadsBySlug.set(slug, (downloadsBySlug.get(slug) ?? 0) + 1);
  }
  const viewers = (surface: string, slug: string) =>
    new Set(views.filter((v) => v.surface === surface && v.path === `/store/${slug}`).map((v) => v.user_id)).size;

  return (books ?? []).map((book) => {
    const slug = book.slug as string;
    const mine = purchases.filter((p) => p.ebook_slug === slug);
    const active = mine.filter((p) => p.status === "active");
    const taps = interest.filter((i) => i.ebook_slug === slug);
    return {
      slug,
      title: book.title as string,
      active: book.active as boolean,
      openedBy: viewers("store", slug),
      sampledBy: viewers("ebook_sample", slug),
      buyers: active.length,
      revenuePaise: active.reduce((s, p) => s + p.amount_paise, 0),
      refunds: mine.length - active.length,
      printInterest: taps.length,
      withPincode: taps.filter((i) => i.pincode !== null).length,
      downloads: downloadsBySlug.get(slug) ?? 0,
    };
  });
}
