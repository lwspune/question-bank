"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FOCUS_ALL, type FocusChoice } from "@/lib/me/focus";
import { setExamCookie } from "@/lib/exam/examCookie";
import type { ExamSlug } from "@/lib/exam/examContext";
import { invalidatePulse } from "@/lib/viewer/usePulse";

/**
 * The exam focus switch for a student with two or more exams (2026-11-08):
 * "All" plus one chip per exam. A tap saves the focus (POST /api/me/focus),
 * then reloads the page's server data: Home and Performance both read it.
 *
 * The badge count follows the focus, so its cached copy is dropped first, and
 * the site's exam cookie follows too, so PYQs opens on the same exam. On
 * Performance a tap also drops `?exam=`, which would otherwise win over it.
 *
 * `readOnly` is the staff view of a student's /me: the same chips as plain
 * text, so nothing there can save as the student.
 */
export default function FocusChips({
  options,
  selected,
  readOnly,
}: {
  options: { slug: string; label: string }[];
  /** The exam in focus, or null for All. */
  selected: string | null;
  readOnly: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [current, setCurrent] = useState<string | null>(selected);
  const [saving, setSaving] = useState(false);

  async function choose(choice: FocusChoice) {
    const next = choice === FOCUS_ALL ? null : choice;
    if (saving || next === current) return;
    const before = current;
    setCurrent(next);
    setSaving(true);
    try {
      const res = await fetch("/api/me/focus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam: choice }),
      });
      if (!res.ok) throw new Error(String(res.status));
      if (next) setExamCookie(next as ExamSlug);
      invalidatePulse();
      const label = options.find((o) => o.slug === next)?.label;
      toast.success(label ? `Now showing ${label}.` : "Now showing all your exams.");
      router.replace(pathname);
      router.refresh();
    } catch {
      setCurrent(before);
      toast.error("Could not switch exam. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const chips: { key: FocusChoice; label: string }[] = [
    { key: FOCUS_ALL, label: "All" },
    ...options.map((o) => ({ key: o.slug as FocusChoice, label: o.label })),
  ];
  const isOn = (key: FocusChoice) => (key === FOCUS_ALL ? current === null : current === key);
  const chipClass = (on: boolean) =>
    cn(
      "inline-flex h-8 items-center rounded-full border px-3 text-sm font-medium transition-colors",
      on ? "border-primary bg-primary text-primary-foreground" : "bg-card"
    );

  if (readOnly) {
    return (
      <>
        {chips.map((c) => (
          <span key={c.key} className={chipClass(isOn(c.key))}>
            {c.label}
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {chips.map((c) => {
        const on = isOn(c.key);
        return (
          <button
            key={c.key}
            type="button"
            aria-pressed={on}
            disabled={saving}
            onClick={() => void choose(c.key)}
            className={cn(
              chipClass(on),
              !on && "hover:bg-accent",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-70"
            )}
          >
            {c.label}
          </button>
        );
      })}
    </>
  );
}
