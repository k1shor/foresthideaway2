import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPackageBySlug } from '@/lib/api/packages';
import CtaLink from '@/components/ui/CtaLink';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const pkg = await getPackageBySlug(slug);
    return {
      title: `${pkg.name} — Forest Hideaway Resort`,
      description: pkg.description,
    };
  } catch {
    return { title: 'Package Not Found' };
  }
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;

  let pkg;
  try {
    pkg = await getPackageBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {pkg.img && (
            <Image
              src={pkg.img}
              alt={pkg.name}
              fill
              className="object-cover opacity-25"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-3">
            {pkg.tag || 'Package'}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-4">{pkg.name}</h1>
          {pkg.duration && (
            <p className="text-[#c8baa0] text-sm tracking-widest uppercase">{pkg.duration}</p>
          )}
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-[#f5ede0] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Overview</p>
            <h2 className="font-serif text-3xl text-[#1e1a14] mb-5">About This Package</h2>
            <p className="text-[#4a3a28] leading-8 mb-7">{pkg.description}</p>
            {pkg.suitableFor && (
              <div className="border-l-2 border-[#c8923a] pl-4">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-1">Suitable For</p>
                <p className="text-[#4a3a28] text-sm">{pkg.suitableFor}</p>
              </div>
            )}
          </div>
          <div className="relative h-64 md:h-80 overflow-hidden bg-[#e8d8c0]">
            {pkg.img && (
              <Image
                src={pkg.img}
                alt={pkg.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Itinerary ── */}
      {pkg.itinerary.length > 0 && (
        <section className="bg-[#faf6ef] py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Day By Day</p>
            <h2 className="font-serif text-3xl text-[#1e1a14] mb-10">Your Itinerary</h2>
            <div className="space-y-8">
              {pkg.itinerary.map((day, i) => (
                <div key={i} className="grid md:grid-cols-[120px_1fr] gap-4 border-t border-[#e8d8c0] pt-6">
                  <div>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-1">{day.day}</p>
                    <p className="font-serif text-lg text-[#1e1a14]">{day.title}</p>
                  </div>
                  <ul className="space-y-2">
                    {day.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[#4a3a28] text-sm leading-6">
                        <span className="text-[#c8923a] mt-0.5 shrink-0">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Inclusions / Exclusions ── */}
      {(pkg.inclusions.length > 0 || pkg.exclusions.length > 0) && (
        <section className="bg-[#ede0cc] py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10">
            <div className="bg-white/70 border border-[#e8d8c0] p-7">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-4">Included</p>
              <ul className="space-y-2.5">
                {pkg.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-[#4a3a28] text-sm leading-6">
                    <span className="text-[#c8923a]">✓</span> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/70 border border-[#e8d8c0] p-7">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#7a6852] mb-4">Not Included</p>
              <ul className="space-y-2.5">
                {pkg.exclusions.map((exc) => (
                  <li key={exc} className="flex items-start gap-2 text-[#7a6852] text-sm leading-6">
                    <span>–</span> {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-[#1c2316] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Ready to Book?</p>
          <h2 className="font-serif text-3xl text-[#f5ede0] mb-6">Start Your Bardia Journey</h2>
          <p className="text-[#c8baa0] text-sm mb-8 max-w-md mx-auto">
            Reach out and we&apos;ll confirm availability, tailor the package to your travel dates, and answer any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaLink href="/contact" variant="cream" className="px-8 py-4 tracking-[0.2em] text-xs">
              Enquire Now
            </CtaLink>
            <CtaLink href="/packages" variant="muted" className="px-8 py-4 tracking-[0.2em] text-xs">
              All Packages
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
