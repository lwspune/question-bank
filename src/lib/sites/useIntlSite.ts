"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isIntlHost, isIntlPagePath } from "@/lib/sites/intl";

/**
 * Whether this page is shown as intl.pyqvault.com. An international exam's
 * pages know it from the path, so they render the intl look on the server too.
 * A page both hosts share (/login, /pricing, /account) only learns it from the
 * browser's host after mount: reading the host on the server would make every
 * page dynamic (CLAUDE.md, "One cookies() read in a SHARED SHELL").
 */
export function useIntlSite(): boolean {
  const pathname = usePathname() ?? "/";
  const [onIntlHost, setOnIntlHost] = useState(false);
  useEffect(() => {
    setOnIntlHost(isIntlHost(window.location.host));
  }, []);
  return isIntlPagePath(pathname) || onIntlHost;
}
