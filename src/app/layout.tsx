import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─────────────────────────────────────────────────────────────
   Fonts — self-hosted via next/font (no external requests)
   ───────────────────────────────────────────────────────────── */
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* ─────────────────────────────────────────────────────────────
   Site Metadata
   ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Wahi — Customizable Nikkah Dupattas",
    template: "%s | Wahi",
  },
  description:
    "Customize your Nikkah dupatta and make your wedding day special. Handcrafted, bespoke dupattas for your most cherished moments.",
  keywords: [
    "nikkah dupatta",
    "customizable dupatta",
    "bridal dupatta",
    "wedding dupatta",
    "wahi",
    "pakistani bridal wear",
  ],
  openGraph: {
    title: "Wahi — Customizable Nikkah Dupattas",
    description:
      "Customize your Nikkah dupatta and make your wedding day special.",
    type: "website",
  },
};

/* ─────────────────────────────────────────────────────────────
   Root Layout
   ───────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* Global Navbar — sticky, appears on every page */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Global Footer — appears on every page */}
        <Footer />
      </body>
    </html>
  );
}
