"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";


const NAME_OPTIONS = [
  { id: "embroidery", label: "Embroidery Name", charge: 1000 },
  { id: "luxury",    label: "Luxury Name",     charge: 3000 },
] as const;

type NameOptionId = typeof NAME_OPTIONS[number]["id"] | null;

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const productId = parseInt(id);

  const [product,          setProduct]         = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor,    setSelectedColor]    = useState<string>("");
  const [addName,         setAddName]         = useState(false);
  const [nameOption,      setNameOption]       = useState<NameOptionId>(null);
  const [customName,      setCustomName]       = useState("");

  useEffect(() => {
    const productData = products.find((p) => p.id === productId);
    if (productData) {
      setProduct(productData);
      setSelectedColor(productData.color);
      setActiveImageIndex(0);
    } else {
      router.push("/");
    }
  }, [productId, router]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // Color customization charge logic
  // Cards 1, 3, 5 → free (no charge)
  // Card 8         → Rs. 500
  // All others     → Rs. 1000
  const COLOR_FREE_IDS  = [1, 3, 5];
  const colorCharge =
    COLOR_FREE_IDS.includes(product.id)
      ? 0
      : product.id === 8
      ? 500
      : 1000;

  const isColorChanged = selectedColor !== product.color;

  const nameCharge = addName && nameOption
    ? NAME_OPTIONS.find((o) => o.id === nameOption)?.charge ?? 0
    : 0;
  const appliedColorCharge = isColorChanged ? colorCharge : 0;
  const totalPrice = product.price + nameCharge + appliedColorCharge;

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
          <span className="text-sm font-medium text-[#2B2320]">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
          {/* Gallery — thumbnails left, main image right (seri.pk style) */}
          <div className="w-full md:w-1/2 md:sticky md:top-24 shrink-0 flex flex-row gap-3">

            {/* Vertical thumbnail strip — same 4:5 ratio as main, fixed width */}
            {product.images.length > 1 && (
              <div className="flex flex-col gap-2 flex-shrink-0">
                {product.images.map((src, index) => {
                  const isActive = activeImageIndex === index;
                  const isVideo = src.endsWith(".mp4");
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View ${isVideo ? "video" : "image"} ${index + 1}`}
                      aria-pressed={isActive}
                      className={`relative w-16 sm:w-20 aspect-[4/5] flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 bg-[#E8C4C4]/20 ${
                        isActive
                          ? "border-[#7A1F2B] shadow-[0_0_0_2px_rgba(122,31,43,0.2)]"
                          : "border-[#E8D9D3] hover:border-[#C9A66B]"
                      }`}
                    >
                      {isVideo ? (
                        <div className="w-full h-full flex items-center justify-center bg-[#2B2320]/10">
                          <svg className="w-6 h-6 text-[#7A1F2B]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      ) : (
                        <Image
                          src={src}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Main display — 4:5 portrait */}
            <div className="relative flex-1 aspect-[4/5] overflow-hidden rounded-2xl bg-[#E8C4C4]/20 shadow-sm">
              {product.images[activeImageIndex] && (
                product.images[activeImageIndex].endsWith(".mp4") ? (
                  <video
                    src={product.images[activeImageIndex]}
                    className="w-full h-full object-contain"
                    controls
                    playsInline
                  />
                ) : (
                  <Image
                    src={product.images[activeImageIndex]}
                    alt={`${product.name} view ${activeImageIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                )
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="font-heading text-3xl md:text-4xl text-[#7A1F2B]">
              {product.name}
            </h1>

            <div className="space-y-4 border-t border-[#E8D9D3] pt-6">
              <DetailRow label="Length"        value={product.length} />
              <DetailRow label="Width"         value={product.width} />
              <DetailRow label="Total Fabric"  value={product.totalFabric} />
              <DetailRow label="Fabric Type"   value={product.fabricType} />
              <DetailRow label="Design of Lace" value={product.laceDesign} />
              <DetailRow label="Sitara Work"   value={product.sitaraWork} />


              {/* ── Color Selection ── */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="font-body text-sm font-medium text-[#2B2320]/70">Color</span>
                  <select
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-full md:w-48 px-4 py-2.5 rounded-xl border border-[#E8D9D3] bg-white font-body text-sm text-[#2B2320] focus:outline-none focus:border-[#C9A66B] focus:ring-1 focus:ring-[#C9A66B] transition-all"
                  >
                    <option value="">Select a color</option>
                    {["White", "Ivory", "Red", "Maroon", "Pink", "Peach", "Golden", "Silver", "Green", "Black"].map((color) => (
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>

                {/* Color charge notice — always visible for cards with a charge */}
                {colorCharge > 0 && (
                  <div className="rounded-xl px-4 py-3 text-sm font-body border border-[#E8D9D3] bg-[#FAF6F1] text-[#2B2320]">
                    <span className="font-semibold text-[#7A1F2B]">⚠ Color Customization Charges: Rs. {colorCharge.toLocaleString()}</span>
                    <span className="block text-xs text-[#2B2320]/60 mt-0.5">
                      {isColorChanged
                        ? `Rs. ${colorCharge.toLocaleString()} has been added to your order total.`
                        : "Selecting a different color will add this charge to your order."}
                    </span>
                  </div>
                )}
              </div>


              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pt-2 border-t border-[#E8D9D3]">
                <span className="font-body text-sm font-medium text-[#2B2320]/70">Base Price</span>
                <span className="font-body text-base text-[#2B2320]/70">
                  Rs. {product.price.toLocaleString()}
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
                <div className="flex items-baseline gap-2 flex-wrap justify-end">
                  {(nameCharge > 0 || appliedColorCharge > 0) && (
                    <span className="font-body text-xs text-[#2B2320]/40 line-through">
                      Rs. {product.price.toLocaleString()}
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
                  {appliedColorCharge > 0 && (
                    <span className="font-body text-xs text-[#7A1F2B] bg-[#7A1F2B]/10 rounded-full px-2 py-0.5 font-medium">
                      +Rs. {appliedColorCharge.toLocaleString()} color
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