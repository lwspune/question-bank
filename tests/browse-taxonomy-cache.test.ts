/**
 * Spec for the /browse taxonomy cache key normaliser.
 *
 * The subtopic lookup is keyed on a list of chapter ids. Without normalisation
 * the SAME selection arriving in a different URL order would mint a separate
 * cache entry each time — the cache would appear to work while quietly missing,
 * which is the failure mode you never notice in a smoke test.
 */
import { describe, it, expect } from "vitest";
import { normalizeIdList } from "@/lib/questions/taxonomy";

const A = "11111111-1111-1111-1111-111111111111";
const B = "22222222-2222-2222-2222-222222222222";
const C = "33333333-3333-3333-3333-333333333333";

describe("normalizeIdList", () => {
  it("returns an empty list unchanged", () => {
    expect(normalizeIdList([])).toEqual([]);
  });

  it("is order-independent — the whole point of the key", () => {
    expect(normalizeIdList([B, A, C])).toEqual(normalizeIdList([C, A, B]));
  });

  it("dedupes repeats so a doubled URL param can't fragment the cache", () => {
    expect(normalizeIdList([A, B, A])).toEqual([A, B]);
  });

  it("produces a deterministic sorted order", () => {
    expect(normalizeIdList([C, A, B])).toEqual([A, B, C]);
  });

  it("does not mutate the caller's array", () => {
    const input = [C, A];
    normalizeIdList(input);
    expect(input).toEqual([C, A]);
  });
});
