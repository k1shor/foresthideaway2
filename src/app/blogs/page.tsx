import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Travel stories, destination guidance, and field observations from Forest Hideaway Resort and Bardia National Park.",
};

const featuredPosts = [
  {
    id: 1,
    category: "Safari",
    title: "What Dawn Looks Like in Bardia",
    excerpt:
      "The drive begins before first light. Your guide's torch cuts the mist and the sal forest opens up around you — here's what to expect on your first morning safari.",
    date: "March 2025",
    img: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&q=80&fit=crop",
    readTime: "5 min read",
  },
  {
    id: 2,
    category: "Wildlife",
    title: "Tigers of the Western Terai",
    excerpt:
      "Bardia's Bengal tiger population has rebounded dramatically. We explore why — and what that means for your chances of a sighting.",
    date: "February 2025",
    img: "/assets/tiger.jpg",
    readTime: "7 min read",
  },
  {
    id: 3,
    category: "Culture",
    title: "The Tharu People and the Jungle",
    excerpt:
      "Long before Bardia was a national park, the Tharu people lived in harmony with its forests. Their knowledge of this land is profound — and still alive.",
    date: "January 2025",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&q=80&fit=crop",
    readTime: "6 min read",
  },
  {
    id: 4,
    category: "Planning",
    title: "When to Visit Bardia: A Seasonal Guide",
    excerpt:
      "October to May — but within that window, each month tells a different story. Here's how to choose based on what matters most to your journey.",
    date: "December 2024",
    img: "/assets/elephants-in-lake.jpg",
    readTime: "4 min read",
  },
  {
    id: 5,
    category: "Wildlife",
    title: "Birding in Bardia: 400 Species and Counting",
    excerpt:
      "The Bengal florican, giant hornbills, and rare raptors — Bardia's birdlife is a world-class secret waiting to be discovered.",
    date: "November 2024",
    img: "https://images.unsplash.com/photo-1560743173-567a3b5658b1?w=800&q=80&fit=crop",
    readTime: "5 min read",
  },
  {
    id: 6,
    category: "Stay",
    title: "Slow Afternoons at Forest Hideaway",
    excerpt:
      "Not every hour needs to be in the jungle. We explore the art of the quiet afternoon — and why it's as essential to a Bardia stay as the dawn drive.",
    date: "October 2024",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80&fit=crop",
    readTime: "3 min read",
  },
];

const categories = ["All", "Safari", "Wildlife", "Culture", "Planning", "Stay"];

export default function BlogsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=1600&q=80&fit=crop"
            alt="Morning in Bardia jungle"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">Field Notes</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">Stories From Bardia</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-xl mx-auto text-[#c8baa0] leading-8">
            Travel stories, wildlife observations, and destination guidance from Forest Hideaway Resort
            and the wilderness that surrounds it.
          </p>
        </div>
      </section>

      {/* ── Category Pills ── */}
      <section className="bg-[#f5ede0] border-b border-[#e8d8c0] py-5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                cat === "All"
                  ? "bg-[#c8923a] border-[#c8923a] text-white"
                  : "border-[#e8d8c0] text-[#4a3a28] hover:border-[#c8923a] hover:text-[#c8923a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="bg-[#faf6ef] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article
                key={post.id}
                className="group bg-white border border-[#e8d8c0] overflow-hidden hover:border-[#c8923a] transition-colors duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#1c2316]/70 backdrop-blur-sm text-[#c8923a] text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#8b5e3c]">{post.date}</p>
                    <p className="text-[10px] text-[#7a6852]">{post.readTime}</p>
                  </div>
                  <h2 className="font-serif text-xl text-[#1e1a14] mb-3 leading-snug">{post.title}</h2>
                  <p className="text-[#4a3a28] text-sm leading-7 mb-5 flex-1">{post.excerpt}</p>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#c8923a] group-hover:text-[#8b5e3c] transition-colors">
                    Read More →
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Coming soon note */}
          <div className="mt-16 text-center border border-dashed border-[#e8d8c0] py-10 px-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c8923a] mb-3">More Stories Coming</p>
            <p className="font-serif text-2xl text-[#1e1a14] mb-3">The Field Notes Are Growing</p>
            <p className="text-[#4a3a28] text-sm leading-7 max-w-md mx-auto">
              We&apos;re adding new stories from the field each season. Sign up for the newsletter to receive
              them as they arrive — quietly, like the jungle itself.
            </p>
            <Link
              href="/#newsletter"
              className="inline-block mt-6 px-6 py-3 border border-[#c8923a] text-[#c8923a] uppercase tracking-[0.18em] text-xs hover:bg-[#c8923a] hover:text-white transition-all duration-300"
            >
              Join the Newsletter
            </Link>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="bg-[#1c2316] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <blockquote className="font-serif text-2xl md:text-3xl text-[#f5ede0] leading-snug">
            &ldquo;The most valuable safari stories are often the quietest ones.&rdquo;
          </blockquote>
        </div>
      </section>
    </>
  );
}
