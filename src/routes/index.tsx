import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  Heart,
  Search,
  ShoppingBag,
  UserRound,
} from "lucide-react";

import logoAsset from "@/assets/avishekk-naiya-logo.png";
import angavastramImage from "@/assets/catalogue-angavastram.jpg";
import blouseImage from "@/assets/catalogue-blouse.jpg";
import dhotiImage from "@/assets/catalogue-dhoti.jpg";
import jutiImage from "@/assets/catalogue-juti.jpg";
import kurtaImage from "@/assets/catalogue-kurta.jpg";
import sareeImage from "@/assets/catalogue-saree.jpg";
import sherwaniImage from "@/assets/catalogue-sherwani.jpg";
import veilImage from "@/assets/catalogue-veil.jpg";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/site/wishlist-provider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Browse the Catalogue | AVISHEKK NAIYA" },
      {
        name: "description",
        content: "Explore handcrafted Indian occasionwear and textiles by AVISHEKK NAIYA.",
      },
      { property: "og:title", content: "Browse the Catalogue | AVISHEKK NAIYA" },
      {
        property: "og:description",
        content: "Explore handcrafted Indian occasionwear and textiles by AVISHEKK NAIYA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CataloguePage,
});

const collections = [
  { slug: "kurta", name: "Kurta", count: 124, image: kurtaImage, alt: "Full-length ivory embroidered kurta outfit" },
  { slug: "dhoti", name: "Dhoti", count: 48, image: dhotiImage, alt: "Complete ivory dhoti and angavastram styling" },
  { slug: "saree", name: "Saree", count: 320, image: sareeImage, alt: "Full-length crimson Banarasi saree drape" },
  { slug: "blouse", name: "Blouse", count: 86, image: blouseImage, alt: "Complete embroidered crimson blouse on a mannequin" },
  { slug: "sherwani", name: "Sherwani", count: 72, image: sherwaniImage, alt: "Full-length ivory sherwani outfit" },
  { slug: "veil", name: "Veil", count: 54, image: veilImage, alt: "Complete crimson bridal veil with embroidered border" },
  { slug: "juti", name: "Juti", count: 66, image: jutiImage, alt: "Complete pair of embroidered ivory juttis" },
  { slug: "angavastram", name: "Angavastram", count: 39, image: angavastramImage, alt: "Full-length ivory silk angavastram with gold border" },
] as const;


