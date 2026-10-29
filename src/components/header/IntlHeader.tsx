"use client";

import IntlHeaderBar from "@/components/header/IntlHeaderBar";
import { useViewerSession } from "@/lib/viewer/useViewerSession";

/** The intl header for a page that is ALWAYS intl (the /intl tree), without AppHeader's switch. */
export default function IntlHeader() {
  const { session, loading } = useViewerSession();
  return <IntlHeaderBar email={session?.email ?? null} sessionLoading={loading} />;
}
