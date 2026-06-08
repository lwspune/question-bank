"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assembleQuizAction } from "./actions";

export type ChapterOption = { value: string; label: string }; // value = "route/chapter"

export default function AssembleControl({ chapters }: { chapters: ChapterOption[] }) {
  const [sel, setSel] = useState(chapters[0]?.value ?? "");
  const [pending, start] = useTransition();

  if (chapters.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
        No chapters have ready questions yet — approve some (or run{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">quiz:harvest</code> +{" "}
        <code className="rounded bg-muted px-1 py-0.5 text-xs">quiz:verify</code>) to assemble a quiz.
      </div>
    );
  }

  const run = () => {
    const [route, chapter] = sel.split("/");
    start(async () => {
      const r = await assembleQuizAction(route, chapter);
      if (r.ok) {
        toast.success(
          `Built “${r.title}” (${r.questionCount} Q) — ${
            r.pushed ? "pushed to nda-tracker" : "recorded (push not configured)"
          }. ${r.remaining} ready left.`
        );
      } else {
        toast.error(r.error);
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-card p-4">
      <span className="text-sm font-medium">Assemble next quiz:</span>
      <select
        value={sel}
        onChange={(e) => setSel(e.target.value)}
        disabled={pending}
        className="h-9 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        aria-label="Chapter to assemble a quiz from"
      >
        {chapters.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <Button variant="brand" size="sm" onClick={run} disabled={pending || !sel}>
        {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Wand2 className="h-4 w-4" aria-hidden />}
        Assemble
      </Button>
      <span className="text-xs text-muted-foreground">
        Builds 15 unused questions → records + pushes a draft.
      </span>
    </div>
  );
}
