import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getBlogBySlug } from '@/lib/api/blogs';
import CtaLink from '@/components/ui/CtaLink';

type Props = { params: Promise<{ slug: string }> };

function formatMonthYear(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    return {
      title: `${blog.title} — Forest Hideaway Resort`,
      description: blog.excerpt,
    };
  } catch {
    return { title: 'Story Not Found' };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  let blog;
  try {
    blog = await getBlogBySlug(slug);
  } catch {
    notFound();
  }

  const paragraphs = blog.content
    .split('\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#1c2316] text-[#f5ede0] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          {blog.img && (
            <Image
              src={blog.img}
              alt={blog.title}
              fill
              className="object-cover opacity-25"
              sizes="100vw"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c2316]/80 to-[#1c2316]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-3">
            {blog.category || 'Field Notes'}
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight mb-5">{blog.title}</h1>
          <p className="text-[#c8baa0] text-sm tracking-widest uppercase">
            {formatMonthYear(blog.publishedAt)}
            {blog.readTime ? ` · ${blog.readTime}` : ''}
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-[#faf6ef] py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {blog.img && (
            <div className="relative h-64 md:h-96 mb-12 overflow-hidden">
              <Image
                src={blog.img}
                alt={blog.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[#4a3a28] leading-8">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1c2316] py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#c8923a] mb-4">Continue Reading</p>
          <h2 className="font-serif text-3xl text-[#f5ede0] mb-6">More Stories From Bardia</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaLink href="/blogs" variant="cream" className="px-8 py-4 tracking-[0.2em] text-xs">
              All Stories
            </CtaLink>
            <CtaLink href="/contact" variant="muted" className="px-8 py-4 tracking-[0.2em] text-xs">
              Contact Us
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
