"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  CART_LIMIT,
  addToCart as addToCartPure,
  removeFromCart as removeFromCartPure,
  isInCart as isInCartPure,
  parseCart,
  serializeCart,
  type CartState,
} from "./storage";

const STORAGE_KEY = "qb:cart:v1";

type CartContextValue = {
  /** Question IDs in insertion order. Empty until hydrated from localStorage. */
  ids: CartState;
  /** True once the provider has read localStorage on mount. Use to gate render. */
  hydrated: boolean;
  /** Adds an id; no-op if already present or cart is full. Returns true if it landed. */
  add: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  count: number;
  isFull: boolean;
  limit: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<CartState>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount. SSR can't see localStorage, so we
  // start empty and reconcile after mount; consumers gate render on `hydrated`.
  useEffect(() => {
    try {
      setIds(parseCart(window.localStorage.getItem(STORAGE_KEY)));
    } catch {
      // Private-mode browsers throw on localStorage; treat as empty cart.
    }
    setHydrated(true);
  }, []);

  // Persist on every change after hydration.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, serializeCart(ids));
    } catch {
      // Quota or private-mode failure — silently ignore.
    }
  }, [ids, hydrated]);

  const add = useCallback((id: string) => {
    let landed = false;
    setIds((prev) => {
      const next = addToCartPure(prev, id);
      landed = next !== prev;
      return next;
    });
    return landed;
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => removeFromCartPure(prev, id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const has = useCallback((id: string) => isInCartPure(ids, id), [ids]);

  const value = useMemo<CartContextValue>(
    () => ({
      ids,
      hydrated,
      add,
      remove,
      clear,
      has,
      count: ids.length,
      isFull: ids.length >= CART_LIMIT,
      limit: CART_LIMIT,
    }),
    [ids, hydrated, add, remove, clear, has]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }
  return ctx;
}
