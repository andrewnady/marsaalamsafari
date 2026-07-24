/** Primary + footer navigation. Kept declarative so it can be CMS-driven later. */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  items?: NavItem[];
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Tours',
    href: '/tours',
    items: [
      { label: 'All Marsa Alam Tours', href: '/tours', description: 'Browse every excursion' },
      { label: 'Desert Safari', href: '/category/desert-safari', description: 'Quad, jeep & camel' },
      { label: 'Snorkeling & Sea', href: '/category/snorkeling', description: 'Reefs, dolphins & turtles' },
      { label: 'Diving', href: '/category/diving', description: 'Guided dives & courses' },
      { label: 'Day Trips', href: '/category/day-trips', description: 'Luxor, Aswan & beyond' },
    ],
  },
  {
    label: 'Destinations',
    href: '/destinations',
    items: [
      { label: 'Sataya Dolphin Reef', href: '/destinations/sataya-reef' },
      { label: 'Abu Dabbab Bay', href: '/destinations/abu-dabbab' },
      { label: 'Hamata Islands', href: '/destinations/hamata-islands' },
      { label: 'Wadi El Gemal', href: '/destinations/wadi-el-gemal' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: NavGroup[] = [
  {
    label: 'Popular Tours',
    items: [
      { label: 'Marsa Alam Desert Safari', href: '/marsa-alam-desert-safari' },
      { label: 'Quad Bike Adventure', href: '/quad-bike-marsa-alam' },
      { label: 'Sataya Dolphin Reef', href: '/snorkeling-sataya-dolphin-reef' },
      { label: 'Abu Dabbab Snorkeling', href: '/abu-dabbab-snorkeling' },
      { label: 'Luxor Day Trip', href: '/luxor-day-trip' },
    ],
  },
  {
    label: 'Explore',
    items: [
      { label: 'All Tours', href: '/tours' },
      { label: 'Destinations', href: '/destinations' },
      { label: 'Travel Blog', href: '/blog' },
      { label: 'Reviews', href: '/reviews' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Booking Terms', href: '/booking-terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cancellation Policy', href: '/cancellation-policy' },
    ],
  },
];
