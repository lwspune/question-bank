"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { EbookStatus } from "@/lib/ebooks/status";

/**
 * Who is looking at a book's page (lib/ebooks/status), asked once after the
 * cached page loads and shared by the buy box and the cover picture, which
 * shows the visitor's own name on its name line (2026-10-28).
 */
type Ctx = { status: EbookStatus | null; loadFailed: boolean; reload: () => Promise<void> };

const EbookStatusCtx = createContext<Ctx>({ status: null, loadFailed: false, reload: async () => {} });

export function EbookStatusProvider({ slug, children }: { slug: string; children: ReactNode }) {
  const [status, setStatus] = useState<EbookStatus | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  const reload = useCallback(async () => {
    try {
      const res = await fetch(`/api/ebooks/${slug}/status`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setStatus((await res.json()) as EbookStatus);
      setLoadFailed(false);
    } catch {
      setLoadFailed(true);
    }
  }, [slug]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return <EbookStatusCtx.Provider value={{ status, loadFailed, reload }}>{children}</EbookStatusCtx.Provider>;
}

export function useEbookStatus(): Ctx {
  return useContext(EbookStatusCtx);
}
