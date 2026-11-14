"use client";

import { useEffect } from "react";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import {
  installedViaButton,
  isStandalone,
  parkInstallPrompt,
  type InstallPromptEvent,
} from "@/lib/install/client";

/** Set once this device has recorded its first home-screen launch for a signed-in student. */
const RECORDED_KEY = "pv_app_opened";

let launchHandled = false;

/**
 * Root-layout island for installing PYQ Vault (2026-11-14, growth registry
 * "install-app"). Renders nothing and reads no server API at render, so
 * prerendered pages stay prerendered. On mount it:
 *
 *  1. registers /sw.js for every visitor. Before this it registered only when a
 *     student turned on reminders, and some Chrome versions offer an install
 *     only to a site with a registered service worker. The worker has no fetch
 *     handler and caches nothing, so pages load exactly as before;
 *  2. parks Chrome's install prompt for the /app button. preventDefault keeps
 *     Chrome from showing its own install bar on every page: the offer stays
 *     where we put it (/app, the account menu), which is a site-wide change
 *     nobody asked for otherwise;
 *  3. counts installs, and launches from the home-screen icon. A signed-in
 *     student's first launch on this device is also written to their profile
 *     (student_profiles.app_opened_at, migration 0255; the database keeps the
 *     first date), so the readout can compare their return visits.
 */
export default function AppInstallCapture() {
  useEffect(() => {
    try {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          /* a blocked or unsupported worker only means no install offer */
        });
      }
    } catch {
      /* hostile environment: nothing to do */
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      parkInstallPrompt(e as InstallPromptEvent);
    };
    const onInstalled = () => {
      parkInstallPrompt(null);
      trackFunnel("app_installed", { via: installedViaButton() ? "button" : "browser" });
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    if (isStandalone() && !launchHandled) {
      launchHandled = true;
      trackFunnelOnce("app_opened", "launch");
      void recordFirstLaunch();
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return null;
}

async function recordFirstLaunch(): Promise<void> {
  try {
    if (localStorage.getItem(RECORDED_KEY)) return;
  } catch {
    return; // no storage: we cannot tell a first launch from a hundredth, so do not write
  }
  try {
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ appOpened: true }),
    });
    // 401 = not signed in yet: leave the flag unset so the launch after sign-in records it.
    if (res.ok) localStorage.setItem(RECORDED_KEY, "1");
  } catch {
    /* a lost record costs one data point, never an error for the student */
  }
}
