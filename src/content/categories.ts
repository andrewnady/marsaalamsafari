import type { TourCategory } from './types';
import { img } from './images';

export const categories: TourCategory[] = [
  {
    slug: 'desert-safari',
    name: 'Desert Safari',
    title: 'Marsa Alam Desert Safari Tours',
    description:
      'Quad biking, jeep safaris, camel rides and Bedouin dinners across the Eastern Desert of Marsa Alam.',
    intro:
      'Where the Red Sea mountains meet endless golden dunes, our desert safaris trade crowds for silence and horizon. Ride out with licensed Bedouin guides, watch the sun drop behind the Red Sea Hills, and share sweet tea under a sky thick with stars.',
    image: img('1509316785289-025f5b846b35', 'Quad bikes crossing golden dunes on a Marsa Alam desert safari at sunset'),
  },
  {
    slug: 'snorkeling',
    name: 'Snorkeling & Sea',
    title: 'Marsa Alam Snorkeling & Sea Trips',
    description:
      'Dolphin reefs, turtle bays and pristine coral gardens — small-group snorkeling trips from Marsa Alam.',
    intro:
      'Marsa Alam’s reefs are among the healthiest in the Red Sea. Snorkel with wild spinner dolphins at Sataya, drift over turtle grass at Abu Dabbab, and float above coral walls that fall away into deep blue — all within easy reach of your hotel.',
    image: img('1544551763-46a013bb70d5', 'Snorkeler gliding over a vibrant Red Sea coral reef near Marsa Alam'),
  },
  {
    slug: 'diving',
    name: 'Diving',
    title: 'Marsa Alam Diving Trips & Courses',
    description:
      'Guided dives and PADI courses on Marsa Alam’s world-class reefs — from first breaths to Elphinstone.',
    intro:
      'From gentle house reefs perfect for a first dive to the legendary drop-offs of Elphinstone, Marsa Alam is a diver’s dream. Our PADI-certified instructors keep groups small and safety uncompromising.',
    image: img('1682687220208-22d7a2543e88', 'Scuba diver exploring a coral wall on a Marsa Alam diving trip'),
  },
  {
    slug: 'day-trips',
    name: 'Day Trips',
    title: 'Day Trips & Excursions from Marsa Alam',
    description:
      'Luxor, Aswan and the wonders of ancient Egypt — comfortable, guided day trips from Marsa Alam.',
    intro:
      'Base yourself on the Red Sea and still stand in the temples of the pharaohs. Our air-conditioned day trips reach Luxor and Aswan with expert Egyptologist guides, so you get the history without the logistics.',
    image: img('1539768942893-daf53e448371', 'Ancient temple columns at Luxor on a day trip from Marsa Alam'),
  },
  {
    slug: 'boat-trips',
    name: 'Boat Trips',
    title: 'Marsa Alam Boat Trips & Island Cruises',
    description:
      'Full-day boat cruises to Hamata Islands, Sataya and hidden lagoons with lunch aboard.',
    intro:
      'Cast off from Port Ghalib or Hamata and spend the day island-hopping across turquoise shallows. Lunch is served on deck, snorkel stops are unhurried, and the only schedule is the tide.',
    image: img('1502680390469-be75c86b636f', 'Traditional boat anchored over turquoise water near the Hamata Islands'),
  },
  {
    slug: 'city-experiences',
    name: 'City & Culture',
    title: 'Marsa Alam City & Cultural Experiences',
    description:
      'Local markets, Bedouin villages and authentic Egyptian evenings around Marsa Alam.',
    intro:
      'Meet the people behind the postcard. Wander spice-scented markets, share a meal in a Bedouin village, and discover the everyday culture of Egypt’s Red Sea coast.',
    image: img('1568322445389-f64ac2515020', 'Colourful spices and lanterns in a local Egyptian market near Marsa Alam'),
  },
];

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): TourCategory | undefined {
  return categoryBySlug.get(slug as TourCategory['slug']);
}
