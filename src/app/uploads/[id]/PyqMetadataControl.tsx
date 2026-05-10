"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarRange, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PyqAggregate } from "@/lib/upload/uploadDetail";

const NONE = "__NONE__";
const PYQ_YEARS = (() => {
  const max = new Date().getFullYear() + 1;
  const min = 2000;
  return Array.from({ length: max - min + 1 }, (_, i) => max - i);
})();

type Props = {
  jobId: string;
  questionCount: number;
  current: PyqAggregate;
};

type Patch = {
  pyqYear?: number | null;
  pyqMonth?: string | null;
  pyqNote?: string | null;
};

export default function PyqMetadataControl({
  jobId,
  questionCount,
  current,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pendingPatch, setPendingPatch] = useState<Patch | null>(null);

  const startYear = current.year === "mixed" ? NONE : yearToString(current.year);
  const startMonth = current.month === "mixed" ? "" : current.month ?? "";
  const startNote = current.note === "mixed" ? "" : current.note ?? "";

  const [year, setYear] = useState(startYear);
  const [month, setMonth] = useState(startMonth);
  const [note, setNote] = useState(startNote);

  function openDialog() {
    setYear(startYear);
    setMonth(startMonth);
    setNote(startNote);
    setOpen(true);
  }

  function buildPatch(): Patch {
    const patch: Patch = {};
    const newYear = year === NONE ? null : Number(year);
    const newMonth = month.trim() === "" ? null : month.trim();
    const newNote = note.trim() === "" ? null : note.trim();

    if (current.year !== "mixed" && newYear !== current.year) {
      patch.pyqYear = newYear;
    } else if (current.year === "mixed" && year !== NONE) {
      patch.pyqYear = newYear;
    }

    if (current.month !== "mixed" && newMonth !== (current.month ?? null)) {
      patch.pyqMonth = newMonth;
    } else if (current.month === "mixed" && newMonth !== null) {
      patch.pyqMonth = newMonth;
    }

    if (current.note !== "mixed" && newNote !== (current.note ?? null)) {
      patch.pyqNote = newNote;
    } else if (current.note === "mixed" && newNote !== null) {
      patch.pyqNote = newNote;
    }

    return patch;
  }

  function isDestructive(patch: Patch): boolean {
    if (
      "pyqYear" in patch &&
      typeof current.year === "number" &&
      current.year !== patch.pyqYear
    ) {
      return true;
    }
    if (
      "pyqMonth" in patch &&
      typeof current.month === "string" &&
      current.month !== patch.pyqMonth
    ) {
      return true;
    }
    if (
      "pyqNote" in patch &&
      typeof current.note === "string" &&
      current.note !== patch.pyqNote
    ) {
      return true;
    }
    if ("pyqYear" in patch && current.year === "mixed") return true;
    if ("pyqMonth" in patch && current.month === "mixed") return true;
    if ("pyqNote" in patch && current.note === "mixed") return true;
    return false;
  }

  async function send(patch: Patch) {
    setSaving(true);
    try {
      const res = await fetch(`/api/uploads/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        toast.error(body.error ?? `Update failed (${res.status})`);
        return;
      }
      const data = (await res.json()) as { updated: number };
      toast.success(
        data.updated === 0
          ? "No changes"
          : `Updated ${data.updated} question${
              data.updated === 1 ? "" : "s"
            }`
      );
      setOpen(false);
      setConfirmOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  function onSaveClick() {
    const patch = buildPatch();
    if (Object.keys(patch).length === 0) {
      setOpen(false);
      return;
    }
    if (isDestructive(patch)) {
      setPendingPatch(patch);
      setConfirmOpen(true);
      return;
    }
    void send(patch);
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <CalendarRange
          className="h-4 w-4 text-muted-foreground"
          aria-hidden
        />
        <span className="text-xs font-medium text-muted-foreground">PYQ:</span>
        <PyqValue label="Year" value={current.year} />
        <PyqValue label="Month" value={current.month} />
        <PyqValue label="Comment" value={current.note} />
        <Button
          variant="ghost"
          size="sm"
          onClick={openDialog}
          className="ml-auto h-7 text-xs"
        >
          <Pencil className="h-3 w-3" aria-hidden />
          Edit
        </Button>
      </div>

      <Dialog open={open} onOpenChange={(v) => !saving && setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>PYQ details</DialogTitle>
            <DialogDescription>
              Applied to all {questionCount} question
              {questionCount === 1 ? "" : "s"} in this upload. Leave a field
              blank to keep its current value when it&apos;s mixed.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="pyq-year">Year</Label>
              <Select value={year} onValueChange={setYear} disabled={saving}>
                <SelectTrigger id="pyq-year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>
                    {current.year === "mixed" ? "(mixed — keep)" : "— None —"}
                  </SelectItem>
                  {PYQ_YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pyq-month">Month</Label>
              <Input
                id="pyq-month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder={current.month === "mixed" ? "(mixed)" : "May"}
                maxLength={20}
                disabled={saving}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pyq-note">Comment</Label>
              <Input
                id="pyq-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={current.note === "mixed" ? "(mixed)" : "Shift I"}
                maxLength={200}
                disabled={saving}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={onSaveClick} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onOpenChange={(v) => !saving && setConfirmOpen(v)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace existing PYQ values?</DialogTitle>
            <DialogDescription>
              Some questions in this upload already have a different PYQ
              year, month, or comment. Continuing will overwrite those values
              for all {questionCount} question
              {questionCount === 1 ? "" : "s"}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => pendingPatch && send(pendingPatch)}
              disabled={saving}
            >
              {saving ? "Saving…" : "Replace and save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PyqValue({
  label,
  value,
}: {
  label: string;
  value: number | string | null | "mixed";
}) {
  if (value === "mixed") {
    return (
      <span className="inline-flex items-center gap-1">
        <span className="text-xs text-muted-foreground">{label}:</span>
        <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
          mixed
        </Badge>
      </span>
    );
  }
  if (value === null || value === "") {
    return (
      <span className="inline-flex items-center gap-1">
        <span className="text-xs text-muted-foreground">{label}:</span>
        <span className="text-xs text-muted-foreground/70">—</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-xs text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </span>
  );
}

function yearToString(value: number | null): string {
  return value == null ? NONE : String(value);
}
