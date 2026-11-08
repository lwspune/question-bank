/**
 * Each migration takes its own number (2026-11-08).
 *
 * Two sessions both wrote a 0229 on the same day: one checked the folder when
 * it planned, the other merged first, and both were applied to production
 * before anyone saw the clash. Nothing broke (different tables), but `ls
 * supabase/migrations` is this repo's index of them, and a shared number
 * hides one. This fails the moment a second file takes a number already used,
 * so the clash shows at commit time, before production. Take the next free
 * number on main right before applying, not at planning time.
 *
 * The one pair that predates this test is allowed by name: both are applied
 * in production under these names, so renaming either would part a file from
 * its record.
 */
import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const KNOWN_SHARED = new Map([["0229", ["0229_reveal_limit_overruns.sql", "0229_study_path_fix_ten.sql"]]]);

describe("migration numbers", () => {
  it("gives each migration file a number of its own", () => {
    const files = readdirSync(join(process.cwd(), "supabase", "migrations")).filter((f) => /^\d{4}_.+\.sql$/.test(f));
    const byNumber = new Map<string, string[]>();
    for (const f of files) byNumber.set(f.slice(0, 4), [...(byNumber.get(f.slice(0, 4)) ?? []), f]);
    const shared = [...byNumber.entries()]
      .filter(([, names]) => names.length > 1)
      .filter(([n, names]) => JSON.stringify([...names].sort()) !== JSON.stringify(KNOWN_SHARED.get(n) ?? []));
    expect(shared, "two migrations share a number: take the next free one").toEqual([]);
  });
});
