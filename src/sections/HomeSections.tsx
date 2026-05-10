import Link from "next/link";
import Image from "next/image";
import MotionReveal from "@/components/animation/MotionReveal";

/* ─── Data ─────────────────────────────────────────── */

type Package = {
  name: string;
  duration: string;
  tag: string;
  details: string;
  img: string;
  href: string;
};

const packages: Package[] = [
  {
    name: "Jungle Discovery",
    duration: "2 nights · 3 days",
    tag: "Short Escape",
    details:
      "Perfect for first-time visitors — guided jungle drives at dawn, a sunset viewpoint walk, and warm Tharu hospitality around the fire.",
    img: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&q=80&fit=crop",
    href: "/packages/bardia-at-a-glance-tour-2-nights-3-days",
  },
  {
    name: "Bardia Signature Stay",
    duration: "3 nights · 4 days",
    tag: "Most Popular",
    details:
      "A balanced safari rhythm — river-side afternoons, nature walks through sal forest, cultural evenings, and early morning game drives.",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&fit=crop",
    href: "/packages/bardia-highlights-tour-3-nights-4-days",
  },
  {
    name: "Complete Wilderness Retreat",
    duration: "4 nights · 5 days",
    tag: "Full Immersion",
    details:
      "A deeper Bardia journey with dawn explorations, Karnali river time, cultural encounters, and slow restorative afternoons.",
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&fit=crop",
    href: "/packages/best-of-bardia-4-nights-5-days",
  },
];

type Experience = {
  title: string;
  description: string;
  img: string;
  href: string;
};

const signatureExperiences: Experience[] = [
  {
    title: "Jeep Safari in Bardia",
    description:
      "Track tigers, elephants, and deer through sal forests and open grasslands with experienced naturalists and local guides.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80&fit=crop",
    href: "/activities/jeep-safari",
  },
  {
    title: "Karnali River Adventure",
    description:
      "Cruise along quiet river stretches where gharial crocodiles, migratory birds, and dramatic skies frame the journey.",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80&fit=crop",
    href: "/activities/karnali-river-rafting",
  },
  {
    title: "Tharu Cultural Evening",
    description:
      "Share stories, traditional cuisine, and performances with the Tharu communities that have shaped Bardia's spirit for centuries.",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80&fit=crop",
    href: "/activities/tharu-cultural-program",
  },
];

/* ─── Map SVG ──────────────────────────────────────── */

function BardiaMapOutline() {
  return (
    <svg
      viewBox="0 0 280 200"
      className="w-full max-w-sm opacity-80"
      role="img"
      aria-label="Outline map graphic of Bardia region"
    >
      <path
        d="M22 136 L40 102 L69 86 L77 58 L110 48 L136 22 L158 38 L191 44 L214 66 L248 80 L236 111 L214 140 L178 159 L162 181 L131 178 L103 164 L73 166 L52 154 Z"
        fill="none"
        stroke="#8b5e3c"
        strokeWidth="1.5"
      />
      <path
        d="M63 112 C89 115, 124 93, 155 106 C177 117, 196 117, 222 105"
        fill="none"
        stroke="#c8923a"
        strokeWidth="1.2"
        strokeDasharray="4 3"
      />
      <circle cx="158" cy="107" r="5" fill="#c8923a" />
      <text x="166" y="103" fontSize="11" fill="#4a3a28" fontFamily="serif">
        Bardia NP
      </text>
      <text x="18" y="193" fontSize="9" fill="#7a6852">
        Location illustration — not to scale
      </text>
    </svg>
  );
}

/* ─── Sections ─────────────────────────────────────── */

