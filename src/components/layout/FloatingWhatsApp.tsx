import { whatsappLink } from '@/config/site';
import { Icon } from '@/components/ui/Icons';

/** Persistent booking affordance — high-converting on mobile. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('Hi! I’d like to book a Marsa Alam tour.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover transition-transform hover:scale-105 active:scale-95"
    >
      <Icon.Whatsapp width={28} height={28} />
    </a>
  );
}
