"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItemRaw {
  id?: number | string;
  productId?: string;
  image?: string;
  title?: string;
  // price could be number, formatted string, object etc. before normalization
  price?: any;
  quantity?: any;
  active?: any;
  [k: string]: any;
}

export interface CartItem {
  id: number | string;
  productId?: string;
  image: string;
  title: string;
  // canonical numeric price in currency units (e.g. rupees). Use integer paise/cents if you prefer.
  price: number;
  quantity: number;
  active: boolean; // true = cart, false = wishlist
  raw?: CartItemRaw; // keep original for reference if needed
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItemRaw) => void;
  addToWishlist: (item: CartItemRaw) => void;
  removeFromCart: (idOrProductId: number | string) => void;
  updateItemQuantity: (
    idOrProductId: number | string,
    quantity: number
  ) => void;
  isCartLoaded: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

/* -------------------------
   Helpers: normalization + debugging
   ------------------------- */

const sanitizeNumber = (v: any): number => {
  if (typeof v === "number" && isFinite(v)) return v;
  if (v == null) return 0;

  // If object with amount/value keys
  if (typeof v === "object") {
    if (typeof v.amount !== "undefined") return sanitizeNumber(v.amount);
    if (typeof v.value !== "undefined") return sanitizeNumber(v.value);
    // if object looks like { price: ... }
    if (typeof v.price !== "undefined") return sanitizeNumber(v.price);
    return 0;
  }

  // string: remove currency symbols, commas, spaces and keep digits/dot/minus
  const s = String(v)
    .trim()
    .replace(/[,₹\s]/g, "")
    .replace(/[^\d.-]/g, "");
  const n = Number(s);
  return isFinite(n) ? n : 0;
};

const normalizeRawItem = (raw: CartItemRaw): CartItem => {
  // attempt to derive an id: prefer productId if present, else raw.id
  const productId = raw.productId ? String(raw.productId) : undefined;
  const id = raw.id ?? productId ?? `${Math.random().toString(36).slice(2, 9)}`;

  // quantity fallback: sometimes stored as string, "", null -> default 1 for cart items
  let quantity = Math.floor(sanitizeNumber(raw.quantity));
  if (!quantity || quantity < 1) quantity = 1;

  // price normalization: keeps numeric rupees (e.g., 125.5)
  const price = sanitizeNumber(raw.price);

  // active: convert to boolean, default true (treat as cart)
  const active = typeof raw.active === "undefined" ? true : !!raw.active;

  // title/image safe defaults
  const title = raw.title ?? "Untitled product";
  const image = raw.image ?? "/placeholder.png";

  // debug log once when price is suspicious (null/zero)
  if (raw.price == null || price === 0) {
    // keep console.warn so developers see problems in dev/qa,
    // DON'T spam in production (you can gate it behind NODE_ENV)
    if (process.env.NODE_ENV !== "production") {
      console.warn("[CartProvider] Suspicious price for item:", {
        rawPrice: raw.price,
        normalizedPrice: price,
        id,
        title,
      });
    }
  }

  return {
    id,
    productId,
    image,
    title,
    price,
    quantity,
    active,
    raw,
  };
};

/* -------------------------
   CartProvider (normalized)
   ------------------------- */

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  // Utility: persist only canonical cart items (avoid storing raw)
  const persist = (items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed writing cart to localStorage", e);
    }
  };

  // Load + normalize on first mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        // If stored is array of raw-like items or maybe already normalized, handle both.
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((it) =>
            // if it already looks normalized (has numeric price), preserve but coerce types
            typeof it.price === "number" && typeof it.quantity === "number"
              ? {
                  id:
                    it.id ??
                    it.productId ??
                    `${Math.random().toString(36).slice(2, 9)}`,
                  productId: it.productId,
                  image: it.image ?? "/placeholder.png",
                  title: it.title ?? "Untitled product",
                  price: sanitizeNumber(it.price),
                  quantity: Math.max(
                    1,
                    Math.floor(sanitizeNumber(it.quantity))
                  ),
                  active: typeof it.active === "undefined" ? true : !!it.active,
                  raw: it,
                }
              : normalizeRawItem(it)
          );
          setCartItems(normalized);
          // save back normalized form (migration)
          persist(normalized);
        } else {
          // unknown shape: ignore it and clear
          console.warn(
            "[CartProvider] Unexpected cart shape in localStorage:",
            parsed
          );
          localStorage.removeItem("cart");
        }
      }
    } catch (error) {
      console.error(
        "Failed to parse or normalize cart from localStorage:",
        error
      );
      localStorage.removeItem("cart");
    } finally {
      setIsCartLoaded(true);
    }
    // run only once on mount
  }, []);

  // Persist when cart changes (only after initial load)
  useEffect(() => {
    if (!isCartLoaded) return;
    persist(cartItems);
  }, [cartItems, isCartLoaded]);

  /* ----- Operations: all accept raw items and normalize ---- */

  const addToCart = (rawItem: CartItemRaw) => {
    const item = normalizeRawItem(rawItem);
    item.active = true;

    setCartItems((prev) => {
      const identifier = item.productId ?? item.id;
      const existingIndex = prev.findIndex(
        (i) => (i.productId ?? i.id) === identifier && i.active === true
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: Math.max(1, copy[existingIndex].quantity + item.quantity),
          // prefer keeping existing price if non-zero; else overwrite
          price: copy[existingIndex].price || item.price,
        };
        return copy;
      } else {
        return [...prev, item];
      }
    });
  };

  const addToWishlist = (rawItem: CartItemRaw) => {
    const item = normalizeRawItem(rawItem);
    item.active = false;

    setCartItems((prev) => {
      const identifier = item.productId ?? item.id;
      const existingIndex = prev.findIndex(
        (i) => (i.productId ?? i.id) === identifier && i.active === false
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: Math.max(1, copy[existingIndex].quantity + item.quantity),
        };
        return copy;
      } else {
        return [...prev, item];
      }
    });
  };

  const removeFromCart = (idOrProductId: number | string) => {
    setCartItems((prev) =>
      prev.filter((i) => (i.productId ?? i.id) !== String(idOrProductId))
    );
  };

  const updateItemQuantity = (
    idOrProductId: number | string,
    quantity: number
  ) => {
    const q = Math.max(1, Math.floor(quantity));
    setCartItems((prev) =>
      prev.map((i) =>
        (i.productId ?? i.id) === String(idOrProductId)
          ? { ...i, quantity: q }
          : i
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addToWishlist,
        removeFromCart,
        updateItemQuantity,
        isCartLoaded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
