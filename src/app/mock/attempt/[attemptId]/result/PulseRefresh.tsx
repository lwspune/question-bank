"use client";

import { useEffect } from "react";
import { invalidatePulse } from "@/lib/viewer/usePulse";

/**
 * A graded mock is one of the two moments the due count in the header changes
 * (the other is a drill answer). Mounting on the result page drops the cached
 * pulse and refetches, so the avatar badge already shows the new pool when
 * the student looks up from the score. Renders nothing.
 */
export default function PulseRefresh() {
  useEffect(() => {
    invalidatePulse();
  }, []);
  return null;
}
