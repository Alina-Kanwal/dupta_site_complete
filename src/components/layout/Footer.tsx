"use client";

import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

/* ── Custom SVGs for Socials ───────────────────────────────── */
const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

/* ── Data ──────────────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href:  "https://instagram.com",
    icon:  InstagramIcon,
    id:    "footer-instagram",
  },
  {
    label: "Facebook",
    href:  "https://facebook.com",
    icon:  FacebookIcon,
    id:    "footer-facebook",
  },
  {
    label: "WhatsApp",
    href:  "https://wa.me/",
    icon:  MessageCircle,
    id:    "footer-whatsapp",
  },
];

/* Payment method labels (text badges — real icons to swap in later) */
const PAYMENT_METHODS = ["Visa", "Mastercard", "JazzCash", "EasyPaisa"];

/* ── Newsletter sub-form (UI only) ─────────────────────────── */
function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col sm:flex-row gap-3 mt-4"
      aria-label="Newsletter signup"
    >
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <input
        id="footer-email"
        type="email"
        placeholder="your@email.com"
        required
        className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20
                   text-[#FAF6F1] placeholder-[#FAF6F1]/40 font-body text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#C9A66B] focus:border-transparent
                   transition-all duration-200"
      />
      <button
        id="footer-subscribe-btn"
        type="submit"
        className="flex-shrink-0 px-6 py-2.5 rounded-xl bg-[#C9A66B] text-[#2B2320]
                   font-body text-sm font-semibold hover:bg-[#D9BC8F] active:scale-[0.98]
                   transition-all duration-200 whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}

/* ── Main Footer ────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="bg-[#2B2320] text-[#FAF6F1]">
      {/* Top wave / separator */}
      <div className="h-1 w-full bg-gradient-to-r from-[#7A1F2B] via-[#C9A66B] to-[#7A1F2B]" />

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* ── Brand Column ─────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" aria-label="Wahi — Home">
              <span className="font-heading text-4xl text-[#C9A66B] leading-none hover:text-[#D9BC8F] transition-colors duration-200">
                Wahi
              </span>
            </Link>
            <p className="font-body text-sm leading-relaxed text-[#FAF6F1]/70 max-w-xs">
              Customize your Nikkah dupatta and make your wedding day special.
              Handcrafted with love for your most cherished moments.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                             text-[#FAF6F1]/70 hover:bg-[#C9A66B] hover:text-[#2B2320]
                             transition-all duration-200"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </a>
              ))}
              <a
                id="footer-email"
                href="mailto:hello@wahi.pk"
                aria-label="Email us"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center
                           text-[#FAF6F1]/70 hover:bg-[#C9A66B] hover:text-[#2B2320]
                           transition-all duration-200"
              >
                <Mail className="w-4 h-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>

          {/* ── Quick Links ───────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-[#C9A66B]">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-[#FAF6F1]/70 hover:text-[#C9A66B]
                               transition-colors duration-200 inline-flex items-center gap-1.5
                               group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#C9A66B] transition-all duration-300 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Customer Care ────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg text-[#C9A66B]">Customer Care</h3>
            <ul className="space-y-2.5">
              {[
                { label: "FAQs",            href: "/faqs" },
                { label: "Shipping Info",   href: "/shipping" },
                { label: "Returns Policy",  href: "/returns" },
                { label: "Size Guide",      href: "/size-guide" },
                { label: "Privacy Policy",  href: "/privacy" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-[#FAF6F1]/70 hover:text-[#C9A66B]
                               transition-colors duration-200 inline-flex items-center gap-1.5
                               group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#C9A66B] transition-all duration-300 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter ────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <h3 className="font-heading text-lg text-[#C9A66B]">Stay in the Loop</h3>
            <p className="font-body text-sm text-[#FAF6F1]/70 leading-relaxed">
              Get exclusive offers, new designs, and wedding inspiration delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5
                        flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="font-body text-xs text-[#FAF6F1]/40 text-center sm:text-left">
            © 2026 Wahi. All rights reserved.
          </p>

          {/* Payment badges */}
          <div
            className="flex items-center gap-2 flex-wrap justify-center"
            aria-label="Accepted payment methods"
          >
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded-md border border-white/15 bg-white/5
                           font-body text-[10px] font-semibold tracking-wide text-[#FAF6F1]/50"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
