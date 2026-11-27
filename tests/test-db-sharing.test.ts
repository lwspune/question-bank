/**
 * Two ways test files collided on the ONE shared test database (2026-11-27:
 * four of five gate runs that day were red with every failed file passing
 * alone). Source scans, no database.
 *
 * 1. THE SETTINGS ROW. A file that writes paywall_settings takes its turn
 *    (helpers/settingsTurn.ts) before it first touches the row, and gives it
 *    back in a `finally`. practice-tests failed because another file restored
 *    free_practice_tests_per_day mid-run.
 *
 * 2. BORROWED BANK QUESTIONS. A test that borrows "any PUBLIC question" can get
 *    another file's fixture, which is deleted mid-run (start-next, exam-rooms-
 *    lines, solution-visual-usage that day). Borrow SEED rows:
 *    `.like("content_hash", `${SEED_CONTENT_HASH_PREFIX}%`)`, or the oldest
 *    rows (`order("created_at", { ascending: true })`, which are seed rows).
 *    42 borrows were unpinned when this was written; six were pinned then and
 *    36 remain, many harmless (they read a year or a subject), so this is a
 *    RATCHET: a file's count may only go down. Fixing one: lower its number here (or delete its line at 0).
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const TESTS = join(process.cwd(), "tests");

function testFiles(dir = TESTS): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...testFiles(p));
    else if (name.endsWith(".ts")) out.push(p);
  }
  return out;
}

const rel = (p: string) => relative(TESTS, p).replace(/\\/g, "/");

/** A query on the questions table that takes rows it did not make: a select with a limit, no id filter. */
export function unpinnedBorrows(source: string): number {
  let n = 0;
  for (const m of source.matchAll(/from\("questions"\)/g)) {
    const end = source.indexOf(";", m.index);
    const stmt = source.slice(m.index, end === -1 ? undefined : end);
    if (!stmt.includes(".select(") || !stmt.includes(".limit(") || stmt.includes(".insert(")) continue;
    if (/\.(eq|in)\("id"/.test(stmt)) continue;
    if (stmt.includes("content_hash") || /order\("created_at",\s*\{\s*ascending:\s*true/.test(stmt)) continue;
    n++;
  }
  return n;
}

const WRITES_SETTINGS = /from\("paywall_settings"\)\s*\.(update|upsert|insert)\(/;

describe("the shared settings row: one file at a time", () => {
  const writers = testFiles().filter((f) => WRITES_SETTINGS.test(readFileSync(f, "utf8")));

  it("finds the files that write it (the scan still sees them)", () => {
    expect(writers.length).toBeGreaterThanOrEqual(7);
  });

  it.each(writers.map(rel))("%s takes its turn before touching the row and gives it back in a finally", (name) => {
    const s = readFileSync(join(TESTS, name), "utf8");
    const take = s.indexOf("await takeSettingsTurn(");
    expect(take, "no takeSettingsTurn call").toBeGreaterThan(-1);
    expect(take, "the turn is taken after the row is first read or written").toBeLessThan(s.indexOf('from("paywall_settings")'));
    expect(s).toMatch(/finally\s*\{\s*releaseSettings\?\.\(\);/);
  });
});

describe("borrowed bank questions: unpinned borrows only go down", () => {
  // Counts after the 2026-11-27 pass. Lower a number when you pin a borrow; never raise one.
  const BASELINE: Record<string, number> = {
    "answer-sheets.integration.test.ts": 1,
    "board-papers.integration.test.ts": 1,
    "browse-query.test.ts": 2,
    "build-fetch.test.ts": 2,
    "chapter-profile.test.ts": 1,
    "chat-exam-strategy-server.test.ts": 1,
    "chat-my-questions.integration.test.ts": 1,
    "chat-typed-route.test.ts": 1,
    "chat-week-plan-server.integration.test.ts": 2,
    "db-types.test.ts": 1,
    "drill-answer-progress.integration.test.ts": 1,
    "exam-twins.integration.test.ts": 1,
    "filter-facets.test.ts": 1,
    "fix-points.integration.test.ts": 1,
    "growth-snapshot.integration.test.ts": 1,
    "homework-group-route.integration.test.ts": 1,
    "homework-plans.integration.test.ts": 1,
    "homework-progress.integration.test.ts": 1,
    "notes-drill-route.integration.test.ts": 1,
    "own-day-card.integration.test.ts": 1,
    "own-practice-evidence.integration.test.ts": 1,
    "own-progress-card.integration.test.ts": 1,
    "papers-of-questions.integration.test.ts": 1,
    "practice-route-verdict.integration.test.ts": 1,
    "provenance-redaction-wiring.test.ts": 1,
    "query-by-ids.test.ts": 1,
    "repeat-line.integration.test.ts": 1,
    "resource-tags-batch.test.ts": 1,
    "review-query.integration.test.ts": 1,
    "same-mistake-route.integration.test.ts": 1,
    "self-mark.integration.test.ts": 1,
    "study-time.integration.test.ts": 1,
    "v-search-answers.integration.test.ts": 1,
  };

  it("no file borrows more unpinned questions than its baseline", () => {
    const now: Record<string, number> = {};
    for (const f of testFiles()) {
      if (f.endsWith("test-db-sharing.test.ts")) continue;
      const n = unpinnedBorrows(readFileSync(f, "utf8"));
      if (n > 0) now[rel(f)] = n;
    }
    const over = Object.entries(now)
      .filter(([f, n]) => n > (BASELINE[f] ?? 0))
      .map(([f, n]) => `${f}: ${n} (baseline ${BASELINE[f] ?? 0})`);
    expect(over, `pin these to seed rows (header of this file); current counts: ${JSON.stringify(now)}`).toEqual([]);
  });

  it("reads a pinned borrow as pinned and an open one as open", () => {
    expect(unpinnedBorrows('admin.from("questions").select("id").eq("visibility", "PUBLIC").limit(1);')).toBe(1);
    expect(unpinnedBorrows('admin.from("questions").select("id").like("content_hash", `${P}%`).limit(1);')).toBe(0);
    expect(unpinnedBorrows('admin.from("questions").select("id").order("created_at", { ascending: true }).limit(1);')).toBe(0);
    expect(unpinnedBorrows('admin.from("questions").select("id").eq("id", qid).limit(1);')).toBe(0);
    expect(unpinnedBorrows('admin.from("questions").insert(row).select("id").limit(1);')).toBe(0);
  });
});
