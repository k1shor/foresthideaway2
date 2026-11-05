import Image from "next/image";
import type { Metadata } from "next";
import CtaLink from "@/components/ui/CtaLink";
import { getBardiaPage } from "@/lib/api/pages";

export const metadata: Metadata = {
  title: "Bardia National Park — Forest Hideaway Resort | Nepal",
  description:
    "Everything you need to know about Bardia National Park, Nepal — wildlife, best season, travel tips, and the unique ecosystem that makes it one of Asia's greatest wildlife destinations.",
};

export default async function BardiaNationalParkPage() {
  const page = await getBardiaPage();
  const { hero, landscape, wildlife, bestTime, gettingThere, conservation, quote } = page;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.image}
            alt="Wildlife in Bardia National Park"
            fill
            className="object-cover opacity-35"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/70 via-[#1c2316]/50 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">{hero.label}</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{hero.heading}</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p
            className="max-w-2xl mx-auto text-[#c8baa0] leading-8"
            dangerouslySetInnerHTML={{ __html: hero.subtext }}
          />
        </div>
      </section>

      {/* ── Intro split ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">
              {landscape.label}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-6 leading-snug">
              {landscape.heading}
            </h2>
            <p
              className="text-[#4a3a28] leading-8 mb-5"
              dangerouslySetInnerHTML={{ __html: landscape.body1 }}
            />
            <p
              className="text-[#4a3a28] leading-8 mb-7"
              dangerouslySetInnerHTML={{ __html: landscape.body2 }}
            />
            <ul className="space-y-3">
              {landscape.facts.map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-[#4a3a28] text-sm">
                  <span className="text-[#c8923a] mt-1 shrink-0">—</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 md:h-[480px] overflow-hidden">
            <Image
              src={landscape.image}
              alt="Bengal tiger in Bardia National Park"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ── Wildlife Grid ── */}
      <section className="bg-[#2a3320] text-[#f5ede0] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">{wildlife.label}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5ede0] mb-14">{wildlife.heading}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildlife.animals.map((animal) => (
              <div
                key={animal.name}
                className="border border-[#3d4f2c] p-6 hover:border-[#c8923a] transition-colors duration-300"
              >
                <div className="text-3xl mb-4">{animal.icon}</div>
                <h3 className="font-serif text-lg text-[#f5ede0] mb-2">{animal.name}</h3>
                <p className="text-[#c8baa0] text-sm leading-6">{animal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Time / Practical Info ── */}
      <section className="bg-[#ede0cc] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10">
          {[bestTime, gettingThere].map((section) => (
            <div key={section.heading} className="bg-white/60 border border-[#e8d8c0] p-7 md:p-9">
              <h3 className="font-serif text-2xl text-[#1e1a14] mb-4">{section.heading}</h3>
              <p
                className="text-[#4a3a28] text-sm leading-7 mb-5"
                dangerouslySetInnerHTML={{ __html: section.body }}
              />
              <ul className="space-y-2">
                {section.extras.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#4a3a28] text-sm">
                    <span className="text-[#c8923a] mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conservation ── */}
      <section className="bg-[#1c2316] text-[#f5ede0] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-center">
          <div className="relative h-64 md:h-80 overflow-hidden order-2 md:order-1">
            <Image
              src={conservation.image}
              alt="Elephants in Bardia jungle"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">
              {conservation.label}
            </p>
            <h2 className="font-serif text-3xl text-[#f5ede0] mb-5">{conservation.heading}</h2>
            <p
              className="text-[#c8baa0] text-sm leading-7 mb-4"
              dangerouslySetInnerHTML={{ __html: conservation.body1 }}
            />
            <p
              className="text-[#c8baa0] text-sm leading-7"
              dangerouslySetInnerHTML={{ __html: conservation.body2 }}
            />
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-[#f5ede0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <blockquote
            className="font-serif text-2xl md:text-3xl text-[#1e1a14] leading-snug mb-8"
            dangerouslySetInnerHTML={{ __html: `&ldquo;${quote.text}&rdquo;` }}
          />
          <CtaLink href="/activities" variant="gold" className="px-8 py-4 tracking-[0.18em] text-xs">
            {quote.ctaLabel}
          </CtaLink>
        </div>
      </section>
    </>
  );
}
