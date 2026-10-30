/**
 * Migration 0206's rules on public.plans, enforced by the database so a bad
 * row cannot be written by any path (the admin form validates the same in
 * validatePlan, tests/billing-exam-pass.test.ts):
 *   - an intl plan may be priced in INR only when it is sold to India alone
 *   - countries are two-letter upper-case codes, at least one when set
 *   - the IMAT and MCAT passes can be sold
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "node:crypto";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
const RUN_ID = randomUUID().slice(0, 8);

describe.skipIf(!HAS_ENV)("plans: countries and exam passes (migration 0206)", () => {
  let admin: SupabaseClient;
  const made: string[] = [];

  const row = (suffix: string, over: Record<string, unknown>) => {
    const id = `test-${suffix}-${RUN_ID}`;
    made.push(id);
    return {
      id,
      label: "Test pass",
      blurb: "b",
      url_key: id,
      amount_paise: 99900,
      currency: "INR",
      site: "intl",
      duration_days: 182,
      scope: "imat",
      active: false,
      ...over,
    };
  };

  beforeAll(() => {
    admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  });

  afterAll(async () => {
    if (made.length) await admin.from("plans").delete().in("id", made);
  });

  it("accepts an intl rupee plan sold to India only", async () => {
    const { error } = await admin.from("plans").insert(row("in", { countries: ["IN"] }));
    expect(error).toBeNull();
  });

  it("refuses an intl rupee plan sold everywhere, or beyond India", async () => {
    expect((await admin.from("plans").insert(row("all", {}))).error?.code).toBe("23514");
    expect((await admin.from("plans").insert(row("inpk", { countries: ["IN", "PK"] }))).error?.code).toBe("23514");
  });

  it("refuses malformed or empty country lists", async () => {
    const usd = { currency: "USD", amount_paise: 1900 };
    expect((await admin.from("plans").insert(row("lower", { ...usd, countries: ["in"] }))).error?.code).toBe("23514");
    expect((await admin.from("plans").insert(row("empty", { ...usd, countries: [] }))).error?.code).toBe("23514");
    expect((await admin.from("plans").insert(row("usca", { ...usd, countries: ["US", "CA"] }))).error).toBeNull();
  });

  it("sells the MCAT pass in dollars", async () => {
    const { error } = await admin
      .from("plans")
      .insert(row("mcat", { scope: "mcat", currency: "USD", amount_paise: 2900, duration_days: 90 }));
    expect(error).toBeNull();
  });
});
