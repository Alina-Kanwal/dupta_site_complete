"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Truck, Scissors, Sparkles, Medal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { products } from "@/lib/products";


const FEATURES = [
  { icon: Scissors, title: "Fully Customizable", desc: "Choose your fabric, border, and intricate details." },
  { icon: Sparkles, title: "Premium Fabric", desc: "Only the finest organza, net, and silk." },
  { icon: Medal, title: "Handcrafted Work", desc: "Exquisite sitara and zardozi by expert artisans." },
  { icon: Truck, title: "Nationwide Delivery", desc: "Safe and secure shipping across Pakistan." },
];

const TESTIMONIALS = [
  { id: 1, name: "Fatima A.", review: "My customized dupatta was exactly how I envisioned it. The gold work was stunning and it made my Nikkah day perfect!", rating: 5 },
  { id: 2, name: "Zainab S.", review: "Incredible quality and attention to detail. The team at Wahi was so helpful in guiding my customization choices.", rating: 5 },
  { id: 3, name: "Sara M.", review: "The fabric felt so premium and the delivery was right on time. Highly recommended for every bride to be.", rating: 5 },
];

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSlideshow() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Image at natural size — no cropping */}
      <div className="relative w-full">
        <div className="relative w-full opacity-100">
          <Image
            src="/images/home_imgs/2.jpeg"
            alt="Hero image"
            width={1070}
            height={669}
            className="w-full h-auto block"
            priority={true}
            sizes="100vw"
          />
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#2B2320]/40 via-[#2B2320]/50 to-[#2B2320]/80" />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-[#FAF6F1] leading-none drop-shadow-lg">Wahi</h1>
          <p className="font-body text-lg md:text-xl text-[#FAF6F1]/90 max-w-2xl leading-relaxed drop-shadow-md font-light">
            Customize your Nikkah dupatta and make your wedding day special
          </p>
          <div className="pt-4">
            <Link href="/shop">
              <Button size="lg" className="bg-[#C9A66B] text-[#2B2320] hover:bg-[#D9BC8F] font-body font-semibold rounded-xl px-10 h-14 text-lg transition-all duration-300 shadow-[0_4px_14px_rgba(201,166,107,0.4)] hover:shadow-[0_6px_20px_rgba(201,166,107,0.6)] hover:-translate-y-0.5">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Carousel ───────────────────────────────────────────────────
