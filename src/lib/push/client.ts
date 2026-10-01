"use client";

/**
 * Browser-side push helpers (PUSH_SPEC.md §7). No React — the ask card on the
 * mock result page and the /account toggle both use these. Every Notification
 * / serviceWorker access is guarded: either can be missing or throw (an old
 * browser, a private window, an in-app webview).
 */
// From browser.ts, never core.ts: core reaches node:crypto through lib/email/click.
import { isIosNotStandalone, urlBase64ToUint8Array } from "@/lib/push/browser";

export type PushAvailability = "available" | "ios-home-screen" | "unsupported" | "denied";
export type SubscribeResult = "subscribed" | "denied" | "unsupported" | "failed";

const SW_PATH = "/sw.js";

function hasPushApis(): boolean {
  try {
    return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
  } catch {
    return false;
  }
}

function standalone(): boolean {
  try {
    const nav = navigator as Navigator & { standalone?: boolean };
    return nav.standalone === true || window.matchMedia("(display-mode: standalone)").matches;
  } catch {
    return false;
  }
}

/** Can THIS browser be asked? Call after mount — there is no window on the server. */
export function pushAvailability(): PushAvailability {
  try {
    if (isIosNotStandalone(navigator.userAgent, standalone(), navigator.maxTouchPoints ?? 0)) return "ios-home-screen";
    if (!hasPushApis()) return "unsupported";
    if (Notification.permission === "denied") return "denied";
    return "available";
  } catch {
    return "unsupported";
  }
}

/** True when the browser has not been asked yet (the ask card shows only then). */
export function permissionUnasked(): boolean {
  try {
    return Notification.permission === "default";
  } catch {
    return false;
  }
}

/** This browser's live subscription, if any — the /account toggle's state. */
export async function currentSubscription(): Promise<PushSubscription | null> {
  if (!hasPushApis()) return null;
  try {
    const reg = await navigator.serviceWorker.getRegistration(SW_PATH);
    return reg ? await reg.pushManager.getSubscription() : null;
  } catch {
    return null;
  }
}

export async function subscribeToPush(vapidPublicKey: string): Promise<SubscribeResult> {
  if (!hasPushApis() || !vapidPublicKey) return "unsupported";
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return "denied";
    const reg = await navigator.serviceWorker.register(SW_PATH);
    await navigator.serviceWorker.ready;
    const sub =
      (await reg.pushManager.getSubscription()) ??
      (await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      }));
    const res = await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...sub.toJSON(), userAgent: navigator.userAgent }),
    });
    return res.ok ? "subscribed" : "failed";
  } catch (e) {
    console.error("push subscribe failed", e);
    return "failed";
  }
}

export async function unsubscribeFromPush(): Promise<boolean> {
  try {
    const sub = await currentSubscription();
    if (!sub) return true;
    const endpoint = sub.endpoint;
    await sub.unsubscribe();
    const res = await fetch("/api/push/subscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint }),
    });
    return res.ok;
  } catch (e) {
    console.error("push unsubscribe failed", e);
    return false;
  }
}

/** Both answers to the ask stamp push_prompted_at, so it is asked once. */
export async function stampPushPrompted(): Promise<void> {
  try {
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pushPrompted: true }),
    });
  } catch {
    /* the ask may show once more; never worth an error for the student */
  }
}
