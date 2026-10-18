"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const LEHENGA = {
  name: "Pearl Elegance",
  colors: ["Ivory", "Red", "Maroon", "Pink", "Peach", "Golden", "Off-White", "White", "Orange"],
  choli: "Chiffon with Pearl Lace and Stonework",
  lehenga: "Chiffon with Full Flare and Bottom Frill",
  dupatta: "Net with Fancy Lace & Kashees Lace Borders",
  images: [
    "/images/lehnga_2/1.jpg",
    "/images/lehnga_2/2.jpg",
    "/images/lehnga_2/3.jpg",
    "/images/lehnga_2/4.jpg",
    "/images/lehnga_2/5.jpg",
    "/images/lehnga_2/6.jpg",
    "/images/lehnga_2/7.jpg",
    "/images/lehnga_2/8.jpg",
    "/images/lehnga_2/9.jpg",
    "/images/lehnga_2/10.jpg",
  ],
};

const SIZES = ["Small", "Medium", "Large", "Custom Size"] as const;
type Size = typeof SIZES[number];

const MEASUREMENTS = [
  { id: "neck", label: "Neck", required: true, placeholder: "e.g. 14 inches" },
  { id: "chest", label: "Chest", required: false, placeholder: "e.g. 36 inches" },
  { id: "waist", label: "Waist", required: false, placeholder: "e.g. 30 inches" },
  { id: "hips", label: "Hips", required: false, placeholder: "e.g. 40 inches" },
  { id: "length", label: "Shirt Length", required: false, placeholder: "e.g. 42 inches" },
  { id: "sleeves", label: "Sleeves", required: false, placeholder: "e.g. 24 inches" },
];

export default function LehngaTwoDetailPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [attempted, setAttempted] = useState(false);

  const isCustom = selectedSize === "Custom Size";
  const neckMissing = isCustom && !measurements["neck"]?.trim();

  const handleEnquire = () => {
    setAttempted(true);
    if (isCustom && neckMissing) return;
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-[#2B2320]/60 hover:text-[#7A1F2B]">Home</Link>
          <span className="mx-2 text-[#2B2320]/40">/</span>
          <span className="text-[#2B2320] font-medium">{LEHENGA.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* ── Gallery ── */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 self-start flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#E8C4C4]/20 shadow-sm">
              {LEHENGA.images[activeIndex] && (
                <Image
                  src={LEHENGA.images[activeIndex]}
                  alt={`${LEHENGA.name} view ${activeIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {LEHENGA.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    activeIndex === i
                      ? "border-[#7A1F2B] shadow-[0_0_0_2px_rgba(122,31,43,0.15)]"
                      : "border-[#E8D9D3] hover:border-[#C9A66B]"
                  }`}
                >
                  <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Details ── */}
          <div className="w-full lg:w-1/2 space-y-7">

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl text-[#7A1F2B] leading-tight">{LEHENGA.name}</h1>

            {/* Product Info */}
            <div className="space-y-3 border-t border-[#E8D9D3] pt-5">
              <InfoRow label="Choli"    value={LEHENGA.choli} />
              <InfoRow label="Lehenga" value={LEHENGA.lehenga} />
              <InfoRow label="Dupatta"  value={LEHENGA.dupatta} />
            </div>


            {/* Size Selector */}
            <div className="space-y-3">
              <p className="font-body text-sm font-semibold text-[#2B2320] uppercase tracking-wider">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setAttempted(false); }}
                    className={`px-5 py-2.5 rounded-xl border-2 font-body text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? "border-[#7A1F2B] bg-[#7A1F2B] text-white"
                        : "border-[#E8D9D3] bg-white text-[#2B2320] hover:border-[#C9A66B]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Size Measurements */}
            {isCustom && (
              <div className="rounded-2xl border border-[#E8D9D3] bg-white p-5 space-y-4">
                <p className="font-body text-sm font-semibold text-[#2B2320]">Enter Your Measurements <span className="text-[#C9A66B] font-normal">(inches)</span></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MEASUREMENTS.map((m) => (
                    <div key={m.id} className="space-y-1">
                      <label className="font-body text-xs font-medium text-[#2B2320]/70 uppercase tracking-wider flex items-center gap-1">
                        {m.label}
                        {m.required && <span className="text-[#7A1F2B]">*</span>}
                      </label>
                      <input
                        type="text"
                        value={measurements[m.id] ?? ""}
                        onChange={(e) => setMeasurements((prev) => ({ ...prev, [m.id]: e.target.value }))}
                        placeholder={m.placeholder}
                        className={`w-full px-3 py-2.5 rounded-xl border font-body text-sm text-[#2B2320] placeholder:text-[#2B2320]/30 focus:outline-none transition-all duration-200 ${
                          m.required && attempted && !measurements[m.id]?.trim()
                            ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-300"
                            : "border-[#E8D9D3] focus:border-[#7A1F2B] focus:ring-1 focus:ring-[#7A1F2B]/20"
                        }`}
                      />
                      {m.required && attempted && !measurements[m.id]?.trim() && (
                        <p className="font-body text-xs text-red-500">Neck measurement is required</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between px-1 pt-1">
              <span className="font-body text-sm text-[#2B2320]/60">Price</span>
              <span className="font-heading text-2xl text-[#C9A66B]">Rs. 30,000</span>
            </div>

            {/* CTA */}
            <Button
              type="button"
              onClick={handleEnquire}
              className="w-full bg-[#7A1F2B] text-[#FAF6F1] hover:bg-[#9B2B3A] font-body font-semibold h-12 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
            >
              <ShoppingBag className="mr-2 w-4 h-4" />
              Enquire Now
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-row items-start gap-3">
      <span className="font-body text-sm font-medium text-[#2B2320]/60 w-20 shrink-0">{label}</span>
      <span className="font-body text-sm text-[#2B2320]">{value}</span>
    </div>
  );
}
