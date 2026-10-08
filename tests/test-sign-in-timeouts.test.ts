/**
 * A test that signs in INSIDE its body must be allowed to outlast a rate limit.
 *
 * Found 2026-10-08: `mustSignIn` waits out Supabase's sign-in rate limit (65 s
 * a time), but a test body gets 30 s (`testTimeout`). In a full run the limit
 * trips, the test is killed mid-wait, and vitest's `retry: 1` runs it again.
 * A test that is not safe to repeat then fails on the RETRY's error ("already
 * a member"), which names nothing near the cause. It failed that way twice in
 * one day on two unrelated branches.
 *
 * Setup hooks already get 6 minutes (`hookTimeout`), so a sign-in belongs
 * there. Where the sign-in IS the thing being tested (a new login works), the
 * test passes SIGN_IN_TEST_TIMEOUT_MS as its timeout, or its describe does
 * (`{ timeout: ... }`, as push-subscribe-route does). This scan holds all three.
 * To check that an account was NOT changed, read it instead
 * (`accountUpdatedAt` in tests/helpers/fixture.ts): no sign-in, no limit.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SIGN_IN = ["mustSignIn", "signInWorks"];
/** One rate-limit wait (65 s) plus the sign-in around it. */
const MIN_TIMEOUT_MS = 70_000;
/** Tests of the sign-in helpers themselves: they use fake clients, no network. */
const EXEMPT = new Set(["fixture-sign-in.test.ts"]);

function testFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return testFiles(p);
    return name.endsWith(".test.ts") ? [p] : [];
  });
}

/** Sign-in helpers plus any function in the file that calls one (e.g. `canSignIn`). */
function signInNames(src: string): string[] {
  const names = new Set(SIGN_IN);
  for (let grew = true; grew; ) {
    grew = false;
    for (const m of src.matchAll(/(?:async\s+function\s+(\w+)|(?:const|let)\s+(\w+)\s*=\s*async)/g)) {
      const name = m[1] ?? m[2];
      if (names.has(name)) continue;
      const body = src.slice(m.index!, m.index! + 600);
      const end = body.indexOf("\n  }") === -1 ? body.length : body.indexOf("\n  }");
      if ([...names].some((n) => new RegExp(`\\b${n}\\(`).test(body.slice(0, end)))) {
        names.add(name);
        grew = true;
      }
    }
  }
  return [...names];
}

/** Each `it(` / `test(` block's text, from its opening to the next block or hook. */
function testBlocks(src: string): { title: string; text: string }[] {
  const starts = [...src.matchAll(/\n\s*(?:it|test)(?:\.\w+)?\(\s*(["'`])(.*?)\1/g)];
  const boundary = /\n\s*(?:(?:it|test)(?:\.\w+)?\(\s*["'`]|beforeAll\(|afterAll\(|beforeEach\(|afterEach\(|describe(?:\.\w+)*\()/g;
  return starts.map((m) => {
    boundary.lastIndex = m.index! + m[0].length;
    const next = boundary.exec(src);
    return { title: m[2], text: src.slice(m.index!, next ? next.index : src.length) };
  });
}

/** A timeout that outlasts a rate-limit wait: the shared constant, or a number at least that long. */
function longEnough(arg: string): boolean {
  if (arg === "SIGN_IN_TEST_TIMEOUT_MS") return true;
  const n = Number(arg.replace(/_/g, ""));
  return Number.isFinite(n) && n >= MIN_TIMEOUT_MS;
}

/** A `describe(..., { timeout: X }, ...)` covering the whole file. */
function fileWideTimeout(src: string): boolean {
  const m = src.match(/describe(?:\.\w+)*(?:\([^)]*\))?\(\s*["'`][^"'`]*["'`]\s*,\s*\{\s*timeout:\s*([\w_]+)/);
  return m !== null && longEnough(m[1]);
}

function offenders(): string[] {
  const out: string[] = [];
  for (const file of testFiles(join(process.cwd(), "tests"))) {
    const base = file.split(/[\\/]/).pop()!;
    if (EXEMPT.has(base) || base === "test-sign-in-timeouts.test.ts") continue;
    const src = readFileSync(file, "utf8");
    if (!SIGN_IN.some((n) => src.includes(n))) continue;
    if (fileWideTimeout(src)) continue;
    const names = signInNames(src);
    const call = new RegExp(`\\b(?:${names.join("|")})\\(`);
    for (const b of testBlocks(src)) {
      const own = b.text.match(/\},\s*([\w_]+)\s*\);?\s*$/);
      if (call.test(b.text) && !(own && longEnough(own[1]))) {
        out.push(`${base}: "${b.title}"`);
      }
    }
  }
  return out;
}

describe("tests that sign in inside their body", () => {
  it("pass SIGN_IN_TEST_TIMEOUT_MS, so a rate-limit wait is not cut off", () => {
    expect(offenders()).toEqual([]);
  });
});
