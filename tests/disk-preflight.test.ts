import { describe, it, expect } from "vitest";
import { buildFloorBytes, diskVerdict, MIN_FREE_BYTES } from "../scripts/lib/diskPreflight";

const GB = 1024 ** 3;

describe("diskVerdict — fail in a second, not forty minutes into the build", () => {
  it("passes when there is room for a build", () => {
    const v = diskVerdict(10 * GB);
    expect(v.ok).toBe(true);
    expect(v.line).toMatch(/10\.0 GB free/);
  });

  it("fails below the floor, naming the floor and what to clear first", () => {
    // 2026-10-02: 520 MB free, and the build died with ENOSPC while
    // prerendering /notes/print after the tests had already run.
    const v = diskVerdict(0.5 * GB);
    expect(v.ok).toBe(false);
    expect(v.line).toMatch(/0\.5 GB free/);
    expect(v.line).toMatch(/8\.0 GB/);
    expect(v.line).toMatch(/\.next[\\/]cache[\\/]webpack/);
  });

  it("treats exactly the floor as enough", () => {
    expect(diskVerdict(MIN_FREE_BYTES).ok).toBe(true);
    expect(diskVerdict(MIN_FREE_BYTES - 1).ok).toBe(false);
  });

  it("sets the floor above what a build costs here: ~3.3 GB to .next plus page-file growth", () => {
    // 2026-10-02: a build started with 6.7 GB free ran the disk to 0 — the
    // page file grew 13 -> 19.4 GB on the same drive. So 6.7 GB is NOT enough.
    expect(MIN_FREE_BYTES).toBeGreaterThan(6.7 * GB);
  });

  it("accepts a custom floor", () => {
    expect(diskVerdict(2 * GB, 1 * GB).ok).toBe(true);
  });
});

describe("buildFloorBytes — a warm cache needs far less room than a cold build", () => {
  // Measured 2026-10-02 on the same machine: a COLD build (no webpack cache)
  // took the disk from 6.7 GB to 0; a WARM one went 4.55 -> 2.39 GB (2.2 GB).
  it("asks a cold build for the full floor", () => {
    expect(buildFloorBytes(false)).toBe(MIN_FREE_BYTES);
  });

  it("asks a warm build for less — a flat 8 GB would have blocked a build that succeeded at 4.55 GB", () => {
    expect(buildFloorBytes(true)).toBeLessThanOrEqual(4.5 * GB);
    expect(buildFloorBytes(true)).toBeGreaterThan(2.2 * GB);
  });
});
