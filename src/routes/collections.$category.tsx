import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/site/product-card";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import {
  categories,
  getCategory,
  products,
  type Product,
} from "@/data/catalogue";

export const Route = createFileRoute("/collections/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection unavailable | AVISHEKK NAIYA" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.plural} | AVISHEKK NAIYA`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.category.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.category.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CollectionPage,
});

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "bestselling", label: "Best Selling" },
] as const;

const colorHex: Record<string, string> = {
  ivory: "#f3ecdd",
  sage: "#9aa88f",
  maroon: "#6b1f2a",
  gold: "#c9a24b",
  crimson: "#a4133c",
  red: "#b91c1c",
  ruby: "#9b1c31",
  emerald: "#1f5c45",
  black: "#1c1917",
  navy: "#1e3a5f",
  pink: "#e7b6b6",
  beige: "#d9c9a8",
  cream: "#f5eeda",
  white: "#fafafa",
};

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function toggle(list: string[], item: string) {
  return list.includes(item) ? list.filter((v) => v !== item) : [...list, item];
}

function CollectionPage() {
  const { category } = Route.useLoaderData();
  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === category.slug),
    [category.slug],
  );

  const [tab, setTab] = useState(category.tabs[0]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [sizes, setSizes] = useState<string[]>([]);
  const [fabrics, setFabrics] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [crafts, setCrafts] = useState<string[]>([]);

  const prices = categoryProducts.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceCap, setPriceCap] = useState(maxPrice);

  const allSizes = useMemo(
    () =>
      unique(categoryProducts.flatMap((p) => p.size)).sort(
        (a, b) => ["XS", "S", "M", "L", "XL", "XXL"].indexOf(a) - ["XS", "S", "M", "L", "XL", "XXL"].indexOf(b),
      ),
    [categoryProducts],
  );
  const allFabrics = useMemo(() => unique(categoryProducts.map((p) => p.fabric)), [categoryProducts]);
  const allColors = useMemo(() => unique(categoryProducts.map((p) => p.color)), [categoryProducts]);
  const allOccasions = useMemo(() => unique(categoryProducts.map((p) => p.occasion)), [categoryProducts]);
  const allCrafts = useMemo(() => unique(categoryProducts.map((p) => p.craft)), [categoryProducts]);

  const countFor = (key: "size" | "fabric" | "color" | "occasion" | "craft", value: string) =>
    categoryProducts.filter((p) =>
      key === "size" ? p.size.includes(value) : p[key] === value,
    ).length;

  const hasFilters =
    sizes.length > 0 || fabrics.length > 0 || colors.length > 0 || occasions.length > 0 || crafts.length > 0 || priceCap < maxPrice;

  const clearAll = () => {
    setSizes([]);
    setFabrics([]);
    setColors([]);
    setOccasions([]);
    setCrafts([]);
    setPriceCap(maxPrice);
  };

  const visible = useMemo(() => {
    const isAllTab = tab === category.tabs[0];
    const list = categoryProducts.filter((product: Product) => {
      const matchesTab = isAllTab || product.tab === tab;
      const matchesSize = sizes.length === 0 || product.size.some((s) => sizes.includes(s));
      const matchesFabric = fabrics.length === 0 || fabrics.includes(product.fabric);
      const matchesColor = colors.length === 0 || colors.includes(product.color);
      const matchesOccasion = occasions.length === 0 || occasions.includes(product.occasion);
      const matchesCraft = crafts.length === 0 || crafts.includes(product.craft);
      const matchesPrice = product.price <= priceCap;
      const matchesQuery =
        query.trim() === "" ||
        `${product.name} ${product.description} ${product.fabric} ${product.color}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      return (
        matchesTab && matchesSize && matchesFabric && matchesColor &&
        matchesOccasion && matchesCraft && matchesPrice && matchesQuery
      );
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "bestselling") sorted.sort((a, b) => b.sales - a.sales);
    if (sort === "featured") sorted.sort((a, b) => a.featured - b.featured);
    return sorted;
  }, [categoryProducts, category.tabs, tab, sizes, fabrics, colors, occasions, crafts, priceCap, query, sort]);

  const filtersPanel = (
    <div className="divide-y divide-border">
      <FilterGroup title="Size">
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map((size) => (
            <CheckRow
              key={size}
              label={size}
              checked={sizes.includes(size)}
              onChange={() => setSizes((prev) => toggle(prev, size))}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={100}
          value={priceCap}
          onChange={(event) => setPriceCap(Number(event.target.value))}
          className="w-full accent-[#c9a24b]"
          aria-label="Maximum price"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          ₹{minPrice.toLocaleString("en-IN")} – ₹{priceCap.toLocaleString("en-IN")}
          {priceCap >= maxPrice ? "+" : ""}
        </p>
      </FilterGroup>

      <FilterGroup title="Fabric">
        {allFabrics.map((fabric) => (
          <CheckRow
            key={fabric}
            label={`${fabric} (${countFor("fabric", fabric)})`}
            checked={fabrics.includes(fabric)}
            onChange={() => setFabrics((prev) => toggle(prev, fabric))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2.5">
          {allColors.map((color) => {
            const active = colors.includes(color);
            return (
              <button
                key={color}
                type="button"
                title={color}
                aria-label={`Filter by colour ${color}`}
                aria-pressed={active}
                onClick={() => setColors((prev) => toggle(prev, color))}
                className={`size-7 rounded-full border transition ${
                  active
                    ? "border-gold ring-2 ring-gold/60 ring-offset-2 ring-offset-background"
                    : "border-border hover:border-foreground/40"
                }`}
                style={{ backgroundColor: colorHex[color.toLowerCase()] ?? "#ccc" }}
              />
            );
          })}
        </div>
        {colors.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">{colors.join(", ")}</p>
        )}
      </FilterGroup>

      <FilterGroup title="Occasion">
        {allOccasions.map((occasion) => (
          <CheckRow
            key={occasion}
            label={`${occasion} (${countFor("occasion", occasion)})`}
            checked={occasions.includes(occasion)}
            onChange={() => setOccasions((prev) => toggle(prev, occasion))}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Work / Craft">
        {allCrafts.map((craft) => (
          <CheckRow
            key={craft}
            label={`${craft} (${countFor("craft", craft)})`}
            checked={crafts.includes(craft)}
            onChange={() => setCrafts((prev) => toggle(prev, craft))}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-3 sm:pt-5 lg:px-14">
        <div className="mb-3 flex flex-col gap-3 sm:mb-5 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <nav aria-label="Breadcrumb" className="mb-0.5 flex items-center gap-2 text-[11px] text-muted-foreground sm:mb-2 sm:text-xs">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>›</span>
              <span>Collections</span>
              <span>›</span>
              <span>{category.audience}</span>
              <span>›</span>
              <span className="text-foreground">{category.plural}</span>
            </nav>
            <h1 className="font-display text-2xl leading-none sm:text-4xl lg:text-5xl">{category.plural}</h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-base">{category.description}</p>
          </div>
          <label className="flex h-9 w-full items-center gap-3 rounded-md border border-input bg-background px-3 text-muted-foreground sm:h-12 sm:px-4 lg:w-[330px]">
            <Search aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only">Search {category.plural}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${category.plural.toLowerCase()}...`}
              className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground sm:text-sm"
            />
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-border pb-3" role="tablist" aria-label={`${category.name} sub collections`}>
          {category.tabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] transition-colors sm:text-xs ${
                tab === item
                  ? "border-gold bg-accent text-accent-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileFiltersOpen((open) => !open)}
          className="mt-3 flex w-full items-center justify-between rounded-md border border-border bg-card px-4 py-2.5 text-xs font-medium lg:hidden"
          aria-expanded={mobileFiltersOpen}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="size-4" /> Filters
          </span>
          <ChevronDown className={`size-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
        </button>

        <div className="mt-4 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          <aside
            aria-label="Product filters"
            className={`${mobileFiltersOpen ? "block" : "hidden"} mb-6 rounded-md border border-border bg-card p-4 lg:mb-0 lg:block lg:self-start lg:border-0 lg:bg-transparent lg:p-0`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-sm tracking-[0.2em]">FILTERS</h2>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-gold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
            {filtersPanel}
          </aside>

          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="text-xs text-muted-foreground sm:text-sm">
                {visible.length} {visible.length === 1 ? "Product" : "Products"}
              </p>
              <div className="ml-auto flex items-center gap-3">
                <label className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
                  <span>Sort By :</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value as typeof sort)}
                    className="h-8 rounded-sm border border-input bg-background px-2 text-[11px] text-foreground outline-none sm:text-xs"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <div className="flex overflow-hidden rounded-sm border border-border">
                  <button
                    type="button"
                    aria-label="Grid view"
                    aria-pressed={view === "grid"}
                    onClick={() => setView("grid")}
                    className={`p-2 ${view === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <LayoutGrid className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="List view"
                    aria-pressed={view === "list"}
                    onClick={() => setView("list")}
                    className={`p-2 ${view === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <List className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {visible.length > 0 ? (
              <section
                aria-label={`${category.plural} products`}
                className={
                  view === "grid"
                    ? "grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-3 2xl:grid-cols-4"
                    : "grid grid-cols-1 gap-4"
                }
              >
                {visible.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </section>
            ) : (
              <p className="mt-10 text-center text-sm text-muted-foreground">
                No {category.plural.toLowerCase()} match these filters yet.
              </p>
            )}
          </div>
        </div>

        <section aria-label="Other collections" className="mt-12 border-t border-border pt-5">
          <h2 className="font-display text-xl sm:text-2xl">Explore other collections</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {categories
              .filter((item) => item.slug !== category.slug)
              .map((item) => (
                <Button key={item.slug} asChild variant="outline" size="sm" className="text-xs">
                  <Link to="/collections/$category" params={{ category: item.slug }}>{item.plural}</Link>
                </Button>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-foreground"
      >
        {title}
        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${open ? "" : "-rotate-90"}`} />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="size-3.5 shrink-0 accent-[#6b4a2f]"
      />
      {label}
    </label>
  );
}
