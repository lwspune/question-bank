/**
 * What the buy box on a book's page shows one visitor. The page itself is the
 * same cached copy for everyone (so it stays fast and indexable); this is the
 * per-visitor part, asked for by the browser after the page loads.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { SCOPE_MOCKS } from "@/lib/entitlements/access";
import { userHasAccess } from "@/lib/entitlements/query";
import { ebookDownloadsLeft } from "./downloads";
import { ebookPricePaise } from "./pricing";

export type EbookStatus = {
  signedIn: boolean;
  owned: boolean;
  /** Downloads left on the buyer's purchase; null when not owned. */
  left: number | null;
  listPaise: number;
  /** What this visitor would pay: 20% less for a pass holder. */
  pricePaise: number;
  passHolder: boolean;
  /** The buyer's "want it printed" answer, when they gave one. */
  printInterest: { pincode: string | null } | null;
};

export async function ebookStatus(
  db: SupabaseClient,
  admin: SupabaseClient,
  userId: string | null,
  slug: string
): Promise<EbookStatus | null> {
  const { data: book } = await db.from("ebooks").select("price_paise").eq("slug", slug).maybeSingle();
  if (!book) return null;
  const listPaise = book.price_paise as number;
  if (!userId) {
    return { signedIn: false, owned: false, left: null, listPaise, pricePaise: listPaise, passHolder: false, printInterest: null };
  }
  const [{ data: purchase }, { data: interest }, passHolder] = await Promise.all([
    db.from("ebook_purchases").select("id").eq("user_id", userId).eq("ebook_slug", slug).eq("status", "active").maybeSingle(),
    db.from("ebook_print_interest").select("pincode").eq("user_id", userId).eq("ebook_slug", slug).maybeSingle(),
    userHasAccess(db, userId, SCOPE_MOCKS),
  ]);
  return {
    signedIn: true,
    owned: !!purchase,
    left: purchase ? await ebookDownloadsLeft(admin, purchase.id as string) : null,
    listPaise,
    pricePaise: ebookPricePaise(listPaise, passHolder),
    passHolder,
    printInterest: interest ? { pincode: (interest.pincode as string | null) ?? null } : null,
  };
}
