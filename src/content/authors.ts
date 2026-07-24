import type { Author } from './types';
import { img } from './images';

/** EEAT: real, named authors with relevant expertise back the blog content. */
export const authors: Author[] = [
  {
    slug: 'omar-said',
    name: 'Omar Said',
    role: 'Founder & Head Guide',
    bio: 'Omar has led desert and sea excursions on Egypt’s Red Sea coast for over 15 years. Born in Marsa Alam and a licensed guide, he founded Marsa Alam Safari to share the region he knows intimately — from the best dolphin reefs to the quietest desert valleys.',
    avatar: img('1507003211169-0a1dd7228f2d', 'Portrait of Omar Said, founder and head guide at Marsa Alam Safari', { width: 200, height: 200 }),
  },
  {
    slug: 'lena-fischer',
    name: 'Lena Fischer',
    role: 'Travel Writer & Trip Planner',
    bio: 'Lena is a German travel writer who relocated to the Red Sea coast in 2016. She specialises in practical, honest travel guides for European visitors and has snorkeled, dived and safaried nearly every route Marsa Alam offers.',
    avatar: img('1494790108377-be9c29b29330', 'Portrait of Lena Fischer, travel writer at Marsa Alam Safari', { width: 200, height: 200 }),
  },
  {
    slug: 'youssef-hassan',
    name: 'Youssef Hassan',
    role: 'PADI Instructor & Marine Guide',
    bio: 'Youssef is a PADI-certified diving instructor and marine naturalist with more than 3,000 logged dives in the Red Sea. He writes about diving, snorkeling and marine conservation around Marsa Alam.',
    avatar: img('1500648767791-00dcc994a43e', 'Portrait of Youssef Hassan, PADI instructor at Marsa Alam Safari', { width: 200, height: 200 }),
  },
];

export const authorBySlug = new Map(authors.map((a) => [a.slug, a]));

export function getAuthor(slug: string): Author | undefined {
  return authorBySlug.get(slug);
}
