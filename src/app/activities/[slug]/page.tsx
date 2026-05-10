import { notFound } from 'next/navigation';
import { activitiesSubmenu } from '@/data/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

function getSlugFromHref(href: string) {
  return href.split('/').pop() || '';
}

const activityContent: Record<string, {
  tag: string;
  duration: string;
  img: string;
  description: string;
  highlights: { title: string; body: string }[];
  whatToExpect: string[];
  practicalNotes: string[];
}> = {
  'jeep-safari': {
    tag: 'Wildlife',
    duration: 'Half Day or Full Day',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=80&fit=crop',
    description: 'Track Bengal tigers, one-horned rhinos, wild elephants, and deer through Bardia\'s sal forest and open grasslands in an open-top 4WD with an experienced naturalist guide. Dawn drives offer the best odds — the light is golden, the animals are active, and the jungle is at its most alive.',
    highlights: [
      { title: 'Wildlife', body: 'Bardia is one of Nepal\'s finest tiger destinations. Elephants, rhinos, deer, crocodiles, and an extraordinary diversity of birds complete the cast.' },
      { title: 'Guiding', body: 'Our naturalists are trained trackers with deep local knowledge — they read signs the untrained eye misses entirely.' },
      { title: 'Timing', body: 'Dawn and dusk drives are most productive. Full-day safaris also include midday grassland scanning for resting predators.' },
    ],
    whatToExpect: ['Depart before sunrise for first light', 'Open 4WD with elevated game-viewing position', 'Expert naturalist guide throughout', 'Wildlife tracking across multiple park zones', 'Return by mid-morning or evening depending on duration'],
    practicalNotes: ['Wear muted, earthy clothing — no bright colours', 'Bring a light layer for pre-dawn temperatures', 'Binoculars recommended', 'Camera telephoto lens advisable', 'Children welcome with parental supervision'],
  },
  'walking-safari': {
    tag: 'Nature',
    duration: '3–4 Hours',
    img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&q=80&fit=crop',
    description: 'Move slowly through the forest on foot and experience Bardia at a completely different register. On foot you hear things, smell things, and notice details that disappear at vehicle speed. A trained armed guide accompanies all walks for complete safety.',
    highlights: [
      { title: 'Sensation', body: 'Walking heightens every sense. The rustle of leaves, a distant alarm call, the scent of fresh elephant dung — on foot, Bardia reveals itself differently.' },
      { title: 'Flora Focus', body: 'Walking safaris allow time for trees, medicinal plants, insects, and bird behaviour that jeep drives rush past.' },
      { title: 'Safety', body: 'All walking safaris are led by a trained armed guide familiar with animal behaviour and emergency protocols.' },
    ],
    whatToExpect: ['Early morning departure (best timing)', 'Walk along forest trails and river edges', 'Naturalist explains flora, fauna, and tracks', 'Slower pace — discovery over distance', 'Return to resort for breakfast'],
    practicalNotes: ['Closed-toe, sturdy footwear required', 'Muted clothing only', 'No strong perfumes or fragrances', 'Not recommended for guests with serious mobility limitations', 'Maximum group size: 6'],
  },
  'elephant-safari': {
    tag: 'Wildlife',
    duration: '2–3 Hours',
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1400&q=80&fit=crop',
    description: 'Experience Bardia from elephant-back — a traditional and intimate way to move through tall grasslands where tigers often rest during the day. The height advantage and near-silent movement make elephant safaris uniquely effective for dense grass terrain.',
    highlights: [
      { title: 'Access', body: 'Elephants can move through terrain vehicles cannot reach — dense grasslands and marshy areas become accessible.' },
      { title: 'Silence', body: 'The near-silent movement means animals don\'t flee. Encounters feel closer, calmer, and more intimate.' },
      { title: 'Tradition', body: 'Elephant safaris are deeply woven into Nepal\'s wildlife tourism heritage — a truly timeless experience.' },
    ],
    whatToExpect: ['Morning departure', 'Elephant mounting platform at resort', 'Experienced mahout (elephant handler) throughout', 'Movement through grassland and forest edge', 'Duration approximately 2–3 hours'],
    practicalNotes: ['Not suitable for guests with back problems', 'Dress in layers for morning chill', 'Photography is excellent from elephant height', 'Child minimum age: 5 years'],
  },
  'bird-watching-tour': {
    tag: 'Nature',
    duration: 'Morning or Full Day',
    img: 'https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=1400&q=80&fit=crop',
    description: 'With over 400 recorded species, Bardia is one of South Asia\'s premier birding destinations. From the critically endangered Bengal florican to giant hornbills, pied kingfishers, and spectacular raptors — every morning walk is a living field guide.',
    highlights: [
      { title: '400+ Species', body: 'Bardia\'s diverse habitats — sal forest, grassland, riverine scrub, and wetland — each host distinct bird communities.' },
      { title: 'Rare Sightings', body: 'Bengal florican, grass owlets, jerdon\'s babbler, and various endangered raptors are regular recorded sightings.' },
      { title: 'Expert Guides', body: 'Our birding guides hold specialist qualifications and carry optical equipment for identification support.' },
    ],
    whatToExpect: ['Pre-dawn or dawn start for peak activity', 'Slow-paced walk through multiple habitat zones', 'Spotting scope and binoculars provided', 'Detailed identification notes', 'Species checklist provided on return'],
    practicalNotes: ['Bring your own binoculars if possible', 'Dress in muted, natural tones', 'Full-day version includes a riverside lunch break', 'Best October–May; February–April peak season'],
  },
  'karnali-river-rafting': {
    tag: 'Adventure',
    duration: 'Half Day or Full Day',
    img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=80&fit=crop',
    description: 'Float the Karnali River — one of Nepal\'s great waterways and the western boundary of Bardia National Park. Watch gharial crocodiles basking on sandbanks, spot river dolphins in the deeper channels, and take in the dramatic forested banks while the river carries you gently.',
    highlights: [
      { title: 'Wildlife on Water', body: 'Gharial crocodiles, river dolphins, migratory birds, and otters are all regularly seen from the river.' },
      { title: 'Different Perspective', body: 'Seeing Bardia\'s forest from the river reveals a completely different landscape and atmosphere.' },
      { title: 'Grade Level', body: 'The Karnali sections we use are calm to gentle — suitable for all fitness levels and non-swimmers with life jackets.' },
    ],
    whatToExpect: ['Transfer to launch point', 'Safety briefing & life jacket fitting', 'Guided float downstream (not whitewater)', 'Riverside stop for picnic or tea', 'Return transfer to resort'],
    practicalNotes: ['Life jackets provided — mandatory', 'Waterproof bag for camera gear recommended', 'Swimwear or quick-dry clothing advisable', 'Full-day version includes riverside lunch', 'Not available during high monsoon (June–August)'],
  },
  'fishing-tour': {
    tag: 'Specialty',
    duration: 'Full Day',
    img: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1400&q=80&fit=crop',
    description: 'Cast a line in the Babai or Karnali rivers for golden mahseer — one of the world\'s greatest sport fish, revered for its size, power, and the pristine habitat it requires. Accompanied by pristine jungle scenery and complete riverside tranquility.',
    highlights: [
      { title: 'Golden Mahseer', body: 'These powerful, golden-scaled fish can reach over 50kg. Catching one in Bardia is a genuine trophy experience.' },
      { title: 'Pristine Habitat', body: 'The Babai and Karnali are among Nepal\'s cleanest river systems — mahseer thrive here precisely because of that purity.' },
      { title: 'Catch & Release', body: 'We practice catch and release as standard, in alignment with conservation values.' },
    ],
    whatToExpect: ['Early morning departure to river', 'All tackle and equipment provided', 'Expert local fishing guide', 'Riverside packed lunch', 'Afternoon fishing session', 'Return to resort at sunset'],
    practicalNotes: ['No prior experience necessary', 'Bring sun protection and hat', 'Polarised sunglasses helpful for spotting fish', 'Fishing permit included in package'],
  },
  'bicycle-tour': {
    tag: 'Exploration',
    duration: 'Half Day',
    img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1400&q=80&fit=crop',
    description: 'Pedal along jungle-fringe paths, village lanes, and buffer zone trails — an unhurried way to experience the human landscape surrounding the national park. Meet Tharu farmers, visit local markets, and feel the gentle rhythm of life at the park\'s edge.',
    highlights: [
      { title: 'The Buffer Zone', body: 'The area surrounding the core park zone is a fascinating landscape where farming communities live alongside wildlife.' },
      { title: 'Village Life', body: 'Cycling pace is perfectly matched to spontaneous village encounters and local market stops.' },
      { title: 'Light Activity', body: 'Flat, easy terrain makes this suitable for most fitness levels and ages.' },
    ],
    whatToExpect: ['Quality mountain bikes provided', 'Naturalist guide accompanies throughout', 'Visit local villages and markets', 'Photo stops at scenic points', 'Approximately 15–25km depending on route'],
    practicalNotes: ['Helmets provided and mandatory', 'Suitable for ages 10+', 'Flat terrain — no technical cycling required', 'Best in morning before heat builds', 'Bring water and light snack'],
  },
  'tharu-cultural-program': {
    tag: 'Culture',
    duration: 'Evening (3–4 hours)',
    img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1400&q=80&fit=crop',
    description: 'Immerse yourself in the living culture of the Rana Tharu — the indigenous people of the Bardia region, whose ancestors coexisted with this jungle for centuries before it became a national park. Traditional dance, local food, and genuine storytelling in a firelit setting.',
    highlights: [
      { title: 'Traditional Dance', body: 'The Tharu stick dance and ritual performances are deeply expressive — energetic, symbolic, and unlike anything you\'ve seen.' },
      { title: 'Food & Fire', body: 'The evening includes a traditional Tharu meal around a fire — flavours rooted in local ingredients and centuries of practice.' },
      { title: 'Genuine Connection', body: 'This isn\'t a staged show. The Tharu guides are from the local community and share their culture with authentic pride.' },
    ],
    whatToExpect: ['Begin after sunset', 'Cultural performance with explanation', 'Traditional Tharu food served', 'Q&A with community members', 'Storytelling around the fire'],
    practicalNotes: ['Included in most packages; also bookable standalone', 'Respectful dress appreciated', 'Photography welcome with courtesy', 'Children find this particularly engaging'],
  },
  'speciality-tour': {
    tag: 'Bespoke',
    duration: 'Custom',
    img: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=1400&q=80&fit=crop',
    description: 'Have a specific passion — botanical research, herpetology, macro photography, acoustic recording, or cultural documentation? We design entirely bespoke experiences built around your expertise and interests with specialist local guidance.',
    highlights: [
      { title: 'Your Focus', body: 'Tell us what drives you and we build the experience around it — from pre-trip consultation to specialist guide matching.' },
      { title: 'Specialist Guides', body: 'Beyond generalist naturalists, we have access to botanical experts, herpetologists, and cultural specialists.' },
      { title: 'No Formula', body: 'Specialty tours are never template-based. Each one is conceived from scratch around the guest\'s specific intent.' },
    ],
    whatToExpect: ['Pre-trip consultation to understand your focus', 'Custom route and timing design', 'Specialist guide matched to your interest area', 'Fully flexible duration and pace', 'Debrief and documentation support if needed'],
    practicalNotes: ['Please contact us with details of your interest before booking', 'Pricing varies by specialization and duration', 'Advance notice of at least 2 weeks preferred', 'Academic and professional credentials welcomed'],
  },
};

