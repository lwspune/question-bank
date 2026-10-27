/**
 * Integration test for public.sales_by_period (migration 0196), the numbers behind
 * /dashboard/sales.
 *
 * Load-bearing properties:
 *  - a sale lands on its IST calendar day: 23:45 IST is that day, 00:00 IST the next;
 *  - weeks start on Monday, months on the 1st;
 *  - a refunded (revoked) sale counts as sold and as refunded, and its money is not kept;
 *    an expired pass was still paid for, so it counts in full;
 *  - only paid passes count (source 'razorpay'); a comp grant is not a sale;
 *  - books come from ebook_purchases, with the price each buyer paid;
 *  - a grain other than day / week / month is refused;
 *  - a paid pass without its price is refused by the database (0197);
 *  - students and anon cannot call it (service role only).
 *
 * Its sales are dated March 2001, so rows other tests leave in the shared test
 * database cannot fall in the periods checked here. Skipped when env is missing.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

const RUN = randomUUID().slice(0, 8);
const EMAIL = `sales_period_${RUN}@test.invalid`;
const PAY = (n: string) => `pay_sales_${RUN}_${n}`;
const SINCE = "2001-03-01T00:00:00+05:30";

type Row = {
  period: string;
  passes_sold: number;
  passes_refunded: number;
  pass_paise: number;
  books_sold: number;
  books_refunded: number;
  book_paise: number;
};

describe.skipIf(!HAS_ENV)("sales_by_period", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let userId = "";

  async function periods(grain: string): Promise<Row[]> {
    const { data, error } = await admin.rpc("sales_by_period", { p_grain: grain, p_since: SINCE });
    if (error) throw new Error(`sales_by_period(${grain}): ${error.message}`);
    // Only March 2001 is this test's; anything later belongs to other tests.
    return ((data ?? []) as Row[]).filter((r) => r.period < "2001-04-01");
  }

  beforeAll(async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    admin = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
    anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });

    const created = await admin.auth.admin.createUser({ email: EMAIL, password: "sales-test-1234", email_confirm: true });
    if (created.error) throw new Error(`create user: ${created.error.message}`);
    userId = created.data.user!.id;

    const pass = (ref: string, at: string, paise: number | null, status = "active", source = "razorpay") => ({
      user_id: userId,
      scope: "mocks",
      source,
      status,
      granted_at: at,
      provider_ref: source === "razorpay" ? ref : null,
      amount_paise: paise,
    });
    const { error: passError } = await admin.from("entitlements").insert([
      pass(PAY("a"), "2001-03-05T18:15:00Z", 19900), // Mon 5 Mar, 23:45 IST
      pass(PAY("b"), "2001-03-05T18:30:00Z", 9900, "revoked"), // Tue 6 Mar, 00:00 IST, refunded
      pass(PAY("c"), "2001-03-05T10:00:00Z", null, "active", "comp"), // a comp grant: not a sale
      pass(PAY("d"), "2001-03-07T06:00:00Z", 9900, "expired"), // Wed 7 Mar, paid then lapsed
    ]);
    if (passError) throw new Error(`insert passes: ${passError.message}`);

    const { data: book, error: bookError } = await admin.from("ebooks").select("slug").limit(1).single();
    if (bookError) throw new Error(`pick a book: ${bookError.message}`);
    const { error: buyError } = await admin.from("ebook_purchases").insert({
      user_id: userId,
      ebook_slug: book.slug,
      amount_paise: 4900,
      payment_id: PAY("book"),
      created_at: "2001-03-06T04:00:00Z", // Tue 6 Mar, 09:30 IST
    });
    if (buyError) throw new Error(`insert book purchase: ${buyError.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("ebook_purchases").delete().eq("payment_id", PAY("book"));
    await admin.from("entitlements").delete().eq("user_id", userId);
    if (userId) await admin.auth.admin.deleteUser(userId);
  });

  it("puts each sale on its IST day, refunds counted but not kept", async () => {
    expect(await periods("day")).toEqual([
      { period: "2001-03-05", passes_sold: 1, passes_refunded: 0, pass_paise: 19900, books_sold: 0, books_refunded: 0, book_paise: 0 },
      { period: "2001-03-06", passes_sold: 1, passes_refunded: 1, pass_paise: 0, books_sold: 1, books_refunded: 0, book_paise: 4900 },
      { period: "2001-03-07", passes_sold: 1, passes_refunded: 0, pass_paise: 9900, books_sold: 0, books_refunded: 0, book_paise: 0 },
    ]);
  });

  it("groups a week from Monday and a month from the 1st", async () => {
    const total = { passes_sold: 3, passes_refunded: 1, pass_paise: 29800, books_sold: 1, books_refunded: 0, book_paise: 4900 };
    expect(await periods("week")).toEqual([{ period: "2001-03-05", ...total }]);
    expect(await periods("month")).toEqual([{ period: "2001-03-01", ...total }]);
  });

  it("refuses any other grain", async () => {
    const { error } = await admin.rpc("sales_by_period", { p_grain: "year", p_since: SINCE });
    expect(error).not.toBeNull();
  });

  it("refuses a paid pass that does not record its price (0197)", async () => {
    const { error } = await admin.from("entitlements").insert({
      user_id: userId,
      scope: "mocks",
      source: "razorpay",
      status: "active",
      granted_at: "2001-03-08T06:00:00Z",
      provider_ref: PAY("no-price"),
    });
    expect(error?.code).toBe("23514");
  });

  it("is not callable without the service role", async () => {
    const { error } = await anon.rpc("sales_by_period", { p_grain: "day", p_since: SINCE });
    expect(error).not.toBeNull();
  });
});
