import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest Reviews — Forest Hideaway Resort | Bardia, Nepal",
  description: "Read what guests say about their stay at Forest Hideaway Resort.",
};

const reviews = [
  {
    id: 1,
    name: "Sarah & James M.",
    origin: "United Kingdom",
    trip: "Bardia Signature Stay · March 2025",
    text: "We came hoping for tigers. We left with something richer — a connection to a place and its people. Three tiger sightings on consecutive drives. Completely extraordinary.",
  },
  {
    id: 2,
    name: "Dr. Anita Sharma",
    origin: "India",
    trip: "Wildlife Photography Tour · January 2025",
    text: "As a wildlife photographer I've traveled extensively. Bardia through Forest Hideaway's guides is something different. They positioned me perfectly for a tiger sighting I'll photograph forever.",
  },
  {
    id: 3,
    name: "The Bergmann Family",
    origin: "Germany",
    trip: "Complete Wilderness Retreat · December 2024",
    text: "Five days in Bardia changed our children's entire understanding of the natural world. Elephants, rhinos, crocodiles — and evenings learning Tharu stories around the fire. Unforgettable.",
  },
  {
    id: 4,
    name: "Marco T.",
    origin: "Italy",
    trip: "Jungle Discovery · October 2024",
    text: "Only three days and I worried it wouldn't be enough. It was more than enough. Two incredible morning drives, a beautiful river walk, and the warmest welcome I've experienced in Nepal.",
  },
  {
    id: 5,
    name: "Liu Wei & Chen Fang",
    origin: "China",
    trip: "Rana Tharu Cultural Tour · February 2025",
    text: "The Tharu cultural experience was a true highlight. We were welcomed into a village home, watched traditional dances, and heard stories passed down for generations. Three tiger sightings too!",
  },
  {
    id: 6,
    name: "Priya & Ravi Nair",
    origin: "Singapore",
    trip: "Bardia Signature Stay · November 2024",
    text: "The resort itself is beautiful — earthy, calm, thoughtfully designed. But what made our stay exceptional was the team. Every person made us feel genuinely cared for. Already planning our return.",
  },
];

export default function GuestReviewsPage() {
  return (
    <>
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/elephants-in-lake.jpg"
            alt="Elephants in Bardia"
            fill
            className="object-cover opacity-25"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">What Guests Say</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">Guest Reviews</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-xl mx-auto text-[#c8baa0] leading-8">
            Every story here is real — told by guests who came to Bardia for the wildlife and left carrying something they didn&apos;t expect to find.
          </p>
        </div>
      </section>

      <section className="bg-[#f5ede0] py-16 md:py-20 border-b border-[#e8d8c0]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mb-6" />
          <p className="font-serif text-2xl md:text-3xl text-[#1e1a14] leading-snug mb-5">
            &ldquo;The people made us feel at home, and the wilderness made us feel alive.&rdquo;
          </p>
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a]">— A Guest, 2024</p>
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mt-6" />
        </div>
      </section>

      <section className="bg-[#faf6ef] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Verified Stories</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-14">Voices From Bardia</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <article key={review.id} className="bg-white border border-[#e8d8c0] p-6 md:p-7 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((i) => <span key={i} className="text-[#c8923a] text-sm">★</span>)}
                </div>
                <p className="text-[#4a3a28] text-sm leading-7 mb-5 flex-1 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="border-t border-[#e8d8c0] pt-4">
                  <p className="font-medium text-[#1e1a14] text-sm">{review.name}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[#8b5e3c] mt-1">{review.origin}</p>
                  <p className="text-[10px] text-[#7a6852] mt-1">{review.trip}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1c2316] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Your Turn</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5ede0] mb-6">Write Your Own Bardia Story</h2>
          <p className="text-[#c8baa0] text-sm leading-8 mb-8 max-w-lg mx-auto">
            Every journey through Bardia is different. Start planning yours.
          </p>
          <Link
            href="/packages"
            className="inline-block px-8 py-4 border border-[#d4a85a] text-[#f5ede0] uppercase tracking-[0.2em] text-xs hover:bg-[#d4a85a] hover:text-[#1c2316] transition-all duration-300"
          >
            Plan Your Stay
          </Link>
        </div>
      </section>
    </>
  );
}
