import { notFound } from 'next/navigation';
import { packagesSubmenu } from '@/data/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

function getSlugFromHref(href: string) {
  return href.split('/').pop() || '';
}

/* ── Per-package content ────────────────────────────── */
const packageContent: Record<string, {
  tag: string;
  duration: string;
  img: string;
  description: string;
  itinerary: { day: string; title: string; items: string[] }[];
  inclusions: string[];
  exclusions: string[];
  suitableFor: string;
}> = {
  'bardia-at-a-glance-tour-2-nights-3-days': {
    tag: 'Short Escape',
    duration: '2 Nights · 3 Days',
    img: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1400&q=80&fit=crop',
    description: 'The ideal first encounter with Bardia. Two mornings in the jungle, a sunset viewpoint walk, and warm evenings with our Tharu team — enough to hear the forest breathe and carry a little of its calm home with you.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Orientation', items: ['Airport / bus-stand pickup', 'Resort check-in & jungle briefing', 'Afternoon nature walk in the buffer zone', 'Welcome Tharu cultural evening'] },
      { day: 'Day 2', title: 'Into the Jungle', items: ['Dawn jeep safari in core park zone', 'Breakfast back at the resort', 'Rest & leisure at the resort', 'Afternoon jeep safari — sunset timing', 'Fireside dinner'] },
      { day: 'Day 3', title: 'Morning & Departure', items: ['Optional early birding walk', 'Breakfast & check-out', 'Transfer to airport or bus station'] },
    ],
    inclusions: ['2 guided jeep safaris', '1 guided nature walk', 'All meals (full board)', 'Airport/bus station transfers', 'Welcome cultural evening', 'National park entry fee'],
    exclusions: ['International & domestic flights', 'Travel insurance', 'Personal expenses', 'Optional add-on activities'],
    suitableFor: 'First-time visitors, short-break travelers, couples',
  },
  'bardia-highlights-tour-3-nights-4-days': {
    tag: 'Most Popular',
    duration: '3 Nights · 4 Days',
    img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80&fit=crop',
    description: "The resort's signature rhythm — a careful balance of early morning drives, river-side afternoons, cultural immersion, and enough slow time to actually feel Bardia rather than just see it.",
    itinerary: [
      { day: 'Day 1', title: 'Arrival', items: ['Transfer from airport/bus', 'Orientation & jungle briefing', 'Evening nature walk', 'Tharu cultural welcome dinner'] },
      { day: 'Day 2', title: 'Deep Jungle', items: ['Dawn jeep safari', 'Breakfast', 'Karnali riverbank excursion', 'Afternoon jeep safari'] },
      { day: 'Day 3', title: 'River & Culture', items: ['Dawn jeep safari', 'Walking safari along forest edge', 'Tharu village visit', 'Sunset viewpoint', 'Bonfire dinner'] },
      { day: 'Day 4', title: 'Final Morning', items: ['Optional morning birding', 'Breakfast & checkout', 'Transfer to airport or bus station'] },
    ],
    inclusions: ['3 guided jeep safaris', 'Karnali river excursion', 'Walking safari', 'All meals', 'Tharu village visit', 'Cultural evening', 'Airport transfers', 'Park entry fees'],
    exclusions: ['Flights', 'Travel insurance', 'Personal expenses', 'Optional specialist activities'],
    suitableFor: 'Most traveler profiles — families, couples, solo travelers, wildlife enthusiasts',
  },
  'best-of-bardia-4-nights-5-days': {
    tag: 'Full Immersion',
    duration: '4 Nights · 5 Days',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&q=80&fit=crop',
    description: 'The deepest Bardia journey we offer. Four full days to track wildlife, float the Karnali, meet communities, and find that rare stillness only a long jungle stay delivers.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Welcome', items: ['Transfer & check-in', 'Jungle orientation', 'Evening nature walk', 'Tharu cultural welcome'] },
      { day: 'Day 2', title: 'Into the Core Zone', items: ['Full-day deep jungle jeep safari', 'Picnic lunch in the park', 'Sundowners at forest viewpoint'] },
      { day: 'Day 3', title: 'Karnali Day', items: ['Dawn jeep safari', 'Full-day Karnali river excursion', 'Riverside lunch', 'Wildlife observation from river'] },
      { day: 'Day 4', title: 'Culture & Photography', items: ['Dawn birding walk', 'Tharu village cultural immersion', 'Photography session with guide', 'Bonfire & storytelling evening'] },
      { day: 'Day 5', title: 'Final Morning', items: ['Optional dawn safari', 'Breakfast & checkout', 'Transfer'] },
    ],
    inclusions: ['4 guided game drives', 'Full-day Karnali excursion', 'Walking & birding safari', 'Photography guide session', 'Tharu cultural immersion', 'All meals', 'Airport transfers', 'Park entry fees'],
    exclusions: ['Flights', 'Travel insurance', 'Personal expenses'],
    suitableFor: 'Dedicated wildlife enthusiasts, photographers, culture travelers, return visitors',
  },
  'babai-river-fishing-one-day': {
    tag: 'Specialty',
    duration: '1 Day',
    img: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1400&q=80&fit=crop',
    description: 'A focused one-day experience on the Babai River — one of Nepal\'s finest sport-fishing stretches, rich with golden mahseer and accompanied by pristine jungle riverbank scenery.',
    itinerary: [
      { day: 'Morning', title: 'River Briefing & Start', items: ['Early departure from resort', 'Safety briefing & equipment setup', 'Fishing begins at prime spots'] },
      { day: 'Midday', title: 'Riverside Lunch', items: ['Packed riverside lunch', 'Continue fishing through afternoon'] },
      { day: 'Evening', title: 'Return', items: ['Wrap up & return to resort', 'Debrief over dinner'] },
    ],
    inclusions: ['Expert local fishing guide', 'All equipment provided', 'Packed riverside lunch', 'Transport to/from river', 'Fishing permit'],
    exclusions: ['Accommodation (add-on)', 'Personal fishing gear if preferred', 'Travel insurance'],
    suitableFor: 'Anglers and fishing enthusiasts; no prior Nepal fishing experience required',
  },
  'rana-tharu-cultural-tour-2-nights-3-days': {
    tag: 'Cultural',
    duration: '2 Nights · 3 Days',
    img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1400&q=80&fit=crop',
    description: 'An immersive journey into the Tharu villages surrounding Bardia — learning traditional crafts, cuisine, and the stories of people whose ancestors coexisted with this jungle long before it was a national park.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Village Orientation', items: ['Transfer & resort check-in', 'Evening Tharu village visit', 'Traditional welcome dinner & performance'] },
      { day: 'Day 2', title: 'Culture & Safari', items: ['Morning jeep safari', 'Traditional Tharu craft workshop', 'Village home lunch with local family', 'Storytelling evening at resort'] },
      { day: 'Day 3', title: 'Morning & Departure', items: ['Optional village morning walk', 'Breakfast & checkout', 'Transfer'] },
    ],
    inclusions: ['Village home visits', 'Traditional Tharu meal', 'Cultural performance', '1 jeep safari', 'Craft workshop', 'All meals', 'Airport transfers'],
    exclusions: ['Flights', 'Travel insurance', 'Personal purchases from village artisans'],
    suitableFor: 'Culture travelers, families, photographers, sociology and anthropology enthusiasts',
  },
  'wildlife-photography-tour': {
    tag: 'Specialist',
    duration: '4 Nights · 5 Days',
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1400&q=80&fit=crop',
    description: 'Designed around the photographer\'s pace — early drives, optimal positioning, hide access, and a specialist naturalist guide who understands what the lens demands.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Equipment Check', items: ['Transfer & check-in', 'Pre-shoot briefing with guide', 'Sunset test shots at buffer zone'] },
      { day: 'Day 2–4', title: 'Intensive Photography Days', items: ['Pre-dawn drives for golden hour', 'Photography hide sessions at waterholes', 'Raptor & bird focus sessions', 'Review & guide debrief each evening'] },
      { day: 'Day 5', title: 'Final Morning & Departure', items: ['Optional final dawn shoot', 'Checkout & transfer'] },
    ],
    inclusions: ['Photography-optimized drives', 'Waterhole hide access', 'Specialist naturalist guide', 'All meals', 'Airport transfers', 'Park entry fees'],
    exclusions: ['Camera equipment', 'Flights', 'Travel insurance', 'Post-processing support'],
    suitableFor: 'Wildlife photographers — beginner to professional level',
  },
};

