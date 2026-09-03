import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getActivityBySlug } from '@/lib/api/activities';
import CtaLink from '@/components/ui/CtaLink';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const activity = await getActivityBySlug(slug);
    return {
      title: `${activity.title} — Forest Hideaway Resort`,
      description: activity.description,
    };
  } catch {
    return { title: 'Activity Not Found' };
  }
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;

  let activity;
  try {
    activity = await getActivityBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {activity.img && (
            <Image
              src={activity.img}
              alt={activity.title}
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
            {activity.tag || 'Activity'}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-4">{activity.title}</h1>
          {activity.duration && (
            <p className="text-[#c8baa0] text-sm tracking-widest uppercase">{activity.duration}</p>
          )}
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="bg-[#f5ede0] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">The Experience</p>
            <h2 className="font-serif text-3xl text-[#1e1a14] mb-5">About This Activity</h2>
            <p className="text-[#4a3a28] leading-8">{activity.description}</p>
          </div>
          <div className="relative h-64 md:h-80 overflow-hidden bg-[#e8d8c0]">
            {activity.img && (
              <Image
                src={activity.img}
                alt={activity.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      {activity.highlights.length > 0 && (
        <section className="bg-[#faf6ef] py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Why It Matters</p>
            <h2 className="font-serif text-3xl text-[#1e1a14] mb-10">Highlights</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {activity.highlights.map((h, i) => (
                <article key={h.title} className="border-t border-[#e8d8c0] pt-5">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-serif text-xl text-[#1e1a14] mb-3">{h.title}</h3>
                  <p className="text-[#4a3a28] text-sm leading-7">{h.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── What to Expect / Practical Notes ── */}
      {(activity.whatToExpect.length > 0 || activity.practicalNotes.length > 0) && (
        <section className="bg-[#ede0cc] py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10">
            <div className="bg-white/60 border border-[#e8d8c0] p-7">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-4">What To Expect</p>
              <ul className="space-y-3">
                {activity.whatToExpect.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[#4a3a28] text-sm leading-6">
                    <span className="text-[#c8923a] mt-0.5 shrink-0">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/60 border border-[#e8d8c0] p-7">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#8b5e3c] mb-4">Practical Notes</p>
              <ul className="space-y-3">
                {activity.practicalNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2 text-[#4a3a28] text-sm leading-6">
                    <span className="text-[#c8923a] mt-0.5 shrink-0">✓</span> {note}
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
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Add To Your Stay</p>
          <h2 className="font-serif text-3xl text-[#f5ede0] mb-6">Book This Experience</h2>
          <p className="text-[#c8baa0] text-sm mb-8 max-w-md mx-auto">
            This activity can be combined with any of our packages or booked as a standalone day experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaLink href="/contact" variant="cream" className="px-8 py-4 tracking-[0.2em] text-xs">
              Enquire Now
            </CtaLink>
            <CtaLink href="/activities" variant="muted" className="px-8 py-4 tracking-[0.2em] text-xs">
              All Activities
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
