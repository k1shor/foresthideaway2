import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPackages } from "@/lib/api/packages";
import CtaLink from "@/components/ui/CtaLink";

export const metadata: Metadata = {
  title: "Packages — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Explore our curated safari packages — 2, 3, or 4-night stays in Bardia National Park with guided game drives, cultural experiences, and warm jungle hospitality.",
};

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1549366021-9f761d040a94?w=1600&q=80&fit=crop"
            alt="Safari at Bardia National Park"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">Stay With Us</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">Our Packages</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-2xl mx-auto text-[#c8baa0] leading-8">
            Choose your pace — and we shape the days around what matters most to your journey.
            From short escapes to deep wilderness immersions, every package is built around
            Bardia&apos;s natural rhythms.
          </p>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-[#f5ede0] py-12 md:py-16 border-b border-[#e8d8c0]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mb-6" />
          <blockquote className="font-serif text-xl md:text-2xl text-[#1e1a14] leading-relaxed">
            &ldquo;Choose your pace, and we shape the days around what matters most to your journey.&rdquo;
          </blockquote>
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mt-6" />
        </div>
      </section>

      {/* ── Package Grid ── */}
      <section className="bg-[#faf6ef] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Link
                key={pkg._id}
                href={`/packages/${pkg.slug}`}
                className="group bg-white border border-[#e8d8c0] overflow-hidden hover:border-[#c8923a] transition-colors duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-[#e8d8c0]">
                  {pkg.img && (
                    <Image
                      src={pkg.img}
                      alt={`${pkg.name} — Forest Hideaway Resort`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-[#1c2316]/20" />
                  <div className="absolute top-4 left-4 bg-[#c8923a] text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                    {pkg.tag}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b5e3c] mb-2">{pkg.duration}</p>
                  <h2 className="font-serif text-xl text-[#1e1a14] mb-3">{pkg.name}</h2>
                  <p className="text-[#4a3a28] text-sm leading-7 mb-6 flex-1">{pkg.description}</p>
                  <span className="group/btn relative inline-block text-center overflow-hidden px-6 py-3 border border-[#c8923a] text-[#c8923a] uppercase tracking-[0.15em] text-[11px] transition-colors duration-500">
                    <span className="absolute inset-0 bg-[#c8923a] [clip-path:circle(0%_at_50%_50%)] group-hover/btn:[clip-path:circle(150%_at_50%_50%)] opacity-0 group-hover/btn:opacity-100 transition-[clip-path,opacity] duration-[900ms] ease-in-out" />
                    <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500">
                      Enquire Now
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#1c2316] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Need Help Deciding?</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5ede0] mb-6">
            Let Us Shape Your Bardia Journey
          </h2>
          <p className="text-[#c8baa0] text-sm leading-8 mb-8 max-w-lg mx-auto">
            Every guest arrives with different expectations. Reach out and we&apos;ll help you
            plan the right combination of wildlife, culture, and rest.
          </p>
          <CtaLink href="/contact" variant="cream" className="px-8 py-4 tracking-[0.2em] text-xs">
            Contact Us
          </CtaLink>
        </div>
      </section>
    </>
  );
}
