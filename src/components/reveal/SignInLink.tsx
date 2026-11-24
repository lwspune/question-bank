"use client";

import { Suspense, type ComponentProps } from "react";
import { useSearchParams } from "next/navigation";
import QuietLink from "@/components/QuietLink";
import { usePublicPathname } from "@/lib/nav/usePublicPathname";
import { headerSignInHref, signInHref } from "./signInHref";

type Props = Omit<ComponentProps<typeof QuietLink>, "href"> & {
  /** "header": the general Sign in, which lands on /me from the home page and
   *  the sign-in pages. Default: always return to this exact page. */
  variant?: "return" | "header";
};

/**
 * A link to sign in that returns the visitor to this exact page.
 *
 * The query string comes from `useSearchParams()`, which bails its nearest
 * Suspense boundary out of static rendering. This link sits inside question
 * cards, so without a boundary of its own it sent whole /questions and /board
 * lists to the browser as an empty shell. Here only the link waits: the
 * server renders it with the path alone, and the browser adds the query.
 *
 * A QuietLink, so /login is fetched when a finger touches the link, not on
 * every signed-out page view (VERCEL_COST_SPEC.md item 2: 5.3K of 228K CDN
 * requests in 12 hours).
 */
export default function SignInLink({ variant = "return", ...props }: Props) {
  const pathname = usePublicPathname();
  const hrefFor = variant === "header" ? headerSignInHref : signInHref;
  return (
    <Suspense fallback={<QuietLink {...props} href={hrefFor(pathname, "")} />}>
      <WithQuery {...props} variant={variant} />
    </Suspense>
  );
}

function WithQuery({ variant, ...props }: Props) {
  const pathname = usePublicPathname();
  const search = useSearchParams()?.toString() ?? "";
  const hrefFor = variant === "header" ? headerSignInHref : signInHref;
  return <QuietLink {...props} href={hrefFor(pathname, search)} />;
}
