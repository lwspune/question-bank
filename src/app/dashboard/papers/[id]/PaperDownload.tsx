"use client";

import { useState } from "react";
import { Download, FileText, Key, Loader2, Table } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Kind = "paper" | "key" | "tags";

const KIND_META: Record<Kind, { prefix: string; ext: string; label: string }> = {
  paper: { prefix: "QP", ext: "docx", label: "Question Paper" },
  key: { prefix: "Answers", ext: "docx", label: "Answer Key" },
  tags: { prefix: "Tags", ext: "xlsx", label: "Tagged sheet" },
};

/**
 * Download a paper's questions. Reuses the existing /api/export pipeline in
 * `questionIds` mode — the paper just feeds its ordered ids in, so there's no
 * paper-specific export code.
 */
export default function PaperDownload({
  title,
  questionIds,
}: {
  title: string;
  questionIds: string[];
}) {
  const [open, setOpen] = useState(false);
  const [includeSourceTag, setIncludeSourceTag] = useState(false);
  const [busyKind, setBusyKind] = useState<Kind | null>(null);
  const busy = busyKind !== null;
  const count = questionIds.length;
  const overCap = count > 200;

  async function onDownload(kind: Kind) {
    setBusyKind(kind);
    try {
      const res = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          questionIds,
          options: {
            title,
            includeSolutions: true,
            groupBySubtopic: false,
            includeSourceTag,
          },
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        toast.error(json.error ?? `Download failed (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const meta = KIND_META[kind];
      const a = document.createElement("a");
      a.href = url;
      a.download = `${meta.prefix}_${sanitize(title)}.${meta.ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success(`${meta.label} downloaded`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Download failed");
    } finally {
      setBusyKind(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="brand" disabled={count === 0}>
          <Download className="h-4 w-4" aria-hidden />
          Download
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download {count} question{count === 1 ? "" : "s"}</DialogTitle>
          <DialogDescription>
            Word files — Question Paper and Answer Key — plus a tagged sheet (.xlsx)
            for nda-tracker, numbered to match the paper. Questions are ordered by
            section.
          </DialogDescription>
        </DialogHeader>
        {overCap && (
          <p className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive" role="alert">
            This paper has {count} questions — the export cap is 200. Remove some,
            then download.
          </p>
        )}
        <label className="flex cursor-pointer items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={includeSourceTag}
            onChange={(e) => setIncludeSourceTag(e.target.checked)}
            disabled={busy}
            className="mt-0.5 h-4 w-4"
          />
          <span>
            Cite the source after each question in the Question Paper
            <span className="block text-xs text-muted-foreground">
              e.g. [JEE Mains 2016]. Practice questions are left untagged.
            </span>
          </span>
        </label>
        <DialogFooter className="flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Button variant="outline" onClick={() => onDownload("tags")} disabled={busy || overCap || count === 0}>
            {busyKind === "tags" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Table className="h-4 w-4" aria-hidden />}
            Tagged sheet
          </Button>
          <Button variant="outline" onClick={() => onDownload("key")} disabled={busy || overCap || count === 0}>
            {busyKind === "key" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Key className="h-4 w-4" aria-hidden />}
            Answer Key
          </Button>
          <Button variant="brand" onClick={() => onDownload("paper")} disabled={busy || overCap || count === 0}>
            {busyKind === "paper" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <FileText className="h-4 w-4" aria-hidden />}
            Question Paper
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function sanitize(s: string): string {
  return s.replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "_") || "export";
}
