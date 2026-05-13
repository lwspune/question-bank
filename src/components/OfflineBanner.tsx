"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

/**
 * Slim sticky-bottom banner that appears when the browser reports offline.
 * Self-dismisses when connectivity returns. No state outside the component.
 *
 * Mounted globally in layout.tsx so it covers every route.
 */
export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    function on() {
      setOffline(false);
    }
    function off() {
      setOffline(true);
    }
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 z-50 flex items-center justify-center gap-2 bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground shadow-md"
      style={{ bottom: "env(safe-area-inset-bottom)" }}
    >
      <WifiOff className="h-4 w-4" aria-hidden />
      You&apos;re offline — downloads and filtering won&apos;t work until you reconnect.
    </div>
  );
}
