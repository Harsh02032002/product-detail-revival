import angavastramImage from "@/assets/catalogue-angavastram.jpg";
import blouseImage from "@/assets/catalogue-blouse.jpg";
import dhotiImage from "@/assets/catalogue-dhoti.jpg";
import jutiImage from "@/assets/catalogue-juti.jpg";
import kurtaImage from "@/assets/catalogue-kurta.jpg";
import sareeImage from "@/assets/catalogue-saree.jpg";
import sherwaniImage from "@/assets/catalogue-sherwani.jpg";
import veilImage from "@/assets/catalogue-veil.jpg";

export const categorySlugs = ["kurta", "dhoti", "saree", "blouse", "sherwani", "veil", "juti", "angavastram"] as const;
export type CategorySlug = (typeof categorySlugs)[number];

export type Category = {
  slug: CategorySlug;
  name: string;
  plural: string;
  audience: "Men" | "Women";
  image: string;
  alt: string;
  description: string;
  tabs: string[];
};

export type Product = {
  slug: string;
  category: CategorySlug;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  badge: "New" | "Bestseller";
  size: string[];
  fabric: string;
  color: string;
  occasion: string;
  craft: string;
  available: boolean;
  tab: string;
  featured: number;
  sales: number;
};

export const categories: Category[] = [
  { slug: "kurta", name: "Kurta", plural: "Kurtas", audience: "Men", image: kurtaImage, alt: "Full-length ivory embroidered kurta outfit", description: "Explore our handcrafted kurta collection, created with premium fabrics and timeless Indian craftsmanship.", tabs: ["All Kurtas", "Classic Kurtas", "Silk Kurtas", "Cotton Kurtas", "Embroidered Kurtas", "Festive Kurtas", "Wedding Kurtas", "Designer Kurtas"] },
  { slug: "dhoti", name: "Dhoti", plural: "Dhotis", audience: "Men", image: dhotiImage, alt: "Complete ivory dhoti and angavastram styling", description: "Discover refined dhotis shaped by traditional drape, considered details, and fine natural fabrics.", tabs: ["All Dhotis", "Classic Dhotis", "Silk Dhotis", "Festive Dhotis", "Wedding Dhotis"] },
  { slug: "saree", name: "Saree", plural: "Sarees", audience: "Women", image: sareeImage, alt: "Full-length crimson Banarasi saree drape", description: "Explore heirloom sarees woven for celebrations, ceremonies, and moments that become memories.", tabs: ["All Sarees", "Banarasi Sarees", "Silk Sarees", "Embroidered Sarees", "Festive Sarees", "Wedding Sarees"] },
  { slug: "blouse", name: "Blouse", plural: "Blouses", audience: "Women", image: blouseImage, alt: "Complete embroidered crimson blouse on a mannequin", description: "Discover statement blouses finished with sculpted tailoring, intricate embroidery, and artisanal detail.", tabs: ["All Blouses", "Classic Blouses", "Silk Blouses", "Embroidered Blouses", "Designer Blouses"] },
  { slug: "sherwani", name: "Sherwani", plural: "Sherwanis", audience: "Men", image: sherwaniImage, alt: "Full-length ivory sherwani outfit", description: "Explore ceremonial sherwanis distinguished by regal proportion, rich textiles, and master craftsmanship.", tabs: ["All Sherwanis", "Classic Sherwanis", "Silk Sherwanis", "Embroidered Sherwanis", "Wedding Sherwanis"] },
  { slug: "veil", name: "Veil", plural: "Veils", audience: "Women", image: veilImage, alt: "Complete crimson bridal veil with embroidered border", description: "Discover graceful veils framed by ornate borders, delicate handwork, and a sense of occasion.", tabs: ["All Veils", "Bridal Veils", "Embroidered Veils", "Silk Veils", "Designer Veils"] },
  { slug: "juti", name: "Juti", plural: "Jutis", audience: "Women", image: jutiImage, alt: "Complete pair of embroidered ivory juttis", description: "Explore handcrafted jutis where comfort meets ornate embroidery and timeless Indian artistry.", tabs: ["All Jutis", "Classic Jutis", "Embroidered Jutis", "Festive Jutis", "Wedding Jutis"] },
  { slug: "angavastram", name: "Angavastram", plural: "Angavastram", audience: "Men", image: angavastramImage, alt: "Full-length ivory silk angavastram with gold border", description: "Discover ceremonial angavastram woven in luminous silks and finished with dignified heritage borders.", tabs: ["All Angavastram", "Silk Angavastram", "Festive Angavastram", "Wedding Angavastram", "Handwoven Angavastram"] },
];

