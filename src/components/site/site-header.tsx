import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Search, ShoppingBag, UserRound } from "lucide-react";

import logoAsset from "@/assets/avishekk-naiya-logo.png";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/site/wishlist-provider";

export function SiteHeader() {
  const { wishlistSlugs } = useWishlist();
  return (
    <header className="bg-header text-header-foreground">
      <div className="border-b border-header-border bg-header-top">
        <div className="mx-auto flex h-5 max-w-[1440px] items-center justify-center px-5 text-[9px] font-medium sm:h-7 sm:justify-between sm:text-[10px] lg:px-14">
          <p className="flex items-center gap-2 sm:gap-3"><span className="hidden sm:inline">✣&nbsp; Handcrafted Heritage</span><span className="text-gold">|</span><span>Premium Fabrics</span><span className="text-gold">|</span><span className="hidden sm:inline">Worldwide Shipping &nbsp;✣</span></p>
          <button className="hidden items-center gap-1 text-[9px] sm:text-[10px] lg:flex" type="button">India (INR) <ChevronDown aria-hidden="true" className="size-3" /></button>
        </div>
      </div>
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 sm:h-[68px] lg:px-14">
        <Link to="/" aria-label="AVISHEKK NAIYA home" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src={logoAsset} alt="" className="size-9 shrink-0 rounded-full object-contain sm:size-11" />
          <span className="truncate text-xs font-semibold tracking-[0.14em] sm:text-base">AVISHEKK NAIYA</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-9 text-sm md:flex">
          <Link to="/" className="transition-colors hover:text-gold">Home</Link>
          <Link to="/collections/$category" params={{ category: "kurta" }} className="flex items-center gap-1.5 transition-colors hover:text-gold">Collections <ChevronDown aria-hidden="true" className="size-3.5" /></Link>
          <Link to="/collections/$category" params={{ category: "sherwani" }} className="flex items-center gap-1.5 transition-colors hover:text-gold">Men <ChevronDown aria-hidden="true" className="size-3.5" /></Link>
          <Link to="/collections/$category" params={{ category: "saree" }} className="flex items-center gap-1.5 transition-colors hover:text-gold">Women <ChevronDown aria-hidden="true" className="size-3.5" /></Link>
          <Link to="/" className="transition-colors hover:text-gold">About Us</Link>
        </nav>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" className="size-8 text-header-foreground hover:bg-header-hover hover:text-gold sm:size-9"><Search className="size-[18px] sm:size-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Account" className="hidden size-9 text-header-foreground hover:bg-header-hover hover:text-gold sm:inline-flex"><UserRound /></Button>
          <Button asChild variant="ghost" size="icon" className="size-8 text-header-foreground hover:bg-header-hover hover:text-gold sm:size-9">
            <Link to="/wishlist" aria-label={`Wishlist, ${wishlistSlugs.length} items`}><Heart fill={wishlistSlugs.length > 0 ? "currentColor" : "none"} /></Link>
          </Button><span className="text-xs">{wishlistSlugs.length}</span>
          <Button variant="ghost" size="icon" aria-label="Shopping bag, 0 items" className="size-8 text-header-foreground hover:bg-header-hover hover:text-gold sm:size-9"><ShoppingBag className="size-[18px] sm:size-5" /></Button><span className="text-xs">0</span>
        </div>
      </div>
    </header>
  );
}