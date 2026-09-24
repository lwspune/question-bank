import Link from "next/link";
import { footerLinks } from "@/lib/nav/footerLinks";

/**
 * Site-wide footer: a tagline, then four short link columns.
 *
 * Rendered from `footerLinks()` (pure) rather than hand-typed JSX — the
 * previous version was 23 links in one flat wrap and had fallen two /notes
 * hubs behind the registry. The Guides and Notes columns derive from the
 * registries, so a new exam's hub appears here without a footer edit.
 *
 * Sits in the cached shell: no cookies, no session — one `cookies()` read
 * here would de-cache every page on the site (see CLAUDE.md).
 */
export default function Footer() {
  const groups = footerLinks();
  return (
    <footer className="mt-16 border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 text-xs text-muted-foreground">
        {/*
          "free for teachers" until 2026-08-22 — and this renders on EVERY page,
          including the anon browse and landing surfaces that are the whole SEO
          funnel. It excluded the 95% of accounts that are students, and it was
          backwards on its own terms: browsing is what is free to everyone,
          while the Word download is the TEACHER-gated capability.

          Names a person on every page. This line read "From the team at PYQ
          Vault" until 2026-09-16, which is what a site with no team says — and
          nothing else on the public site named a human at all. See /about.
        */}
        <p>
          <span className="font-medium">PYQ Vault</span> — built in Pune by{" "}
          <Link href="/about" className="underline hover:text-foreground">
            Vilas Shinde
          </Link>
          . Free to browse, forever.
        </p>

        <nav
          aria-label="Site links"
          className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4"
        >
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-2 text-[11px] font-medium uppercase tracking-wide text-foreground/70">
                {group.title}
              </h2>
              <ul className="space-y-1.5">
                {group.links.map((link) =>
                  link.external ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
