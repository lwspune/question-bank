"use client";

import { Suspense, type ComponentProps } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { signInHref } from "./signInHref";

type Props = Omit<ComponentProps<typeof Link>, "href">;

/**
 * A link to sign in that returns the visitor to this exact page.
 *
 * The query string comes from `useSearchParams()`, which bails its nearest
 * Suspense boundary out of static rendering. This link sits inside question
 * cards, so without a boundary of its own it sent whole /questions and /board
 * lists to the browser as an empty shell. Here only the link waits: the
 * server renders it with the path alone, and the browser adds the query.
 */
export default function SignInLink(props: Props) {
  const pathname = usePathname();
  return (
    <Suspense fallback={<Link {...props} href={signInHref(pathname, "")} />}>
      <WithQuery {...props} />
    </Suspense>
  );
}

function WithQuery(props: Props) {
  const pathname = usePathname();
  const search = useSearchParams()?.toString() ?? "";
  return <Link {...props} href={signInHref(pathname, search)} />;
}
