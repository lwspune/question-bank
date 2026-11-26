"use client";

/**
 * One /dashboard/rooms action (POST /api/admin/rooms): toast the result and
 * refresh the page's server data. Shared by the rooms list and a room's page.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const BTN =
  "inline-flex h-9 items-center rounded-md border border-border bg-card px-3 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60";
export const FIELD =
  "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function useRoomAction(): { busy: boolean; act: (body: Record<string, unknown>, done: string) => Promise<boolean> } {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function act(body: Record<string, unknown>, done: string): Promise<boolean> {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/rooms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Could not save.");
      toast.success(done);
      router.refresh();
      return true;
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  return { busy, act };
}