export async function generateStaticParams() {
  return activitiesSubmenu.map((item) => ({
    slug: getSlugFromHref(item.href),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = activitiesSubmenu.find((item) => getSlugFromHref(item.href) === slug);
  if (!activity) return { title: 'Activity Not Found' };
  return {
    title: `${activity.label} — Forest Hideaway Resort`,
    description: activityContent[slug]?.description ?? activity.label,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = activitiesSubmenu.find((item) => getSlugFromHref(item.href) === slug);
  if (!activity) notFound();

  const content = activityContent[slug];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {content?.img && (
            <Image
              src={content.img}
              alt={activity!.label}
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
            {content?.tag ?? 'Activity'}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-4">{activity!.label}</h1>
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
                <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">The Experience</p>
                <h2 className="font-serif text-3xl text-[#1e1a14] mb-5">About This Activity</h2>
                <p className="text-[#4a3a28] leading-8">{content.description}</p>
              </div>
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={content.img}
                  alt={activity!.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>

          {/* ── Highlights ── */}
          <section className="bg-[#faf6ef] py-14 md:py-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Why It Matters</p>
              <h2 className="font-serif text-3xl text-[#1e1a14] mb-10">Highlights</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {content.highlights.map((h, i) => (
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

          {/* ── What to Expect / Practical Notes ── */}
          <section className="bg-[#ede0cc] py-14 md:py-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10">
              <div className="bg-white/60 border border-[#e8d8c0] p-7">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-4">What To Expect</p>
                <ul className="space-y-3">
                  {content.whatToExpect.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[#4a3a28] text-sm leading-6">
                      <span className="text-[#c8923a] mt-0.5 shrink-0">—</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/60 border border-[#e8d8c0] p-7">
                <p className="text-[11px] tracking-[0.25em] uppercase text-[#8b5e3c] mb-4">Practical Notes</p>
                <ul className="space-y-3">
                  {content.practicalNotes.map((note) => (
                    <li key={note} className="flex items-start gap-2 text-[#4a3a28] text-sm leading-6">
                      <span className="text-[#c8923a] mt-0.5 shrink-0">✓</span> {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="bg-[#1c2316] py-14 md:py-20">
            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
              <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Add To Your Stay</p>
              <h2 className="font-serif text-3xl text-[#f5ede0] mb-6">Book This Experience</h2>
              <p className="text-[#c8baa0] text-sm mb-8 max-w-md mx-auto">
                This activity can be combined with any of our packages or booked as a standalone day experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 border border-[#d4a85a] text-[#f5ede0] uppercase tracking-[0.2em] text-xs hover:bg-[#d4a85a] hover:text-[#1c2316] transition-all duration-300"
                >
                  Enquire Now
                </Link>
                <Link
                  href="/activities"
                  className="inline-block px-8 py-4 border border-[#3d4f2c] text-[#c8baa0] uppercase tracking-[0.2em] text-xs hover:border-[#c8923a] hover:text-[#c8923a] transition-all duration-300"
                >
                  All Activities
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-[#f5ede0] py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
            <p className="text-[#4a3a28] leading-8 mb-8">Full details for this activity are coming soon. Please contact us for more information.</p>
            <Link href="/contact" className="inline-block px-7 py-3.5 border border-[#c8923a] text-[#c8923a] uppercase tracking-[0.18em] text-xs hover:bg-[#c8923a] hover:text-white transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
