import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { ContactForm } from '@/components/contact/ContactForm';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { Icon } from '@/components/ui/Icons';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig, whatsappLink } from '@/config/site';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, localBusinessSchema, webPageSchema } from '@/lib/seo/jsonld';
import { absoluteUrl } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Marsa Alam Safari',
  description:
    'Get in touch with Marsa Alam Safari for bookings and questions. Reach us by WhatsApp, phone or email, or send an inquiry — our local team replies within hours.',
  path: '/contact',
});

export default function ContactPage() {
  const url = absoluteUrl('/contact');
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  const channels = [
    { icon: Icon.Whatsapp, label: 'WhatsApp', value: 'Chat with us instantly', href: whatsappLink('Hi! I have a question about a Marsa Alam tour.') },
    { icon: Icon.Phone, label: 'Phone', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
    { icon: Icon.Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
  ];

  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema(crumbs, url),
          localBusinessSchema(),
          webPageSchema({ path: '/contact', title: 'Contact Marsa Alam Safari', description: metadata.description as string }),
        ]}
      />
      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Let’s plan your Red Sea adventure</h1>
          <p className="mt-3 max-w-2xl text-lg text-charcoal-muted">
            Questions, custom itineraries or last-minute bookings — our local team is here 24/7.
            The fastest way to reach us is WhatsApp.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 rounded-2xl border border-charcoal/[0.08] bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean/10 text-ocean">
                    <c.icon width={22} height={22} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-charcoal">{c.label}</span>
                    <span className="block text-sm text-charcoal-muted">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-charcoal/[0.08] p-5">
              <h2 className="flex items-center gap-2 text-base font-semibold">
                <Icon.Pin width={18} height={18} className="text-ocean" /> Our base
              </h2>
              <p className="mt-1 text-sm text-charcoal-muted">
                {siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.countryName}
              </p>
              <div className="mt-4">
                <MapEmbed query="Port Ghalib, Marsa Alam, Egypt" title="Marsa Alam Safari location" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal/[0.08] bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-2xl font-semibold">Send an inquiry</h2>
            <p className="mt-1 text-sm text-charcoal-muted">We reply within a few hours, usually much sooner.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
