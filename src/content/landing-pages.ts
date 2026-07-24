import type { Image } from './types';
import { img } from './images';

/**
 * SEO landing pages that target high-intent search clusters and aggregate
 * relevant tours. Distinct from tour detail pages — each is unique editorial
 * content built around a keyword theme.
 */
export interface LandingPage {
  slug: string;
  title: string; // H1
  seoTitle: string;
  metaDescription: string;
  heroImage: Image;
  intro: string[];
  /** Tour slugs to surface on this page, in priority order. */
  tourSlugs: string[];
  sections: { heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
}

export const landingPages: LandingPage[] = [
  {
    slug: 'best-marsa-alam-safari',
    title: 'The Best Marsa Alam Safari Tours',
    seoTitle: 'Best Marsa Alam Safari Tours 2026 | Desert, Quad & Bedouin',
    metaDescription:
      'Compare the best Marsa Alam safari tours: desert quad biking, camel rides, 4x4 super safaris and Bedouin dinners. Licensed guides, free hotel pickup, best-price guarantee.',
    heroImage: img('1509316785289-025f5b846b35', 'Quad bikes and camels at sunset on the best Marsa Alam desert safari', { priority: true }),
    intro: [
      'A Marsa Alam safari is the fastest way to fall for the Eastern Desert — an ocean of dunes, ridgelines and Bedouin hospitality just minutes from the coast. But not all safaris are equal. The best ones travel with licensed local guides, keep groups small, put safety first, and time the whole thing for that unbeatable desert sunset.',
      'Below are our highest-rated desert experiences, from a quick sunset quad ride to the full super safari with jeep, camel and a starlit dinner. Every one includes air-conditioned hotel pickup and our best-price guarantee.',
    ],
    tourSlugs: ['marsa-alam-desert-safari', 'super-safari-jeep-adventure', 'quad-bike-marsa-alam', 'camel-ride-marsa-alam'],
    sections: [
      {
        heading: 'What makes a great Marsa Alam safari',
        body: [
          'The difference between a forgettable tour and a highlight-of-the-holiday safari comes down to a few things: experienced guides who know the terrain, a sensible convoy pace, genuine Bedouin hospitality rather than a staged stop, and timing that lets you watch the sun drop behind the Red Sea Hills.',
          'We built every one of our safaris around those principles, which is why families, couples and solo travellers all rate them so highly.',
        ],
      },
      {
        heading: 'Which safari is right for you?',
        body: [
          'Short on time or just want the thrill? The sunset quad ride is three hours of pure fun. Want the complete evening — quad, camel, Bedouin village and dinner? Choose our signature desert safari. Craving the full adventure with a 4x4 off-road drive on top? The Super Safari is for you. Prefer something gentle and romantic? The sunset camel ride is unbeatable.',
        ],
      },
    ],
    faqs: [
      { question: 'What is the best desert safari in Marsa Alam?', answer: 'For most visitors, our signature Marsa Alam Desert Safari — combining quad biking, a camel ride, a Bedouin village and a starlit dinner — offers the best all-round experience. Thrill-seekers prefer the Super Safari with its added 4x4 jeep drive.' },
      { question: 'Are Marsa Alam safaris safe?', answer: 'Yes. Our safaris travel in guided convoys with a support vehicle, first-aid kit, helmets and experienced local guides. Speeds are kept sensible and routes are chosen for all abilities.' },
      { question: 'Is hotel pickup included in safari tours?', answer: 'Yes, all our Marsa Alam safaris include round-trip air-conditioned hotel pickup from Marsa Alam and Port Ghalib. Pickups from farther resorts may carry a small surcharge.' },
      { question: 'How much does a Marsa Alam safari cost?', answer: 'Prices start from around €20 for a sunset camel ride and €25 for a quad adventure, up to €45 for the full Super Safari with dinner. Children’s rates are available on most tours.' },
    ],
  },
  {
    slug: 'marsa-alam-excursions',
    title: 'Marsa Alam Excursions & Day Trips',
    seoTitle: 'Marsa Alam Excursions & Day Trips 2026 | Book Online',
    metaDescription:
      'Browse the best Marsa Alam excursions: desert safaris, dolphin and turtle snorkeling, diving, boat trips and day trips to Luxor and Aswan. Free pickup, instant booking.',
    heroImage: img('1544551763-46a013bb70d5', 'Snorkelers and boats on a Marsa Alam excursion over turquoise water', { priority: true }),
    intro: [
      'From desert dunes to dolphin reefs and the temples of ancient Egypt, Marsa Alam’s excursions pack an astonishing range into one destination. Whether you have a single free day or a full week to fill, this is your starting point.',
      'Every excursion below is run by our licensed local team, includes hotel pickup, and can be booked in minutes by WhatsApp or online.',
    ],
    tourSlugs: ['snorkeling-sataya-dolphin-reef', 'marsa-alam-desert-safari', 'abu-dabbab-snorkeling', 'luxor-day-trip', 'marsa-alam-diving-trip', 'hamata-islands-boat-trip'],
    sections: [
      {
        heading: 'Sea excursions',
        body: [
          'Marsa Alam’s reefs are the reason many people come. Snorkel with wild dolphins at Sataya, meet green turtles at Abu Dabbab, cruise the pristine Hamata Islands, or dive world-class sites with PADI pros. All our sea trips include equipment and lunch.',
        ],
      },
      {
        heading: 'Desert excursions',
        body: [
          'Trade the beach for the silence of the Eastern Desert. Quad bikes, camel rides, 4x4 safaris and Bedouin dinners under the stars offer a completely different side of Marsa Alam — and some of the best sunsets you’ll ever see.',
        ],
      },
      {
        heading: 'Cultural day trips',
        body: [
          'Base yourself on the Red Sea and still stand in the temples of the pharaohs. Our air-conditioned day trips reach Luxor and Aswan with expert Egyptologist guides, so you get the history without the logistics.',
        ],
      },
    ],
    faqs: [
      { question: 'What are the best excursions in Marsa Alam?', answer: 'The most popular are the Sataya dolphin snorkeling trip, the desert safari with dinner, turtle snorkeling at Abu Dabbab, and the day trip to Luxor. Together they showcase the sea, desert and history of the region.' },
      { question: 'Can I book Marsa Alam excursions online?', answer: 'Yes. You can request any excursion online or via WhatsApp, confirm availability, and pay conveniently. Hotel pickup is arranged automatically.' },
      { question: 'Do excursions include hotel pickup?', answer: 'Yes, all our Marsa Alam excursions include round-trip hotel pickup from Marsa Alam and Port Ghalib, with times confirmed the day before.' },
      { question: 'How far in advance should I book excursions?', answer: 'Popular trips like Sataya and Luxor can fill up, especially in high season, so we recommend booking a few days ahead. Last-minute spots are sometimes available — just message us.' },
    ],
  },
  {
    slug: 'dolphin-house-tour',
    title: 'Dolphin House Tour Marsa Alam (Sataya Reef)',
    seoTitle: 'Dolphin House Tour Marsa Alam | Swim with Wild Dolphins at Sataya',
    metaDescription:
      'Book a Dolphin House tour from Marsa Alam to Sataya Reef and snorkel with wild spinner dolphins. Full-day boat trip, pristine coral, lunch and hotel pickup included.',
    heroImage: img('1607153333879-c174d265f1d2', 'Wild dolphins at the Dolphin House Sataya Reef tour from Marsa Alam', { priority: true }),
    intro: [
      '“Dolphin House” is the traveller’s name for Sataya Reef, a huge horseshoe of coral in the southern Red Sea where hundreds of wild spinner dolphins rest and play by day. A Dolphin House tour is, for many visitors, the single most memorable day of their Egypt holiday.',
      'Our full-day boat trip takes you there responsibly — small groups, strict encounter rules, and plenty of time to snorkel the surrounding coral gardens whether or not the dolphins choose to join you.',
    ],
    tourSlugs: ['snorkeling-sataya-dolphin-reef', 'hamata-islands-boat-trip', 'abu-dabbab-snorkeling'],
    sections: [
      {
        heading: 'What is the Dolphin House?',
        body: [
          'Dolphin House refers to Sataya Reef in the Hamata region, roughly two hours south of Marsa Alam. Its sheltered lagoon is a daytime resting ground for a resident pod of spinner dolphins, making it one of the best places in the world to see them in the wild.',
        ],
      },
      {
        heading: 'Doing it the responsible way',
        body: [
          'The dolphins keep returning to Sataya precisely because responsible operators protect their rest. We never chase or feed them, keep groups small, and let the animals decide whether to approach. It’s better for the dolphins — and it makes for a calmer, more magical encounter.',
        ],
      },
    ],
    faqs: [
      { question: 'Where is the Dolphin House in Marsa Alam?', answer: 'The Dolphin House is Sataya Reef, a large horseshoe reef in the Hamata region about 120 km south of Marsa Alam. Tours depart by boat from Hamata harbour.' },
      { question: 'Will I definitely see dolphins on the Dolphin House tour?', answer: 'Sataya has a resident pod and sightings are very frequent, but the dolphins are wild, so nothing is guaranteed. The pristine coral reef makes the trip worthwhile regardless.' },
      { question: 'How long is the Dolphin House tour?', answer: 'It’s a full day — around 10–11 hours including the transfer south, boat journey, several snorkel stops and lunch on board.' },
      { question: 'Is the Dolphin House tour suitable for children?', answer: 'Yes, children aged 4+ enjoy it. The lagoon is calm and shallow, life jackets are available, and the crew keeps a careful eye on younger swimmers.' },
    ],
  },
];

export const landingPageBySlug = new Map(landingPages.map((p) => [p.slug, p]));

export function getLandingPage(slug: string): LandingPage | undefined {
  return landingPageBySlug.get(slug);
}
