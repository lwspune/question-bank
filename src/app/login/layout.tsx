import type { Metadata } from "next";

/**
 * Metadata for /login.
 *
 * This lives in a layout because `page.tsx` is a Client Component (it reads
 * `?next=` via useSearchParams), and a "use client" module cannot export
 * `metadata`. That limitation is precisely why this route had no canonical and
 * no robots directive at all.
 *
 * NOINDEX, and the reason is worth stating: the page renders its form on the
 * client, so the server HTML Google receives is an empty shell — 278 characters
 * of chrome, identical to /signup's. In the 2026-08-09 Search Console coverage
 * report that produced a "Duplicate without user-selected canonical" flag: two
 * URLs, indistinguishable content, nothing declaring which one is authoritative.
 *
 * Excluding it is the honest fix rather than a workaround — nobody reaches an
 * exam-prep site by searching for its sign-in form, so the page has no search
 * value to preserve. `?next=` variants are covered too: the directive is served
 * for every query-string form of this path.
 */
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: true },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
