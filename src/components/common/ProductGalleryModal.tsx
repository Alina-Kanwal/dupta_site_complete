"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryModalProps {
  images: string[];
  productName: string;
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export default function ProductGalleryModal({
  images,
  productName,
  isOpen,
  initialIndex = 0,
  onClose,
}: ProductGalleryModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  /* Sync activeIndex when modal opens */
  useEffect(() => {
    if (isOpen) setActiveIndex(initialIndex);
  }, [isOpen, initialIndex]);

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIndex]);

  /* Prevent scroll behind modal */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const prev = useCallback(() =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setActiveIndex((i) => (i + 1) % images.length), [images.length]);

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal panel — stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-4xl mx-4 flex flex-col bg-[#FAF6F1] rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8D9D3]">
          <div>
            <p className="font-heading text-xl text-[#7A1F2B]">{productName}</p>
            <p className="font-body text-xs text-[#2B2320]/50 mt-0.5">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="w-9 h-9 rounded-full flex items-center justify-center
                       text-[#2B2320]/60 hover:bg-[#E8C4C4]/50 hover:text-[#7A1F2B]
                       transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Main Image ─────────────────────────────────────── */}
        <div className="relative flex-1 min-h-0 bg-[#F5ECE8]" style={{ height: "60vh" }}>
          <Image
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${productName} — view ${activeIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />

          {/* Prev / Next arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                           bg-white/80 hover:bg-white shadow-md flex items-center justify-center
                           text-[#7A1F2B] hover:scale-110 transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                           bg-white/80 hover:bg-white shadow-md flex items-center justify-center
                           text-[#7A1F2B] hover:scale-110 transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* ── Thumbnail Strip ────────────────────────────────── */}
        {images.length > 1 && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto border-t border-[#E8D9D3] bg-white">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden
                             border-2 transition-all duration-200
                             ${i === activeIndex
                               ? "border-[#7A1F2B] shadow-[0_0_0_2px_rgba(122,31,43,0.2)]"
                               : "border-transparent hover:border-[#C9A66B]"}`}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
