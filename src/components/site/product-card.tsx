import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice, type Product } from "@/data/catalogue";

export function ProductCard({ product, list = false }: { product: Product; list?: boolean }) {
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <article className={`group overflow-hidden rounded-md border border-border bg-card ${list ? "sm:grid sm:grid-cols-[180px_1fr]" : ""}`}>
      <Link to="/products/$productSlug" params={{ productSlug: product.slug }} className="relative block aspect-[4/5] overflow-hidden bg-image-surface" aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} className="h-full w-full object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.015]" />
        <span className="absolute left-2 top-2 rounded-sm bg-badge px-2 py-1 text-[9px] font-semibold text-badge-foreground">{product.badge}</span>
        <Button variant="ghost" size="icon" aria-label={`Add ${product.name} to wishlist`} className="absolute right-1 top-1 text-image-icon hover:bg-image-overlay hover:text-image-icon"><Heart /></Button>
      </Link>
      <div className="flex flex-col p-2.5 sm:p-3">
        <p className="text-[9px] font-semibold text-collection-link">AVISHEKK NAIYA</p>
        <Link to="/products/$productSlug" params={{ productSlug: product.slug }} className="font-display text-sm font-semibold leading-tight sm:text-lg">{product.name}</Link>
        <p className="mt-0.5 line-clamp-1 text-[9px] text-muted-foreground sm:text-[11px]">{product.description}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-1.5 text-[10px] sm:text-xs"><strong>{formatPrice(product.price)}</strong><del className="text-muted-foreground">{formatPrice(product.originalPrice)}</del><span className="text-sale">({discount}% OFF)</span></div>
        <Button asChild variant="link" className="mt-1 h-auto w-fit gap-1 p-0 text-[10px] font-normal text-collection-link no-underline hover:no-underline sm:mt-2 sm:text-xs">
          <Link to="/products/$productSlug" params={{ productSlug: product.slug }}><span className="flex size-6 items-center justify-center rounded-full border border-gold"><ArrowRight className="size-3" /></span>View Product</Link>
        </Button>
      </div>
    </article>
  );
}