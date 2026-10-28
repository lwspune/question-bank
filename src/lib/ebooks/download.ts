/**
 * Serve a buyer their copy of an ebook (2026-10-20).
 *
 * 1. Ownership is read with the BUYER'S client: the purchase row is visible
 *    only to its owner (RLS), so someone who has not bought the book is
 *    refused by the database's answer, not by a check this code could skip.
 * 2. The buyer's stamped copy is made once per master version and name, and
 *    kept in the private bucket; a later download reuses it. A new master (a
 *    rebuild after a fix) or a changed cover name (lib/ebooks/printName) is
 *    stamped again on the next download.
 * 3. The download is counted only once a link is ready, so a failure never
 *    spends one of the five; the cap itself is the trigger in migration 0172.
 * 4. The file is reached through a short-lived signed link, straight from
 *    storage. A Vercel function cannot send a body this size (4.5 MB cap).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { stampEbook } from "./stamp";
import { ebookDownloadsLeft, recordEbookDownload } from "./downloads";
import { PAPER } from "./theme";
import { coverName } from "./coverName";

const BUCKET = "ebooks";
/** Long enough to start a slow phone download, short enough not to be worth sharing. */
const LINK_SECONDS = 10 * 60;

/** "20 Oct 2026", in India's time zone. */
export function licenceDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(iso)
  );
}

export function ebookFilename(slug: string): string {
  return `PYQ-Vault-${slug}.pdf`;
}

export type DownloadResult =
  | { ok: true; url: string; left: number }
  | { ok: false; status: 403 | 404 | 429 | 500; error: string };

export async function prepareEbookDownload(args: {
  db: SupabaseClient;
  admin: SupabaseClient;
  /** `name` is the account's own (lib/ebooks/coverName accountNameOf), the cover's default. */
  user: { id: string; email: string; name?: string | null };
  slug: string;
}): Promise<DownloadResult> {
  const { db, admin, user, slug } = args;

  const { data: purchase } = await db
    .from("ebook_purchases")
    .select("id, payment_id, created_at, stamped_path, stamped_version, print_name, stamped_name")
    .eq("user_id", user.id)
    .eq("ebook_slug", slug)
    .eq("status", "active")
    .maybeSingle();
  if (!purchase) return { ok: false, status: 403, error: "You have not bought this book." };

  const { data: book } = await admin.from("ebooks").select("title, file_path, version, name_plate").eq("slug", slug).maybeSingle();
  if (!book?.file_path) return { ok: false, status: 404, error: "This book's file is not ready yet." };

  if ((await ebookDownloadsLeft(admin, purchase.id)) === 0) {
    return { ok: false, status: 429, error: "You have used all 5 downloads of this book. Write to us if you need another." };
  }

  const name = coverName({ printName: (purchase.print_name as string | null) ?? null, accountName: user.name ?? null });
  let path = purchase.stamped_path as string | null;
  if (!path || purchase.stamped_version !== book.version || ((purchase.stamped_name as string | null) ?? null) !== name) {
    const master = await admin.storage.from(BUCKET).download(book.file_path as string);
    if (master.error || !master.data) {
      console.error("ebook master download failed:", master.error?.message);
      return { ok: false, status: 500, error: "Could not prepare your copy. Try again in a minute." };
    }
    const stamped = await stampEbook(new Uint8Array(await master.data.arrayBuffer()), {
      email: user.email,
      name,
      namePlate: !!book.name_plate,
      orderRef: purchase.payment_id as string,
      date: licenceDate(purchase.created_at as string),
      title: book.title as string,
      paper: PAPER,
    });
    path = `stamped/${purchase.id}/v${book.version}.pdf`;
    const up = await admin.storage.from(BUCKET).upload(path, stamped, { contentType: "application/pdf", upsert: true });
    if (up.error) {
      console.error("ebook stamped upload failed:", up.error.message);
      return { ok: false, status: 500, error: "Could not prepare your copy. Try again in a minute." };
    }
    await admin
      .from("ebook_purchases")
      .update({ stamped_path: path, stamped_version: book.version, stamped_name: name })
      .eq("id", purchase.id);
  }

  const signed = await admin.storage.from(BUCKET).createSignedUrl(path, LINK_SECONDS, { download: ebookFilename(slug) });
  if (signed.error || !signed.data) {
    console.error("ebook signed link failed:", signed.error?.message);
    return { ok: false, status: 500, error: "Could not prepare your copy. Try again in a minute." };
  }

  const counted = await recordEbookDownload(admin, purchase.id);
  if (!counted.ok) {
    if (counted.reason === "limit") {
      return { ok: false, status: 429, error: "You have used all 5 downloads of this book. Write to us if you need another." };
    }
    console.error("ebook download count failed:", counted.message);
    return { ok: false, status: 500, error: "Could not prepare your copy. Try again in a minute." };
  }
  return { ok: true, url: signed.data.signedUrl, left: counted.left };
}
