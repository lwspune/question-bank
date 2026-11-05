import { z } from "zod";

/**
 * `z.array(item).max(max)`, except an over-long array is refused before any element is
 * validated.
 *
 * zod 3's ZodArray records a `.max()` breach and then parses every element anyway, keeping one
 * issue per failing element. A 4 MB request of 2,000,000 numbers cost 634 MB of heap and 0.9 s
 * (measured 2026-11-05; GHSA-mrhx-c7xc-m3w5, fixed only in zod 4.6.6). Use this for any array
 * read from a request a member of the public can send. Spec: tests/bounded-array.test.ts.
 */
export function boundedArray<T extends z.ZodTypeAny>(item: T, max: number) {
  return z.preprocess((value, ctx) => {
    if (Array.isArray(value) && value.length > max) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        maximum: max,
        type: "array",
        inclusive: true,
        message: `At most ${max} items.`,
      });
      // zod 3 runs the inner schema even after this issue, and z.NEVER would add a second,
      // misleading "invalid_type" issue; an empty array passes it, leaving only too_big.
      return [];
    }
    return value;
  }, z.array(item).max(max));
}
