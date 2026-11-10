"use client";

import { usePathname } from "next/navigation";
import { publicPath } from "./publicPath";

/**
 * usePathname(), as the visitor sees it: the same on the server and in the
 * browser when middleware served a cached copy (see publicPath). Use this for
 * anything a component RENDERS from the path, so the cached HTML hydrates.
 */
export function usePublicPathname(): string {
  return publicPath(usePathname());
}
