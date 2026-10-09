/**
 * `buildFetch` — the throttled fetch every server-side Supabase client uses
 * during `next build`, and nothing outside it.
 *
 * The second block pins the contract the rest of the code relies on: when the
 * custom fetch gives up (TimeoutError), supabase-js returns `{ error }` the way
 * it does for any failed request, so every existing `if (error)` branch
 * handles a build-time timeout without a single caller changing.
 */
import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { buildFetch } from "@/lib/supabase/buildFetch";

function withPhase<T>(phase: string | undefined, fn: () => T): T {
  const before = process.env.NEXT_PHASE;
  if (phase === undefined) delete process.env.NEXT_PHASE;
  else process.env.NEXT_PHASE = phase;
  try {
    return fn();
  } finally {
    if (before === undefined) delete process.env.NEXT_PHASE;
    else process.env.NEXT_PHASE = before;
  }
}

describe("buildFetch", () => {
  it("is undefined outside a build, so supabase-js keeps its own fetch", () => {
    expect(withPhase(undefined, buildFetch)).toBeUndefined();
    expect(withPhase("phase-production-server", buildFetch)).toBeUndefined();
  });

  it("is one shared function for the whole process during a build", () => {
    const [a, b] = withPhase("phase-production-build", () => [buildFetch(), buildFetch()]);
    expect(typeof a).toBe("function");
    expect(a).toBe(b);
  });
});

describe("supabase-js with a fetch that gives up", () => {
  it("returns { error } naming the timeout instead of throwing, so existing error branches handle it", async () => {
    const gaveUp: typeof fetch = async () => {
      const err = new Error("request gave up after 20000 ms");
      err.name = "TimeoutError";
      throw err;
    };
    const client = createClient("https://example.invalid", "anon-key", {
      auth: { persistSession: false },
      global: { fetch: gaveUp },
    });
    const { data, error } = await client.from("questions").select("id").limit(1);
    expect(data).toBeNull();
    expect(error?.message).toMatch(/TimeoutError|gave up/);
  });

  it("accepts an undefined custom fetch (the live-site shape) without complaint", async () => {
    const client = createClient("https://example.invalid", "anon-key", {
      auth: { persistSession: false },
      global: { fetch: undefined },
    });
    // example.invalid never resolves, so this must come back as an error, not a throw.
    const { error } = await client.from("questions").select("id").limit(1);
    expect(error).toBeTruthy();
  });
});
