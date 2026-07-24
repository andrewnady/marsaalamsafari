import type { BlogPost } from './types';
import { img } from './images';

/**
 * Seed blog posts. Original, EEAT-focused content that internally links to
 * relevant tours. Add posts here or migrate to MDX/CMS with the same shape.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'best-things-to-do-in-marsa-alam',
    title: 'The 12 Best Things to Do in Marsa Alam (2026 Guide)',
    seoTitle: '12 Best Things to Do in Marsa Alam in 2026 | Local Guide',
    metaDescription:
      'A local’s guide to the best things to do in Marsa Alam: desert safaris, snorkeling with dolphins and turtles, diving, day trips to Luxor and more. Updated for 2026.',
    excerpt:
      'From swimming with wild dolphins at Sataya to quad biking the Eastern Desert, here are the twelve experiences that make Marsa Alam special — chosen by local guides.',
    category: 'things-to-do',
    tags: ['marsa-alam', 'things-to-do', 'travel-guide', 'activities'],
    authorSlug: 'lena-fischer',
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-20',
    readingMinutes: 9,
    heroImage: img('1516815231560-8f41ec531527', 'Turquoise Red Sea coastline at Marsa Alam with desert mountains behind', { priority: true }),
    body: [
      { type: 'paragraph', text: 'Marsa Alam has quietly become one of the Red Sea’s most rewarding destinations. It has the reefs and desert of its busier northern neighbours, but with a fraction of the crowds. Whether you’re here to dive, to swim with dolphins, or simply to watch the sun set over the dunes, here are the twelve experiences we recommend to every guest.' },
      { type: 'heading', level: 2, text: '1. Swim with wild dolphins at Sataya Reef', id: 'sataya' },
      { type: 'paragraph', text: 'Sataya — known as Dolphin House — is a horseshoe reef in the far south where a resident pod of spinner dolphins rests by day. A responsible full-day boat trip is the highlight of many holidays here. Sightings are frequent, but the reef itself, all healthy coral and clear water, is reason enough to go.' },
      { type: 'heading', level: 2, text: '2. Snorkel with sea turtles at Abu Dabbab', id: 'abu-dabbab' },
      { type: 'paragraph', text: 'If you’d rather stay close to shore, Abu Dabbab Bay is the easiest place on the coast to snorkel with green sea turtles. The water is shallow, calm and entered straight from the beach — perfect for families and first-timers.' },
      { type: 'heading', level: 2, text: '3. Ride the Eastern Desert on a safari', id: 'desert-safari' },
      { type: 'paragraph', text: 'A desert safari trades the beach for silence and horizon. Quad bikes, camel rides, a Bedouin village and dinner under the stars make for an unforgettable evening. It’s our most popular land excursion for good reason.' },
      { type: 'callout', title: 'Local tip', text: 'Do your desert safari in the afternoon so you catch the sunset from the dunes — and bring a warm layer, because the temperature drops fast after dark.' },
      { type: 'heading', level: 2, text: '4. Dive Elphinstone and the house reefs', id: 'diving' },
      { type: 'paragraph', text: 'Marsa Alam is a world-class dive destination. Beginners can take their first breaths on calm house reefs, while experienced divers make for the drop-offs of Elphinstone, where currents bring big pelagics and, in season, oceanic whitetip sharks.' },
      { type: 'heading', level: 2, text: '5. Take a day trip to Luxor', id: 'luxor' },
      { type: 'paragraph', text: 'You’re only about four hours from Luxor, the greatest open-air museum on Earth. The Valley of the Kings, Karnak and Hatshepsut’s temple are all doable in a long but extraordinary day trip with an Egyptologist guide.' },
      { type: 'heading', level: 2, text: '6. Cruise the Hamata Islands', id: 'hamata' },
      { type: 'paragraph', text: 'The protected Hamata (Qulaan) Islands are the Red Sea at its most pristine — mangrove sandbars, empty beaches and reefs humming with life. It’s a longer journey south, and the reward is a corner of Egypt that still feels wild.' },
      { type: 'paragraph', text: 'Beyond these, don’t miss a sunset camel ride, a felucca sail on a day trip to Aswan, snorkeling at Marsa Mubarak, birdwatching in Wadi El Gemal, exploring Port Ghalib marina, and simply enjoying a lazy day on one of the region’s uncrowded beaches.' },
    ],
    relatedTours: ['snorkeling-sataya-dolphin-reef', 'abu-dabbab-snorkeling', 'marsa-alam-desert-safari', 'luxor-day-trip'],
    faqs: [
      { question: 'What is Marsa Alam best known for?', answer: 'Marsa Alam is best known for its pristine coral reefs, dolphin and turtle snorkeling, world-class diving and easy access to the Eastern Desert for safaris — all with far fewer crowds than Hurghada or Sharm El Sheikh.' },
      { question: 'How many days do you need in Marsa Alam?', answer: 'A week lets you combine a desert safari, a couple of sea excursions and a day trip to Luxor or Aswan at a relaxed pace. Even in 3–4 days you can fit the highlights.' },
      { question: 'Is Marsa Alam good for families?', answer: 'Yes. Calm bays like Abu Dabbab, gentle camel rides and family-friendly safaris make it an excellent destination for children.' },
    ],
    featured: true,
  },
  {
    slug: 'best-time-to-visit-marsa-alam',
    title: 'The Best Time to Visit Marsa Alam: A Month-by-Month Guide',
    seoTitle: 'Best Time to Visit Marsa Alam | Month-by-Month Weather Guide 2026',
    metaDescription:
      'When is the best time to visit Marsa Alam? A month-by-month guide to weather, sea temperature, diving conditions and crowds on Egypt’s Red Sea coast.',
    excerpt:
      'Marsa Alam is a year-round destination, but the ideal month depends on whether you’re here to dive, snorkel, safari or simply soak up the sun. Here’s how the seasons break down.',
    category: 'travel-guides',
    tags: ['weather', 'best-time', 'planning', 'seasons'],
    authorSlug: 'lena-fischer',
    publishedAt: '2026-05-10',
    updatedAt: '2026-06-10',
    readingMinutes: 7,
    heroImage: img('1509316785289-025f5b846b35', 'Sunny golden dunes and clear sky over the Marsa Alam desert'),
    body: [
      { type: 'paragraph', text: 'One of Marsa Alam’s great advantages is its climate: it’s warm and sunny almost every day of the year. But “best” depends on what you want to do. Here’s an honest month-by-month breakdown from people who live here.' },
      { type: 'heading', level: 2, text: 'Spring (March–May): the sweet spot', id: 'spring' },
      { type: 'paragraph', text: 'Spring is arguably the best all-round time. Air temperatures sit in the comfortable high-20s to low-30s °C, the sea is warming nicely, and both desert and sea excursions are pleasant. Book ahead — this is a popular window.' },
      { type: 'heading', level: 2, text: 'Summer (June–August): hot and quiet underwater', id: 'summer' },
      { type: 'paragraph', text: 'Summer is hot — often 38–40°C — but the Red Sea coast is dry and the water is at its warmest (around 29°C), so snorkeling and diving are superb. Do land-based activities like desert safaris in the late afternoon and evening.' },
      { type: 'callout', title: 'Diving note', text: 'Late summer into autumn (roughly August–November) is the classic season for oceanic whitetip sharks at Elphinstone. Experienced divers plan trips around it.' },
      { type: 'heading', level: 2, text: 'Autumn (September–November): warm water, fewer crowds', id: 'autumn' },
      { type: 'paragraph', text: 'Autumn brings gentler air temperatures while the sea stays warm from summer. It’s a fantastic time for diving and snorkeling with slightly thinner crowds than spring.' },
      { type: 'heading', level: 2, text: 'Winter (December–February): mild days, cooler sea', id: 'winter' },
      { type: 'paragraph', text: 'Winter days are mild and sunny (low-to-mid 20s °C), ideal for desert safaris and day trips to Luxor. The sea cools to about 22°C, so a wetsuit makes snorkeling and diving much more comfortable. It’s also the greenest time for value.' },
    ],
    relatedTours: ['snorkeling-sataya-dolphin-reef', 'marsa-alam-diving-trip', 'marsa-alam-desert-safari'],
    faqs: [
      { question: 'What is the hottest month in Marsa Alam?', answer: 'July and August are the hottest, often reaching 38–40°C. The heat is dry, and sea activities remain very comfortable thanks to warm water and coastal breezes.' },
      { question: 'Can you visit Marsa Alam in winter?', answer: 'Yes. Winter is excellent for desert safaris and day trips, with mild, sunny days. The sea is cooler (around 22°C), so bring or rent a wetsuit for snorkeling and diving.' },
      { question: 'When is the best time to swim with dolphins at Sataya?', answer: 'Dolphin trips run year-round, but the sea is calmest and warmest from spring through autumn. Winter trips still run when conditions allow.' },
    ],
    featured: true,
  },
  {
    slug: 'what-to-pack-for-marsa-alam',
    title: 'What to Pack for Marsa Alam: The Complete Checklist',
    seoTitle: 'What to Pack for Marsa Alam | Complete Packing Checklist 2026',
    metaDescription:
      'A complete Marsa Alam packing list: what to wear for the desert and sea, reef-safe sunscreen, snorkeling gear, day-trip essentials and what to leave at home.',
    excerpt:
      'Sun, sea and desert in one trip means packing smart. Here’s exactly what to bring to Marsa Alam — and the few things people always forget.',
    category: 'packing-guides',
    tags: ['packing', 'checklist', 'planning', 'what-to-wear'],
    authorSlug: 'lena-fischer',
    publishedAt: '2026-04-22',
    updatedAt: '2026-05-15',
    readingMinutes: 6,
    heroImage: img('1544551763-46a013bb70d5', 'Snorkeling gear and sun hat laid out for a Marsa Alam beach holiday'),
    body: [
      { type: 'paragraph', text: 'Marsa Alam packs desert and sea into one holiday, so your bag needs to cover both. Here’s the checklist we send guests before they arrive.' },
      { type: 'heading', level: 2, text: 'Sun protection (non-negotiable)', id: 'sun' },
      { type: 'list', items: ['Reef-safe sunscreen SPF 30+ (protects you and the coral)', 'A wide-brimmed hat and good sunglasses', 'A light long-sleeve rash guard for snorkeling', 'After-sun or aloe vera'] },
      { type: 'heading', level: 2, text: 'For the sea', id: 'sea' },
      { type: 'list', items: ['Swimwear (bring two sets)', 'A quick-dry towel', 'Water shoes for rocky entries', 'Your own mask if you’re fussy about fit — gear is provided on tours', 'A dry bag and waterproof phone case'] },
      { type: 'heading', level: 2, text: 'For the desert', id: 'desert' },
      { type: 'list', items: ['Closed shoes for quad biking', 'A scarf or buff for dust', 'A light jacket — evenings get cold', 'Comfortable trousers for camel riding'] },
      { type: 'heading', level: 2, text: 'For day trips to Luxor and Aswan', id: 'day-trips' },
      { type: 'list', items: ['Modest clothing covering shoulders and knees for temples', 'Comfortable walking shoes', 'Passport or ID for road checkpoints', 'Cash for tips and optional site fees'] },
      { type: 'callout', title: 'Most forgotten item', text: 'Reef-safe sunscreen. Standard sunscreens harm coral and many are effectively unavailable locally — bring it from home.' },
    ],
    relatedTours: ['abu-dabbab-snorkeling', 'marsa-alam-desert-safari', 'luxor-day-trip'],
    faqs: [
      { question: 'Do I need to bring my own snorkeling gear?', answer: 'No — clean, well-maintained masks, snorkels and fins are provided on all our sea trips. Bring your own only if you prefer a guaranteed personal fit.' },
      { question: 'What should women wear in Marsa Alam?', answer: 'At beach resorts, normal swimwear and summer clothing are fine. For day trips to temples and towns, pack clothing that covers shoulders and knees out of respect for local culture.' },
      { question: 'Is it cold in the desert at night?', answer: 'Yes, desert temperatures drop quickly after sunset even in summer. Always bring a light jacket or fleece for evening safaris.' },
    ],
  },
  {
    slug: 'marsa-alam-vs-hurghada',
    title: 'Marsa Alam vs Hurghada: Which Red Sea Resort Is Right for You?',
    seoTitle: 'Marsa Alam vs Hurghada | Which Red Sea Destination to Choose',
    metaDescription:
      'Marsa Alam or Hurghada? Compare reefs, crowds, nightlife, diving, family-friendliness and value to choose the right Red Sea destination for your holiday.',
    excerpt:
      'Both sit on Egypt’s Red Sea coast, but they offer very different holidays. Here’s an honest comparison to help you choose between Marsa Alam and Hurghada.',
    category: 'travel-guides',
    tags: ['marsa-alam', 'hurghada', 'comparison', 'planning'],
    authorSlug: 'omar-said',
    publishedAt: '2026-03-30',
    updatedAt: '2026-05-01',
    readingMinutes: 8,
    heroImage: img('1502680390469-be75c86b636f', 'Boats on the turquoise Red Sea, comparing Marsa Alam and Hurghada'),
    body: [
      { type: 'paragraph', text: 'We run trips on both stretches of coast, so we get this question a lot. The short answer: choose Marsa Alam for nature and reefs, Hurghada for nightlife and choice. Here’s the longer version.' },
      { type: 'heading', level: 2, text: 'Reefs and marine life', id: 'reefs' },
      { type: 'paragraph', text: 'Marsa Alam wins on marine life. Its reefs are healthier and less crowded, and it offers reliable encounters with dolphins at Sataya and turtles at Abu Dabbab. Hurghada has good diving too, but its most pristine sites require longer boat journeys south.' },
      { type: 'heading', level: 2, text: 'Crowds and atmosphere', id: 'crowds' },
      { type: 'paragraph', text: 'Hurghada is a larger, livelier town with more nightlife, shopping and restaurants. Marsa Alam is quieter and more resort-focused — ideal if you want nature and relaxation over a party atmosphere.' },
      { type: 'heading', level: 2, text: 'Getting there', id: 'access' },
      { type: 'paragraph', text: 'Both have international airports. Marsa Alam International (RMF) is small and close to the southern resorts; many visitors also fly into Hurghada (HRG) and transfer south (around 3 hours).' },
      { type: 'heading', level: 2, text: 'Day trips', id: 'day-trips' },
      { type: 'paragraph', text: 'From both you can reach Luxor; Marsa Alam is also well placed for Aswan. Hurghada offers a slightly wider menu of organised excursions given its size.' },
      { type: 'callout', title: 'Our take', text: 'If this is your first Egypt beach holiday and you love snorkeling, diving and calm, choose Marsa Alam. If you want variety, nightlife and the widest choice of excursions, Hurghada edges it.' },
    ],
    relatedTours: ['snorkeling-sataya-dolphin-reef', 'marsa-alam-diving-trip', 'marsa-alam-desert-safari'],
    faqs: [
      { question: 'Is Marsa Alam better than Hurghada for snorkeling?', answer: 'Generally yes. Marsa Alam’s reefs are closer to shore, healthier and less crowded, with reliable dolphin and turtle encounters. Hurghada’s best reefs usually require longer boat trips.' },
      { question: 'Is Marsa Alam or Hurghada better for families?', answer: 'Both are family-friendly, but Marsa Alam’s calm bays like Abu Dabbab are especially good for children learning to snorkel. Hurghada offers more off-resort entertainment.' },
      { question: 'How far is Marsa Alam from Hurghada?', answer: 'About 270 km, or roughly a 3-hour drive south. Many visitors fly into Hurghada and transfer to Marsa Alam resorts.' },
    ],
  },
  {
    slug: 'snorkeling-with-dolphins-sataya-guide',
    title: 'Snorkeling with Dolphins at Sataya: A Responsible Guide',
    seoTitle: 'Snorkeling with Dolphins at Sataya Reef | Responsible Guide 2026',
    metaDescription:
      'Everything you need to know about snorkeling with wild dolphins at Sataya Reef (Dolphin House) near Marsa Alam — how it works, what to expect and how to do it responsibly.',
    excerpt:
      'Swimming near wild dolphins is a bucket-list experience — but only if it’s done right. Here’s how Sataya works, and how to enjoy it without disturbing the pod.',
    category: 'snorkeling',
    tags: ['dolphins', 'sataya', 'snorkeling', 'responsible-travel'],
    authorSlug: 'youssef-hassan',
    publishedAt: '2026-06-05',
    updatedAt: '2026-06-22',
    readingMinutes: 7,
    heroImage: img('1607153333879-c174d265f1d2', 'Wild spinner dolphins swimming in the clear lagoon at Sataya Reef'),
    body: [
      { type: 'paragraph', text: 'Sataya Reef, or Dolphin House, is one of the few places in the world where you can responsibly share the water with wild spinner dolphins. As a marine guide, I want you to have that experience — and I want the dolphins to keep choosing to come back. Here’s how both happen.' },
      { type: 'heading', level: 2, text: 'Why the dolphins are here', id: 'why' },
      { type: 'paragraph', text: 'Spinner dolphins hunt in deep water at night and use Sataya’s calm, sheltered lagoon to rest and socialise during the day. That daytime rest is exactly why we must be careful: disturb it too much and the pod moves on.' },
      { type: 'heading', level: 2, text: 'The rules that matter', id: 'rules' },
      { type: 'list', items: ['Never chase, touch or feed the dolphins', 'Enter the water calmly and quietly, in small groups', 'Swim parallel to the pod, never head-on or cutting across', 'Let the dolphins approach you — they often do', 'Keep boat numbers and time in the water limited'] },
      { type: 'callout', title: 'How we do it', text: 'We limit group size, brief every guest before entry, and keep encounters short and gentle. If the dolphins show signs of stress, we back off. It’s why sightings here remain so reliable.' },
      { type: 'heading', level: 2, text: 'What to expect on the day', id: 'day' },
      { type: 'paragraph', text: 'It’s a full day: an early transfer south to Hamata, a boat ride to the reef, several snorkel stops and lunch on board. Dolphin encounters are frequent but never guaranteed — they’re wild animals. Even without them, Sataya’s coral gardens make the trip worthwhile.' },
    ],
    relatedTours: ['snorkeling-sataya-dolphin-reef', 'hamata-islands-boat-trip'],
    faqs: [
      { question: 'Is it ethical to swim with dolphins at Sataya?', answer: 'It can be, when strict rules are followed: no chasing, touching or feeding, small groups, limited time in the water and letting the dolphins choose to approach. Responsible operators protect the pod’s daytime rest.' },
      { question: 'Are dolphin sightings guaranteed at Sataya?', answer: 'No. The dolphins are wild and free to come and go. Sightings are very frequent thanks to the resident pod, but never guaranteed. The reef itself is spectacular regardless.' },
      { question: 'Do I need to be a strong swimmer to snorkel at Sataya?', answer: 'Basic swimming ability helps, but the lagoon is calm and life jackets are available. Guides stay close to assist less confident snorkelers.' },
    ],
    featured: true,
  },
  {
    slug: 'how-to-get-to-marsa-alam',
    title: 'How to Get to Marsa Alam: Flights, Airports & Transfers',
    seoTitle: 'How to Get to Marsa Alam | Flights, Airport & Transfers Guide',
    metaDescription:
      'How to get to Marsa Alam: direct flights to Marsa Alam Airport (RMF), flying via Hurghada, transfer times, and getting around once you arrive.',
    excerpt:
      'Marsa Alam is easier to reach than you might think. Here’s a clear guide to airports, flights, transfer times and getting around on the Red Sea coast.',
    category: 'transportation',
    tags: ['flights', 'airport', 'transfers', 'getting-there'],
    authorSlug: 'omar-said',
    publishedAt: '2026-02-18',
    updatedAt: '2026-04-30',
    readingMinutes: 5,
    heroImage: img('1436491865332-7a61a109cc05', 'Airplane wing over the Red Sea coast approaching Marsa Alam'),
    body: [
      { type: 'paragraph', text: 'Getting to Marsa Alam is straightforward, whether you fly direct or route through Hurghada. Here’s what to know before you book.' },
      { type: 'heading', level: 2, text: 'Fly direct to Marsa Alam (RMF)', id: 'rmf' },
      { type: 'paragraph', text: 'Marsa Alam International Airport (RMF) receives seasonal charter and scheduled flights from across Europe, especially Germany, Italy, the UK, Poland and the Czech Republic. It’s small, quiet and close to the southern resorts — most transfers are 20–90 minutes.' },
      { type: 'heading', level: 2, text: 'Fly via Hurghada (HRG)', id: 'hrg' },
      { type: 'paragraph', text: 'Hurghada International Airport has more year-round flights. From there it’s about a 3-hour drive south to Marsa Alam. Many tour operators and hotels arrange this transfer.' },
      { type: 'heading', level: 2, text: 'Airport transfers', id: 'transfers' },
      { type: 'paragraph', text: 'Pre-booked private transfers are the easiest and safest option. We can arrange air-conditioned pickups from either airport — just ask when you book a tour.' },
      { type: 'heading', level: 2, text: 'Getting around', id: 'around' },
      { type: 'paragraph', text: 'Resorts are spread along the coast, so most visitors rely on hotel shuttles, taxis and tour transfers rather than public transport. All our excursions include hotel pickup and drop-off.' },
    ],
    relatedTours: ['marsa-alam-desert-safari', 'snorkeling-sataya-dolphin-reef'],
    faqs: [
      { question: 'Does Marsa Alam have its own airport?', answer: 'Yes, Marsa Alam International Airport (RMF) receives scheduled and charter flights from many European cities, especially in the winter season. It’s close to the southern resorts.' },
      { question: 'Can I fly to Hurghada and transfer to Marsa Alam?', answer: 'Yes. Hurghada (HRG) has more flights year-round, and Marsa Alam is about a 3-hour drive south. Private transfers are easy to arrange.' },
      { question: 'How do I get around in Marsa Alam?', answer: 'Most travel is by hotel shuttle, taxi or tour transfer. Our excursions all include air-conditioned hotel pickup and drop-off, so you don’t need a car.' },
    ],
  },
];

export const blogPostBySlug = new Map(blogPosts.map((p) => [p.slug, p]));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPostBySlug.get(slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts
    .filter((p) => p.category === category)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);
  return [...featured, ...rest]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function getAllPostsSorted(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
