import type { NavItem, SubmenuItem } from '@/components/navigation/NavMenuItem';

export const activitiesSubmenu: SubmenuItem[] = [
  { label: 'Jeep Safari', href: '/activities/jeep-safari' },
  { label: 'Walking Safari', href: '/activities/walking-safari' },
  { label: 'Elephant Safari', href: '/activities/elephant-safari' },
  { label: 'Karnali River Rafting', href: '/activities/karnali-river-rafting' },
  { label: 'Bird Watching Tour', href: '/activities/bird-watching-tour' },
  { label: 'Tharu Cultural Program', href: '/activities/tharu-cultural-program' },
  { label: 'Fishing Tour', href: '/activities/fishing-tour' },
  { label: 'Bicycle Tour', href: '/activities/bicycle-tour' },
  { label: 'Speciality Tour', href: '/activities/speciality-tour' },
];

export const packagesSubmenu: SubmenuItem[] = [
  { label: 'Jungle Discovery (2N/3D)', href: '/packages/bardia-at-a-glance-tour-2-nights-3-days' },
  { label: 'Bardia Signature Stay (3N/4D)', href: '/packages/bardia-highlights-tour-3-nights-4-days' },
  { label: 'Complete Wilderness (4N/5D)', href: '/packages/best-of-bardia-4-nights-5-days' },
  { label: 'Babai River Fishing', href: '/packages/babai-river-fishing-one-day' },
  { label: 'Tharu Cultural Tour', href: '/packages/rana-tharu-cultural-tour-2-nights-3-days' },
  { label: 'Wildlife Photography Tour', href: '/packages/wildlife-photography-tour' },
];

export const mainNavItems: NavItem[] = [
  { label: 'Bardia National Park', href: '/bardia-national-park' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Activities', href: '/activities', submenu: activitiesSubmenu },
  { label: 'Packages', href: '/packages', submenu: packagesSubmenu },
  { label: 'Guest Reviews', href: '/guest-reviews' },
  { label: 'E-media', href: '/e-media' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/contact' },
];
