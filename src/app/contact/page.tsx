"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Input
} from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

// Contact information - easy to update later
const contactInfo = {
  address: "Orangi town number one sector 7/A house 1053 near mustafa masjid karachi",
  email: "Wahibakhan22@gmail.com",
  phone: "03161122091",
  whatsapp: "https://wa.me/03161122091"
};

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend API
    // For now, we'll just show a success message
    setShowSuccess(true);

    // Reset form after a short delay
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F1]">
      {/* Decorative top element */}
      <div className="h-4 bg-gradient-to-r from-transparent via-[#E8C4C4]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">

          {/* Left Column: Contact Form */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl text-[#7A1F2B] mb-2">
              Get in Touch
            </h2>
            <p className="font-body text-base text-[#2B2320]/70 max-w-md">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            {showSuccess ? (
              <div className="bg-[#C9A66B]/10 border border-[#C9A66B]/20 rounded-xl p-6 text-center">
                <p className="font-body text-lg text-[#2B2320] font-medium">
                  Thanks, we'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-body text-sm font-medium text-[#2B2320]/80">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="bg-white/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-body text-sm font-medium text-[#2B2320]/80">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="bg-white/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="font-body text-sm font-medium text-[#2B2320]/80">
                    Your Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    placeholder="+92 3XX XXX XXXX"
                    className="bg-white/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="font-body text-sm font-medium text-[#2B2320]/80">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="bg-white/50 border-border"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-body text-sm font-medium text-[#2B2320]/80">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Type your message here..."
                    className="block w-full min-h-[100px] resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-base font-body
                      placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50
                      disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50
                      aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20
                      bg-white/50 border-border transition-all duration-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#C9A66B] text-[#2B2320] hover:bg-[#D9BC8F] font-body font-semibold
                    px-6 py-3 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg
                    hover:-translate-y-0.5"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info Card */}
          <div className="space-y-6 bg-white/50 rounded-2xl p-6 md:p-8 border border-[#E8D9D3]/50 shadow-sm">
            <h2 className="font-heading text-2xl md:text-3xl text-[#7A1F2B] mb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#C9A66B] flex-shrink-0 mt-[3px]" />
                <div className="space-y-0.5">
                  <p className="font-body text-sm font-medium text-[#2B2320]/80">Address</p>
                  <p className="font-body text-base text-[#2B2320]">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#C9A66B] flex-shrink-0 mt-[3px]" />
                <div className="space-y-0.5">
                  <p className="font-body text-sm font-medium text-[#2B2320]/80">Email</p>
                  <a href={`mailto:${contactInfo.email}`}
                     className="font-body text-base text-[#2B2320] hover:text-[#7A1F2B] transition-colors duration-200">
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#C9A66B] flex-shrink-0 mt-[3px]" />
                <div className="space-y-0.5">
                  <p className="font-body text-sm font-medium text-[#2B2320]/80">Phone</p>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                     className="font-body text-base text-[#2B2320] hover:text-[#7A1F2B] transition-colors duration-200">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="h-4 w-4 text-[#C9A66B] flex-shrink-0 mt-[3px]" />
                <div className="space-y-0.5">
                  <p className="font-body text-sm font-medium text-[#2B2320]/80">WhatsApp</p>
                  <a href={contactInfo.whatsapp}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 font-body text-base text-[#2B2320] hover:text-[#7A1F2B] transition-colors duration-200">
                    Chat with us
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative divider */}
            <div className="h-px w-24 bg-[#C9A66B]/20 mx-auto my-6" />

            {/* Social Media Icons */}
            <div className="space-y-3">
              <p className="font-body text-sm font-medium text-[#2B2320]/80">Follow Us</p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/wahishaans_ateliers_?igsh=amZ1ZGY1Z2F4Zno5"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                              text-[#FAF6F1]/70 hover:bg-[#C9A66B] hover:text-[#2B2320]
                              transition-all duration-200">
                  <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
                </a>
                <a href="https://www.facebook.com/share/1NbbZ1LEZ2/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                              text-[#FAF6F1]/70 hover-bg-[#C9A66B] hover:text-[#2B2320]
                              transition-all duration-200">
                  <Mail className="w-5 h-5" strokeWidth={1.75} />
                </a>
                <a href="https://www.tiktok.com/@wahishaans_atelier?_r=1&_t=ZS-98kK1S4f5Px"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                              text-[#FAF6F1]/70 hover-bg-[#C9A66B] hover:text-[#2B2320]
                              transition-all duration-200">
                  {/* TikTok icon - using MessageCircle as placeholder since we don't have a specific TikTok icon */}
                  <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom element */}
      <div className="h-4 bg-gradient-to-r from-transparent via-[#E8C4C4]/30 to-transparent" />
    </div>
  );
}