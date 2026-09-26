import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";

/**
 * Shared shell for the policy pages (/terms, /refunds, /contact). One layout
 * so the three read as a set, and so a date change is one prop, not a hunt.
 * Server-only, no cookies — these pages are cached.
 */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  /** Human date the text last changed, e.g. "26 September 2026". */
  updated?: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-2xl px-6 pb-16 pt-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {updated && (
            <p className="mt-2 text-xs text-muted-foreground">Last updated {updated}</p>
          )}
          <p className="mt-4 font-serif text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        </header>
        {children}
      </main>
      <Footer />
    </>
  );
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-lg font-semibold tracking-tight">{children}</h2>;
}

export function LegalP({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1.5 pl-5 font-serif text-base leading-relaxed text-muted-foreground">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
