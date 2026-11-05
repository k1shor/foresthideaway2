import Image from "next/image";
import type { Metadata } from "next";
import { getBlogs } from "@/lib/api/blogs";
import { getBlogsPage } from "@/lib/api/pages";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blogs — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Travel stories, destination guidance, and field observations from Forest Hideaway Resort and Bardia National Park.",
};

export default async function BlogsPage() {
  const [posts, page] = await Promise.all([getBlogs(), getBlogsPage()]);
  const { hero, quote, comingSoon } = page;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={hero.image}
            alt="Morning in Bardia jungle"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-5">{hero.label}</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6">{hero.heading}</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p
            className="max-w-xl mx-auto text-[#c8baa0] leading-8"
            dangerouslySetInnerHTML={{ __html: hero.subtext }}
          />
        </div>
      </section>

      <BlogListClient posts={posts} comingSoon={comingSoon} />

      {/* ── Quote ── */}
      <section className="bg-[#1c2316] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <blockquote
            className="font-serif text-2xl md:text-3xl text-[#f5ede0] leading-snug"
            dangerouslySetInnerHTML={{ __html: `&ldquo;${quote.text}&rdquo;` }}
          />
        </div>
      </section>
    </>
  );
}
