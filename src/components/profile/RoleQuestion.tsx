"use client";

/**
 * "Are you a teacher or a student?": one line under a download box's buttons
 * (migration 0258, lib/profile/userRole).
 *
 * The SERVER decides whether to ask (GET /api/profile/role): signed in, not
 * staff, not answered yet. `enabled` only saves the request where the box
 * already knows the answer is no (signed out, staff). Renders nothing until
 * the server says yes, so a box that should not ask never flashes the line.
 *
 * Lives only in the download view, never beside the pass offer: running
 * experiments measure the offer (tests/user-role-boxes.test.ts pins this).
 * Once answered on a page, no other box on that page asks again.
 */
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { DownloadBox } from "@/lib/activity/clientEvents";
import type { UserRole } from "@/lib/profile/userRole";

// Answered on this page: every box stops asking without another request.
let answeredThisPage = false;

type State = "hidden" | "ask" | "saving" | "done";

export default function RoleQuestion({
  box,
  enabled,
  className = "",
}: {
  box: DownloadBox;
  enabled: boolean;
  className?: string;
}) {
  const [state, setState] = useState<State>("hidden");
  const labelId = useId();

  useEffect(() => {
    if (!enabled || answeredThisPage) return;
    let live = true;
    fetch(`/api/profile/role?box=${encodeURIComponent(box)}`, { cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<{ ask?: boolean }>) : null))
      .then((json) => {
        if (live && json?.ask === true && !answeredThisPage) setState("ask");
      })
      .catch(() => {
        // Not asking is the safe failure: the box works the same without it.
      });
    return () => {
      live = false;
    };
  }, [enabled, box]);

  async function answer(role: UserRole) {
    setState("saving");
    try {
      const res = await fetch("/api/profile/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, box }),
      });
      if (!res.ok) throw new Error(String(res.status));
      answeredThisPage = true;
      setState("done");
      toast.success("Thanks, saved.");
    } catch {
      setState("ask");
      toast.error("Could not save your answer. Please try again.");
    }
  }

  if (state === "hidden") return null;

  return (
    <div className={`border-t bg-background px-6 py-3 ${className}`}>
      {state === "done" ? (
        <p role="status" className="text-sm text-muted-foreground">
          Thanks for telling us.
        </p>
      ) : (
        <div
          role="group"
          aria-labelledby={labelId}
          className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <p id={labelId} className="text-sm text-muted-foreground">
            Are you a teacher or a student?
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={state === "saving"}
              onClick={() => answer("teacher")}
              className="flex-1 sm:flex-none"
            >
              Teacher
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={state === "saving"}
              onClick={() => answer("student")}
              className="flex-1 sm:flex-none"
            >
              Student
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
