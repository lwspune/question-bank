/**
 * The terms of an ebook checkout for one buyer: is the book on sale, does the
 * buyer already own it, and what do they pay. Read with the BUYER'S client, so
 * RLS answers both questions: a book that is not active is invisible, and a
 * purchase row is visible only to its owner.
 *
 * The price is decided here, on the server, and stamped into the Razorpay
 * order (lib/ebooks/order); the client never sends one.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { SCOPE_MOCKS } from "@/lib/entitlements/access";
import { userHasAccess } from "@/lib/entitlements/query";
import { ebookPricePaise } from "./pricing";

export type EbookOrderTerms =
  | { ok: true; slug: string; title: string; listPaise: number; amountPaise: number; passHolder: boolean }
  | { ok: false; status: 404 | 409; error: string };

export async function ebookOrderTerms(db: SupabaseClient, userId: string, slug: string): Promise<EbookOrderTerms> {
  const { data: book } = await db
    .from("ebooks")
    .select("slug, title, price_paise, file_path")
    .eq("slug", slug)
    .maybeSingle();
  if (!book || !book.file_path) return { ok: false, status: 404, error: "This book is not on sale" };

  const { data: owned } = await db
    .from("ebook_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("ebook_slug", slug)
    .eq("status", "active")
    .maybeSingle();
  if (owned) return { ok: false, status: 409, error: "You already own this book. Download it from the book's page." };

  const passHolder = await userHasAccess(db, userId, SCOPE_MOCKS);
  const listPaise = book.price_paise as number;
  return {
    ok: true,
    slug: book.slug as string,
    title: book.title as string,
    listPaise,
    amountPaise: ebookPricePaise(listPaise, passHolder),
    passHolder,
  };
}
