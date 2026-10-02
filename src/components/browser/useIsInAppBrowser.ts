"use client";

import { useSyncExternalStore } from "react";
import { isInAppBrowser } from "@/lib/browser/inAppBrowser";

const noSubscribe = () => () => {};
const clientValue = () => isInAppBrowser(navigator.userAgent);
// The server cannot see the browser without reading headers, which would make
// the page dynamic. It renders the normal-browser version; an in-app browser
// switches on its first client commit.
const serverValue = () => false;

/** True inside WhatsApp / Instagram / Facebook / Google-app browsers. */
export function useIsInAppBrowser(): boolean {
  return useSyncExternalStore(noSubscribe, clientValue, serverValue);
}
