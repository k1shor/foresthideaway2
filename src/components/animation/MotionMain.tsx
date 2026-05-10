'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, animate, inView, motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type MotionMainProps = {
  children: ReactNode;
};

export default function MotionMain({ children }: MotionMainProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = mainRef.current;
    if (!root || shouldReduceMotion) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>(
        'section > div[class*="max-w"], section article, section form'
      )
    ).filter((element) => !element.closest('[data-motion-manual]'));

    const cleanups = targets.map((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(24px)';
      element.style.willChange = 'opacity, transform';

      return inView(
        element,
        () => {
          animate(
            element,
            { opacity: 1, transform: 'translateY(0px)' },
            {
              duration: 0.65,
              delay: Math.min((index % 4) * 0.04, 0.12),
              ease: [0.22, 1, 0.36, 1],
            }
          ).then(() => {
            element.style.willChange = '';
          });
        },
        { amount: 0.18 }
      );
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname, shouldReduceMotion]);

  return (
    <AnimatePresence mode="wait">
      <motion.main
        ref={mainRef}
        key={pathname}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
