"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Filters } from "@/lib/questions/filters";

export default function DownloadDialog({
  filters,
  totalCount,
}: {
  filters: Filters;
  totalCount: number;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Question Bank Export");
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const overCap = totalCount > 200;

  async function onDownload() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filters,
          options: { title, includeSolutions },
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setError(json.error ?? `Download failed (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${sanitize(title)}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3">
        <p className="text-sm">
          {totalCount === 0
            ? "No questions to export"
            : `${totalCount} question${totalCount === 1 ? "" : "s"} match — Question Paper + Answer Key`}
        </p>
        <Button
          onClick={() => setOpen(true)}
          disabled={totalCount === 0}
          size="sm"
        >
          Download (.zip)
        </Button>
      </div>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">
          Download {totalCount} question{totalCount === 1 ? "" : "s"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {overCap && (
          <div
            className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
            role="alert"
          >
            Too many questions for one export (cap is 200). Add a chapter or
            subtopic filter, then try again.
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="title">Document title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={busy}
          />
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={includeSolutions}
            onChange={(e) => setIncludeSolutions(e.target.checked)}
            disabled={busy}
            className="h-4 w-4"
          />
          <span>Include solutions in the Answer Key</span>
        </label>
        <p className="text-xs text-muted-foreground">
          You&apos;ll get a .zip with two files: the Question Paper and the Answer
          Key. Both use 0.5″ margins, 2 columns, and Cambria 10pt.
        </p>
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
        <div className="flex gap-2">
          <Button
            onClick={onDownload}
            disabled={busy || overCap || totalCount === 0}
          >
            {busy ? "Generating…" : "Download"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={busy}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function sanitize(s: string): string {
  return s.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_") || "export";
}
