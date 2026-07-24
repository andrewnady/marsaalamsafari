import type { Destination } from './types';
import { img } from './images';

export const destinations: Destination[] = [
  {
    slug: 'sataya-reef',
    name: 'Sataya Dolphin Reef',
    title: 'Sataya Reef (Dolphin House), Marsa Alam',
    shortDescription:
      'A vast horseshoe reef in the Hamata region famous for its resident pod of wild spinner dolphins.',
    description:
      'Sataya Reef — known to visitors as Dolphin House — is a sheltered horseshoe of coral in the southern Red Sea, roughly two hours by boat from Hamata. Its calm inner lagoon is a daytime resting ground for hundreds of wild spinner dolphins, making it one of the few places on Earth where responsible swimmers can share the water with them in the wild.',
    intro:
      'There are few experiences in the Red Sea as unforgettable as slipping into the water at Sataya and watching a pod of spinner dolphins spiral beneath you. We keep our groups small and follow strict responsible-encounter rules so the dolphins stay wild and the moment stays magical.',
    region: 'Hamata, Southern Red Sea',
    geo: { latitude: 24.4056, longitude: 35.3861 },
    image: img('1607153333879-c174d265f1d2', 'Wild spinner dolphins swimming in the turquoise lagoon of Sataya Reef near Marsa Alam'),
    highlights: [
      'Swim near wild spinner dolphins in their natural habitat',
      'Snorkel a pristine, protected coral reef',
      'Calm, shallow lagoon ideal for all abilities',
      'Onboard lunch and unhurried snorkel stops',
    ],
    relatedTours: ['snorkeling-sataya-dolphin-reef', 'hamata-islands-boat-trip'],
  },
  {
    slug: 'abu-dabbab',
    name: 'Abu Dabbab Bay',
    title: 'Abu Dabbab Bay, Marsa Alam',
    shortDescription:
      'A gentle sandy bay famous for green sea turtles and the elusive dugong grazing on seagrass meadows.',
    description:
      'Abu Dabbab is a crescent of soft sand and shallow, calm water about 30 minutes north of Marsa Alam town. Its seagrass meadows feed resident green sea turtles and, if you are lucky, a dugong (sea cow). The bay’s easy entry and shallow depth make it the best beginner snorkeling spot on the coast.',
    intro:
      'If you want to snorkel with sea turtles without a boat, Abu Dabbab is the place. Wade in from the beach and, within minutes, you can be floating quietly above a green turtle grazing on the seagrass below.',
    region: 'North Marsa Alam',
    geo: { latitude: 25.3406, longitude: 34.7286 },
    image: img('1591025207163-942350e47db2', 'Green sea turtle grazing on seagrass in the shallow bay of Abu Dabbab, Marsa Alam'),
    highlights: [
      'Reliable green sea turtle sightings',
      'Shallow, calm water perfect for beginners and families',
      'Easy beach entry — no boat required',
      'Chance to spot the rare dugong',
    ],
    relatedTours: ['abu-dabbab-snorkeling'],
  },
  {
    slug: 'hamata-islands',
    name: 'Hamata Islands',
    title: 'Hamata Islands (Qulaan), Marsa Alam',
    shortDescription:
      'A protected archipelago of mangrove islands and coral gardens in the far south of the Red Sea.',
    description:
      'The Hamata (Qulaan) Islands sit within a protected marine park about 120 km south of Marsa Alam. Ringed by mangroves and shallow turquoise flats, the islands are a nursery for fish, birds and coral. The remoteness keeps crowds away and the reefs spectacularly intact.',
    intro:
      'The Hamata Islands feel like the Red Sea before tourism — mangrove-fringed sandbars, water in a dozen shades of turquoise, and reefs so healthy they hum with life. It is a longer journey south, and worth every kilometre.',
    region: 'Hamata, Southern Red Sea',
    geo: { latitude: 24.3167, longitude: 35.435 },
    image: img('1516815231560-8f41ec531527', 'Turquoise shallows and mangrove sandbars of the Hamata Islands south of Marsa Alam'),
    highlights: [
      'Protected marine park with pristine reefs',
      'Mangrove lagoons and empty white sandbars',
      'Excellent birdlife including ospreys and herons',
      'Far fewer visitors than northern sites',
    ],
    relatedTours: ['hamata-islands-boat-trip', 'snorkeling-sataya-dolphin-reef'],
  },
  {
    slug: 'wadi-el-gemal',
    name: 'Wadi El Gemal',
    title: 'Wadi El Gemal National Park, Marsa Alam',
    shortDescription:
      'A vast desert-and-sea national park of dunes, wadis, Roman ruins and Ababda Bedouin culture.',
    description:
      'Wadi El Gemal — the "Valley of the Camels" — is one of Egypt’s largest national parks, stretching from the Red Sea Hills to offshore islands. It protects mangroves, gazelles, ancient emerald mines and the living culture of the Ababda people, whose families have crossed these valleys for generations.',
    intro:
      'Wadi El Gemal is where the desert safari becomes something deeper. Beyond the dunes lie Roman emerald mines, acacia-dotted valleys grazed by gazelle, and Ababda Bedouin camps where the day ends over fire-baked bread and cardamom coffee.',
    region: 'South Marsa Alam',
    geo: { latitude: 24.6833, longitude: 35.0833 },
    image: img('1547234935-80c7145ec969', 'Golden dunes and desert mountains of Wadi El Gemal National Park near Marsa Alam'),
    highlights: [
      'Protected national park landscapes',
      'Ababda Bedouin culture and hospitality',
      'Ancient Roman emerald mines at Mons Smaragdus',
      'Desert wildlife including gazelle and ibex',
    ],
    relatedTours: ['marsa-alam-desert-safari', 'super-safari-jeep-adventure'],
  },
];

export const destinationBySlug = new Map(destinations.map((d) => [d.slug, d]));

export function getDestination(slug: string): Destination | undefined {
  return destinationBySlug.get(slug);
}
