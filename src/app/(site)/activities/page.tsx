import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getActivities } from "@/lib/api/activities";
import CtaLink from "@/components/ui/CtaLink";

export const metadata: Metadata = {
  title: "Activities — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Discover Bardia through jeep safaris, river adventures, bird watching, Tharu cultural programs, and more — all guided by expert local naturalists.",
};

const tagColors: Record<string, string> = {
  Wildlife: "bg-[#2a3320] text-[#c8baa0]",
  Nature: "bg-[#3d4f2c] text-[#dde6d0]",
  Adventure: "bg-[#8b5e3c] text-[#f5ede0]",
  Culture: "bg-[#c8923a] text-white",
  Specialty: "bg-[#4a3a28] text-[#e8d5b5]",
  Exploration: "bg-[#1c2316] text-[#c8baa0]",
  Bespoke: "bg-[#1e1a14] text-[#d4a85a]",
};

export default async function ActivitiesPage() {
  const activities = await getActivities();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80&fit=crop"
            alt="Jeep safari through Bardia jungle"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">Experiences</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            Signature Activities
          </h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-2xl mx-auto text-[#c8baa0] leading-8">
            Every activity should reveal a different side of Bardia — not just fill an itinerary.
            From forest drives to cultural evenings, each experience is designed around your pace
            and guided by people who know this land intimately.
          </p>
        </div>
      </section>

      {/* ── Activities Grid ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((act, i) => (
              <Link
                key={act._id}
                href={`/activities/${act.slug}`}
                className="group bg-white border border-[#e8d8c0] overflow-hidden hover:border-[#c8923a] transition-colors duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#e8d8c0]">
                  {act.img && (
                    <Image
                      src={act.img}
                      alt={act.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-[#1c2316]/15" />
                  {/* Tag */}
                  <div className={`absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase px-3 py-1 ${tagColors[act.tag] ?? "bg-[#c8923a] text-white"}`}>
                    {act.tag}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-[#8b5e3c]">{act.duration}</p>
                    <span className="font-serif text-2xl text-[#e8d8c0] leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl text-[#1e1a14] mb-3">{act.title}</h2>
                  <p className="text-[#4a3a28] text-sm leading-7 mb-5 flex-1">{act.description}</p>
                  <span className="relative inline-flex self-start items-center overflow-hidden px-2 py-1 -mx-2 -my-1 text-[10px] tracking-[0.2em] uppercase text-[#c8923a] transition-colors duration-500">
                    <span className="absolute inset-0 bg-[#c8923a]/10 [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)] opacity-0 group-hover:opacity-100 transition-[clip-path,opacity] duration-[900ms] ease-in-out" />
                    <span className="relative z-10 group-hover:text-[#8b5e3c] transition-colors duration-500">
                      Learn More →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guide note ── */}
      <section className="bg-[#2a3320] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Expert Guidance</p>
            <h2 className="font-serif text-3xl text-[#f5ede0] mb-5">
              Led by Local Naturalists
            </h2>
            <p className="text-[#c8baa0] text-sm leading-7">
              Every activity at Forest Hideaway is led by guides who grew up alongside Bardia&apos;s
              ecosystems. Their knowledge is not academic — it&apos;s lived. They know where the tigers
              rest in summer, which river bend the dolphins frequent, and the names of every bird
              that calls before dawn.
            </p>
          </div>
          <div className="relative h-64 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80&fit=crop"
              alt="Karnali river in Bardia National Park"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#faf6ef] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Ready to Explore?</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-6">
            Build Your Bardia Itinerary
          </h2>
          <p className="text-[#4a3a28] text-sm leading-8 mb-8 max-w-lg mx-auto">
            Not sure which activities to combine? Browse our packages or reach out and
            we&apos;ll design the right mix for your travel style and duration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaLink href="/packages" variant="gold" className="px-8 py-4 tracking-[0.18em] text-xs">
              View Packages
            </CtaLink>
            <CtaLink href="/contact" variant="brown" className="px-8 py-4 tracking-[0.18em] text-xs">
              Contact Us
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