export default function HomeSections() {
  return (
    <>
      {/* ── 1. Resort Intro ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-center">
          <MotionReveal direction="right">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-5">
              The Resort
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#1e1a14] leading-tight mb-6">
              Where the Jungle Meets Warm Hospitality
            </h2>
            <p className="text-[#4a3a28] leading-8 max-w-lg mb-8">
              Forest Hideaway Resort sits on the quiet fringe of Bardia National Park —
              a place designed for travelers who value nature, comfort, and meaningful time.
              From early game drives to slow evenings by the fire, every part of your stay
              moves to the rhythm of the jungle.
            </p>
            <Link
              href="/about-us"
              className="text-xs tracking-[0.22em] uppercase text-[#8b5e3c] border-b border-[#c8923a] pb-0.5 hover:text-[#c8923a] transition-colors duration-200"
            >
              Our Story
            </Link>
          </MotionReveal>
          {/* Resort image */}
          <MotionReveal className="relative overflow-hidden h-80 md:h-[420px]" direction="left" delay={0.08}>
            <Image
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80&fit=crop"
              alt="Luxury forest eco-lodge at Forest Hideaway Resort"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#1c2316]/10" />
          </MotionReveal>
        </div>
      </section>

      {/* ── 2. Quote ── */}
      <section className="bg-[#1c2316] text-[#f5ede0] py-24 md:py-28">
        <MotionReveal className="max-w-5xl mx-auto px-6 md:px-12 text-center" direction="none">
          <div className="w-px h-8 bg-[#c8923a]/50 mx-auto mb-8" />
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-7">
            A Note From The Wild
          </p>
          <blockquote className="font-serif text-2xl md:text-[2.4rem] leading-snug max-w-3xl mx-auto">
            &ldquo;Stay long enough to hear the forest breathe, and you leave with
            a calmer heart than you arrived with.&rdquo;
          </blockquote>
          <div className="w-px h-8 bg-[#c8923a]/50 mx-auto mt-8" />
        </MotionReveal>
      </section>

      {/* ── 3. Map / Key Info ── */}
      <section id="map" className="bg-[#ede0cc] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <MotionReveal direction="right">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">
              Map &amp; Key Info
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-5">
              Where The Jungle Meets The River
            </h3>
            <p className="text-[#4a3a28] leading-8 mb-7">
              Bardia National Park, in Nepal&apos;s western Terai, is one of the country&apos;s
              most pristine wilderness areas — known for Bengal tiger habitat, rich
              birdlife, and river ecosystems shaped by the Karnali. The resort sits
              at the park&apos;s fringe, making dawn and dusk safaris seamlessly immersive.
            </p>
            <ul className="space-y-3.5">
              {[
                { icon: "📍", text: "Near Bardia NP gateway, Bardiya, Nepal" },
                { icon: "🌿", text: "Ideal Season: October to May" },
                { icon: "🐅", text: "Best For: Wildlife safaris, birding & cultural stays" },
                { icon: "✈️", text: "Nearest Airport: Nepalgunj (2 hrs)" },
              ].map((item) => (
                <li key={item.text} className="flex items-start gap-3 text-[#4a3a28] text-sm leading-6">
                  <span className="mt-0.5 text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </MotionReveal>
          <MotionReveal className="text-[#7a6852] flex justify-center md:justify-end" direction="left" delay={0.08}>
            <BardiaMapOutline />
          </MotionReveal>
        </div>
      </section>

      {/* ── 4. Packages ── */}
      <section id="packages" className="bg-[#faf6ef] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <MotionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-3">
                Stay With Us
              </p>
              <h3 className="font-serif text-3xl md:text-5xl text-[#1e1a14]">
                Our Packages
              </h3>
            </div>
            <Link
              href="/packages"
              className="text-xs tracking-[0.2em] uppercase text-[#8b5e3c] border-b border-[#c8923a] pb-0.5 hover:text-[#c8923a] transition-colors shrink-0"
            >
              View All Packages
            </Link>
          </MotionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <MotionReveal
                as="article"
                key={pkg.name}
                delay={index * 0.1}
                className="group bg-white border border-[#e8d8c0] overflow-hidden hover:border-[#c8923a] transition-colors duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={pkg.img}
                    alt={`${pkg.name} package — Forest Hideaway Resort`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#1c2316]/20 group-hover:bg-[#1c2316]/10 transition-colors duration-500" />
                  {/* Tag */}
                  <div className="absolute top-4 left-4 bg-[#c8923a] text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                    {pkg.tag}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 md:p-7">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b5e3c] mb-2">
                    {pkg.duration}
                  </p>
                  <h4 className="font-serif text-xl text-[#1e1a14] mb-3">{pkg.name}</h4>
                  <p className="text-[#4a3a28] text-sm leading-7 mb-5">{pkg.details}</p>
                  <Link
                    href={pkg.href}
                    className="text-[10px] tracking-[0.2em] uppercase text-[#c8923a] hover:text-[#8b5e3c] transition-colors"
                  >
                    Discover →
                  </Link>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Video / Visual Story ── */}
      <section className="bg-[#2a3320] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <MotionReveal>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">
              Watch
            </p>
            <h3 className="font-serif text-3xl md:text-5xl text-[#f5ede0] mb-10">
              Bardia In Motion
            </h3>
          </MotionReveal>
          <MotionReveal className="relative overflow-hidden min-h-80 md:min-h-[28rem] flex items-end border border-[#3d4f2c]" delay={0.08}>
            <Image
              src="/assets/elephants-in-lake.jpg"
              alt="Elephants in Bardia National Park"
              fill
              className="object-cover opacity-55"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c2316]/90 via-[#1c2316]/30 to-transparent" />
            <div className="relative z-10 p-8 md:p-12 max-w-xl">
              <p className="text-[#e8d5b5] leading-8 mb-7 text-sm md:text-base">
                Bardia is one of Asia&apos;s last great wilderness frontiers. Until we&apos;ve
                finished crafting our own story, explore the wild world you&apos;ll step
                into — through the lens of those who know it best.
              </p>
              <Link
                href="https://www.youtube.com/results?search_query=bardia+national+park+nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3.5 border border-[#d4a85a] text-[#f5ede0] uppercase tracking-[0.18em] text-xs hover:bg-[#d4a85a] hover:text-[#1c2316] transition-all duration-300"
              >
                Watch Bardia Stories
              </Link>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* ── 6. Signature Experiences ── */}
      <section id="experiences" className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <MotionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-3">
                Signature Experiences
              </p>
              <h3 className="font-serif text-3xl md:text-5xl text-[#1e1a14]">
                Three Ways To Feel Bardia
              </h3>
            </div>
            <Link
              href="/activities"
              className="text-xs tracking-[0.2em] uppercase text-[#8b5e3c] border-b border-[#c8923a] pb-0.5 hover:text-[#c8923a] transition-colors shrink-0"
            >
              All Activities
            </Link>
          </MotionReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {signatureExperiences.map((item, index) => (
              <MotionReveal
                as="article"
                key={item.title}
                className="group"
                delay={index * 0.1}
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden mb-5">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#1c2316]/15 group-hover:bg-[#1c2316]/5 transition-colors duration-500" />
                  {/* Number */}
                  <div className="absolute bottom-4 left-4 font-serif text-3xl text-white/50 leading-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                {/* Text */}
                <h4 className="font-serif text-xl text-[#1e1a14] mb-3">{item.title}</h4>
                <p className="text-[#4a3a28] text-sm leading-7 mb-4">{item.description}</p>
                <Link
                  href={item.href}
                  className="text-[10px] tracking-[0.2em] uppercase text-[#c8923a] hover:text-[#8b5e3c] transition-colors"
                >
                  Learn More →
                </Link>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Newsletter ── */}
      <section id="newsletter" className="bg-[#1c2316] text-[#f5ede0] py-20 md:py-24">
        <MotionReveal className="max-w-5xl mx-auto px-6 md:px-12 text-center" direction="none">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">
            Stay Connected
          </p>
          <h3 className="font-serif text-3xl md:text-5xl mb-5">
            Postcards From The Jungle
          </h3>
          <p className="max-w-xl mx-auto text-[#c8baa0] leading-8 mb-10 text-sm">
            Sign up for seasonal offers, safari stories, and travel notes from
            Forest Hideaway Resort — delivered quietly, like the forest itself.
          </p>
          <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email Address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 bg-transparent border border-[#3d4f2c] text-[#f5ede0] placeholder:text-[#7a6852] focus:outline-none focus:border-[#c8923a] transition-colors"
            />
            <button
              type="submit"
              className="px-7 py-3.5 border border-[#c8923a] text-[#f5ede0] uppercase tracking-[0.18em] text-xs hover:bg-[#c8923a] hover:text-[#1c2316] transition-all duration-300 whitespace-nowrap"
            >
              Sign Me Up
            </button>
          </form>
        </MotionReveal>
      </section>

      {/* ── 8. Instagram Gallery ── */}
      <section className="bg-[#faf6ef] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <MotionReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-3">
                Instagram
              </p>
              <h3 className="font-serif text-3xl md:text-4xl text-[#1e1a14]">
                Moments From The Wild
              </h3>
            </div>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase text-[#8b5e3c] border-b border-[#c8923a] pb-0.5 hover:text-[#c8923a] transition-colors shrink-0"
            >
              Follow Us
            </Link>
          </MotionReveal>

          {/* 4-column photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[
              { src: "/assets/elephants.webp", alt: "Elephants in jungle" },
              { src: "/assets/elephants-in-lake.jpg", alt: "Elephants near water" },
              { src: "/assets/tiger.jpg", alt: "Tiger in Bardia" },
              {
                src: "https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=600&q=80&fit=crop",
                alt: "Bird life in Bardia National Park",
              },
            ].map((photo, index) => (
              <MotionReveal
                key={photo.src}
                delay={index * 0.07}
                className="relative h-44 md:h-64 overflow-hidden group"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#1c2316]/0 group-hover:bg-[#1c2316]/25 transition-colors duration-500" />
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
