import { z } from "zod";

/**
 * An array read from a request a member of the public can send, with a required limit.
 *
 * WHY it exists: zod 3's ZodArray recorded a `.max()` breach and then parsed every element
 * anyway; a 4 MB request of 2,000,000 numbers cost 634 MB of heap and 0.9 s (measured 2026-11-05,
 * GHSA-mrhx-c7xc-m3w5), so this refused an over-long array first. zod 4.6.6 fixed that: on 4.6.7
 * the same request is refused in 1 ms with no measurable heap and one `too_big` issue (measured
 * 2026-11-05, TECH_DEBT_SPEC.md 4.3), so this is now a plain `.max()`. Kept so every public
 * array still has to name a limit (tests/bounded-array.test.ts guards src/app/api).
 */
export function boundedArray<T extends z.ZodType>(item: T, max: number) {
  return z.array(item).max(max, { error: `At most ${max} items.` });
}
