import Link from 'next/link';
import { Icon } from '@/components/ui/Icons';
import { getBestsellerTours } from '@/content/tours';
import { TourCard } from '@/components/tours/TourCard';

export default function NotFound() {
  const suggestions = getBestsellerTours().slice(0, 3);
  return (
    <div className="container-page py-20 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-2 text-4xl font-bold sm:text-5xl">This page has drifted out to sea</h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-charcoal-muted">
        We couldn’t find the page you were looking for. It may have moved, or the link might be
        broken. Let’s get you back on course.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/tours" className="btn-outline">
          Browse all tours <Icon.Arrow width={16} height={16} />
        </Link>
      </div>

      <div className="mt-16 text-left">
        <h2 className="mb-6 text-center text-xl font-semibold">Popular tours you might like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
