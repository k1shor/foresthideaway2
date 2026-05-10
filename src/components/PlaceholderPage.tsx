import Link from "next/link";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  summary: string;
};

export default function PlaceholderPage({ eyebrow, title, summary }: PlaceholderPageProps) {
  return (
    <section className="min-h-screen bg-[#f6f2e8] pt-40 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <p className="text-[11px] tracking-[0.28em] uppercase text-stone-600 mb-4">{eyebrow}</p>
        <h1 className="font-serif text-4xl md:text-6xl text-stone-900 leading-tight mb-8">{title}</h1>
        <p className="max-w-3xl text-stone-700 leading-8 mb-10">{summary}</p>

        <div className="border border-stone-300 bg-white/70 p-7 md:p-9">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">Placeholder Content</h2>
          <p className="text-stone-700 leading-8 mb-4">
            This page has been scaffolded to match the old website navigation. Final copy, media, and section
            structure will be filled in the next content pass.
          </p>
          <p className="text-stone-700 leading-8">
            Continue browsing from the homepage or return to
            <Link href="/" className="underline underline-offset-4 ml-1 hover:text-stone-900">
              Forest Hideaway
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
