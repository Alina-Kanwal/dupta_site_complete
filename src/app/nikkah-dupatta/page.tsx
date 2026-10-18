import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nikkah Dupatta Collection — Wahi",
  description:
    "Browse our full collection of customizable Nikkah dupattas. Handcrafted, bespoke dupattas for your most cherished moments.",
};

interface NikkahDupattaCard {
  id: number;
  name: string;
  image: string;
  price: number;
  href: string;
}

const NIKKAH_DUPATTA_CARDS: NikkahDupattaCard[] = [
  {
    id: 1,
    name: "Organza Fancy Cutwork Lace Dupatta",
    image: "/images/dupta_1/1.jpg",
    price: 10000,
    href: "/nikkah-dupatta/1",
  },
  {
    id: 2,
    name: "Luxury Kashees Lace Net Dupatta",
    image: "/images/dupta_2/1.jpg",
    price: 5500,
    href: "/nikkah-dupatta/2",
  },
  {
    id: 3,
    name: "Kundan Lace Duptta",
    image: "/images/dupta_3/1.jpg",
    price: 10000,
    href: "/nikkah-dupatta/3",
  },
  {
    id: 4,
    name: "Organza Fancy Cutwork Lace Dupatta",
    image: "/images/dupta_4/1.jpg",
    price: 10000,
    href: "/nikkah-dupatta/4",
  },
  {
    id: 5,
    name: "Kashees Kiran Lace Dupatta",
    image: "/images/dupta_5/1.jpg",
    price: 9999,
    href: "/nikkah-dupatta/5",
  },
  {
    id: 6,
    name: "Luxury Kashees Lace Net Dupatta",
    image: "/images/dupta_six/1.jpg",
    price: 9000,
    href: "/nikkah-dupatta/6",
  },
  {
    id: 7,
    name: "Barik Lace Net Dupatta",
    image: "/images/dupta_7/1.jpg",
    price: 4500,
    href: "/nikkah-dupatta/7",
  },
  {
    id: 8,
    name: "Heavy Cutwork Lace Net Dupatta",
    image: "/images/dupta_eight/1.jpg",
    price: 25000,
    href: "/nikkah-dupatta/8",
  },
  {
    id: 999,
    name: "Fancy Bunches Patch Work Dupatta",
    image: "/images/dupta_bunches/1.jpg",
    price: 20000,
    href: "/nikkah-dupatta/999",
  },
];

export default function NikkahDupattaCollectionPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
            <h1 className="font-heading text-4xl md:text-5xl text-[#7A1F2B] mb-4">
              Nikkah Dupatta Collection
            </h1>
            <div className="h-px w-24 bg-[#C9A66B]" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {NIKKAH_DUPATTA_CARDS.map((card) => (
              <Link key={card.id} href={card.href} className="group block">
                <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300">
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#E8C4C4]/20">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover scale-110 origin-center"
                    />
                  </div>
                  <div className="p-4 md:p-5 flex flex-col gap-1.5">
                    <h3 className="font-heading text-lg md:text-xl text-[#2B2320] group-hover:text-[#7A1F2B] transition-colors line-clamp-1">
                      {card.name}
                    </h3>
                    <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">
                      Rs. {card.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
