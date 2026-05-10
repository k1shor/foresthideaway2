import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Learn the story behind Forest Hideaway Resort — a safari-led hospitality home on the edge of Bardia National Park, inspired by Tharu culture and the slow rhythms of the jungle.",
};

const values = [
  {
    num: "01",
    title: "Rooted in Place",
    body: "Every detail of the resort — from the architecture to the food — reflects the Tharu vernacular tradition and the landscape it inhabits.",
  },
  {
    num: "02",
    title: "Safari First",
    body: "We are foremost a safari destination. Our team of experienced naturalists and guides are the heart of every guest's Bardia experience.",
  },
  {
    num: "03",
    title: "Slow by Design",
    body: "We don't overpack itineraries. Time between encounters, quiet afternoons by the fire — these are part of the journey, not gaps in it.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80&fit=crop"
            alt="Forest Hideaway Resort exterior"
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 via-[#1c2316]/60 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">About Us</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            Forest Hideaway Story
          </h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-2xl mx-auto text-[#c8baa0] leading-8">
            Inspired by Tharu vernacular style and rooted in safari hosting tradition,
            Forest Hideaway is a warm base for meaningful journeys in Bardia — designed
            for travelers who value nature, comfort, and human connection.
          </p>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Our People</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-6 leading-snug">
              A Team Shaped by the Jungle
            </h2>
            <p className="text-[#4a3a28] leading-8 mb-5">
              Forest Hideaway was founded with one simple conviction — that a stay in Bardia
              should be personal, unhurried, and deeply connected to land and culture. Our
              hosts, guides, and naturalists are local to the region, many from Tharu
              heritage, and bring an intimate knowledge of the ecosystem that no textbook can replicate.
            </p>
            <p className="text-[#4a3a28] leading-8">
              From the moment you arrive, you&apos;re welcomed not as a guest, but as someone
              who has come to experience something real. That warmth runs through every meal,
              every game drive, and every quiet evening by the fire.
            </p>
          </div>
          <div className="relative h-80 md:h-[460px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80&fit=crop"
              alt="Elephant encounter in Bardia National Park"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-[#2a3320] text-[#f5ede0] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Our Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-14 text-[#f5ede0]">
            What We Believe In
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v) => (
              <article key={v.num} className="border-t border-[#3d4f2c] pt-6">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-4">{v.num}</p>
                <h3 className="font-serif text-xl text-[#f5ede0] mb-4">{v.title}</h3>
                <p className="text-[#c8baa0] text-sm leading-7">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-[#ede0cc] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mb-6" />
          <blockquote className="font-serif text-2xl md:text-[2.2rem] text-[#1e1a14] leading-snug">
            &ldquo;A stay in Bardia should feel personal, unhurried,
            and deeply connected to land and culture.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section className="bg-[#faf6ef] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">The Resort</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-12">
            Comfort in the Jungle
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                heading: "Accommodation",
                body: "Our rooms and cottages are built in a style inspired by traditional Tharu architecture — earthy textures, high ceilings, and open courtyards that catch the jungle breeze. Every space is designed for rest, not just sleep.",
              },
              {
                heading: "Dining",
                body: "Meals at Forest Hideaway are an experience in themselves. Expect Nepali and Tharu-influenced cuisine prepared fresh, communal evening meals by firelight, and packed safari breakfasts for early morning drives.",
              },
              {
                heading: "Safari & Guide Support",
                body: "Our naturalist guides are the backbone of the experience. We maintain a small guest-to-guide ratio so every outing feels personal, focused, and never rushed.",
              },
              {
                heading: "Open Spaces",
                body: "A fire-side lounge area, open garden paths, and a quiet viewing deck overlooking the jungle fringe give you room to breathe, read, and decompress between adventures.",
              },
            ].map((section) => (
              <article
                key={section.heading}
                className="border border-[#e8d8c0] bg-white/60 p-7 md:p-9"
              >
                <h3 className="font-serif text-xl text-[#1e1a14] mb-4">{section.heading}</h3>
                <p className="text-[#4a3a28] text-sm leading-7">{section.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-block px-7 py-3.5 border border-[#c8923a] text-[#c8923a] uppercase tracking-[0.18em] text-xs hover:bg-[#c8923a] hover:text-white transition-all duration-300"
            >
              Plan Your Stay
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
