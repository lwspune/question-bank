/**
 * `singleFlight` — callers asking for the same thing at the same time share one
 * load instead of each starting their own.
 *
 * Why (2026-10-06): a build starts hundreds of pages at once, and
 * `unstable_cache` keeps a result only AFTER the first load finishes, so every
 * page that starts in that gap runs the load too. The ~475-request chapter
 * table (`listChapterLandings`) ran ~9 times in a healthy build and ~58 times in
 * one where the database was slow, which kept it slow: two thirds of that
 * build's 43,069 requests. Sharing the in-progress load caps it at once per
 * process however slow the database is.
 *
 * It holds a load only WHILE it is in progress. Once it settles the entry is
 * gone, so it never serves anything staler than the cache underneath it.
 */
import { describe, it, expect } from "vitest";
import { singleFlight } from "@/lib/cache/singleFlight";

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe("singleFlight", () => {
  it("runs one load for many simultaneous callers of the same key, and all get its result", async () => {
    const d = deferred<string>();
    let loads = 0;
    const load = () => {
      loads++;
      return d.promise;
    };
    const calls = Array.from({ length: 50 }, () => singleFlight("t:same", load));
    d.resolve("table");
    await expect(Promise.all(calls)).resolves.toEqual(Array(50).fill("table"));
    expect(loads).toBe(1);
  });

  it("keeps different keys apart", async () => {
    let loads = 0;
    const [a, b] = await Promise.all([
      singleFlight("t:a", async () => (loads++, "A")),
      singleFlight("t:b", async () => (loads++, "B")),
    ]);
    expect([a, b]).toEqual(["A", "B"]);
    expect(loads).toBe(2);
  });

  it("holds nothing once a load has finished: the next call loads again", async () => {
    let loads = 0;
    await singleFlight("t:after", async () => ++loads);
    await expect(singleFlight("t:after", async () => ++loads)).resolves.toBe(2);
  });

  it("shares a failure with everyone waiting, then forgets it so the next call retries", async () => {
    const d = deferred<string>();
    const waiting = [singleFlight("t:fail", () => d.promise), singleFlight("t:fail", () => d.promise)];
    d.reject(new Error("statement timeout"));
    for (const p of waiting) await expect(p).rejects.toThrow("statement timeout");
    await expect(singleFlight("t:fail", async () => "ok")).resolves.toBe("ok");
  });

  it("treats a load that throws before returning a promise as a failure, not a crash", async () => {
    const boom = () => {
      throw new Error("sync boom");
    };
    await expect(singleFlight("t:sync", boom)).rejects.toThrow("sync boom");
    await expect(singleFlight("t:sync", async () => "ok")).resolves.toBe("ok");
  });
});
