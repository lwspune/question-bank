"use client";

import { useEffect } from "react";
import { sendActivityOnce } from "@/lib/activity/clientBeacon";
import type { Surface } from "@/lib/activity/views";

/**
 * Records a surface view from a CACHED page, where the server has no session
 * to log it with (/start is ISR). Renders nothing. Signed-out visitors get a
 * 401 from the beacon and nothing is stored, by design.
 */
export default function ViewBeacon({ surface }: { surface: Surface }) {
  useEffect(() => {
    sendActivityOnce(`view:${surface}`, { kind: "surface_viewed", surface });
  }, [surface]);
  return null;
}
