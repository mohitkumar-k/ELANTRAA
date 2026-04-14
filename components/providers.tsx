"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import type { CartItem, Product, WishlistItem } from '@/lib/types';

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clearCart: () => void;
};

type WishlistContextValue = {
  items: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  removeWishlistItem: (slug: string) => void;
  isWishlisted: (slug: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const WishlistContext = createContext<WishlistContextValue | null>(null);

const CART_STORAGE_KEY = 'elantraa_cart';
const WISHLIST_STORAGE_KEY = 'elantraa_wishlist';

function loadJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(loadJson<CartItem[]>(CART_STORAGE_KEY, []));
    setWishlist(loadJson<WishlistItem[]>(WISHLIST_STORAGE_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const cartValue = useMemo<CartContextValue>(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 249;

    return {
      items: cart,
      count: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem(product, size, quantity = 1) {
        setCart((current) => {
          const existing = current.find((item) => item.product.slug === product.slug && item.size === size);
          if (existing) {
            toast.success('Cart updated');
            return current.map((item) =>
              item.product.slug === product.slug && item.size === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }

          toast.success('Added to cart');
          return [...current, { product, size, quantity }];
        });
      },
      removeItem(slug, size) {
        setCart((current) => current.filter((item) => !(item.product.slug === slug && item.size === size)));
        toast.message('Removed from cart');
      },
      updateQuantity(slug, size, quantity) {
        setCart((current) =>
          current
            .map((item) => (item.product.slug === slug && item.size === size ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0)
        );
      },
      clearCart() {
        setCart([]);
      }
    };
  }, [cart]);

  const wishlistValue = useMemo<WishlistContextValue>(() => {
    return {
      items: wishlist,
      toggleWishlist(product) {
        setWishlist((current) => {
          const exists = current.some((item) => item.slug === product.slug);
          if (exists) {
            toast.message('Removed from wishlist');
            return current.filter((item) => item.slug !== product.slug);
          }
          toast.success('Saved to wishlist');
          return [...current, product];
        });
      },
      removeWishlistItem(slug) {
        setWishlist((current) => current.filter((item) => item.slug !== slug));
      },
      isWishlisted(slug) {
        return wishlist.some((item) => item.slug === slug);
      }
    };
  }, [wishlist]);

  return (
    <CartContext.Provider value={cartValue}>
      <WishlistContext.Provider value={wishlistValue}>{children}</WishlistContext.Provider>
    </CartContext.Provider>
  );
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used within AppProviders');
  return value;
}

export function useWishlist() {
  const value = useContext(WishlistContext);
  if (!value) throw new Error('useWishlist must be used within AppProviders');
  return value;
}
