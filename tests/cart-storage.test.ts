/**
 * Pure cart-state helpers underlying the localStorage-backed paper cart.
 * The hook in CartProvider wraps these — the React side is verified by
 * manual smoke; this file pins the data semantics.
 */
import { describe, it, expect } from "vitest";
import {
  CART_LIMIT,
  parseCart,
  serializeCart,
  addToCart,
  removeFromCart,
  isInCart,
} from "@/lib/cart/storage";

const A = "11111111-1111-1111-1111-111111111111";
const B = "22222222-2222-2222-2222-222222222222";
const C = "33333333-3333-3333-3333-333333333333";

describe("parseCart", () => {
  it("returns [] for null / empty input", () => {
    expect(parseCart(null)).toEqual([]);
    expect(parseCart("")).toEqual([]);
  });

  it("returns [] for non-JSON garbage", () => {
    expect(parseCart("not-json")).toEqual([]);
  });

  it("returns [] when the JSON is not an array", () => {
    expect(parseCart('{"foo":"bar"}')).toEqual([]);
    expect(parseCart('"a"')).toEqual([]);
    expect(parseCart("42")).toEqual([]);
  });

  it("returns parsed array of string IDs, dropping non-string entries", () => {
    expect(parseCart(`["${A}", 42, null, "${B}"]`)).toEqual([A, B]);
  });
});

describe("serializeCart", () => {
  it("round-trips through parseCart", () => {
    expect(parseCart(serializeCart([A, B, C]))).toEqual([A, B, C]);
    expect(parseCart(serializeCart([]))).toEqual([]);
  });
});

describe("addToCart", () => {
  it("appends a new id to the end (preserves insertion order)", () => {
    expect(addToCart([], A)).toEqual([A]);
    expect(addToCart([A], B)).toEqual([A, B]);
    expect(addToCart([A, B], C)).toEqual([A, B, C]);
  });

  it("is a no-op when the id is already in the cart", () => {
    const cart = [A, B];
    expect(addToCart(cart, A)).toBe(cart);
    expect(addToCart(cart, B)).toBe(cart);
  });

  it("refuses to add when the cart is at the hard limit", () => {
    const full = Array.from({ length: CART_LIMIT }, (_, i) => `id-${i}`);
    const result = addToCart(full, "new");
    expect(result).toBe(full);
    expect(result).toHaveLength(CART_LIMIT);
  });

  it("CART_LIMIT matches the export ceiling (200)", () => {
    // The export endpoint caps the produced paper at 200 — keep cart in sync.
    expect(CART_LIMIT).toBe(200);
  });
});

describe("removeFromCart", () => {
  it("removes the supplied id, preserving order", () => {
    expect(removeFromCart([A, B, C], B)).toEqual([A, C]);
    expect(removeFromCart([A, B, C], A)).toEqual([B, C]);
    expect(removeFromCart([A, B, C], C)).toEqual([A, B]);
  });

  it("is a no-op when the id is not present", () => {
    expect(removeFromCart([A, B], C)).toEqual([A, B]);
    expect(removeFromCart([], A)).toEqual([]);
  });
});

describe("isInCart", () => {
  it("returns true iff the id is present", () => {
    expect(isInCart([A, B], A)).toBe(true);
    expect(isInCart([A, B], C)).toBe(false);
    expect(isInCart([], A)).toBe(false);
  });
});
