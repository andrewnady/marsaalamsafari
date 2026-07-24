import Link from 'next/link';
import { whatsappLink } from '@/config/site';
import { Icon } from './Icons';

export function CtaBanner({
  title = 'Ready to plan your Marsa Alam adventure?',
  text = 'Tell us your dates and hotel — we’ll craft the perfect itinerary and confirm everything in minutes.',
  whatsappMessage = 'Hi! I’d like help planning my Marsa Alam tours.',
}: {
  title?: string;
  text?: string;
  whatsappMessage?: string;
}) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl bg-ocean px-6 py-14 text-center text-white sm:px-12">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-turquoise/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-sunset/20 blur-2xl" />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
        <p className="mt-3 text-lg text-white/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
            <Icon.Whatsapp width={18} height={18} /> Chat on WhatsApp
          </a>
          <Link href="/contact" className="btn-outline border-white/25 bg-white/10 text-base text-white hover:bg-white/20">
            Send an inquiry
          </Link>
        </div>
      </div>
    </div>
  );
}