function CataloguePage() {
  const { wishlistSlugs } = useWishlist();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-header text-header-foreground">
        <div className="border-b border-header-border bg-header-top">
          <div className="mx-auto flex h-5 max-w-[1440px] items-center justify-center px-5 text-[9px] font-medium sm:h-7 sm:justify-between sm:text-[10px] lg:px-14">
            <p className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline">✣&nbsp; Handcrafted Heritage</span>
              <span className="text-gold">|</span>
              <span>Premium Fabrics</span>
              <span className="text-gold">|</span>
              <span className="hidden sm:inline">Worldwide Shipping &nbsp;✣</span>
            </p>
            <button className="hidden items-center gap-1 text-[9px] sm:text-[10px] lg:flex" type="button">
              India (INR) <ChevronDown aria-hidden="true" className="size-3" />
            </button>
          </div>
        </div>

        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 sm:h-[68px] lg:px-14">
          <Link to="/" aria-label="AVISHEKK NAIYA home" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img src={logoAsset} alt="" className="size-9 shrink-0 rounded-full object-contain sm:size-11" />
            <span className="truncate text-xs font-semibold tracking-[0.14em] sm:text-base">AVISHEKK NAIYA</span>
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-9 text-sm md:flex">
            <Link to="/" className="transition-colors hover:text-gold">Home</Link>
            <a href="#catalogue" className="flex items-center gap-1.5 transition-colors hover:text-gold">Collections <ChevronDown aria-hidden="true" className="size-3.5" /></a>
            <a href="#catalogue" className="flex items-center gap-1.5 transition-colors hover:text-gold">Men <ChevronDown aria-hidden="true" className="size-3.5" /></a>
            <a href="#catalogue" className="flex items-center gap-1.5 transition-colors hover:text-gold">Women <ChevronDown aria-hidden="true" className="size-3.5" /></a>
            <a href="#about" className="transition-colors hover:text-gold">About Us</a>
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button variant="ghost" size="icon" aria-label="Search" className="size-8 text-header-foreground hover:bg-header-hover hover:text-gold sm:size-9"><Search className="size-[18px] sm:size-5" /></Button>
            <Button variant="ghost" size="icon" aria-label="Account" className="hidden size-9 text-header-foreground hover:bg-header-hover hover:text-gold sm:inline-flex"><UserRound /></Button>
            <Button asChild variant="ghost" size="icon" className="size-8 text-header-foreground hover:bg-header-hover hover:text-gold sm:size-9">
              <Link to="/wishlist" aria-label={`Wishlist, ${wishlistSlugs.length} items`}><Heart fill={wishlistSlugs.length > 0 ? "currentColor" : "none"} /></Link>
            </Button>
            <span className="text-xs">{wishlistSlugs.length}</span>
            <Button variant="ghost" size="icon" aria-label="Shopping bag, 0 items" className="size-8 text-header-foreground hover:bg-header-hover hover:text-gold sm:size-9"><ShoppingBag className="size-[18px] sm:size-5" /></Button>
            <span className="text-xs">0</span>
          </div>
        </div>
      </header>

      <main id="catalogue" className="mx-auto max-w-[1440px] px-5 pb-16 pt-3 sm:pt-5 lg:px-14">
        <div className="mb-3 flex flex-col gap-3 sm:mb-5 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <nav aria-label="Breadcrumb" className="mb-0.5 flex items-center gap-2 text-[11px] text-muted-foreground sm:mb-2 sm:text-xs">
              <Link to="/" className="hover:text-foreground">Home</Link><span>›</span><span>Browse the catalogue</span>
            </nav>
            <h1 className="font-display text-2xl leading-none sm:text-4xl lg:text-5xl">Browse the catalogue</h1>
            <p className="mt-1 hidden text-xs text-muted-foreground sm:block sm:text-base">Explore our handcrafted collections, curated for your special moments.</p>
          </div>
          <label className="flex h-9 w-full items-center gap-3 rounded-md border border-input bg-background px-3 text-muted-foreground sm:h-12 sm:px-4 lg:w-[330px]">
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only">Search collections</span>
            <input type="search" placeholder="Search collections..." className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground sm:text-sm" />
          </label>
        </div>

        <section aria-label="Catalogue collections" className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          {collections.map((collection) => (
            <article key={collection.name} className="group overflow-hidden rounded-md border border-border bg-card">
              <Link
                to="/collections/$category"
                params={{ category: collection.slug }}
                aria-label={`View the ${collection.name} collection`}
                className="block"
              >
                <div className="aspect-[3/4] overflow-hidden bg-image-surface sm:aspect-[4/5]">
                  <img
                    src={collection.image}
                    alt={collection.alt}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 motion-safe:group-hover:scale-[1.015]"
                  />
                </div>
                <div className="px-2 pb-2 pt-1.5 sm:px-4 sm:pb-4 sm:pt-3">
                  <h2 className="font-display text-sm leading-tight sm:text-xl">{collection.name}</h2>
                  <p className="mt-0.5 text-[10px] text-muted-foreground sm:text-xs">{collection.count} catalogues</p>
                  <Button asChild variant="link" className="mt-0.5 h-auto gap-1 p-0 text-[10px] font-normal text-collection-link no-underline hover:no-underline sm:mt-2 sm:gap-2 sm:text-sm">
                    <span>
                      <span className="flex size-5 items-center justify-center rounded-full border border-gold sm:size-7"><ArrowRight aria-hidden="true" className="size-2.5 sm:size-3.5" /></span>
                      View Collection
                    </span>
                  </Button>
                </div>
              </Link>
            </article>

          ))}
        </section>
      </main>
    </div>
  );
}