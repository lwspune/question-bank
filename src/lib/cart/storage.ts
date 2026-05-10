/**
 * Pure helpers for the paper cart (per-browser, localStorage-backed).
 * The CartProvider wraps these and handles persistence + React state.
 *
 * Keeping the data layer pure means the public/anon teacher's cart works
 * without server involvement: pick questions across filters, then download
 * them as a single paper. Cart capacity matches the export hard cap.
 */
export type CartState = string[];

// Mirrors the 200-question export cap in src/app/api/export/route.ts.
// Bumped only if both numbers move together.
export const CART_LIMIT = 200;

export function parseCart(raw: string | null): CartState {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is string => typeof x === "string");
  } catch {
    return [];
  }
}

export function serializeCart(cart: CartState): string {
  return JSON.stringify(cart);
}

export function addToCart(cart: CartState, id: string): CartState {
  if (cart.includes(id)) return cart;
  if (cart.length >= CART_LIMIT) return cart;
  return [...cart, id];
}

export function removeFromCart(cart: CartState, id: string): CartState {
  if (!cart.includes(id)) return cart;
  return cart.filter((c) => c !== id);
}

export function isInCart(cart: CartState, id: string): boolean {
  return cart.includes(id);
}
