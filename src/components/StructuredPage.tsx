import CtaLink from '@/components/ui/CtaLink';

type Highlight = {
  title: string;
  text: string;
};

type DetailSection = {
  heading: string;
  body: string;
};

type StructuredPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
  quote: string;
  highlights: Highlight[];
  details: DetailSection[];
  ctaLabel?: string;
  ctaHref?: string;
};

export default function StructuredPage({
  eyebrow,
  title,
  summary,
  quote,
  highlights,
  details,
  ctaLabel = 'Enquire',
  ctaHref = '/contact',
}: StructuredPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1c2316] text-[#f5ede0] pt-40 pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <p className="text-[11px] tracking-[0.32em] uppercase text-[#c8923a] mb-4">{eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-7">{title}</h1>
          <div className="w-px h-10 bg-[#c8923a]/50 mx-auto mb-7" />
          <p className="max-w-3xl mx-auto text-[#c8baa0] leading-8">{summary}</p>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-[#f5ede0] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <article key={item.title} className="border-t border-[#e8d8c0] pt-5">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#c8923a] mb-4">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="font-serif text-2xl text-[#1e1a14] mb-4">{item.title}</h2>
              <p className="text-[#4a3a28] text-sm leading-7">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#ede0cc] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mb-6" />
          <blockquote className="font-serif text-2xl md:text-[2.2rem] text-[#1e1a14] leading-snug">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="w-px h-8 bg-[#c8923a]/40 mx-auto mt-6" />
        </div>
      </section>

      {/* Details */}
      <section className="bg-[#faf6ef] py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10">
          {details.map((section) => (
            <article key={section.heading} className="border border-[#e8d8c0] bg-white/70 p-7 md:p-9">
              <h3 className="font-serif text-2xl text-[#1e1a14] mb-4">{section.heading}</h3>
              <p className="text-[#4a3a28] text-sm leading-8">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 mt-12">
          <CtaLink href={ctaHref} variant="gold" className="px-7 py-3.5 tracking-[0.18em] text-xs">
            {ctaLabel}
          </CtaLink>
        </div>
      </section>
    </>
  );
}
