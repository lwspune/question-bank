/**
 * Integration test for public.sales_by_period (migration 0197), the numbers behind
 * /dashboard/sales.
 *
 * Load-bearing properties:
 *  - a sale lands on its IST calendar day: 23:45 IST is that day, 00:00 IST the next;
 *  - weeks start on Monday, months on the 1st;
 *  - a refunded (revoked) sale counts as sold and as refunded, and its money is not kept;
 *    an expired pass was still paid for, so it counts in full;
 *  - only paid passes count (source 'razorpay'); a comp grant is not a sale;
 *  - books come from ebook_purchases, with the price each buyer paid;
 *  - orders are the Razorpay orders the site created: pass orders are paywall_event
 *    step 'checkout_opened', book orders step 'book_checkout_opened' (0199); any other
 *    step (an offer shown, a checkout dismissed) is not an order, and a day with
 *    orders but no sale still gets a row;
 *  - the funnel counts STUDENTS (0200): paywall_students are distinct students with a
 *    paywall 'shown' event in the period, checkout_students distinct students who created a
 *    pass order; distinct per period, so a student on two days of a week counts once in it.
 *    sales_funnel_students(from, to) gives the same two counts over any run of IST days;
 *  - a grain other than day / week / month is refused;
 *  - a paid pass without its price is refused by the database (0198);
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
const EMAIL_B = `sales_period_b_${RUN}@test.invalid`;
const PAY = (n: string) => `pay_sales_${RUN}_${n}`;
const SINCE = "2001-03-01T00:00:00+05:30";

type Row = {
  period: string;
  paywall_students: number;
  checkout_students: number;
  pass_orders: number;
  passes_sold: number;
  passes_refunded: number;
  pass_paise: number;
  book_orders: number;
  books_sold: number;
  books_refunded: number;
  book_paise: number;
};

describe.skipIf(!HAS_ENV)("sales_by_period", () => {
  let admin: SupabaseClient;
  let anon: SupabaseClient;
  let userId = "";
  let userB = "";

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
    const createdB = await admin.auth.admin.createUser({ email: EMAIL_B, password: "sales-test-1234", email_confirm: true });
    if (createdB.error) throw new Error(`create user B: ${createdB.error.message}`);
    userB = createdB.data.user!.id;

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

    const event = (step: string, at: string, refId: string | null, refKind: string | null, who = userId, gate = "pricing") => ({
      user_id: who,
      kind: "paywall_event",
      ref_id: refId,
      ref_kind: refKind,
      metadata: { step, gate: step === "book_checkout_opened" ? "store" : gate },
      created_at: at,
    });
    const { error: eventError } = await admin.from("user_activity").insert([
      event("checkout_opened", "2001-03-05T10:00:00Z", "mock-pass-6m", "plan"), // Mon 5 Mar
      event("checkout_opened", "2001-03-05T18:15:00Z", "mock-pass-6m", "plan"), // Mon 5 Mar, 23:45 IST
      event("checkout_opened", "2001-03-05T18:30:00Z", "mock-pass-6m", "plan"), // Tue 6 Mar, 00:00 IST
      event("book_checkout_opened", "2001-03-06T03:55:00Z", book.slug, "ebook"), // Tue 6 Mar
      event("checkout_dismissed", "2001-03-06T04:00:00Z", "mock-pass-6m", "plan"), // not an order
      event("shown", "2001-03-06T04:00:00Z", null, null), // not an order
      event("checkout_opened", "2001-03-08T06:00:00Z", "mock-pass-6m", "plan"), // Thu 8 Mar: an order, no sale
      // The funnel's top: A meets two walls on Mon 5 Mar (one student), and one more on Wed 7 Mar.
      event("shown", "2001-03-05T05:00:00Z", null, null, userId, "reveals"),
      event("shown", "2001-03-05T06:00:00Z", null, null, userId, "teacher"),
      event("shown", "2001-03-07T05:00:00Z", null, null, userId, "reveals"),
      // B meets a wall and starts a checkout at 23:59 IST on Mon 5 Mar.
      event("shown", "2001-03-05T18:00:00Z", null, null, userB, "teacher"),
      event("checkout_opened", "2001-03-05T18:29:00Z", "mock-pass-6m", "plan", userB),
    ]);
    if (eventError) throw new Error(`insert checkout events: ${eventError.message}`);
  });

  afterAll(async () => {
    if (!admin) return;
    await admin.from("ebook_purchases").delete().eq("payment_id", PAY("book"));
    await admin.from("user_activity").delete().in("user_id", [userId, userB].filter(Boolean));
    await admin.from("entitlements").delete().eq("user_id", userId);
    if (userId) await admin.auth.admin.deleteUser(userId);
    if (userB) await admin.auth.admin.deleteUser(userB);
  });

  it("puts each sale and order on its IST day, refunds counted but not kept", async () => {
    const day = (period: string, over: Partial<Row>): Row => ({
      period,
      paywall_students: 0,
      checkout_students: 0,
      pass_orders: 0,
      passes_sold: 0,
      passes_refunded: 0,
      pass_paise: 0,
      book_orders: 0,
      books_sold: 0,
      books_refunded: 0,
      book_paise: 0,
      ...over,
    });
    expect(await periods("day")).toEqual([
      day("2001-03-05", { paywall_students: 2, checkout_students: 2, pass_orders: 3, passes_sold: 1, pass_paise: 19900 }),
      day("2001-03-06", {
        paywall_students: 1,
        checkout_students: 1,
        pass_orders: 1,
        passes_sold: 1,
        passes_refunded: 1,
        book_orders: 1,
        books_sold: 1,
        book_paise: 4900,
      }),
      day("2001-03-07", { paywall_students: 1, passes_sold: 1, pass_paise: 9900 }),
      day("2001-03-08", { checkout_students: 1, pass_orders: 1 }),
    ]);
  });

  it("groups a week from Monday and a month from the 1st", async () => {
    // Distinct over the week: A and B, though A met a wall on three days.
    const total = {
      paywall_students: 2,
      checkout_students: 2,
      pass_orders: 5,
      passes_sold: 3,
      passes_refunded: 1,
      pass_paise: 29800,
      book_orders: 1,
      books_sold: 1,
      books_refunded: 0,
      book_paise: 4900,
    };
    expect(await periods("week")).toEqual([{ period: "2001-03-05", ...total }]);
    expect(await periods("month")).toEqual([{ period: "2001-03-01", ...total }]);
  });

  it("counts funnel students over a run of IST days, each once", async () => {
    const funnel = async (from: string, to: string) => {
      const { data, error } = await admin.rpc("sales_funnel_students", { p_from: from, p_to: to });
      if (error) throw new Error(`sales_funnel_students: ${error.message}`);
      return (data as { paywall_students: number; checkout_students: number }[])[0];
    };
    expect(await funnel("2001-03-05", "2001-03-05")).toEqual({ paywall_students: 2, checkout_students: 2 });
    // B's 23:59 IST checkout stays on the 5th; A's 00:00 IST one falls on the 6th.
    expect(await funnel("2001-03-06", "2001-03-08")).toEqual({ paywall_students: 1, checkout_students: 1 });
    expect(await funnel("2001-03-01", "2001-03-31")).toEqual({ paywall_students: 2, checkout_students: 2 });
    // No start = from the first record (other tests' rows may add to it).
    const { data, error } = await admin.rpc("sales_funnel_students", { p_from: null, p_to: "2001-03-31" });
    expect(error).toBeNull();
    expect((data as { paywall_students: number }[])[0].paywall_students).toBeGreaterThanOrEqual(2);
  });

  it("refuses any other grain", async () => {
    const { error } = await admin.rpc("sales_by_period", { p_grain: "year", p_since: SINCE });
    expect(error).not.toBeNull();
  });

  it("refuses a paid pass that does not record its price (0198)", async () => {
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
    const funnel = await anon.rpc("sales_funnel_students", { p_from: "2001-03-01", p_to: "2001-03-31" });
    expect(funnel.error).not.toBeNull();
  });
});
