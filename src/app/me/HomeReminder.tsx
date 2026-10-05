"use client";

import PushOptIn from "@/components/push/PushOptIn";
import { usePulse } from "@/lib/viewer/usePulse";
import { homeReminderAsk } from "@/lib/profile/push";

/**
 * The /me reminder row (2026-10-05). Waits for the due count from the shared
 * pulse, the same read as the Today card and the header badge, and asks only
 * while something is waiting: a reminder about an empty queue promises nothing.
 */
export default function HomeReminder({
  vapidKey,
  pushPromptedAt,
}: {
  vapidKey: string;
  pushPromptedAt: string | null;
}) {
  const pulse = usePulse(true);
  if (!homeReminderAsk({ pushPromptedAt }, pulse?.due ?? null)) return null;
  return <PushOptIn vapidKey={vapidKey} variant="row" title="Get a reminder when mistakes are due. One a day at most." />;
}
