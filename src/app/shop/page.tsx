import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Wahi",
  description:
    "Explore our complete range of handcrafted Nikkah dupattas, bridal lehengas, and winter collection.",
};

interface ShopProduct {
  id: number;
  name: string;
  image: string;
  price: string;
  href: string;
}

interface CategorySection {
  title: string;
  id: string;
  products: ShopProduct[];
}

const NIKKAH_DUPATTAS: ShopProduct[] = [
  {
    id: 1,
    name: "Organza Fancy Cutwork Lace Dupatta",
    image: "/images/dupta_1/1.jpg",
    price: "Rs. 10,000",
    href: "/nikkah-dupatta/1",
  },
  {
    id: 2,
    name: "Luxury Kashees Lace Net Dupatta",
    image: "/images/dupta_2/1.jpg",
    price: "Rs. 5,500",
    href: "/nikkah-dupatta/2",
  },
  {
    id: 3,
    name: "Kundan Lace Duptta",
    image: "/images/dupta_3/1.jpg",
    price: "Rs. 10,000",
    href: "/nikkah-dupatta/3",
  },
  {
    id: 4,
    name: "Organza Fancy Cutwork Lace Dupatta",
    image: "/images/dupta_4/1.jpg",
    price: "Rs. 10,000",
    href: "/nikkah-dupatta/4",
  },
  {
    id: 5,
    name: "Kashees Kiran Lace Dupatta",
    image: "/images/dupta_5/1.jpg",
    price: "Rs. 9,999",
    href: "/nikkah-dupatta/5",
  },
  {
    id: 6,
    name: "Luxury Kashees Lace Net Dupatta",
    image: "/images/dupta_six/1.jpg",
    price: "Rs. 9,000",
    href: "/nikkah-dupatta/6",
  },
  {
    id: 7,
    name: "Barik Lace Net Dupatta",
    image: "/images/dupta_7/1.jpg",
    price: "Rs. 4,500",
    href: "/nikkah-dupatta/7",
  },
  {
    id: 8,
    name: "Heavy Cutwork Lace Net Dupatta",
    image: "/images/dupta_eight/1.jpg",
    price: "Rs. 25,000",
    href: "/nikkah-dupatta/8",
  },
  {
    id: 999,
    name: "Fancy Bunches Patch Work Dupatta",
    image: "/images/dupta_bunches/1.jpg",
    price: "Rs. 20,000",
    href: "/nikkah-dupatta/999",
  },
];

const BRIDAL_LEHENGAS: ShopProduct[] = [
  {
    id: 1,
    name: "Royal Contrast",
    image: "/images/lehnga_1/1.jpg",
    price: "Rs. 30,000",
    href: "/bridal-lehenga/1",
  },
  {
    id: 2,
    name: "Pearl Elegance",
    image: "/images/lehnga_2/1.jpg",
    price: "Rs. 30,000",
    href: "/bridal-lehenga/2",
  },
];

const WINTER_COLLECTION: ShopProduct[] = [
  {
    id: 1,
    name: "Midnight Pearl",
    image: "/images/dress/dress_1/drss_one/one.jpg",
    price: "Rs. 7,000",
    href: "/winter-collection/1",
  },
  {
    id: 2,
    name: "Midnight Bloom Lehenga",
    image: "/images/dress/dress_2/1.jpg",
    price: "Rs. 12,000",
    href: "/winter-collection/2",
  },
];

const CATEGORIES: CategorySection[] = [
  {
    title: "Nikkah Dupatta",
    id: "nikkah-dupatta",
    products: NIKKAH_DUPATTAS,
  },
  {
    title: "Bridal Lehenga",
    id: "bridal-lehenga",
    products: BRIDAL_LEHENGAS,
  },
  {
    title: "Winter Collection",
    id: "winter-collection",
    products: WINTER_COLLECTION,
  },
];

function ProductCard({ product }: { product: ShopProduct }) {
  return (
    <Link href={product.href} className="group block">
      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300">
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#E8C4C4]/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover scale-110 origin-center"
          />
        </div>
        <div className="p-4 md:p-5 flex flex-col gap-1.5">
          <h3 className="font-heading text-lg md:text-xl text-[#2B2320] group-hover:text-[#7A1F2B] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">
            {product.price}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">
            <h1 className="font-heading text-4xl md:text-6xl text-[#7A1F2B] mb-4">
              All Products
            </h1>
            <div className="h-px w-24 bg-[#C9A66B]" />
            <p className="font-body text-base md:text-lg text-[#2B2320]/70 mt-4 max-w-xl">
              Browse our complete collection of bespoke Nikkah dupattas, bridal lehengas, and seasonal designs.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-20">
            {CATEGORIES.map((category) => (
              <div key={category.id} id={category.id} className="scroll-mt-24">
                <div className="flex flex-col items-start mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl text-[#7A1F2B] mb-2">
                    {category.title}
                  </h2>
                  <div className="h-px w-16 bg-[#C9A66B]" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                  {category.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
