import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Get in touch with Forest Hideaway Resort for bookings, itinerary planning, and pre-arrival support for your Bardia National Park safari.",
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80&fit=crop"
            alt="Forest Hideaway Resort"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">Get In Touch</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">Contact Us</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-xl mx-auto text-[#c8baa0] leading-8">
            Whether you&apos;re ready to book or simply planning your Bardia journey, we&apos;re here to help.
            A smooth safari starts with a good conversation.
          </p>
        </div>
      </section>

      {/* ── Contact Layout ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14">
          {/* Form */}
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Send a Message</p>
            <h2 className="font-serif text-3xl text-[#1e1a14] mb-8">Plan Your Stay</h2>
            <form className="space-y-5" id="contact-form">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-[#e8d8c0] bg-white text-[#1e1a14] placeholder:text-[#b0a090] focus:outline-none focus:border-[#c8923a] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-[#e8d8c0] bg-white text-[#1e1a14] placeholder:text-[#b0a090] focus:outline-none focus:border-[#c8923a] transition-colors text-sm"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-arrival" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
                    Arrival Date
                  </label>
                  <input
                    id="contact-arrival"
                    type="date"
                    className="w-full px-4 py-3 border border-[#e8d8c0] bg-white text-[#1e1a14] focus:outline-none focus:border-[#c8923a] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-guests" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
                    No. of Guests
                  </label>
                  <select
                    id="contact-guests"
                    className="w-full px-4 py-3 border border-[#e8d8c0] bg-white text-[#1e1a14] focus:outline-none focus:border-[#c8923a] transition-colors text-sm appearance-none"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6, "7+"].map((n) => (
                      <option key={n} value={n}>{n} {typeof n === "number" && n === 1 ? "guest" : "guests"}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="contact-package" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
                  Interested In
                </label>
                <select
                  id="contact-package"
                  className="w-full px-4 py-3 border border-[#e8d8c0] bg-white text-[#1e1a14] focus:outline-none focus:border-[#c8923a] transition-colors text-sm appearance-none"
                >
                  <option value="">Select a package or activity</option>
                  <option>Jungle Discovery (2N/3D)</option>
                  <option>Bardia Signature Stay (3N/4D)</option>
                  <option>Complete Wilderness Retreat (4N/5D)</option>
                  <option>Wildlife Photography Tour</option>
                  <option>Tharu Cultural Tour</option>
                  <option>Custom / Not sure yet</option>
                </select>
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-2">
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  placeholder="Tell us about your ideal Bardia journey, any special requirements, or questions you have..."
                  className="w-full px-4 py-3 border border-[#e8d8c0] bg-white text-[#1e1a14] placeholder:text-[#b0a090] focus:outline-none focus:border-[#c8923a] transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#1c2316] text-[#f5ede0] uppercase tracking-[0.2em] text-xs hover:bg-[#2a3320] transition-colors duration-300 border border-[#2a3320]"
              >
                Send Enquiry
              </button>
            </form>
          </div>

          {/* Info sidebar */}
          <div className="space-y-8">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Contact Details</p>
              <h2 className="font-serif text-3xl text-[#1e1a14] mb-8">Find Us</h2>
            </div>

            <div className="border border-[#e8d8c0] bg-white/60 p-6 space-y-5">
              {[
                {
                  label: "Address",
                  value: "Forest Hideaway Resort\nThakurdwara, Bardiya\nLumbini Province, Nepal",
                },
                { label: "Phone", value: "+977 9800 000 000" },
                { label: "Email", value: "stay@foresthideaway.com" },
                { label: "Reception Hours", value: "7:00 AM – 9:00 PM (NPT)" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-1">{item.label}</p>
                  <p className="text-[#4a3a28] text-sm leading-6 whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="border border-[#e8d8c0] bg-white/60 p-6">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-3">Getting Here</p>
              <ul className="space-y-2.5 text-[#4a3a28] text-sm leading-6">
                <li><span className="text-[#c8923a]">✈</span> Fly Kathmandu → Nepalgunj, then 2hr road</li>
                <li><span className="text-[#c8923a]">🚌</span> Overnight bus Kathmandu → Bardiya (~10 hrs)</li>
                <li><span className="text-[#c8923a]">🚗</span> Self-drive ~12 hrs from Kathmandu</li>
                <li><span className="text-[#c8923a]">📍</span> We arrange transfers on request</li>
              </ul>
            </div>

            <div className="relative h-48 overflow-hidden">
              <Image
                src="/assets/elephants.webp"
                alt="Wildlife at Forest Hideaway Resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#1c2316]/30" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-serif text-lg text-white leading-snug">
                  &ldquo;A smooth safari starts with clear planning before you arrive.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
