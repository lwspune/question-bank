import { describe, it, expect } from "vitest";
import { cacheWindows } from "../scripts/lib/cacheWindows";

describe("cacheWindows", () => {
  it("reads an unstable_cache revalidate", () => {
    const src = `export const f = unstable_cache(async () => 1, ["k"], { revalidate: 3600 });`;
    expect(cacheWindows(src)).toEqual([3600]);
  });

  it("reads a multi-line options object and a numeric separator", () => {
    const src = `unstable_cache(
  async () => load(),
  ["daily"],
  { revalidate: 86_400 }
);`;
    expect(cacheWindows(src)).toEqual([86400]);
  });

  it("reads a fetch next.revalidate", () => {
    const src = `await fetch(url, { next: { revalidate: 60 } });`;
    expect(cacheWindows(src)).toEqual([60]);
  });

  it("reads an arithmetic window like 60 * 60 * 24", () => {
    expect(cacheWindows(`unstable_cache(fn, ["k"], { revalidate: 60 * 60 * 24 })`)).toEqual([86400]);
  });

  it("ignores the page-level segment export, which is not a shared cache", () => {
    expect(cacheWindows(`export const revalidate = 3600;`)).toEqual([]);
  });

  it("ignores comments that mention a window", () => {
    const src = `// was { revalidate: 3600 } until 2026-10-06
/* unstable_cache(fn, [], { revalidate: 60 }) */
export const x = 1;`;
    expect(cacheWindows(src)).toEqual([]);
  });

  it("resolves a named constant declared in the same file", () => {
    const src = `const TTL_SECONDS = 60 * 60;
export const f = unstable_cache(fn, ["k"], { revalidate: TTL_SECONDS });`;
    expect(cacheWindows(src)).toEqual([3600]);
  });

  it("ignores a type annotation named revalidate", () => {
    expect(cacheWindows(`type Opts = { revalidate: number | false };`)).toEqual([]);
  });

  it("reports a window it cannot read as NaN rather than skipping it", () => {
    const src = `unstable_cache(fn, ["k"], { revalidate: TTL })`;
    expect(cacheWindows(src)).toEqual([NaN]);
  });

  it("treats revalidate: false (cache forever) as Infinity", () => {
    expect(cacheWindows(`unstable_cache(fn, ["k"], { revalidate: false })`)).toEqual([Infinity]);
  });
});
