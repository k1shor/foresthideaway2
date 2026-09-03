import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CtaLink from "@/components/ui/CtaLink";

export const metadata: Metadata = {
  title: "E-Media — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "A media hub for images, videos, and downloadable resources from Forest Hideaway Resort and Bardia National Park.",
};

const mediaCategories = [
  {
    id: "photography",
    title: "Photography",
    description:
      "Wildlife portraits, landscape scenes, resort atmosphere, and Tharu cultural documentation — available for press and editorial use.",
    img: "/assets/tiger.jpg",
    count: "Coming Soon",
  },
  {
    id: "video",
    title: "Video",
    description:
      "Short-form safari footage, resort walkthroughs, and field documentary clips from Bardia National Park.",
    img: "/assets/elephants-in-lake.jpg",
    count: "Coming Soon",
  },
  {
    id: "resources",
    title: "Resources & Guides",
    description:
      "Downloadable field guides, packing lists, seasonal planning notes, and destination resources for Bardia travelers.",
    img: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&q=80&fit=crop",
    count: "Coming Soon",
  },
];

export default function EMediaPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/elephants.webp"
            alt="Bardia wildlife photography"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">Media Hub</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">E-Media</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-xl mx-auto text-[#c8baa0] leading-8">
            A curated library of images, video, and resources from Forest Hideaway Resort
            and Bardia National Park — for travelers, press, and partners.
          </p>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-[#f5ede0] py-12 border-b border-[#e8d8c0]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mb-5" />
          <blockquote className="font-serif text-xl md:text-2xl text-[#1e1a14] leading-relaxed">
            &ldquo;Every frame should carry both the stillness and the energy of Bardia at the same time.&rdquo;
          </blockquote>
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mt-5" />
        </div>
      </section>

      {/* ── Media Categories ── */}
      <section className="bg-[#faf6ef] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Browse</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-14">Media Library</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mediaCategories.map((cat) => (
              <article
                key={cat.id}
                className="group bg-white border border-[#e8d8c0] overflow-hidden hover:border-[#c8923a] transition-colors duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#1c2316]/20" />
                  <div className="absolute top-4 left-4 bg-[#1c2316]/70 text-[#c8923a] text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                    {cat.count}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-[#1e1a14] mb-3">{cat.title}</h3>
                  <p className="text-[#4a3a28] text-sm leading-7">{cat.description}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon notice */}
          <div className="mt-14 border border-dashed border-[#e8d8c0] p-8 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c8923a] mb-3">Under Construction</p>
            <p className="font-serif text-2xl text-[#1e1a14] mb-3">Media Library Launching Soon</p>
            <p className="text-[#4a3a28] text-sm leading-7 max-w-md mx-auto">
              We are curating our full media collection. For immediate press or media enquiries,
              please contact us directly and we&apos;ll provide assets within 48 hours.
            </p>
            <CtaLink href="/contact" variant="gold" className="mt-6 px-6 py-3 tracking-[0.18em] text-xs">
              Media Enquiries
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ── Usage note ── */}
      <section className="bg-[#2a3320] py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 text-[#c8baa0]">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">For Press</p>
            <p className="text-sm leading-7">
              All media assets from Forest Hideaway Resort are available for editorial use
              with proper credit. Contact us with your publication details and intended use.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">For Partners</p>
            <p className="text-sm leading-7">
              Tour operators and travel partners may request a dedicated media pack. Please
              reach out with your company details and we&apos;ll respond within 48 hours.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
