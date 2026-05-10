import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Explore our curated safari packages — 2, 3, or 4-night stays in Bardia National Park with guided game drives, cultural experiences, and warm jungle hospitality.",
};

const packages = [
  {
    id: "jungle-discovery",
    name: "Jungle Discovery",
    duration: "2 Nights · 3 Days",
    tag: "Short Escape",
    description:
      "The ideal introduction to Bardia. Two mornings in the jungle, a sunset viewpoint walk, and warm evenings with our Tharu team — enough to hear the forest breathe.",
    img: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1200&q=80&fit=crop",
    href: "/packages/bardia-at-a-glance-tour-2-nights-3-days",
    inclusions: ["2 guided jeep safaris", "1 nature walk", "All meals", "Airport transfers", "Welcome cultural evening"],
  },
  {
    id: "signature-stay",
    name: "Bardia Signature Stay",
    duration: "3 Nights · 4 Days",
    tag: "Most Popular",
    description:
      "The resort's signature rhythm — a balance of early morning drives, river-side afternoons, cultural immersion, and enough slow time to actually feel Bardia rather than just see it.",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80&fit=crop",
    href: "/packages/bardia-highlights-tour-3-nights-4-days",
    inclusions: ["3 guided jeep safaris", "Karnali river excursion", "Walking safari", "All meals", "Tharu cultural evening", "Airport transfers"],
  },
  {
    id: "wilderness-retreat",
    name: "Complete Wilderness Retreat",
    duration: "4 Nights · 5 Days",
    tag: "Full Immersion",
    description:
      "The deepest Bardia journey we offer. Four full days to track wildlife, float the Karnali, meet communities, and find that rare stillness that only a long jungle stay delivers.",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80&fit=crop",
    href: "/packages/best-of-bardia-4-nights-5-days",
    inclusions: ["4 guided game drives", "Full-day Karnali excursion", "Walking & birding safari", "Photography guide session", "All meals", "Tharu cultural evening", "Airport transfers"],
  },
  {
    id: "fishing",
    name: "Babai River Fishing",
    duration: "1 Day",
    tag: "Specialty",
    description:
      "A focused one-day experience on the Babai River — one of Nepal's finest sport-fishing stretches, rich with mahseer and accompanied by jungle riverbank scenery.",
    img: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1200&q=80&fit=crop",
    href: "/packages/babai-river-fishing-one-day",
    inclusions: ["Guided fishing experience", "Riverside packed lunch", "All equipment provided", "Local guide"],
  },
  {
    id: "tharu-cultural",
    name: "Rana Tharu Cultural Tour",
    duration: "2 Nights · 3 Days",
    tag: "Cultural",
    description:
      "An immersive journey into the Tharu villages surrounding Bardia — learning their traditional crafts, cuisine, and stories alongside morning wildlife encounters.",
    img: "https://images.unsplash.com/photo-1567443024551-f3e3a7b9567a?w=1200&q=80&fit=crop",
    href: "/packages/rana-tharu-cultural-tour-2-nights-3-days",
    inclusions: ["Village home visits", "Traditional Tharu meal", "Cultural performance", "1 jeep safari", "All meals", "Airport transfers"],
  },
  {
    id: "photography",
    name: "Wildlife Photography Tour",
    duration: "4 Nights · 5 Days",
    tag: "Specialist",
    description:
      "Designed for photographers — with early drives, optimal positioning, and a specialist naturalist guide who understands the patience photography demands.",
    img: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1200&q=80&fit=crop",
    href: "/packages/wildlife-photography-tour",
    inclusions: ["Photography-optimized drives", "Hide access", "Specialist guide", "Tripod/monopod support", "All meals", "Airport transfers"],
  },
];

export default function PackagesPage() {
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
              <article
                key={pkg.id}
                className="group bg-white border border-[#e8d8c0] overflow-hidden hover:border-[#c8923a] transition-colors duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={pkg.img}
                    alt={`${pkg.name} — Forest Hideaway Resort`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#1c2316]/20" />
                  <div className="absolute top-4 left-4 bg-[#c8923a] text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                    {pkg.tag}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b5e3c] mb-2">{pkg.duration}</p>
                  <h2 className="font-serif text-xl text-[#1e1a14] mb-3">{pkg.name}</h2>
                  <p className="text-[#4a3a28] text-sm leading-7 mb-5">{pkg.description}</p>
                  {/* Inclusions */}
                  <ul className="space-y-1.5 mb-6 flex-1">
                    {pkg.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-[#4a3a28] text-xs leading-5">
                        <span className="text-[#c8923a] mt-0.5">—</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={pkg.href}
                    className="inline-block text-center px-6 py-3 border border-[#c8923a] text-[#c8923a] uppercase tracking-[0.15em] text-[11px] hover:bg-[#c8923a] hover:text-white transition-all duration-300"
                  >
                    Enquire Now
                  </Link>
                </div>
              </article>
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
          <Link
            href="/contact"
            className="inline-block px-8 py-4 border border-[#d4a85a] text-[#f5ede0] uppercase tracking-[0.2em] text-xs hover:bg-[#d4a85a] hover:text-[#1c2316] transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
