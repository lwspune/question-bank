"use client";

import { usePathname, useSearchParams } from "next/navigation";

/**
 * `/login?next=<this exact page>` for the reveal wall. Shared by the prompt and
 * the locked reveal button so both return a visitor to the same place.
 */
export function useSignInHref(): string {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname ?? "/browse";
  return `/login?next=${encodeURIComponent(returnUrl)}`;
}
