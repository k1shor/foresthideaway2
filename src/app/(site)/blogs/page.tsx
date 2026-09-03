import Image from "next/image";
import type { Metadata } from "next";
import { getBlogs } from "@/lib/api/blogs";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blogs — Forest Hideaway Resort | Bardia, Nepal",
  description:
    "Travel stories, destination guidance, and field observations from Forest Hideaway Resort and Bardia National Park.",
};

export default async function BlogsPage() {
  const posts = await getBlogs();

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

      <BlogListClient posts={posts} />

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
