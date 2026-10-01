"use client";

import { usePathname, useSearchParams } from "next/navigation";

/** This page's path + query, the place a sign-in should return a visitor to. */
export function useCurrentPath(): string {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return searchParams?.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname ?? "/browse";
}

/**
 * `/login?next=<this exact page>` for the reveal wall. Shared by the prompt and
 * the locked reveal button so both return a visitor to the same place.
 */
export function useSignInHref(): string {
  return `/login?next=${encodeURIComponent(useCurrentPath())}`;
}
