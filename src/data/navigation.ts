import type { NavItem } from '@/components/navigation/NavMenuItem';

/**
 * Activities/Packages submenus are built dynamically from live API data
 * in Navbar.tsx — this file only holds the items with no dynamic submenu.
 */
export const staticNavItems: NavItem[] = [
  { label: 'Bardia National Park', href: '/bardia-national-park' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Guest Reviews', href: '/guest-reviews' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];
