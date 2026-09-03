"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/api/types";
import CtaLink from "@/components/ui/CtaLink";

function formatMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function BlogListClient({ posts }: { posts: Blog[] }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* ── Category Pills ── */}
      <section className="bg-[#f5ede0] border-b border-[#e8d8c0] py-5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                cat === active
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
          {visible.length === 0 ? (
            <p className="text-center text-[#7a6852] py-10">No stories in this category yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.map((post) => (
                <Link
                  key={post._id}
                  href={`/blogs/${post.slug}`}
                  className="group bg-white border border-[#e8d8c0] overflow-hidden hover:border-[#c8923a] transition-colors duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-[#e8d8c0]">
                    {post.img && (
                      <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-[#1c2316]/70 backdrop-blur-sm text-[#c8923a] text-[9px] tracking-[0.2em] uppercase px-3 py-1">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#8b5e3c]">
                        {formatMonthYear(post.publishedAt)}
                      </p>
                      <p className="text-[10px] text-[#7a6852]">{post.readTime}</p>
                    </div>
                    <h2 className="font-serif text-xl text-[#1e1a14] mb-3 leading-snug">{post.title}</h2>
                    <p className="text-[#4a3a28] text-sm leading-7 mb-5 flex-1">{post.excerpt}</p>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#c8923a] group-hover:text-[#8b5e3c] transition-colors">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Coming soon note */}
          <div className="mt-16 text-center border border-dashed border-[#e8d8c0] py-10 px-6">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#c8923a] mb-3">More Stories Coming</p>
            <p className="font-serif text-2xl text-[#1e1a14] mb-3">The Field Notes Are Growing</p>
            <p className="text-[#4a3a28] text-sm leading-7 max-w-md mx-auto">
              We&apos;re adding new stories from the field each season. Sign up for the newsletter to receive
              them as they arrive — quietly, like the jungle itself.
            </p>
            <CtaLink href="/#newsletter" variant="gold" className="mt-6 px-6 py-3 tracking-[0.18em] text-xs">
              Join the Newsletter
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
