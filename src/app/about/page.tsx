import Link from "next/link";
import Image from "next/image";

// About Us Page for Wahi - Nikkah Dupatta Brand
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Decorative top element */}
      <div className="h-4 bg-gradient-to-r from-transparent via-[#E8C4C4]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* 1. Hero/Intro Section */}
        <section className="mb-20">
          <div className="bg-[#FAF6F1]/50 rounded-2xl p-8 md:p-12 border border-[#E8D9D3]/50">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              {/* Image placeholder */}
              <div className="hidden md:block">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#E8C4C4]/20">
                  <Image
                    src="/images/our_story.jpg"
                    alt="Our Story"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text content */}
              <div className="space-y-6">
                <h1 className="font-heading text-4xl md:text-5xl text-[#7A1F2B] mb-2">
                  Our Story
                </h1>
                <p className="font-body text-base text-[#2B2320]/70 leading-relaxed">
                  Wahi was founded with a simple yet profound vision: to help every bride find the perfect, customizable Nikkah dupatta for her special day. We understand that this cherished accessory is more than just fabric - it's a symbol of love, tradition, and the beautiful journey ahead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Our Mission Section */}
        <section className="mb-20">
          <div className="bg-white/50 rounded-2xl p-8 border border-[#E8D9D3]/50">
            <h2 className="font-heading text-3xl md:text-4xl text-[#7A1F2B] mb-6">
              Our Mission
            </h2>
            <p className="font-body text-lg text-[#2B2320]/70 leading-relaxed max-w-2xl">
              At Wahi, our mission is to elevate the bridal experience through uncompromising quality and exceptional craftsmanship. We believe every bride deserves to feel extraordinarily special on her wedding day, which is why we pour our heart and soul into creating dupattas that are not just worn, but cherished as heirlooms for generations to come.
            </p>
          </div>
        </section>

        {/* 3. Why Choose Us (Feature Cards) */}
        <section className="mb-20">
          <div className="space-y-8">
            <h2 className="font-heading text-3xl md:text-4xl text-[#7A1F2B] mb-6">
              Why Choose Wahi
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Feature Card 1 */}
              <div className="bg-white/50 rounded-xl p-6 border border-[#E8D9D3]/50 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#E8C4C4]/20 flex items-center justify-center mb-4">
                  <span className="text-[#C9A66B] text-2xl">��✂��️</span>
                </div>
                <h3 className="font-heading text-xl text-[#7A1F2B] mb-3">
                  Fully Customizable
                </h3>
                <p className="font-body text-[#2B2320]/70">
                  Choose every detail - from fabric and border to intricate sitara work - to create your perfect dupatta.
                </p>
              </div>

              {/* Feature Card 2 */}
              <div className="bg-white/50 rounded-xl p-6 border border-[#E8D9D3]/50 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#E8C4C4]/20 flex items-center justify-center mb-4">
                  <span className="text-[#C9A66B] text-2xl">���👗</span>
                </div>
                <h3 className="font-heading text-xl text-[#7A1F2B] mb-3">
                  Premium Fabric
                </h3>
                <p className="font-body text-[#2B2320]/70">
                  We use only the finest organza, net, silk, and chiffon to ensure luxurious drape and comfort.
                </p>
              </div>

              {/* Feature Card 3 */}
              <div className="bg-white/50 rounded-xl p-6 border border-[#E8D9D3]/50 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#E8C4C4]/20 flex items-center justify-center mb-4">
                  <span className="text-[#C9A66B] text-2xl">���💫</span>
                </div>
                <h3 className="font-heading text-xl text-[#7A1F2B] mb-3">
                  Handcrafted Detailing
                </h3>
                <p className="font-body text-[#2B2320]/70">
                  Each piece is meticulously handcrafted by expert artisans with years of bridal wear expertise.
                </p>
              </div>

              {/* Feature Card 4 */}
              <div className="bg-white/50 rounded-xl p-6 border border-[#E8D9D3]/50 text-center">
                <div className="w-16 h-16 rounded-xl bg-[#E8C4C4]/20 flex items-center justify-center mb-4">
                  <span className="text-[#C9A66B] text-2xl">��❤��️</span>
                </div>
                <h3 className="font-heading text-xl text-[#7A1F2B] mb-3">
                  Made With Love
                </h3>
                <p className="font-body text-[#2B2320]/70">
                  Every stitch carries our passion for helping brides feel beautiful, confident, and truly special.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Our Values / Craftsmanship Section */}
        <section className="mb-20">
          <div className="bg-[#E8C4C4]/10 rounded-2xl p-8 border border-[#E8D9D3]/50">
            <h2 className="font-heading text-3xl md:text-4xl text-[#7A1F2B] mb-6">
              Crafted With Care
            </h2>
            <p className="font-body text-lg text-[#2B2320]/70 leading-relaxed">
              From the initial design sketch to the final quality check, every Wahi dupatta undergoes a meticulous creation process. Our artisans combine traditional techniques with contemporary aesthetics to produce pieces that honor heritage while embracing modern elegance. Each dupatta tells a story - of skilled hands, patient dedication, and the timeless beauty of bridal craftsmanship.
            </p>
          </div>
        </section>
      </div>

      {/* Decorative bottom element */}
      <div className="h-4 bg-gradient-to-r from-transparent via-[#E8C4C4]/30 to-transparent" />
    </div>
  );
}