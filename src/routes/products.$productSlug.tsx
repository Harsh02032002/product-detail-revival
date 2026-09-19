import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { ProductCard } from "@/components/site/product-card";
import { SiteHeader } from "@/components/site/site-header";
import { Button } from "@/components/ui/button";
import { formatPrice, getCategory, getProduct, products } from "@/data/catalogue";

export const Route = createFileRoute("/products/$productSlug")({
  loader: ({ params }) => {
    const product = getProduct(params.productSlug);
    if (!product) throw notFound();
    const category = getCategory(product.category)!;
    return { product, category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | AVISHEKK NAIYA" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.product.name} | AVISHEKK NAIYA`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.product.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.product.description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product, category } = Route.useLoaderData();
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);
  const related = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-3 sm:pt-5 lg:px-14">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>›</span>
          <Link to="/collections/$category" params={{ category: category.slug }} className="hover:text-foreground">
            {category.plural}
          </Link>
          <span>›</span>
          <span>{product.name}</span>
        </nav>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-10">
          <div className="overflow-hidden rounded-md border border-border bg-image-surface">
            <img
              src={product.image}
              alt={product.name}
              width={1024}
              height={1280}
              className="aspect-[4/5] h-full w-full object-contain"
            />
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.14em] text-collection-link">AVISHEKK NAIYA</p>
            <h1 className="mt-1 font-display text-2xl leading-tight sm:text-4xl">{product.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>

            <div className="mt-4 flex flex-wrap items-baseline gap-2 text-sm">
              <strong className="text-lg">{formatPrice(product.price)}</strong>
              <del className="text-muted-foreground">{formatPrice(product.originalPrice)}</del>
              <span className="text-sale">({discount}% OFF)</span>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3 text-xs sm:max-w-md sm:text-sm">
              <Detail label="Fabric" value={product.fabric} />
              <Detail label="Colour" value={product.color} />
              <Detail label="Occasion" value={product.occasion} />
              <Detail label="Craft" value={product.craft} />
              <Detail label="Sizes" value={product.size.join(", ")} />
              <Detail label="Availability" value={product.available ? "In stock" : "Made to order"} />
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button size="lg">Add to Bag</Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/collections/$category" params={{ category: category.slug }}>
                  Back to {category.plural}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-label={`More ${category.plural}`} className="mt-12 border-t border-border pt-5">
            <h2 className="font-display text-xl sm:text-2xl">More {category.plural}</h2>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
      <dd className="mt-0.5">{value}</dd>
    </div>
  );
}
