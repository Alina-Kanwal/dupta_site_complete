import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/nikkah-dupatta/${product.id}`} className="group block">
      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300">
        {product.images[0] && (
          <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#E8C4C4]/20">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4 md:p-5 flex flex-col gap-1.5">
          <h3 className="font-heading text-lg md:text-xl text-[#2B2320] group-hover:text-[#7A1F2B] transition-colors line-clamp-1">{product.name}</h3>
          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">
            Rs. {product.price.toLocaleString()}
          </p>
        </div>
      </div>
    </Link>
  );
}
