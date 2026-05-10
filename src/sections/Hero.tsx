'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const contentVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.22,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: heroEase },
  },
};

export default function Hero() {
  return (
    <motion.section
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      initial="hidden"
      animate="show"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: heroEase }}
        style={{
          backgroundImage: 'url("/assets/tiger.jpg")',
          backgroundPosition: "center 52%",
        }}
      >
        {/* Warm forest overlay — deep green tint instead of cold black */}
        <div className="absolute inset-0 bg-[#1c2316]/55" />
        {/* Subtle warm amber vignette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1c2316]/60 to-transparent" />
      </motion.div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center px-4 w-full mt-20"
        variants={contentVariants}
      >
        <motion.p
          className="text-[10px] md:text-[11px] text-[#d4a85a] uppercase tracking-[0.45em] mb-5 font-light"
          variants={itemVariants}
        >
          More than a safari
        </motion.p>

        <motion.h1
          className="text-4xl md:text-6xl lg:text-[5rem] font-serif text-white tracking-wide leading-[1.08] max-w-4xl mx-auto mb-7 font-normal"
          variants={itemVariants}
        >
          THE HOME OF<br />THE SLOW SAFARI
        </motion.h1>

        {/* Thin amber divider */}
        <motion.div className="w-px h-10 bg-[#d4a85a]/60 mb-7" variants={itemVariants} />

        <motion.p
          className="text-white/80 font-light text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-10 tracking-wide"
          variants={itemVariants}
        >
          In the wild edge of Bardia, mornings begin with birdsong and golden
          river mist. An unhurried escape where jungle rhythms, local culture,
          and warm hospitality meet.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/packages"
            className="inline-block px-8 py-3.5 border border-[#d4a85a] text-[#f5ede0] uppercase tracking-[0.2em] text-xs font-light hover:bg-[#d4a85a] hover:text-[#1c2316] transition-all duration-300"
          >
            Explore Packages
          </Link>
        </motion.div>
      </motion.div>

      {/* Location tag */}
      <motion.div
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.08, ease: heroEase }}
      >
        <div className="flex items-center gap-2 md:gap-3 text-white/70 tracking-[0.2em] uppercase text-[10px] md:text-[11px] font-light">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-3.5 w-3.5 text-[#d4a85a]"
            aria-hidden="true"
          >
            <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          <span>Bardia National Park, Nepal</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
