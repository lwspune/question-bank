"use client";

import { Suspense, type ComponentProps } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { headerSignInHref, signInHref } from "./signInHref";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
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
 */
export default function SignInLink({ variant = "return", ...props }: Props) {
  const pathname = usePathname();
  const hrefFor = variant === "header" ? headerSignInHref : signInHref;
  return (
    <Suspense fallback={<Link {...props} href={hrefFor(pathname, "")} />}>
      <WithQuery {...props} variant={variant} />
    </Suspense>
  );
}

function WithQuery({ variant, ...props }: Props) {
  const pathname = usePathname();
  const search = useSearchParams()?.toString() ?? "";
  const hrefFor = variant === "header" ? headerSignInHref : signInHref;
  return <Link {...props} href={hrefFor(pathname, search)} />;
}
