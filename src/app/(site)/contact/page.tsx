import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { getContactPage } from "@/lib/api/pages";
import { getPackages } from "@/lib/api/packages";

export const metadata: Metadata = {
  title: "Contact — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Get in touch with Forest Hideaway Resort for bookings, itinerary planning, and pre-arrival support for your Bardia National Park safari.",
};

export default async function ContactPage() {
  const [page, packages] = await Promise.all([getContactPage(), getPackages()]);
  const { hero, formSection, details, gettingHere, sidebar } = page;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.image}
            alt="Forest Hideaway Resort"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">{hero.label}</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{hero.heading}</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p
            className="max-w-xl mx-auto text-[#c8baa0] leading-8"
            dangerouslySetInnerHTML={{ __html: hero.subtext }}
          />
        </div>
      </section>

      {/* ── Contact Layout ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14">
          {/* Form */}
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">
              {formSection.label}
            </p>
            <h2 className="font-serif text-3xl text-[#1e1a14] mb-8">{formSection.heading}</h2>
            <ContactForm packages={packages.map((p) => p.name)} />
          </div>

          {/* Info sidebar */}
          <div className="space-y-8">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">
                {details.label}
              </p>
              <h2 className="font-serif text-3xl text-[#1e1a14] mb-8">{details.heading}</h2>
            </div>

            <div className="border border-[#e8d8c0] bg-white/60 p-6 space-y-5">
              {[
                { label: "Address", value: `${details.addressName}\n${details.addressLocation}` },
                { label: "Phone", value: details.phone },
                { label: "Email", value: details.email },
                { label: "Reception Hours", value: details.receptionHours },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-1">{item.label}</p>
                  <p className="text-[#4a3a28] text-sm leading-6 whitespace-pre-line">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="border border-[#e8d8c0] bg-white/60 p-6">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-3">
                {gettingHere.label}
              </p>
              <ul className="space-y-2.5 text-[#4a3a28] text-sm leading-6">
                {gettingHere.items.map((item, i) => (
                  <li key={i}>
                    <span className="text-[#c8923a]">{item.icon}</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-48 overflow-hidden">
              <Image
                src={sidebar.image}
                alt="Wildlife at Forest Hideaway Resort"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-[#1c2316]/30" />
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className="font-serif text-lg text-white leading-snug"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${sidebar.quoteText}&rdquo;` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