const variants: Record<CategorySlug, Array<[string, string, number, number, Product["badge"], string, string, string, string, string]>> = {
  kurta: [
    ["Royal Heritage Kurta", "Handwoven silk kurta with intricate embroidery", 4999, 6999, "Bestseller", "Silk", "Ivory", "Wedding", "Zari", "Classic Kurtas"],
    ["Emerald Classic Kurta", "Premium silk blend with subtle zari work", 5499, 7499, "New", "Silk", "Sage", "Festive", "Zari", "Silk Kurtas"],
    ["Chanderi Elegance Kurta", "Pure chanderi with traditional weave", 3999, 5499, "New", "Chanderi", "Ivory", "Formal", "Handwoven", "Designer Kurtas"],
    ["Regal Maroon Kurta", "Rich fabric with detailed handwork", 5999, 8499, "Bestseller", "Velvet", "Maroon", "Wedding", "Embroidery", "Wedding Kurtas"],
  ],
  dhoti: [
    ["Temple Border Dhoti", "Silk dhoti with a stately woven gold border", 3499, 4999, "Bestseller", "Silk", "Ivory", "Wedding", "Handwoven", "Silk Dhotis"],
    ["Heritage Cotton Dhoti", "Breathable cotton finished with a fine border", 2499, 3499, "New", "Cotton", "Ivory", "Formal", "Handwoven", "Classic Dhotis"],
    ["Ceremonial Gold Dhoti", "Lustrous festive drape for sacred occasions", 4499, 6499, "New", "Silk", "Gold", "Festive", "Zari", "Festive Dhotis"],
    ["Ivory Wedding Dhoti", "Traditional drape with refined zari detailing", 4999, 6999, "Bestseller", "Chanderi", "Ivory", "Wedding", "Zari", "Wedding Dhotis"],
  ],
  saree: [
    ["Crimson Banarasi Saree", "Rich silk drape with handwoven zari motifs", 12999, 16999, "Bestseller", "Silk", "Crimson", "Wedding", "Zari", "Banarasi Sarees"],
    ["Royal Vermilion Saree", "Ceremonial silk with an ornate heritage border", 14999, 19999, "New", "Silk", "Red", "Wedding", "Handwoven", "Wedding Sarees"],
    ["Festive Ruby Saree", "Light-catching weave for joyful celebrations", 9999, 13999, "New", "Chanderi", "Ruby", "Festive", "Zari", "Festive Sarees"],
    ["Heirloom Bridal Saree", "Statement drape enriched with artisanal detail", 18999, 24999, "Bestseller", "Silk", "Maroon", "Wedding", "Embroidery", "Embroidered Sarees"],
  ],
  blouse: [
    ["Crimson Heritage Blouse", "Sculpted silk blouse with detailed embroidery", 3999, 5499, "Bestseller", "Silk", "Crimson", "Wedding", "Embroidery", "Embroidered Blouses"],
    ["Ruby Classic Blouse", "Timeless neckline with a refined tailored fit", 2999, 4499, "New", "Cotton", "Ruby", "Formal", "Handwoven", "Classic Blouses"],
    ["Maroon Zari Blouse", "Lustrous festive blouse with delicate zari work", 4499, 5999, "New", "Silk", "Maroon", "Festive", "Zari", "Silk Blouses"],
    ["Bridal Atelier Blouse", "Ornate craftsmanship for ceremonial dressing", 5999, 7999, "Bestseller", "Velvet", "Red", "Wedding", "Embroidery", "Designer Blouses"],
  ],
  sherwani: [
    ["Ivory Maharaja Sherwani", "Regal silhouette with intricate tonal embroidery", 18999, 24999, "Bestseller", "Silk", "Ivory", "Wedding", "Embroidery", "Wedding Sherwanis"],
    ["Pearl Classic Sherwani", "Elegant ceremonial tailoring in luminous silk", 15999, 21999, "New", "Silk", "Ivory", "Formal", "Zari", "Classic Sherwanis"],
    ["Heritage Zari Sherwani", "Traditional handwork framed by a stately collar", 21999, 28999, "New", "Velvet", "Gold", "Wedding", "Zari", "Embroidered Sherwanis"],
    ["Royal Wedding Sherwani", "Statement occasionwear crafted for the groom", 24999, 32999, "Bestseller", "Silk", "Ivory", "Wedding", "Handwoven", "Silk Sherwanis"],
  ],
  veil: [
    ["Crimson Bridal Veil", "Expansive bridal veil with an ornate border", 8999, 11999, "Bestseller", "Silk", "Crimson", "Wedding", "Embroidery", "Bridal Veils"],
    ["Ruby Zari Veil", "Sheer festive veil edged with luminous zari", 6999, 9499, "New", "Chanderi", "Ruby", "Festive", "Zari", "Embroidered Veils"],
    ["Heritage Maroon Veil", "Traditional drape with intricate hand-finished detail", 7999, 10999, "New", "Silk", "Maroon", "Wedding", "Handwoven", "Silk Veils"],
    ["Atelier Ceremony Veil", "An heirloom layer created for a grand entrance", 10999, 14999, "Bestseller", "Velvet", "Red", "Wedding", "Embroidery", "Designer Veils"],
  ],
  juti: [
    ["Ivory Zari Juti", "Handcrafted pair with delicate gold embroidery", 2999, 3999, "Bestseller", "Silk", "Ivory", "Wedding", "Zari", "Wedding Jutis"],
    ["Pearl Heritage Juti", "Classic occasion footwear with cushioned comfort", 2499, 3499, "New", "Cotton", "Ivory", "Festive", "Handwoven", "Classic Jutis"],
    ["Royal Embroidered Juti", "Ornate pair finished by skilled artisans", 3499, 4999, "New", "Velvet", "Gold", "Wedding", "Embroidery", "Embroidered Jutis"],
    ["Celebration Gold Juti", "Luminous finishing for festive ensembles", 3299, 4499, "Bestseller", "Silk", "Gold", "Festive", "Zari", "Festive Jutis"],
  ],
  angavastram: [
    ["Ivory Temple Angavastram", "Handwoven silk textile with a gold border", 4499, 5999, "Bestseller", "Silk", "Ivory", "Wedding", "Handwoven", "Silk Angavastram"],
    ["Ceremonial Zari Angavastram", "Traditional drape framed in luminous zari", 4999, 6999, "New", "Silk", "Gold", "Festive", "Zari", "Festive Angavastram"],
    ["Heritage Cotton Angavastram", "Breathable ceremonial textile with fine edging", 2999, 4199, "New", "Cotton", "Ivory", "Formal", "Handwoven", "Handwoven Angavastram"],
    ["Wedding Silk Angavastram", "A distinguished finishing layer for the groom", 5999, 7999, "Bestseller", "Chanderi", "Ivory", "Wedding", "Zari", "Wedding Angavastram"],
  ],
};

export const products: Product[] = categories.flatMap((category, categoryIndex) =>
  variants[category.slug].map(([name, description, price, originalPrice, badge, fabric, color, occasion, craft, tab], index) => ({
    slug: `${category.slug}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    category: category.slug,
    name,
    description,
    image: category.image,
    price,
    originalPrice,
    badge,
    size: category.slug === "juti" ? ["6", "7", "8", "9"] : ["S", "M", "L", "XL"],
    fabric,
    color,
    occasion,
    craft,
    available: index !== 2,
    tab,
    featured: categoryIndex * 10 + index,
    sales: 100 - index * 9 + categoryIndex,
  })),
);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}