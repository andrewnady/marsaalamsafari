import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-beige-soft">
        <div className="container-page py-10">
          <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: title, path: '#' }]} />
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">{title}</h1>
          <p className="mt-2 text-sm text-charcoal-muted">Last updated: {updated}</p>
        </div>
      </div>
      <div className="container-page py-14">
        <div className="prose-brand mx-auto max-w-prose">{children}</div>
      </div>
    </>
  );
}