export async function generateStaticParams() {
  return packagesSubmenu.map((item) => ({
    slug: getSlugFromHref(item.href),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = packagesSubmenu.find((item) => getSlugFromHref(item.href) === slug);
  if (!pkg) return { title: 'Package Not Found' };
  return {
    title: `${pkg.label} — Forest Hideaway Resort`,
    description: packageContent[slug]?.description ?? pkg.label,
  };
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = packagesSubmenu.find((item) => getSlugFromHref(item.href) === slug);
  if (!pkg) notFound();

  const content = packageContent[slug];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {content?.img && (
            <Image
              src={content.img}
              alt={pkg!.label}
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
            {content?.tag ?? 'Package'}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-4">{pkg!.label}</h1>
          {content?.duration && (
            <p className="text-[#c8baa0] text-sm tracking-widest uppercase">{content.duration}</p>
          )}
        </div>
      </section>

      {content ? (
        <>
          {/* ── Overview ── */}
          <section className="bg-[#f5ede0] py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-start">
              <div>
                <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Overview</p>
                <h2 className="font-serif text-3xl text-[#1e1a14] mb-5">About This Package</h2>
                <p className="text-[#4a3a28] leading-8 mb-7">{content.description}</p>
                <div className="border-l-2 border-[#c8923a] pl-4">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-[#8b5e3c] mb-1">Suitable For</p>
                  <p className="text-[#4a3a28] text-sm">{content.suitableFor}</p>
                </div>
              </div>
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={content.img}
                  alt={pkg!.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>

          {/* ── Itinerary ── */}
          <section className="bg-[#faf6ef] py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Day By Day</p>
              <h2 className="font-serif text-3xl text-[#1e1a14] mb-10">Your Itinerary</h2>
              <div className="space-y-8">
                {content.itinerary.map((day, i) => (
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

          {/* ── Inclusions / Exclusions ── */}
          <section className="bg-[#ede0cc] py-16 md:py-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10">
              <div className="bg-white/70 border border-[#e8d8c0] p-7">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-4">Included</p>
                <ul className="space-y-2.5">
                  {content.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-[#4a3a28] text-sm leading-6">
                      <span className="text-[#c8923a]">✓</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/70 border border-[#e8d8c0] p-7">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#7a6852] mb-4">Not Included</p>
                <ul className="space-y-2.5">
                  {content.exclusions.map((exc) => (
                    <li key={exc} className="flex items-start gap-2 text-[#7a6852] text-sm leading-6">
                      <span>–</span> {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="bg-[#1c2316] py-14 md:py-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
              <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Ready to Book?</p>
              <h2 className="font-serif text-3xl text-[#f5ede0] mb-6">Start Your Bardia Journey</h2>
              <p className="text-[#c8baa0] text-sm mb-8 max-w-md mx-auto">
                Reach out and we&apos;ll confirm availability, tailor the package to your travel dates, and answer any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 border border-[#d4a85a] text-[#f5ede0] uppercase tracking-[0.2em] text-xs hover:bg-[#d4a85a] hover:text-[#1c2316] transition-all duration-300"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/packages"
                  className="inline-block px-8 py-4 border border-[#3d4f2c] text-[#c8baa0] uppercase tracking-[0.2em] text-xs hover:border-[#c8923a] hover:text-[#c8923a] transition-all duration-300"
                >
                  All Packages
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Fallback for unknown slugs that still match submenu */
        <section className="bg-[#f5ede0] py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <p className="text-[#4a3a28] leading-8 mb-8">Full details for this package are coming soon. Please contact us for more information.</p>
            <Link href="/contact" className="inline-block px-7 py-3.5 border border-[#c8923a] text-[#c8923a] uppercase tracking-[0.18em] text-xs hover:bg-[#c8923a] hover:text-white transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
