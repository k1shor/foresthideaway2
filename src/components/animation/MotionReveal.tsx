'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionRevealTag = 'div' | 'section' | 'article' | 'li';
type MotionRevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

type MotionRevealProps = {
  as?: MotionRevealTag;
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: MotionRevealDirection;
  distance?: number;
  amount?: number;
  once?: boolean;
};

const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
};

function getOffset(direction: MotionRevealDirection, distance: number) {
  switch (direction) {
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    case 'none':
      return { x: 0, y: 0 };
    case 'up':
    default:
      return { x: 0, y: distance };
  }
}

export default function MotionReveal({
  as = 'div',
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 28,
  amount = 0.22,
  once = true,
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motionTags[as];
  const offset = getOffset(direction, distance);

  return (
    <Component
      data-motion-manual
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
