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

async function count(q: PromiseLike<{ count: number | null }>): Promise<number> {
  return (await q).count ?? 0;
}

export async function loadEbookStoreReadout(admin: SupabaseClient): Promise<EbookStoreRow[]> {
  const { data: books } = await admin.from("ebooks").select("slug, title, active").order("sort_order");
  const out: EbookStoreRow[] = [];
  for (const book of books ?? []) {
    const slug = book.slug as string;
    // Every purchase of the book, paged: buyers, revenue and refunds from one read.
    let revenuePaise = 0;
    let buyers = 0;
    let refunds = 0;
    const ids: string[] = [];
    for (let from = 0; ; from += PAGE) {
      const { data } = await admin
        .from("ebook_purchases")
        .select("id, amount_paise, status")
        .eq("ebook_slug", slug)
        .order("id")
        .range(from, from + PAGE - 1);
      for (const r of data ?? []) {
        ids.push(r.id as string);
        if (r.status === "active") {
          buyers += 1;
          revenuePaise += r.amount_paise as number;
        } else {
          refunds += 1;
        }
      }
      if (!data || data.length < PAGE) break;
    }
    const [printInterest, withPincode] = await Promise.all([
      count(admin.from("ebook_print_interest").select("user_id", { count: "exact", head: true }).eq("ebook_slug", slug)),
      count(
        admin
          .from("ebook_print_interest")
          .select("user_id", { count: "exact", head: true })
          .eq("ebook_slug", slug)
          .not("pincode", "is", null)
      ),
    ]);
    // Downloads of every purchase, refunded ones included. The ids go in
    // chunks: `.in()` is a URL, which breaks near 800 ids.
    let downloads = 0;
    for (let i = 0; i < ids.length; i += 200) {
      downloads += await count(
        admin.from("ebook_downloads").select("id", { count: "exact", head: true }).in("purchase_id", ids.slice(i, i + 200))
      );
    }
    out.push({
      slug,
      title: book.title as string,
      active: book.active as boolean,
      buyers,
      revenuePaise,
      refunds,
      printInterest,
      withPincode,
      downloads,
    });
  }
  return out;
}
