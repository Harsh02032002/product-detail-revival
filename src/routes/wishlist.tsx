import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, ShoppingBag, Trash2 } from "lucide-react";

import { SiteHeader } from "@/components/site/site-header";
import { useWishlist } from "@/components/site/wishlist-provider";
import { Button } from "@/components/ui/button";
import { formatPrice, products, type Product } from "@/data/catalogue";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "My Wishlist | AVISHEKK NAIYA" },
      { name: "description", content: "Your saved AVISHEKK NAIYA pieces, gathered in one place." },
      { property: "og:title", content: "My Wishlist | AVISHEKK NAIYA" },
      { property: "og:description", content: "Your saved AVISHEKK NAIYA pieces, gathered in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlistSlugs, removeFromWishlist, clearWishlist } = useWishlist();
  const wishlistProducts = wishlistSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-4 sm:pt-6 lg:px-14">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
          <Link to="/" className="hover:text-foreground">Home</Link><span>›</span><span>Your Wishlist</span>
        </nav>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
          <div>
            <h1 className="font-display text-3xl leading-none sm:text-5xl">My Wishlist <span className="text-lg sm:text-2xl">({wishlistProducts.length} {wishlistProducts.length === 1 ? "item" : "items"})</span></h1>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">Your favorite pieces, saved for later.</p>
          </div>
          {wishlistProducts.length > 0 && (
            <Button variant="outline" onClick={clearWishlist}><Trash2 /> Remove All</Button>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <section className="flex min-h-[420px] flex-col items-center justify-center text-center" aria-label="Empty wishlist">
            <span className="flex size-20 items-center justify-center rounded-full border border-border bg-card text-collection-link"><Heart className="size-8" /></span>
            <h2 className="mt-6 font-display text-3xl sm:text-4xl">Your wishlist is empty</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Save the pieces you love and return to them whenever inspiration strikes.</p>
            <Button asChild size="lg" className="mt-6"><Link to="/">Continue Shopping <ArrowRight /></Link></Button>
          </section>
        ) : (
          <>
            <section aria-label="Wishlist products" className="mt-5 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {wishlistProducts.map((product) => (
                <WishlistCard key={product.slug} product={product} onRemove={() => removeFromWishlist(product.slug)} />
              ))}
            </section>

            <section className="mt-8 flex flex-col items-center justify-between gap-5 border-y border-border bg-card px-5 py-6 sm:flex-row sm:px-8">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <span className="hidden size-12 items-center justify-center rounded-full bg-accent text-collection-link sm:flex"><Heart /></span>
                <div><h2 className="font-display text-xl sm:text-2xl">Save what you love, wear it forever.</h2><p className="mt-1 text-xs text-muted-foreground">Your wishlist keeps your favorite picks ready for your special moments.</p></div>
              </div>
              <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/">Continue Shopping <ArrowRight /></Link></Button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function WishlistCard({ product, onRemove }: { product: Product; onRemove: () => void }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card">
      <div className="relative aspect-[4/5] overflow-hidden bg-image-surface">
        <Link to="/products/$productSlug" params={{ productSlug: product.slug }} aria-label={`View ${product.name}`} className="block h-full">
          <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.015]" />
        </Link>
        <Button variant="ghost" size="icon" aria-label={`Remove ${product.name} from wishlist`} onClick={onRemove} className="absolute right-1.5 top-1.5 bg-card/90 text-sale hover:bg-card hover:text-sale"><Heart fill="currentColor" /></Button>
      </div>
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <p className="text-[9px] font-semibold text-collection-link">AVISHEKK NAIYA</p>
        <Link to="/products/$productSlug" params={{ productSlug: product.slug }} className="font-display text-sm font-semibold leading-tight sm:text-lg">{product.name}</Link>
        <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">Colour: {product.color}</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-1.5 text-[10px] sm:text-xs"><strong>{formatPrice(product.price)}</strong><del className="text-muted-foreground">{formatPrice(product.originalPrice)}</del><span className="text-sale">{discount}% OFF</span></div>
        <Button className="mt-3 w-full text-xs"><ShoppingBag /> Add to Bag</Button>
        <Button variant="outline" className="mt-2 w-full text-xs" onClick={onRemove}><Trash2 /> Remove</Button>
      </div>
    </article>
  );
}