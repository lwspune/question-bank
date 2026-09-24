/**
 * The site-wide footer's link model — four short groups.
 *
 * WHY A MODEL AND NOT JSX. Until 2026-09-24 the Footer was 23 hand-typed
 * links in one flat wrap: eleven individual subject guides, two of the four
 * /notes hubs (JEE Mains and CDS had shipped notes the footer never learned
 * about), a GitHub link, an icon on every one. The Guides and Notes groups
 * here are DERIVED from the same registries the /guide and /notes pickers
 * render from, so a new exam's hub shows up by itself and the list cannot lag
 * again. Per-subject guides are deliberately NOT listed: they are one hop
 * away on the exam hub, and eleven of them in a footer is what "cluttered"
 * looked like.
 *
 * THE FOOTER IS A CRAWL SURFACE, not only a nav one. It renders on every page,
 * so a link here is seen on every HTML fetch Google makes — on 2026-09-17
 * Search Console showed 12 of 1,474 pages indexed against a crawl budget of
 * ~4 HTML pages a day, and the fix was footer links to the four content
 * surfaces that lead the Explore group. tests/crawl-entry-points.test.ts pins
 * them against THIS model, and tests/footer-links.test.ts pins the shape.
 *
 * Pure: no DB, no React, no cookies (the footer sits in the cached shell, and
 * one `cookies()` read there would de-cache the whole site — see CLAUDE.md).
 */

import { CONTACT_EMAIL } from "@/lib/brand";
import { getGuideExamGroups } from "@/lib/guide/guidesNav";
import { getNotesExamGroups } from "@/lib/notes/notesNav";

export type FooterLink = {
  href: string;
  label: string;
  /** True for the one non-route link (the report mailto). */
  external?: boolean;
};

export type FooterGroup = {
  title: "Explore" | "Guides" | "Notes" | "About";
  links: FooterLink[];
};

export function footerLinks(): FooterGroup[] {
  return [
    {
      title: "Explore",
      links: [
        // /questions sits second, not first: /browse is the product, but the
        // /questions index links all ~631 chapter landings and is the reason
        // the crawl-budget fix went into the footer at all.
        { href: "/browse", label: "Question bank" },
        { href: "/questions", label: "Questions by chapter" },
        { href: "/mock", label: "Mock tests" },
        { href: "/board", label: "Board textbook reader" },
        { href: "/formula", label: "Questions by formula" },
      ],
    },
    {
      title: "Guides",
      links: [
        { href: "/guide", label: "All guides" },
        ...getGuideExamGroups().map((g) => ({
          href: g.guidesPath,
          label: g.displayName,
        })),
      ],
    },
    {
      title: "Notes",
      links: [
        { href: "/notes", label: "All notes" },
        ...getNotesExamGroups().map((g) => ({
          href: `/notes/${g.slug}`,
          label: g.displayName,
        })),
      ],
    },
    {
      title: "About",
      links: [
        // The one page that says what the product is for — on every page so
        // an anon phone reader (no account menu) can find it too.
        { href: "/start", label: "How it works" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        {
          href: `mailto:${CONTACT_EMAIL}?subject=Question%20Bank%20feedback`,
          label: "Report a question",
          external: true,
        },
      ],
    },
  ];
}
