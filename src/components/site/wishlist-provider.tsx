import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "avishekk-naiya-wishlist";

type WishlistContextValue = {
  wishlistSlugs: string[];
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlistSlugs(parsed.filter((value): value is string => typeof value === "string"));
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (isReady) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistSlugs));
  }, [isReady, wishlistSlugs]);

  const value = useMemo<WishlistContextValue>(() => ({
    wishlistSlugs,
    isWishlisted: (slug) => wishlistSlugs.includes(slug),
    toggleWishlist: (slug) => {
      setWishlistSlugs((current) =>
        current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
      );
    },
    removeFromWishlist: (slug) => setWishlistSlugs((current) => current.filter((item) => item !== slug)),
    clearWishlist: () => setWishlistSlugs([]),
  }), [wishlistSlugs]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}