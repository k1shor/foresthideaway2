'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import NavMenuItem from '@/components/navigation/NavMenuItem';
import { mainNavItems } from '@/data/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? 'bg-[#faf6ef]/97 backdrop-blur-md border-[#e8d8c0] py-4 text-[#1e1a14]'
          : 'bg-transparent border-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <div className="text-left shrink-0">
          <Link href="/" className="flex flex-col items-start">
            <span className="font-serif text-2xl md:text-3xl tracking-widest leading-none">
              FOREST
            </span>
            <span className={`text-[9px] tracking-[0.4em] font-light mt-1.5 ${scrolled ? 'text-[#8b5e3c]' : 'text-[#d4a85a]'}`}>
              HIDEAWAY RESORT
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 text-[10px] lg:text-xs tracking-[0.14em] font-light uppercase items-center">
          {mainNavItems.map((item) => (
            <NavMenuItem key={item.label} item={item} />
          ))}
        </nav>

        {/* "Book Now" pill — desktop */}
        <Link
          href="/contact"
          className={`hidden md:inline-block ml-4 px-5 py-2 text-[10px] tracking-[0.18em] uppercase font-light border transition-all duration-300 ${
            scrolled
              ? 'border-[#c8923a] text-[#c8923a] hover:bg-[#c8923a] hover:text-white'
              : 'border-[#d4a85a] text-[#d4a85a] hover:bg-[#d4a85a] hover:text-[#1c2316]'
          }`}
        >
          Book Now
        </Link>

        {/* Mobile hamburger */}
        <div className="md:hidden ml-auto">
          <button
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex flex-col space-y-[6px] focus:outline-none p-2"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors ${scrolled ? 'bg-[#1e1a14]' : 'bg-white'}`}
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className={`block w-6 h-px transition-colors ${scrolled ? 'bg-[#1e1a14]' : 'bg-white'}`}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7, width: 24 } : { rotate: 0, y: 0, width: 16 }}
              className={`block h-px transition-colors ${scrolled ? 'bg-[#1e1a14]' : 'bg-white'}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`md:hidden overflow-hidden border-t ${scrolled ? 'border-[#e8d8c0] bg-[#faf6ef]' : 'border-white/10 bg-[#1c2316]/95 backdrop-blur-sm'}`}
        >
          <nav className="px-6 py-6 flex flex-col gap-4 text-xs tracking-[0.18em] uppercase">
            {mainNavItems.map((item) => (
              <NavMenuItem key={item.label} item={item} mobile onNavigate={() => setMobileOpen(false)} />
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-block px-5 py-2.5 border border-[#c8923a] text-[#c8923a] text-[11px] tracking-[0.18em] uppercase text-center hover:bg-[#c8923a] hover:text-white transition-all"
            >
              Book Now
            </Link>
          </nav>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