function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const SLIDES = [
    ...TESTIMONIALS,
    ...TESTIMONIALS,
    ...TESTIMONIALS,
    ...TESTIMONIALS,
  ];

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleTransitionEnd = () => {
    if (currentIndex >= 6 || currentIndex < 3) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => 3 + (((prev % 3) + 3) % 3));
    }
  };

  useEffect(() => {
    if (currentIndex >= 6 || currentIndex < 3) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prev) =>
          prev >= 6 || prev < 3 ? 3 + (((prev % 3) + 3) % 3) : prev
        );
      }, 1700);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    } else if (diff < -50) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
    touchStartX.current = null;
  };

  const stepPercent = 100 / visibleCount;
  const translatePercent = currentIndex * stepPercent;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden -mx-3 md:-mx-4 py-4">
        <div
          className="flex items-stretch"
          style={{
            transform: `translateX(-${translatePercent}%)`,
            transition: isTransitioning
              ? "transform 1600ms cubic-bezier(0.25, 1, 0.5, 1)"
              : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {SLIDES.map((testimonial, idx) => (
            <div
              key={`${testimonial.id}-${idx}`}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 md:px-4 flex flex-col"
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#E8D9D3]/50 flex flex-col h-full">
                <div className="flex gap-1.5 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A66B] text-[#C9A66B]" />
                  ))}
                </div>
                <p className="font-body text-[#2B2320]/80 leading-relaxed italic mb-10 flex-grow text-[15px]">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[#E8D9D3]/40">
                  <div className="w-12 h-12 rounded-full bg-[#7A1F2B] text-[#FAF6F1] flex items-center justify-center font-heading text-xl shadow-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="font-heading text-lg text-[#2B2320] leading-none mb-1">{testimonial.name}</h4>
                    <span className="font-body text-[11px] uppercase tracking-wider text-[#C9A66B] font-semibold">Verified Bride</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle indicator dots */}
      <div className="flex justify-center items-center gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => {
          const active = (((currentIndex % 3) + 3) % 3) === i;
          return (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(3 + i);
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active ? "bg-[#C9A66B] w-6" : "bg-[#2B2320]/20 hover:bg-[#2B2320]/40 w-2"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSlideshow />


      {/* 2. Featured/New Arrivals Section */}
      <section className="py-20 md:py-32 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-[#7A1F2B] mb-4">New Arrivals</h2>
            <div className="h-px w-24 bg-[#C9A66B]" />
          </div>

          <div className="relative group/arrows">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md opacity-100 group-hover/arrows:opacity-100 transition-opacity duration-300 hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.products-row');
                if (container) container.scrollTo({ left: container.scrollLeft - container.clientWidth / 1.5, behavior: 'smooth' });
              }}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-[#7A1F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="products-row flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto hide-scrollbar">
              {/* Card 1: product id 1 */}
              {(() => {
                const product = products.find((p) => p.id === 1);
                if (!product) return null;
                return (
                  <div key={1} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/1" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Card 2: product id 2 */}
              {(() => {
                const product = products.find((p) => p.id === 2);
                if (!product) return null;
                return (
                  <div key={2} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/2" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Card 3: product id 3 */}
              {(() => {
                const product = products.find((p) => p.id === 3);
                if (!product) return null;
                return (
                  <div key={3} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/3" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Card 4: product id 999 */}
              {(() => {
                const product = products.find((p) => p.id === 999);
                if (!product) return null;
                return (
                  <div key={999} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/999" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Previous Card 4: product id 4 */}
              {(() => {
                const product = products.find((p) => p.id === 4);
                if (!product) return null;
                return (
                  <div key={4} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/4" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Previous Card 5: product id 5 */}
              {(() => {
                const product = products.find((p) => p.id === 5);
                if (!product) return null;
                return (
                  <div key={5} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/5" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Card 6: product id 6 */}
              {(() => {
                const product = products.find((p) => p.id === 6);
                if (!product) return null;
                return (
                  <div key={6} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/6" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Card 7: product id 7 */}
              {(() => {
                const product = products.find((p) => p.id === 7);
                if (!product) return null;
                return (
                  <div key={7} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/7" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
              {/* Card 8: product id 8 */}
              {(() => {
                const product = products.find((p) => p.id === 8);
                if (!product) return null;
                return (
                  <div key={8} className="flex-shrink-0">
                    <Link href="/nikkah-dupatta/8" className="group block">
                      <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
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
                          <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. {product.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })()}
            </div>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md opacity-100 group-hover/arrows:opacity-100 transition-opacity duration-300 hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.products-row');
                if (container) container.scrollTo({ left: container.scrollLeft + container.clientWidth / 1.5, behavior: 'smooth' });
              }}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-[#7A1F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Bride Lehnga Section */}
      <section className="-mt-16 pt-0 pb-20 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-[#7A1F2B] mb-4">Bride Lehnga</h2>
            <div className="h-px w-24 bg-[#C9A66B]" />
          </div>

          <div className="relative group/arrows">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md opacity-100 group-hover/arrows:opacity-100 transition-opacity duration-300 hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.lehenga-row');
                if (container) container.scrollTo({ left: container.scrollLeft - container.clientWidth / 1.5, behavior: 'smooth' });
              }}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-[#7A1F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="lehenga-row flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto hide-scrollbar">
              {/* Lehenga Card 1 */}
              <div className="flex-shrink-0">
                <Link href="/bridal-lehenga/1" className="group block">
                  <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#E8C4C4]/20">
                      <Image
                        src="/images/lehnga_1/1.jpg"
                        alt="Royal Contrast"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-5 flex flex-col gap-1.5">
                      <h3 className="font-heading text-lg md:text-xl text-[#2B2320] group-hover:text-[#7A1F2B] transition-colors line-clamp-1">Royal Contrast</h3>
                      <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">Rs. 30,000</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Lehenga Card 2 */}
              <div className="flex-shrink-0">
                <Link href="/bridal-lehenga/2" className="group block">
                  <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#E8C4C4]/20">
                      <Image
                        src="/images/lehnga_2/1.jpg"
                        alt="Pearl Elegance"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-5 flex flex-col gap-1.5">
                      <h3 className="font-heading text-lg md:text-xl text-[#2B2320] group-hover:text-[#7A1F2B] transition-colors line-clamp-1">Pearl Elegance</h3>
                      <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">30,000</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md opacity-100 group-hover/arrows:opacity-100 transition-opacity duration-300 hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.lehenga-row');
                if (container) container.scrollTo({ left: container.scrollLeft + container.clientWidth / 1.5, behavior: 'smooth' });
              }}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-[#7A1F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>


      {/* Winter Collection Section */}
      <section className="-mt-12 pt-0 pb-20 bg-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8 text-center">
            <h2 className="font-heading text-4xl md:text-5xl text-[#7A1F2B] mb-4">Dress Collection</h2>
            <div className="h-px w-24 bg-[#C9A66B]" />
          </div>

          <div className="relative group/arrows">
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md opacity-100 group-hover/arrows:opacity-100 transition-opacity duration-300 hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.winter-row');
                if (container) container.scrollTo({ left: container.scrollLeft - container.clientWidth / 1.5, behavior: 'smooth' });
              }}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-[#7A1F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="winter-row flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto hide-scrollbar">
              {/* Winter Card 1 */}
              <div className="flex-shrink-0">
                <Link href="/winter-collection/1" className="group block">
                  <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#E8C4C4]/20">
                      <Image
                        src="/images/dress/dress_1/drss_one/one.jpg"
                        alt="Midnight Pearl"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-5 flex flex-col gap-1.5">
                      <h3 className="font-heading text-lg md:text-xl text-[#2B2320] group-hover:text-[#7A1F2B] transition-colors line-clamp-1">Midnight Pearl</h3>
                      <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">7,000</p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Winter Card 2 */}
              <div className="flex-shrink-0">
                <Link href="/winter-collection/2" className="group block">
                  <div className="relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(43,35,32,0.05)] hover:shadow-[0_10px_30px_rgba(122,31,43,0.1)] transition-all duration-300 w-[280px]">
                    <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#E8C4C4]/20">
                      <Image
                        src="/images/dress/dress_2/1.jpg"
                        alt="Midnight Bloom Lehenga"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:p-5 flex flex-col gap-1.5">
                      <h3 className="font-heading text-lg md:text-xl text-[#2B2320] group-hover:text-[#7A1F2B] transition-colors line-clamp-1">Midnight Bloom Lehenga</h3>
                      <p className="font-body text-sm md:text-base text-[#C9A66B] font-semibold">13,000</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 rounded-full p-2 shadow-md opacity-100 group-hover/arrows:opacity-100 transition-opacity duration-300 hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.winter-row');
                if (container) container.scrollTo({ left: container.scrollLeft + container.clientWidth / 1.5, behavior: 'smooth' });
              }}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-[#7A1F2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>


      {/* Why Choose Wahi Section */}
      <section className="py-20 bg-[#7A1F2B] text-[#FAF6F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#FAF6F1]/10 flex items-center justify-center mb-2 shadow-inner">
                    <Icon className="w-8 h-8 text-[#C9A66B]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading text-2xl text-[#C9A66B] leading-tight">{feature.title}</h3>
                  <p className="font-body text-[#FAF6F1]/80 leading-relaxed max-w-[16rem]">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="py-20 md:py-32 bg-[#E8C4C4]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-body text-sm text-[#C9A66B] uppercase tracking-widest font-medium mb-3">Customer Stories</span>
            <h2 className="font-heading text-4xl md:text-5xl text-[#2B2320] mb-4">What Our Brides Say</h2>
            <div className="h-px w-24 bg-[#C9A66B]" />
          </div>

          {/* Smooth auto-moving horizontal carousel */}
          <TestimonialsCarousel />
        </div>
      </section>

      {/* 5. Newsletter Signup Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E8C4C4] to-transparent opacity-50" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="font-heading text-4xl md:text-5xl text-[#7A1F2B] mb-5">Stay Updated</h2>
          <p className="font-body text-base md:text-lg text-[#2B2320]/70 mb-10 max-w-md mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive offers, new arrivals, and bridal inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              aria-label="Email address for newsletter"
              className="flex-1 px-5 py-4 rounded-xl border border-[#E8D9D3] bg-[#FAF6F1]/50 font-body text-sm text-[#2B2320] focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B] transition-all shadow-inner"
            />
            <Button type="button" className="bg-[#2B2320] text-[#FAF6F1] hover:bg-[#2B2320]/90 h-[54px] px-8 rounded-xl font-body font-semibold shadow-md shrink-0 transition-transform active:scale-95">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}