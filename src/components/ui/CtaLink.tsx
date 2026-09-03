"use client";

import Link from "next/link";

type CtaVariant = "gold" | "brown" | "cream" | "muted" | "gold-dark";

const variants: Record<CtaVariant, { base: string; fill: string; hoverText: string }> = {
  gold: {
    base: "border-[#c8923a] text-[#c8923a]",
    fill: "bg-[#c8923a]",
    hoverText: "group-hover/cta:text-white",
  },
  brown: {
    base: "border-[#4a3a28] text-[#4a3a28]",
    fill: "bg-[#4a3a28]",
    hoverText: "group-hover/cta:text-white",
  },
  cream: {
    base: "border-[#d4a85a] text-[#f5ede0]",
    fill: "bg-[#d4a85a]",
    hoverText: "group-hover/cta:text-[#1c2316]",
  },
  // Secondary/quiet CTA — subtle tint fill, border+text shift to gold instead of inverting to a solid block.
  muted: {
    base: "border-[#3d4f2c] text-[#c8baa0] group-hover/cta:border-[#c8923a]",
    fill: "bg-[#c8923a]/15",
    hoverText: "group-hover/cta:text-[#c8923a]",
  },
  "gold-dark": {
    base: "border-[#c8923a] text-[#c8923a]",
    fill: "bg-[#c8923a]",
    hoverText: "group-hover/cta:text-[#1c2316]",
  },
};

interface CtaLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

/** Bordered CTA link/button — slow radial fill-from-center on hover, used sitewide. */
export default function CtaLink({ href, children, variant = "gold", className = "", target, rel, onClick }: CtaLinkProps) {
  const v = variants[variant];
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`group/cta relative inline-block overflow-hidden border uppercase transition-colors duration-[900ms] ${v.base} ${className}`}
    >
      <span
        className={`absolute inset-0 [clip-path:circle(0%_at_50%_50%)] group-hover/cta:[clip-path:circle(150%_at_50%_50%)] opacity-0 group-hover/cta:opacity-100 transition-[clip-path,opacity] duration-[900ms] ease-in-out ${v.fill}`}
      />
      <span className={`relative z-10 transition-colors duration-[900ms] ${v.hoverText}`}>{children}</span>
    </Link>
  );
}
