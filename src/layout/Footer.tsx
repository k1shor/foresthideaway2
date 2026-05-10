import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1c2316] text-[#e8d5b5] pt-16 pb-10 border-t border-[#2a3320]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top — brand tagline */}
        <div className="mb-12 pb-10 border-b border-[#2a3320]">
          <p className="font-serif text-3xl md:text-4xl text-[#f5ede0] leading-tight max-w-2xl">
            Forest Hideaway Resort
          </p>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#c8923a] mt-2">
            Bardia National Park · Nepal
          </p>
        </div>

        {/* Three-column links */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-14">
          {/* Navigate */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c8923a] mb-5">Navigate</p>
            <div className="space-y-3 text-sm tracking-[0.06em]">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about-us' },
                { label: 'Packages', href: '/packages' },
                { label: 'Activities', href: '/activities' },
                { label: 'Bardia National Park', href: '/bardia-national-park' },
                { label: 'Guest Reviews', href: '/guest-reviews' },
                { label: 'Blogs', href: '/blogs' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#c8baa0] hover:text-[#f5ede0] transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c8923a] mb-5">Keep In Touch</p>
            <address className="not-italic text-sm text-[#b8a88a] leading-7 mb-5">
              Forest Hideaway Resort<br />
              Bardiya, Thakurdwara, Nepal<br />
              <a href="tel:+9779800000000" className="hover:text-[#f5ede0] transition-colors">+977 9800 000 000</a><br />
              <a href="mailto:stay@foresthideaway.com" className="hover:text-[#f5ede0] transition-colors">stay@foresthideaway.com</a>
            </address>
            <Link
              href="/contact"
              className="text-[11px] tracking-[0.2em] uppercase border border-[#c8923a] text-[#c8923a] px-4 py-2.5 inline-block hover:bg-[#c8923a] hover:text-[#1c2316] transition-all duration-300"
            >
              Book Your Stay
            </Link>
          </div>

          {/* Social */}
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#c8923a] mb-5">Stay Connected</p>
            <p className="text-sm text-[#b8a88a] leading-7 mb-5">
              Follow our latest jungle moments, travel inspiration, and seasonal updates from Bardia.
            </p>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.2em] uppercase text-[#c8baa0] hover:text-[#d4a85a] transition-colors duration-200"
            >
              Find Us On Instagram →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#2a3320] text-[11px] text-[#7a6852] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p>© 2026 Forest Hideaway Resort · All rights reserved</p>
          <p className="flex gap-4">
            <Link href="#" className="hover:text-[#c8baa0] transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="#" className="hover:text-[#c8baa0] transition-colors">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}