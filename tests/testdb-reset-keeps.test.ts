/**
 * testdb:reset empties every public table but RESET_KEEPS. A table a migration
 * SEEDS (a top-level INSERT, not one inside a function body) cannot be refilled
 * by the replay, which skips migrations already applied, so emptying it breaks
 * every test that reads it. The keep-list's own comment asked for this by hand
 * and `ebooks` (0172) was missed: two files failed after a reset on 2026-11-03.
 * This scan makes it a rule.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { RESET_KEEPS } from "./helpers/testdb";

/** Seeded on purpose but emptied on purpose: the row names an auth user the reset deletes anyway. */
const SEEDED_BUT_RESET: Record<string, string> = {
  platform_admins: "0056 seeds the owner's account, which testdb:reset deletes with every auth user",
  daily_reveals: "0228 backfills the day's answers of existing students, whose auth users testdb:reset deletes",
};

function seededTables(): Map<string, string[]> {
  const dir = join(process.cwd(), "supabase", "migrations");
  const out = new Map<string, string[]>();
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".sql")).sort()) {
    const sql = readFileSync(join(dir, f), "utf8")
      .replace(/--[^\n]*/g, "")
      // A function body's INSERT runs at call time, not as a seed.
      .replace(/\$([a-z_]*)\$[\s\S]*?\$\1\$/gi, "");
    for (const m of sql.matchAll(/insert\s+into\s+(public\.)?([a-z_]+)\b/gi)) {
      if (!m[1] && /^storage$/i.test(m[2])) continue; // storage.buckets
      const t = m[2].toLowerCase();
      out.set(t, [...(out.get(t) ?? []), f.slice(0, 4)]);
    }
  }
  return out;
}

describe("testdb:reset keeps every table a migration seeds", () => {
  it("finds the seeds it is meant to find", () => {
    const seeded = seededTables();
    expect(seeded.has("plans")).toBe(true);
    expect(seeded.has("ebooks")).toBe(true);
  });

  it("every seeded public table is kept, or emptied for a stated reason", () => {
    const missing = [...seededTables().keys()].filter((t) => !RESET_KEEPS.has(t) && !SEEDED_BUT_RESET[t]);
    expect(missing).toEqual([]);
  });
});
