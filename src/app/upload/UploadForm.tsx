"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dropzone } from "@/components/ui/dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stepper, type Step } from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Exam = { id: string; name: string };

const PYQ_NONE = "__NONE__";
const PYQ_YEARS = (() => {
  const max = new Date().getFullYear() + 1;
  const min = 2000;
  return Array.from({ length: max - min + 1 }, (_, i) => max - i);
})();

type PreviewResult = {
  jobId: string;
  filename: string;
  totalRows: number;
  validCount: number;
  errorCount: number;
  errors: { sourceRow: number; messages: string[] }[];
  detectedExam: {
    id: string;
    name: string;
    source: "file" | "form";
  };
};

type CommitResult = {
  inserted: number;
  skipped: number;
  failed: number;
  errors: { sourceRow: number; message: string }[];
};

const STEPS: Step[] = [
  { key: "choose", label: "Choose" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
];

export default function UploadForm({ exams }: { exams: Exam[] }) {
  const [examId, setExamId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [pyqYear, setPyqYear] = useState<string>(PYQ_NONE);
  const [pyqMonth, setPyqMonth] = useState("");
  const [pyqNote, setPyqNote] = useState("");
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [committing, setCommitting] = useState(false);
  const [result, setResult] = useState<CommitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const currentStep = result ? 2 : preview ? 1 : 0;

  async function onPreview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;
    setBusy(true);
    setError(null);
    setPreview(null);
    setResult(null);

    const formData = new FormData();
    formData.set("file", file);
    if (examId) formData.set("examId", examId);
    if (pyqYear !== PYQ_NONE) formData.set("pyqYear", pyqYear);
    if (pyqMonth.trim()) formData.set("pyqMonth", pyqMonth.trim());
    if (pyqNote.trim()) formData.set("pyqNote", pyqNote.trim());

    try {
      const res = await fetch("/api/upload/preview", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "preview failed");
        return;
      }
      setPreview(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "preview failed");
    } finally {
      setBusy(false);
    }
  }

  async function onCommit() {
    if (!preview) return;
    setCommitting(true);
    setError(null);
    try {
      const res = await fetch("/api/upload/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: preview.jobId }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "commit failed");
        toast.error(json.error ?? "Commit failed");
        return;
      }
      setResult(json);
      toast.success(
        `Upload complete · ${json.inserted} added${json.skipped ? `, ${json.skipped} skipped` : ""}${json.failed ? `, ${json.failed} failed` : ""}`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "commit failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setCommitting(false);
    }
  }

  function reset() {
    setPreview(null);
    setResult(null);
    setError(null);
    setFile(null);
    setPyqYear(PYQ_NONE);
    setPyqMonth("");
    setPyqNote("");
  }

  return (
    <div className="space-y-6">
      <Stepper steps={STEPS} current={currentStep} />

      {error && (
        <div
          className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {!preview && !result && (
        <Card>
          <CardHeader>
            <CardTitle>Choose file and exam</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onPreview} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exam">Exam (optional)</Label>
                <Select
                  value={examId}
                  onValueChange={setExamId}
                  disabled={busy}
                >
                  <SelectTrigger id="exam">
                    <SelectValue placeholder="— Auto-detect from file —" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((x) => (
                      <SelectItem key={x.id} value={x.id}>
                        {x.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  Leave blank if your file has a <code className="font-mono">Course</code> column — we&rsquo;ll detect it.
                </p>
              </div>
              <fieldset className="space-y-2 rounded-md border bg-muted/20 p-3">
                <legend className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  PYQ details (optional)
                </legend>
                <p className="px-1 text-xs text-muted-foreground">
                  Applied to every question in this batch. Skip if mixed-year
                  or unknown.
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="pyq-year">Year</Label>
                    <Select
                      value={pyqYear}
                      onValueChange={setPyqYear}
                      disabled={busy}
                    >
                      <SelectTrigger id="pyq-year">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={PYQ_NONE}>— None —</SelectItem>
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
                      value={pyqMonth}
                      onChange={(e) => setPyqMonth(e.target.value)}
                      placeholder="May"
                      maxLength={20}
                      disabled={busy}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pyq-note">Comment</Label>
                    <Input
                      id="pyq-note"
                      value={pyqNote}
                      onChange={(e) => setPyqNote(e.target.value)}
                      placeholder="Shift I"
                      maxLength={200}
                      disabled={busy}
                    />
                  </div>
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label>Excel file</Label>
                <Dropzone
                  file={file}
                  onFile={setFile}
                  disabled={busy}
                />
              </div>
              <Button type="submit" disabled={!file || busy}>
                {busy ? "Parsing…" : "Preview"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {preview && !result && (
        <Card>
          <CardHeader>
            <CardTitle>Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span>
                From{" "}
                <span className="font-medium text-foreground">
                  {preview.filename}
                </span>
              </span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-0.5 text-xs font-medium text-foreground">
                {preview.detectedExam.source === "file" && (
                  <Sparkles
                    className="h-3 w-3 text-primary"
                    aria-hidden
                  />
                )}
                {preview.detectedExam.name}
                <span className="font-normal text-muted-foreground">
                  {preview.detectedExam.source === "file"
                    ? "(detected from file)"
                    : "(selected)"}
                </span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <SummaryStat
                value={preview.validCount}
                label="Valid"
                tone="ok"
              />
              <SummaryStat
                value={preview.errorCount}
                label="Errors"
                tone={preview.errorCount > 0 ? "bad" : "neutral"}
              />
              <SummaryStat
                value={preview.totalRows}
                label="Total rows"
                tone="neutral"
              />
            </div>

            {preview.errors.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold">
                  Errors ({preview.errors.length})
                </h3>
                <div className="max-h-80 overflow-auto rounded-md border">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-muted/50">
                      <tr>
                        <th className="w-20 px-3 py-2 text-left">Row</th>
                        <th className="px-3 py-2 text-left">Errors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.errors.map((e) => (
                        <tr key={e.sourceRow} className="border-t">
                          <td className="px-3 py-2 align-top font-mono text-xs">
                            {e.sourceRow}
                          </td>
                          <td className="px-3 py-2">
                            {e.messages.join("; ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                onClick={onCommit}
                disabled={preview.validCount === 0 || committing}
              >
                {committing
                  ? "Committing…"
                  : `Commit ${preview.validCount} valid row${preview.validCount === 1 ? "" : "s"}`}
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                disabled={committing}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
            <div className="rounded-full bg-emerald-100 p-3 duration-500 animate-in zoom-in-50">
              <CheckCircle2
                className="h-10 w-10 text-emerald-600"
                aria-hidden
                strokeWidth={1.75}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Upload complete
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.inserted} question{result.inserted === 1 ? "" : "s"}{" "}
                added to your bank
                {result.skipped > 0 && (
                  <>
                    {" · "}
                    {result.skipped} skipped (already present)
                  </>
                )}
                {result.failed > 0 && (
                  <>
                    {" · "}
                    <span className="text-destructive">
                      {result.failed} failed
                    </span>
                  </>
                )}
              </p>
            </div>

            {result.errors.length > 0 && (
              <details className="w-full max-w-md text-left">
                <summary className="cursor-pointer text-sm font-medium">
                  View {result.errors.length} error
                  {result.errors.length === 1 ? "" : "s"}
                </summary>
                <ul className="mt-2 max-h-48 space-y-1 overflow-auto rounded-md border bg-muted/30 p-3 text-sm">
                  {result.errors.map((e, i) => (
                    <li key={`${e.sourceRow}-${i}`}>
                      <span className="font-mono text-xs">
                        Row {e.sourceRow}:
                      </span>{" "}
                      {e.message}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Button asChild>
                <Link href="/browse">Browse questions</Link>
              </Button>
              <Button variant="outline" onClick={reset}>
                Upload another
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SummaryStat({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: "ok" | "bad" | "neutral";
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-center",
        tone === "ok" && "border-emerald-200 bg-emerald-50",
        tone === "bad" && "border-destructive/30 bg-destructive/5",
        tone === "neutral" && "bg-card"
      )}
    >
      <p
        className={cn(
          "font-mono text-2xl font-semibold tabular-nums tracking-tight",
          tone === "ok" && "text-emerald-700",
          tone === "bad" && "text-destructive"
        )}
      >
        {value.toLocaleString("en-IN")}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
