/**
 * Every Vercel Cron in vercel.json points at a route that exists and answers
 * GET (Vercel calls a cron path with GET). A typo there fails silently: Vercel
 * gets a 404 every half hour and nobody looks, which is the kind of quiet
 * failure the payment check was moved there to end (2026-11-22).
 */
import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const config = JSON.parse(readFileSync(path.join(ROOT, "vercel.json"), "utf8")) as {
  crons?: { path: string; schedule: string }[];
};

describe("vercel.json crons", () => {
  const crons = config.crons ?? [];

  it("lists the payment check", () => {
    expect(crons.map((c) => c.path)).toContain("/api/cron/payment-check");
  });

  for (const cron of crons) {
    it(`${cron.path} is a route file that exports GET`, () => {
      const file = path.join(ROOT, "src", "app", ...cron.path.split("/").filter(Boolean), "route.ts");
      expect(existsSync(file), `${file} missing`).toBe(true);
      expect(readFileSync(file, "utf8")).toMatch(/export async function GET\b/);
    });

    it(`${cron.path} has a five-field schedule`, () => {
      expect(cron.schedule.trim().split(/\s+/)).toHaveLength(5);
    });
  }
});
