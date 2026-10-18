"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const COLOR_OPTIONS = ["Ivory"]; // Simplified for this card

const NAME_OPTIONS = [
  { id: "embroidery", label: "Embroidery Name", charge: 1000 },
  { id: "luxury",    label: "Luxury Name",     charge: 3000 },
] as const;

type NameOptionId = typeof NAME_OPTIONS[number]["id"] | null;

// Define the new card's product data
const newCardProduct: Product = {
  id: 999, // Temporary ID for the new card
  name: "Fancy Bunches Patch Work Dupatta",
  images: [
    "/images/dupta_bunches/1.jpg",
    "/images/dupta_bunches/2.jpg",
    "/images/dupta_bunches/3.jpg"
  ],
  length: "4 gaz",
  width: "4.5 gaz",
  totalFabric: "12 gaz",
  fabricType: "Organza",
  laceDesign: "Fancy Bunches Patch Work",
  sitaraWork: "Including",
  color: "Ivory",
  price: 20000
};

export default function NewCardDetailPage() {
  const [product] = useState<Product>(newCardProduct);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor,    setSelectedColor]    = useState<string>("Ivory");
  const [addName,         setAddName]         = useState(false);
  const [nameOption,      setNameOption]       = useState<NameOptionId>(null);
  const [customName,      setCustomName]       = useState("");

  const nameCharge = addName && nameOption
    ? NAME_OPTIONS.find((o) => o.id === nameOption)?.charge ?? 0
    : 0;
  const totalPrice = newCardProduct.price + nameCharge;

  const handleAddNameToggle = (checked: boolean) => {
    setAddName(checked);
    if (!checked) {
      setNameOption(null);
      setCustomName("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="mb-6">
          <Link href="/" className="text-sm text-[#2B2320]/70 hover:text-[#7A1F2B]">
            Home
          </Link>
          <span className="mx-2 text-xs text-[#2B2320]/50">/</span>
          <span className="text-sm font-medium text-[#2B2320]">Fancy Bunches Patch Work Dupatta</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          {/* Gallery — thumbnails left, main image right (seri.pk style) */}
          <div className="w-full md:w-1/2 md:sticky md:top-24 shrink-0 flex flex-row gap-3">
            {/* Vertical thumbnail strip — same 4:5 ratio as main, fixed width */}
            {newCardProduct.images.length > 1 && (
              <div className="flex flex-col gap-2 flex-shrink-0">
                {newCardProduct.images.map((_, index) => {
                  const isActive = activeImageIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-pressed={isActive}
                      className={`w-16 sm:w-20 aspect-[4/5] flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-[#E8C4C4]/20 ${
                        isActive
                          ? "border-[#7A1F2B] shadow-[0_0_0_2px_rgba(122,31,43,0.2)]"
                          : "border-[#E8D9D3] hover:border-[#C9A66B]"
                      }`}
                    />
                  );
                })}
              </div>
            )}

            {/* Main image display — 4:5 portrait, full image visible */}
            <div className="relative flex-1 aspect-[4/5] overflow-hidden rounded-2xl bg-[#E8C4C4]/20 shadow-sm">
              {newCardProduct.images[activeImageIndex] && (
                <Image
                  src={newCardProduct.images[activeImageIndex]}
                  alt={`${newCardProduct.name} view ${activeImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="font-heading text-3xl md:text-4xl text-[#7A1F2B]">
              {newCardProduct.name}
            </h1>

            <div className="space-y-4 border-t border-[#E8D9D3] pt-6">
              <DetailRow label="Length"        value={newCardProduct.length} />
              <DetailRow label="Width"         value={newCardProduct.width} />
              <DetailRow label="Total Fabric"  value={newCardProduct.totalFabric} />
              <DetailRow label="Fabric Type"   value={newCardProduct.fabricType} />
              <DetailRow label="Design of Lace" value={newCardProduct.laceDesign} />
              <DetailRow label="Sitara Work"   value={newCardProduct.sitaraWork} />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-2">
                <span className="font-body text-sm font-medium text-[#2B2320]/70">Color</span>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full md:w-48 px-4 py-2.5 rounded-xl border border-[#E8D9D3] bg-white font-body text-sm text-[#2B2320] focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B] transition-all"
                >
                  {COLOR_OPTIONS.map((color) => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-2 border-t border-[#E8D9D3]">
                <span className="font-body text-sm font-medium text-[#2B2320]/70">Base Price</span>
                <span className="font-body text-base text-[#2B2320]/70">
                  Rs. {newCardProduct.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* ── Add Name Section ─────────────────────────────── */}
            <div className="rounded-2xl border border-[#E8D9D3] bg-white p-5 space-y-4">

              {/* Checkbox row */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <span className="relative flex-shrink-0">
                  <input
                    id="add-name-checkbox"
                    type="checkbox"
                    checked={addName}
                    onChange={(e) => handleAddNameToggle(e.target.checked)}
                    className="peer sr-only"
                  />
                  {/* Custom checkbox */}
                  <span className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-200
                    ${addName
                      ? "border-[#7A1F2B] bg-[#7A1F2B]"
                      : "border-[#C9A66B] bg-white group-hover:border-[#7A1F2B]"
                    }`}
                  >
                    {addName && (
                      <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                </span>
                <span className="font-body text-sm font-semibold text-[#2B2320] select-none">
                  Add Name on Dupatta?
                </span>
              </label>

              {/* Expanded options */}
              {addName && (
                <div className="space-y-4 pl-1">

                  {/* Radio options */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {NAME_OPTIONS.map((opt) => {
                      const isSelected = nameOption === opt.id;
                      return (
                        <label
                          key={opt.id}
                          className={`flex-1 flex items-center gap-3 cursor-pointer rounded-xl border-2 px-4 py-3.5 transition-all duration-200 ${
                            isSelected
                              ? "border-[#7A1F2B] bg-[#7A1F2B]/5"
                              : "border-[#E8D9D3] bg-[#FAF6F1] hover-border-[#C9A66B]"
                          }`}
                        >
                          {/* Custom radio */}
                          <span className={`flex-shrink-0 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            isSelected ? "border-[#7A1F2B]" : "border-[#C9A66B]"
                          }`}>
                            {isSelected && (
                              <span className="h-2 w-2 rounded-full bg-[#7A1F2B]" />
                            )}
                          </span>
                          <input
                            type="radio"
                            name="name-option"
                            value={opt.id}
                            checked={isSelected}
                            onChange={() => {
                              setNameOption(opt.id);
                              setCustomName("");
                            }}
                            className="sr-only"
                          />
                          <span className="flex flex-col min-w-0">
                            <span className="font-body text-sm font-semibold text-[#2B2320] leading-tight">
                              {opt.label}
                            </span>
                            <span className={`font-body text-xs font-medium ${isSelected ? "text-[#7A1F2B]" : "text-[#C9A66B]"}`}>
                              +Rs. {opt.charge.toLocaleString()}
                            </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  {/* Name text input */}
                  {nameOption && (
                    <div className="space-y-1.5">
                      <label
                        htmlFor="custom-name-input"
                        className="font-body text-xs font-medium text-[#2B2320]/70 uppercase tracking-wider"
                      >
                        Enter Name
                      </label>
                      <input
                        id="custom-name-input"
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. Fatima, Ayesha…"
                        maxLength={40}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8D9D3] bg-[#FAF6F1] font-body text-sm text-[#2B2320] placeholder:text-[#2B2320]/30
                                   focus:outline-none focus:border-[#7A1F2B] focus:ring-2 focus:ring-[#7A1F2B]/20
                                   transition-all duration-200"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* ── End Add Name Section ──────────────────────────── */}

            {/* Total price + Add to Cart */}
            <div className="space-y-3 pt-2">
              {/* Dynamic total */}
              <div className="flex items-center justify-between px-1">
                <span className="font-body text-sm font-medium text-[#2B2320]/70">Total</span>
                <div className="flex items-baseline gap-2">
                  {nameCharge > 0 && (
                    <span className="font-body text-xs text-[#2B2320]/40 line-through">
                      Rs. {newCardProduct.price.toLocaleString()}
                    </span>
                  )}
                  <span className="font-heading text-2xl text-[#C9A66B] font-semibold tabular-nums">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                  {nameCharge > 0 && (
                    <span className="font-body text-xs text-[#7A1F2B] bg-[#7A1F2B]/10 rounded-full px-2 py-0.5 font-medium">
                      +Rs. {nameCharge.toLocaleString()} name
                    </span>
                  )}
                </div>
              </div>

              <Button
                type="button"
                className="w-full bg-[#7A1F2B] text-[#FAF6F1] hover:bg-[#9B2B3A] font-body font-semibold px-6 py-3 h-12 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg"
              >
                <ShoppingBag className="mr-2 w-4 h-4" />
                Add to Cart — Rs. {totalPrice.toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-4">
      <span className="font-body text-sm font-medium text-[#2B2320]/70">{label}</span>
      <span className="font-body text-sm text-[#2B2320]">{value}</span>
    </div>
  );
}