/*
 * PYQ Vault service worker — browser push only (PUSH_SPEC.md §7). No caching,
 * no offline shell: it shows the due-queue notification and opens its link.
 * The payload is built by lib/push/core.ts (buildDuePushPayload); its url goes
 * through /api/e/<token>, which records the tap.
 */
const FALLBACK = {
  title: "Something is waiting in Fix",
  body: "Open PYQ Vault to see it.",
  url: "/drill",
  tag: "due-nudge",
  icon: "/icons/push-192.png",
  badge: "/icons/push-badge-96.png",
};

self.addEventListener("push", (event) => {
  let data = FALLBACK;
  try {
    if (event.data) data = { ...FALLBACK, ...event.data.json() };
  } catch (e) {
    data = FALLBACK;
  }
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      tag: data.tag,
      icon: data.icon,
      badge: data.badge,
      data: { url: data.url },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || "/drill", self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((wins) => {
      const same = wins.find((w) => new URL(w.url).origin === self.location.origin);
      if (same) return same.focus().then((w) => (w ? w.navigate(url) : self.clients.openWindow(url)));
      return self.clients.openWindow(url);
    })
  );
});
