"use client";

import type { ReactNode } from "react";
import { useIntlSite } from "@/lib/sites/useIntlSite";

/** Shows the intl footer on intl.pyqvault.com and PYQ Vault's elsewhere (see Footer). */
export default function FooterSwitch({ www, intl }: { www: ReactNode; intl: ReactNode }) {
  return <>{useIntlSite() ? intl : www}</>;
}
