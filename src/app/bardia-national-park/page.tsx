import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bardia National Park — Forest Hideaway Resort | Nepal",
  description:
    "Everything you need to know about Bardia National Park, Nepal — wildlife, best season, travel tips, and the unique ecosystem that makes it one of Asia's greatest wildlife destinations.",
};

const wildlife = [
  { name: "Bengal Tiger", desc: "Bardia has one of the highest tiger densities in Nepal. Dawn drives offer the best sighting odds.", icon: "🐅" },
  { name: "One-Horned Rhinoceros", desc: "A conservation success story — rhinos roam freely across Bardia's riverine grasslands.", icon: "🦏" },
  { name: "Asian Elephant", desc: "Wild herds move seasonally through the park's forests, often encountered near water sources.", icon: "🐘" },
  { name: "Gharial Crocodile", desc: "The Karnali and Babai rivers harbour this critically endangered fish-eating crocodilian.", icon: "🐊" },
  { name: "Gangetic River Dolphin", desc: "Nepal's national aquatic animal can be spotted in the deeper stretches of the Karnali.", icon: "🐬" },
  { name: "400+ Bird Species", desc: "From the Bengal florican to raptors, Bardia is a premier birding destination year-round.", icon: "🦅" },
];

export default function BardiaNationalParkPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/elephants-in-lake.jpg"
            alt="Wildlife in Bardia National Park"
            fill
            className="object-cover opacity-35"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/70 via-[#1c2316]/50 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">
            The Destination
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">
            Bardia National Park
          </h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-2xl mx-auto text-[#c8baa0] leading-8">
            A river-and-forest ecosystem in Nepal&apos;s western Terai — home to Bengal tigers,
            one-horned rhinos, wild elephants, and one of the subcontinent&apos;s most intact
            lowland jungle environments.
          </p>
        </div>
      </section>

      {/* ── Intro split ── */}
      <section className="bg-[#f5ede0] py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">
              The Landscape
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1e1a14] mb-6 leading-snug">
              Nepal&apos;s Forgotten Wilderness
            </h2>
            <p className="text-[#4a3a28] leading-8 mb-5">
              While Chitwan draws the crowds, Bardia remains Nepal&apos;s best-kept wildlife secret.
              Covering 968 km² of pristine Terai forest, the park&apos;s remoteness means fewer
              vehicles, more personal encounters, and a genuine sense of wilderness.
            </p>
            <p className="text-[#4a3a28] leading-8 mb-7">
              The Karnali River — one of Nepal&apos;s greatest waterways — forms the western boundary
              of the park, creating rich riverine habitat that attracts extraordinary concentrations
              of birds, crocodiles, and dolphins alongside the iconic big mammals.
            </p>
            <ul className="space-y-3">
              {[
                "Area: 968 km² of protected forest & grassland",
                "Rivers: Karnali, Babai (fishing & wildlife corridors)",
                "Established: 1988 as Nepal's second national park",
                "Buffer Zone: Additional protected forest surrounding the core",
              ].map((fact) => (
                <li key={fact} className="flex items-start gap-3 text-[#4a3a28] text-sm">
                  <span className="text-[#c8923a] mt-1 shrink-0">—</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 md:h-[480px] overflow-hidden">
            <Image
              src="/assets/tiger.jpg"
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
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Wildlife</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#f5ede0] mb-14">
            Who You Might Meet
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildlife.map((animal) => (
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
          {[
            {
              heading: "Best Time to Visit",
              body: "October to May offers the best wildlife visibility as vegetation thins and animals congregate around water. February to April is peak season — dry, clear, and ideal for tiger tracking. Avoid June to September during the monsoon when many areas flood.",
              extras: ["Oct–Nov: Post-monsoon, fresh & green", "Feb–Apr: Peak dry season, best sightings", "May: Hot but excellent visibility", "Jun–Sep: Monsoon — park partially closed"],
            },
            {
              heading: "Getting There",
              body: "Bardia is accessible by air via Nepalgunj Airport (domestic flights from Kathmandu), followed by a 2-hour drive. Alternatively, the overnight Surkhet bus from Kathmandu connects to Bardiya District. We arrange all transfers for guests.",
              extras: ["Fly: Kathmandu → Nepalgunj + 2hr drive", "Bus: Overnight from Kathmandu to Bardiya", "Self-drive: ~12 hours from Kathmandu", "We arrange transfers from Nepalgunj"],
            },
          ].map((section) => (
            <div key={section.heading} className="bg-white/60 border border-[#e8d8c0] p-7 md:p-9">
              <h3 className="font-serif text-2xl text-[#1e1a14] mb-4">{section.heading}</h3>
              <p className="text-[#4a3a28] text-sm leading-7 mb-5">{section.body}</p>
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
              src="/assets/elephants.webp"
              alt="Elephants in Bardia jungle"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">Conservation</p>
            <h2 className="font-serif text-3xl text-[#f5ede0] mb-5">
              Protecting What Makes Bardia Extraordinary
            </h2>
            <p className="text-[#c8baa0] text-sm leading-7 mb-4">
              Bardia&apos;s success as a wildlife destination is the result of decades of conservation
              work — anti-poaching efforts, community coexistence programs, and responsible tourism
              policies that limit visitor numbers and protect core habitat.
            </p>
            <p className="text-[#c8baa0] text-sm leading-7">
              Forest Hideaway operates in alignment with these values — low guest volumes, local
              employment, and guidance that always prioritizes the animal&apos;s welfare over
              the perfect photograph.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-[#f5ede0] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl text-[#1e1a14] leading-snug mb-8">
            &ldquo;The best encounters in Bardia happen when you move
            slower than the forest.&rdquo;
          </blockquote>
          <Link
            href="/activities"
            className="inline-block px-8 py-4 border border-[#c8923a] text-[#c8923a] uppercase tracking-[0.18em] text-xs hover:bg-[#c8923a] hover:text-white transition-all duration-300"
          >
            Explore Activities
          </Link>
        </div>
      </section>
    </>
  );
}
