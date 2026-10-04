"use client";

import { useEffect } from "react";
import { celebrate } from "./celebrate";

/**
 * Show a celebration the SERVER decided on while rendering the page (the mock
 * result's "N questions answered", 2026-10-04). The award is already written
 * and is never returned twice, so a refresh of the page shows nothing; this
 * only paints it. Renders nothing.
 */
export default function CelebrateOnMount({ message }: { message: string | null }) {
  useEffect(() => {
    if (message) celebrate(message, "talk");
  }, [message]);
  return null;
}
