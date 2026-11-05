import Image from "next/image";
import type { Metadata } from "next";
import CtaLink from "@/components/ui/CtaLink";
import { getAboutPage } from "@/lib/api/pages";

export const metadata: Metadata = {
  title: "About Us — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Learn the story behind Forest Hideaway Resort — a safari-led hospitality home on the edge of Bardia National Park, inspired by Tharu culture and the slow rhythms of the jungle.",
};

export default async function AboutUsPage() {
  const page = await getAboutPage();
  const { hero, team, philosophy, quote, facilities } = page;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.image}
            alt="Forest Hideaway Resort exterior"
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 via-[#1c2316]/60 to-[#1c2316]" />
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

      {/* ── Who We Are ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">{team.label}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-6 leading-snug">
              {team.heading}
            </h2>
            <p className="text-[#4a3a28] leading-8 mb-5" dangerouslySetInnerHTML={{ __html: team.body1 }} />
            <p className="text-[#4a3a28] leading-8" dangerouslySetInnerHTML={{ __html: team.body2 }} />
          </div>
          <div className="relative h-80 md:h-[460px] overflow-hidden">
            <Image
              src={team.image}
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
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">{philosophy.label}</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-14 text-[#f5ede0]">{philosophy.heading}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {philosophy.values.map((v, i) => (
              <article key={v.title} className="border-t border-[#3d4f2c] pt-6">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>
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
          <blockquote
            className="font-serif text-2xl md:text-[2.2rem] text-[#1e1a14] leading-snug"
            dangerouslySetInnerHTML={{ __html: `&ldquo;${quote.text}&rdquo;` }}
          />
        </div>
      </section>

      {/* ── Facilities ── */}
      <section className="bg-[#faf6ef] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">{facilities.label}</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-12">{facilities.heading}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {facilities.items.map((item) => (
              <article key={item.heading} className="border border-[#e8d8c0] bg-white/60 p-7 md:p-9">
                <h3 className="font-serif text-xl text-[#1e1a14] mb-4">{item.heading}</h3>
                <p className="text-[#4a3a28] text-sm leading-7">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <CtaLink href="/contact" variant="gold" className="px-7 py-3.5 tracking-[0.18em] text-xs">
              {facilities.ctaLabel}
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
