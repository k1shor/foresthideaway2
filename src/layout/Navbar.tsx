'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavMenuItem from '@/components/navigation/NavMenuItem';
import CtaLink from '@/components/ui/CtaLink';
import type { NavItem } from '@/components/navigation/NavMenuItem';
import { staticNavItems } from '@/data/navigation';
import type { Activity, Package } from '@/lib/api/types';

const SUBMENU_CAP = 8;

type NavbarProps = {
  activities: Activity[];
  packages: Package[];
};

export default function Navbar({ activities, packages }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activitiesSubmenu = [
    ...activities.slice(0, SUBMENU_CAP).map((act) => ({
      label: act.title,
      href: `/activities/${act.slug}`,
    })),
    { label: 'View All Activities →', href: '/activities' },
  ];

  const packagesSubmenu = [
    ...packages.slice(0, SUBMENU_CAP).map((pkg) => ({
      label: pkg.name,
      href: `/packages/${pkg.slug}`,
    })),
    { label: 'View All Packages →', href: '/packages' },
  ];

  const mainNavItems: NavItem[] = [
    staticNavItems[0], // Bardia National Park
    staticNavItems[1], // About Us
    { label: 'Activities', href: '/activities', submenu: activitiesSubmenu },
    { label: 'Packages', href: '/packages', submenu: packagesSubmenu },
    staticNavItems[2], // Guest Reviews
    staticNavItems[3], // Blogs
    staticNavItems[4], // Contact
  ];

  // Mobile menu opened over the transparent hero header looked empty/washed-out —
  // treat it as "scrolled" styling so the bar and panel always share one solid look.
  const effectiveScrolled = scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled ? 'py-4' : 'py-6'} ${
        effectiveScrolled
          ? 'bg-[#faf6ef]/97 backdrop-blur-md border-[#e8d8c0] text-[#1e1a14]'
          : 'bg-transparent border-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="text-left shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-icon.png"
              alt=""
              width={716}
              height={522}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />
            <span className="flex flex-col items-start">
              <span className="font-serif text-xl md:text-2xl tracking-widest leading-none">
                FOREST
              </span>
              <span className={`text-[8px] tracking-[0.4em] font-light mt-1 ${effectiveScrolled ? 'text-[#8b5e3c]' : 'text-[#d4a85a]'}`}>
                HIDEAWAY RESORT
              </span>
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-4 text-[10px] xl:text-xs tracking-[0.14em] font-light uppercase items-center">
          {mainNavItems.map((item) => (
            <NavMenuItem key={item.label} item={item} />
          ))}
        </nav>

        {/* "Book Now" pill — desktop */}
        <Link
          href="/contact"
          className={`group/btn relative hidden lg:inline-block ml-4 overflow-hidden px-5 py-2 text-[10px] tracking-[0.18em] uppercase font-light border transition-colors duration-300 ${
            scrolled
              ? 'border-[#c8923a] text-[#c8923a]'
              : 'border-[#d4a85a] text-[#d4a85a]'
          }`}
        >
          <span
            className={`absolute inset-0 [clip-path:circle(0%_at_50%_50%)] group-hover/btn:[clip-path:circle(150%_at_50%_50%)] opacity-0 group-hover/btn:opacity-100 transition-[clip-path,opacity] duration-[900ms] ease-in-out ${
              scrolled ? 'bg-[#c8923a]' : 'bg-[#d4a85a]'
            }`}
          />
          <span
            className={`relative z-10 transition-colors duration-500 ${
              scrolled ? 'group-hover/btn:text-white' : 'group-hover/btn:text-[#1c2316]'
            }`}
          >
            Book Now
          </span>
        </Link>

        {/* Mobile hamburger */}
        <div className="lg:hidden ml-auto">
          <button
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex flex-col space-y-[6px] focus:outline-none p-2"
          >
            <span className={`block w-6 h-px transition-colors ${effectiveScrolled ? 'bg-[#1e1a14]' : 'bg-white'}`} />
            <span className={`block w-6 h-px transition-colors ${effectiveScrolled ? 'bg-[#1e1a14]' : 'bg-white'}`} />
            <span className={`block w-4 h-px transition-colors ${effectiveScrolled ? 'bg-[#1e1a14]' : 'bg-white'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`lg:hidden border-t ${effectiveScrolled ? 'border-[#e8d8c0] bg-[#faf6ef]' : 'border-white/10 bg-[#1c2316]/95 backdrop-blur-sm'}`}>
          <nav className="px-6 py-6 flex flex-col gap-4 text-xs tracking-[0.18em] uppercase">
            {mainNavItems.map((item) => (
              <NavMenuItem key={item.label} item={item} mobile onNavigate={() => setMobileOpen(false)} />
            ))}
            <CtaLink
              href="/contact"
              onClick={() => setMobileOpen(false)}
              variant="gold"
              className="mt-2 px-5 py-2.5 text-[11px] tracking-[0.18em] text-center"
            >
              Book Now
            </CtaLink>
          </nav>
        </div>
      )}
    </header>
  );
}
