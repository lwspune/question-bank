"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        const msg = json.error ?? `Download failed (${res.status})`;
        setError(msg);
        toast.error(msg);
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
      toast.success(
        `Downloaded ${totalCount} question${totalCount === 1 ? "" : "s"}`
      );
      setOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Download failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={totalCount === 0} className="w-full sm:w-auto">
          <Download className="h-4 w-4" aria-hidden />
          Download
          {totalCount > 0 && (
            <span className="ml-1 text-primary-foreground/80">
              · {totalCount}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Download {totalCount} question{totalCount === 1 ? "" : "s"}
          </DialogTitle>
          <DialogDescription>
            You&apos;ll get a .zip with two files: the Question Paper and the
            Answer Key. Both use 0.5″ margins, 2 columns, Cambria 10pt.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
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
            <Label htmlFor="export-title">Document title</Label>
            <Input
              id="export-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={busy}
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeSolutions}
              onChange={(e) => setIncludeSolutions(e.target.checked)}
              disabled={busy}
              className="h-4 w-4"
            />
            <span>Include solutions in the Answer Key</span>
          </label>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button
            onClick={onDownload}
            disabled={busy || overCap || totalCount === 0}
          >
            {busy ? "Generating…" : "Download"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function sanitize(s: string): string {
  return s.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_") || "export";
}
