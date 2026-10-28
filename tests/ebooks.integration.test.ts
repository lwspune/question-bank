/**
 * The ebook store's data rules (migration 0172), against a real database,
 * because each one is a property of a table, not of a route:
 *
 * - the catalogue is public, but only for books switched on;
 * - one payment records one purchase, and a buyer owns a book once (a second
 *   payment for it answers "already granted");
 * - a refunded book can be bought again;
 * - a buyer reads their own purchases and nobody else's, and cannot write one;
 * - a purchase serves at most 5 downloads;
 * - only a buyer may say they want the printed book, once, with a valid
 *   pincode or none;
 * - only a buyer may choose the name printed on the cover, and the database
 *   refuses a name the cover cannot print (migration 0201); a changed name
 *   makes a fresh copy.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { grantEbookPurchase, revokeEbookPurchase } from "@/lib/ebooks/grant";
import { MAX_EBOOK_DOWNLOADS, recordEbookDownload } from "@/lib/ebooks/downloads";
import { recordPrintInterest } from "@/lib/ebooks/printInterest";
import { ebookOrderTerms } from "@/lib/ebooks/checkout";
import { prepareEbookDownload } from "@/lib/ebooks/download";
import { ebookStatus } from "@/lib/ebooks/status";
import { setEbookPrintName } from "@/lib/ebooks/printName";
import { getStoreEbook, listStoreEbooks } from "@/lib/ebooks/query";
import { loadEbookStoreReadout } from "@/lib/ebooks/readout";
import { PDFDocument } from "pdf-lib";
import { mustSignIn } from "./helpers/fixture";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const STAMP = Date.now();
const PASSWORD = "test-password-12345";
const BOOK = `test-ebook-${STAMP}`;
const HIDDEN = `test-ebook-hidden-${STAMP}`;
const NAMED = `test-ebook-named-${STAMP}`;

describe.skipIf(!HAS_ENV)("ebook store tables", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let buyer: SupabaseClient;
  let other: SupabaseClient;
  let buyerId = "";
  let otherId = "";

  async function makeStudent(tag: string): Promise<{ id: string; client: SupabaseClient }> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const email = `ebook_${tag}_${STAMP}@test.invalid`;
    const created = await admin.auth.admin.createUser({ email, password: PASSWORD, email_confirm: true });
    const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    await mustSignIn(`ebook ${tag}`, client, { email, password: PASSWORD });
    return { id: created.data.user!.id, client };
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
    const ins = await admin.from("ebooks").insert([
      { slug: BOOK, title: "Test Book", subtitle: "s", price_paise: 14900, active: true, file_path: "test/none.pdf", kind: "formula", name_plate: false },
      { slug: HIDDEN, title: "Hidden Book", subtitle: "s", price_paise: 14900, active: false, kind: "notes", name_plate: false },
      { slug: NAMED, title: "Named Book", subtitle: "s", price_paise: 4900, active: true, file_path: "test/none.pdf", kind: "formula", name_plate: true },
    ]);
    if (ins.error) throw new Error(ins.error.message);
    ({ id: buyerId, client: buyer } = await makeStudent("buyer"));
    ({ id: otherId, client: other } = await makeStudent("other"));
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("ebook_print_interest").delete().in("ebook_slug", [BOOK, HIDDEN, NAMED]);
    const { data: purchases } = await admin.from("ebook_purchases").select("id").in("ebook_slug", [BOOK, HIDDEN, NAMED]);
    const ids = (purchases ?? []).map((p) => p.id as string);
    if (ids.length) await admin.from("ebook_downloads").delete().in("purchase_id", ids);
    await admin.from("ebook_purchases").delete().in("ebook_slug", [BOOK, HIDDEN, NAMED]);
    await admin.from("ebooks").delete().in("slug", [BOOK, HIDDEN, NAMED]);
    if (otherId) await admin.from("entitlements").delete().eq("user_id", otherId);
    for (const id of [buyerId, otherId]) if (id) await admin.auth.admin.deleteUser(id);
  });

  it("anyone reads an active book, nobody reads an inactive one", async () => {
    const { data } = await anon.from("ebooks").select("slug").in("slug", [BOOK, HIDDEN]);
    expect((data ?? []).map((r) => r.slug)).toEqual([BOOK]);
  });

  it("refuses to switch on a book that has no PDF yet", async () => {
    const { error } = await admin.from("ebooks").update({ active: true }).eq("slug", HIDDEN);
    expect(error).not.toBeNull();
  });

  it("the store lists active books only, shaped for the page", async () => {
    const list = await listStoreEbooks(anon);
    const mine = list.find((b) => b.slug === BOOK);
    expect(mine).toMatchObject({ title: "Test Book", kind: "formula", pricePaise: 14900, hasSample: false, contents: [], stats: [] });
    expect(list.some((b) => b.slug === HIDDEN)).toBe(false);
    expect(await getStoreEbook(anon, HIDDEN)).toBeNull();
    expect((await getStoreEbook(anon, BOOK))?.slug).toBe(BOOK);
  });

  it("rejects a book kind outside formula, notes and pyq", async () => {
    const { error } = await admin.from("ebooks").insert({ slug: `${BOOK}-odd`, title: "x", price_paise: 100, kind: "poster" });
    expect(error).not.toBeNull();
  });

  it("seeds the seven books, priced by kind, all off sale", async () => {
    const { data } = await admin.from("ebooks").select("slug, kind, price_paise, active").like("slug", "mht-cet-%").order("slug");
    expect((data ?? []).map((r) => `${r.slug}:${r.kind}:${r.price_paise}:${r.active}`)).toEqual([
      "mht-cet-chemistry-formulas:formula:4900:false",
      "mht-cet-chemistry-notes:notes:4900:false",
      "mht-cet-maths-formulas:formula:4900:false",
      "mht-cet-maths-notes:notes:4900:false",
      "mht-cet-maths-pyq:pyq:14900:false",
      "mht-cet-physics-formulas:formula:4900:false",
      "mht-cet-physics-notes:notes:4900:false",
    ]);
  });

  it("rejects a non-positive price", async () => {
    const { error } = await admin.from("ebooks").insert({ slug: `${BOOK}-free`, title: "x", subtitle: "x", price_paise: 0 });
    expect(error).not.toBeNull();
  });

  it("a payment records one purchase, and a replay of it is already granted", async () => {
    const input = { userId: buyerId, paymentId: `pay_${STAMP}_1`, ebookSlug: BOOK, amountPaise: 14900 };
    expect(await grantEbookPurchase(input)).toEqual({ kind: "ok" });
    expect(await grantEbookPurchase(input)).toEqual({ kind: "already_granted" });
  });

  it("a second payment for a book the buyer owns is already granted", async () => {
    const r = await grantEbookPurchase({ userId: buyerId, paymentId: `pay_${STAMP}_2`, ebookSlug: BOOK, amountPaise: 14900 });
    expect(r).toEqual({ kind: "already_granted" });
  });

  it("the buyer reads their purchase, another student does not", async () => {
    const mine = await buyer.from("ebook_purchases").select("ebook_slug").eq("ebook_slug", BOOK);
    expect(mine.data?.length).toBe(1);
    const theirs = await other.from("ebook_purchases").select("ebook_slug").eq("ebook_slug", BOOK);
    expect(theirs.data?.length ?? 0).toBe(0);
  });

  it("a student cannot write a purchase with their own key", async () => {
    const { error } = await other
      .from("ebook_purchases")
      .insert({ user_id: otherId, ebook_slug: BOOK, amount_paise: 1, payment_id: `pay_${STAMP}_x`, status: "active" });
    expect(error).not.toBeNull();
  });

  it(`serves at most ${MAX_EBOOK_DOWNLOADS} downloads per purchase`, async () => {
    const { data } = await admin.from("ebook_purchases").select("id").eq("ebook_slug", BOOK).eq("user_id", buyerId).single();
    const purchaseId = data!.id as string;
    for (let i = 0; i < MAX_EBOOK_DOWNLOADS; i++) {
      expect(await recordEbookDownload(admin, purchaseId)).toEqual({ ok: true, left: MAX_EBOOK_DOWNLOADS - i - 1 });
    }
    expect(await recordEbookDownload(admin, purchaseId)).toEqual({ ok: false, reason: "limit" });
  });

  it("only a buyer may say they want the printed book", async () => {
    expect(await recordPrintInterest(other, otherId, BOOK, null)).toEqual({ ok: false, reason: "not_bought" });
    expect(await recordPrintInterest(buyer, buyerId, BOOK, "411004")).toEqual({ ok: true });
  });

  it("a second tap updates the pincode rather than adding a row", async () => {
    expect(await recordPrintInterest(buyer, buyerId, BOOK, "411001")).toEqual({ ok: true });
    const { data } = await admin.from("ebook_print_interest").select("pincode").eq("ebook_slug", BOOK);
    expect(data).toEqual([{ pincode: "411001" }]);
  });

  it("rejects a pincode that is not six digits", async () => {
    expect(await recordPrintInterest(buyer, buyerId, BOOK, "12345")).toEqual({ ok: false, reason: "bad_pincode" });
  });

  it("the buy box tells a buyer they own it, with downloads left and their printed-copy answer", async () => {
    expect(await ebookStatus(buyer, admin, buyerId, BOOK)).toMatchObject({
      signedIn: true,
      owned: true,
      left: 0,
      printInterest: { pincode: "411001" },
    });
  });

  it("the buy box shows a visitor the list price and no purchase", async () => {
    expect(await ebookStatus(anon, admin, null, BOOK)).toEqual({
      signedIn: false, owned: false, left: null, listPaise: 14900, pricePaise: 14900, passHolder: false, printInterest: null,
      namePlate: false, coverName: null,
    });
    expect(await ebookStatus(anon, admin, null, HIDDEN)).toBeNull();
  });

  it("checkout refuses a book the buyer already owns", async () => {
    expect(await ebookOrderTerms(buyer, buyerId, BOOK)).toMatchObject({ ok: false, status: 409 });
  });

  it("checkout refuses a book that is not on sale", async () => {
    expect(await ebookOrderTerms(other, otherId, HIDDEN)).toMatchObject({ ok: false, status: 404 });
    expect(await ebookOrderTerms(other, otherId, "no-such-book")).toMatchObject({ ok: false, status: 404 });
  });

  it("checkout charges the list price without a pass, and 20% less with one", async () => {
    expect(await ebookOrderTerms(other, otherId, BOOK)).toEqual({
      ok: true,
      slug: BOOK,
      title: "Test Book",
      listPaise: 14900,
      amountPaise: 14900,
      passHolder: false,
    });
    const grant = await admin
      .from("entitlements")
      .insert({ user_id: otherId, scope: "mocks", source: "manual", status: "active", expires_at: null });
    if (grant.error) throw new Error(grant.error.message);
    expect(await ebookOrderTerms(other, otherId, BOOK)).toMatchObject({ ok: true, amountPaise: 11900, passHolder: true });
  });

  it("download stamps the buyer's copy once, links to it, and stops at the cap", async () => {
    // A two-page master in the bucket, as the build would leave it.
    const doc = await PDFDocument.create();
    doc.addPage();
    doc.addPage();
    const path = `test/${STAMP}/master.pdf`;
    const up = await admin.storage.from("ebooks").upload(path, await doc.save(), { contentType: "application/pdf" });
    if (up.error) throw new Error(up.error.message);
    await admin.from("ebooks").update({ file_path: path, version: 1 }).eq("slug", BOOK);

    // A fresh buyer, so the earlier cap test's downloads do not count here.
    const fresh = await grantEbookPurchase({ userId: otherId, paymentId: `pay_${STAMP}_dl`, ebookSlug: BOOK, amountPaise: 11900 });
    expect(fresh).toEqual({ kind: "ok" });
    const user = { id: otherId, email: `ebook_other_${STAMP}@test.invalid` };

    const first = await prepareEbookDownload({ db: other, admin, user, slug: BOOK });
    expect(first).toMatchObject({ ok: true, left: 4 });
    const { data: p1 } = await admin.from("ebook_purchases").select("stamped_path, stamped_version").eq("payment_id", `pay_${STAMP}_dl`).single();
    expect(p1).toMatchObject({ stamped_version: 1 });
    const stamped = await admin.storage.from("ebooks").download(p1!.stamped_path as string);
    const copy = await PDFDocument.load(new Uint8Array(await stamped.data!.arrayBuffer()));
    expect(copy.getPageCount()).toBe(3);

    for (const left of [3, 2, 1, 0]) {
      expect(await prepareEbookDownload({ db: other, admin, user, slug: BOOK })).toMatchObject({ ok: true, left });
    }
    expect(await prepareEbookDownload({ db: other, admin, user, slug: BOOK })).toMatchObject({ ok: false, status: 429 });
    await admin.storage.from("ebooks").remove([path, p1!.stamped_path as string]);
  });

  it("the database refuses a cover name the cover cannot print", async () => {
    const g = await grantEbookPurchase({ userId: buyerId, paymentId: `pay_${STAMP}_named`, ebookSlug: NAMED, amountPaise: 4900 });
    expect(g).toEqual({ kind: "ok" });
    for (const bad of ["रमा", "Asha 123", "www.example.com", "A".repeat(41), ""]) {
      const r = await admin.from("ebook_purchases").update({ print_name: bad }).eq("payment_id", `pay_${STAMP}_named`);
      expect(r.error, bad).not.toBeNull();
    }
    const ok = await admin.from("ebook_purchases").update({ print_name: "Dr. A. K. O'Brien-Rao" }).eq("payment_id", `pay_${STAMP}_named`);
    expect(ok.error).toBeNull();
  });

  it("only the buyer chooses the cover name, and it is stored tidied", async () => {
    expect(await setEbookPrintName(other, admin, otherId, NAMED, "Ravi")).toMatchObject({ ok: false, status: 403 });
    expect(await setEbookPrintName(buyer, admin, buyerId, NAMED, "रमा")).toMatchObject({ ok: false, status: 400 });
    expect(await setEbookPrintName(buyer, admin, buyerId, NAMED, "  KARTAVYA SHIRKE ")).toEqual({ ok: true, name: "Kartavya Shirke" });
    const { data } = await admin.from("ebook_purchases").select("print_name").eq("payment_id", `pay_${STAMP}_named`).single();
    expect(data?.print_name).toBe("Kartavya Shirke");
  });

  it("the buy box shows the name the cover will carry: the chosen one, else the account's", async () => {
    expect(await ebookStatus(buyer, admin, buyerId, NAMED, "MOHINEE SHIRKE")).toMatchObject({ namePlate: true, coverName: "Kartavya Shirke" });
    expect(await ebookStatus(other, admin, otherId, NAMED, "MOHINEE SHIRKE")).toMatchObject({ namePlate: true, coverName: "Mohinee Shirke" });
  });

  it("download writes the name on the cover, and a changed name makes a fresh copy", async () => {
    const doc = await PDFDocument.create();
    doc.addPage();
    doc.addPage();
    const path = `test/${STAMP}/named.pdf`;
    const up = await admin.storage.from("ebooks").upload(path, await doc.save(), { contentType: "application/pdf" });
    if (up.error) throw new Error(up.error.message);
    await admin.from("ebooks").update({ file_path: path, version: 1 }).eq("slug", NAMED);
    const user = { id: buyerId, email: `ebook_buyer_${STAMP}@test.invalid`, name: "MOHINEE SHIRKE" };

    expect(await prepareEbookDownload({ db: buyer, admin, user, slug: NAMED })).toMatchObject({ ok: true });
    const read = () => admin.from("ebook_purchases").select("stamped_path, stamped_name").eq("payment_id", `pay_${STAMP}_named`).single();
    expect((await read()).data).toMatchObject({ stamped_name: "Kartavya Shirke" });

    await setEbookPrintName(buyer, admin, buyerId, NAMED, "Asha Patil");
    expect(await prepareEbookDownload({ db: buyer, admin, user, slug: NAMED })).toMatchObject({ ok: true });
    const after = (await read()).data!;
    expect(after.stamped_name).toBe("Asha Patil");
    await admin.storage.from("ebooks").remove([path, after.stamped_path as string]);
  });

  it("download refuses someone who has not bought the book", async () => {
    const r = await prepareEbookDownload({ db: anon, admin, user: { id: "00000000-0000-0000-0000-000000000000", email: "x@y.z" }, slug: BOOK });
    expect(r).toMatchObject({ ok: false, status: 403 });
  });

  it("a refunded book can be bought again", async () => {
    expect(await revokeEbookPurchase(`pay_${STAMP}_1`)).toEqual({ kind: "ok", revoked: 1 });
    const again = await grantEbookPurchase({ userId: buyerId, paymentId: `pay_${STAMP}_3`, ebookSlug: BOOK, amountPaise: 14900 });
    expect(again).toEqual({ kind: "ok" });
  });

  it("the growth readout counts the signed-in students who opened a book and took its sample", async () => {
    const rows = [
      { user_id: buyerId, kind: "surface_viewed", metadata: { surface: "store", path: `/store/${BOOK}` }, dedupe_key: `t:${STAMP}:1` },
      { user_id: buyerId, kind: "surface_viewed", metadata: { surface: "store", path: `/store/${BOOK}` }, dedupe_key: `t:${STAMP}:2` },
      { user_id: otherId, kind: "surface_viewed", metadata: { surface: "store", path: `/store/${BOOK}` }, dedupe_key: `t:${STAMP}:3` },
      { user_id: otherId, kind: "surface_viewed", metadata: { surface: "ebook_sample", path: `/store/${BOOK}` }, dedupe_key: `t:${STAMP}:4` },
      { user_id: otherId, kind: "surface_viewed", metadata: { surface: "store", path: "/store" }, dedupe_key: `t:${STAMP}:5` },
    ];
    const ins = await admin.from("user_activity").insert(rows);
    if (ins.error) throw new Error(ins.error.message);
    const mine = (await loadEbookStoreReadout(admin)).find((r) => r.slug === BOOK);
    // Two students opened the book (one of them twice), one took the sample; a view of /store itself is no book.
    expect(mine).toMatchObject({ openedBy: 2, sampledBy: 1 });
    await admin.from("user_activity").delete().like("dedupe_key", `t:${STAMP}:%`);
  });

  it("the growth readout counts sales, refunds, printed-copy taps and downloads per book", async () => {
    const rows = await loadEbookStoreReadout(admin);
    const mine = rows.find((r) => r.slug === BOOK);
    // Buyer: bought, refunded, bought again (2 active-or-revoked rows, 1 refund);
    // other: one purchase. Revenue counts active purchases only.
    expect(mine).toMatchObject({
      buyers: 2,
      revenuePaise: 14900 + 11900,
      refunds: 1,
      printInterest: 1,
      withPincode: 1,
      downloads: 10,
    });
  });
});
