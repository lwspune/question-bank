"use client";

/**
 * Browser-side install helpers (2026-11-14, growth registry "install-app").
 * The rules live in ./platform.ts; this file only touches the browser, and
 * every access is guarded: an old browser, a private window or an in-app
 * WebView can lack any of it.
 *
 * WHY A MODULE-LEVEL STORE: Chrome fires `beforeinstallprompt` once, early, on
 * whatever page the visitor lands on, usually not /app. AppInstallCapture (in
 * the root layout) catches it there and parks it here; module state survives
 * client-side navigation, so the /app card can still use it a few taps later.
 */
import { installPlatform, type InstallPlatform } from "./platform";

/** Chrome's install prompt event. Not in the DOM typings. */
export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let parked: InstallPromptEvent | null = null;
const listeners = new Set<() => void>();
/** Set while our own button's prompt is open, so `appinstalled` can say which way it came. */
let viaButton = false;

export function parkInstallPrompt(e: InstallPromptEvent | null): void {
  parked = e;
  for (const l of listeners) l();
}

export function hasInstallPrompt(): boolean {
  return parked !== null;
}

export function subscribeInstallPrompt(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Open Chrome's install box. A prompt can be used once, so it is dropped
 * either way; Chrome fires a fresh `beforeinstallprompt` later if the visitor
 * said no.
 */
export async function runInstallPrompt(): Promise<"accepted" | "dismissed" | "unavailable"> {
  const e = parked;
  if (!e) return "unavailable";
  parkInstallPrompt(null);
  viaButton = true;
  try {
    await e.prompt();
    const { outcome } = await e.userChoice;
    return outcome;
  } catch {
    return "unavailable";
  } finally {
    // `appinstalled` can arrive a few seconds after the choice (Android builds
    // the home-screen app first), so the flag outlives the prompt for a while.
    setTimeout(() => {
      viaButton = false;
    }, 30_000);
  }
}

export function installedViaButton(): boolean {
  return viaButton;
}

export function isStandalone(): boolean {
  try {
    const nav = navigator as Navigator & { standalone?: boolean };
    return nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
  } catch {
    return false;
  }
}

/** This browser's platform. Call after mount: there is no navigator on the server. */
export function currentPlatform(): InstallPlatform {
  try {
    return installPlatform({
      userAgent: navigator.userAgent,
      standalone: isStandalone(),
      maxTouchPoints: navigator.maxTouchPoints ?? 0,
    });
  } catch {
    return "desktop";
  }
}
