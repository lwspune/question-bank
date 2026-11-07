/**
 * The signed-in daily answer limit leaked on 2026-11-07: the count behind
 * GET /api/me/reveals timed out (8 s) on ~7% of calls, the route answered
 * "no limit", and the page asked only once, so a student opened 68 answers
 * past the wall of 15. Two fixes are pinned here:
 *   - the count's join can use the questions index (migration 0227), and
 *   - a failed read is told apart from "no limit" and asked again once.
 * Both reads still fail OPEN in the end: a student is never walled by our error.
 */
import { describe, it, expect, vi } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fetchDailyQuota } from "@/lib/questions/dailyQuotaFetch";

const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const QUOTA = { limit: 15, todayIds: ["a"], pass: null };

describe("fetchDailyQuota", () => {
  it("returns the first good reply without waiting", async () => {
    const load = vi.fn().mockResolvedValue(reply(200, QUOTA));
    const wait = vi.fn().mockResolvedValue(undefined);
    expect(await fetchDailyQuota(load, wait)).toEqual(QUOTA);
    expect(load).toHaveBeenCalledTimes(1);
    expect(wait).not.toHaveBeenCalled();
  });

  it("keeps a 'no limit' reply as it is (a pass, or the limit switched off)", async () => {
    const load = vi.fn().mockResolvedValue(reply(200, { limit: null, todayIds: [] }));
    const wait = vi.fn().mockResolvedValue(undefined);
    expect(await fetchDailyQuota(load, wait)).toEqual({ limit: null, todayIds: [] });
    expect(load).toHaveBeenCalledTimes(1);
  });

  it("asks once more after a server error", async () => {
    const load = vi.fn().mockResolvedValueOnce(reply(503, { error: "x" })).mockResolvedValueOnce(reply(200, QUOTA));
    const wait = vi.fn().mockResolvedValue(undefined);
    expect(await fetchDailyQuota(load, wait)).toEqual(QUOTA);
    expect(load).toHaveBeenCalledTimes(2);
    expect(wait).toHaveBeenCalledTimes(1);
  });

  it("asks once more after a network failure", async () => {
    const load = vi.fn().mockRejectedValueOnce(new TypeError("offline")).mockResolvedValueOnce(reply(200, QUOTA));
    expect(await fetchDailyQuota(load, vi.fn().mockResolvedValue(undefined))).toEqual(QUOTA);
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("gives up after two failures: no limit, never a wall", async () => {
    const load = vi.fn().mockResolvedValue(reply(503, { error: "x" }));
    expect(await fetchDailyQuota(load, vi.fn().mockResolvedValue(undefined))).toBeNull();
    expect(load).toHaveBeenCalledTimes(2);
  });

  it("does not retry a signed-out reply", async () => {
    const load = vi.fn().mockResolvedValue(reply(401, { error: "Not signed in." }));
    expect(await fetchDailyQuota(load, vi.fn().mockResolvedValue(undefined))).toBeNull();
    expect(load).toHaveBeenCalledTimes(1);
  });
});

describe("the reveal quota wiring", () => {
  const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

  it("the route answers a failed read with an error, not 'no limit'", () => {
    const src = read("src/app/api/me/reveals/route.ts");
    const catchBlock = src.slice(src.lastIndexOf("catch (e)"));
    expect(catchBlock).toMatch(/status: 503/);
    expect(catchBlock).not.toMatch(/limit: null/);
  });

  it("the meter reads the quota through fetchDailyQuota", () => {
    expect(read("src/components/reveal/useRevealMeter.ts")).toMatch(/fetchDailyQuota\(/);
  });

  it("the newest my_paid_reveals_today joins on the uuid, so the questions index is used", () => {
    const dir = join(process.cwd(), "supabase/migrations");
    const defining = readdirSync(dir)
      .filter((f) => f.endsWith(".sql"))
      .sort()
      .filter((f) => /create or replace function public\.my_paid_reveals_today/i.test(readFileSync(join(dir, f), "utf8")));
    const latest = readFileSync(join(dir, defining[defining.length - 1]), "utf8").replace(/--.*$/gm, "");
    // `q.id::text = a.ref_id` casts every question id, so Postgres scans all of them.
    expect(latest).not.toMatch(/q\.id::text\s*=/);
    expect(latest).toMatch(/a\.ref_id::uuid/);
  });
});
