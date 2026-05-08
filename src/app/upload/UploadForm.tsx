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

type Exam = { id: string; name: string };

type PreviewResult = {
  jobId: string;
  filename: string;
  totalRows: number;
  validCount: number;
  errorCount: number;
  errors: { sourceRow: number; messages: string[] }[];
};

type CommitResult = {
  inserted: number;
  skipped: number;
  failed: number;
  errors: { sourceRow: number; message: string }[];
};

export default function UploadForm({ exams }: { exams: Exam[] }) {
  const [examId, setExamId] = useState(exams[0]?.id ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [committing, setCommitting] = useState(false);
  const [result, setResult] = useState<CommitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onPreview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || !examId) return;
    setBusy(true);
    setError(null);
    setPreview(null);
    setResult(null);

    const formData = new FormData();
    formData.set("file", file);
    formData.set("examId", examId);

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
        return;
      }
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "commit failed");
    } finally {
      setCommitting(false);
    }
  }

  function reset() {
    setPreview(null);
    setResult(null);
    setError(null);
    setFile(null);
  }

  return (
    <div className="space-y-6">
      {!result && (
        <Card>
          <CardHeader>
            <CardTitle>1. Choose file and exam</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onPreview} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exam">Exam</Label>
                <select
                  id="exam"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={examId}
                  onChange={(e) => setExamId(e.target.value)}
                  disabled={busy || !!preview}
                  aria-label="Exam"
                >
                  {exams.map((x) => (
                    <option key={x.id} value={x.id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="file">Excel file (.xlsx)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  disabled={busy || !!preview}
                />
              </div>
              {!preview && (
                <Button type="submit" disabled={!file || !examId || busy}>
                  {busy ? "Parsing…" : "Preview"}
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      )}

      {error && (
        <div
          className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      {preview && !result && (
        <Card>
          <CardHeader>
            <CardTitle>2. Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              <span className="font-medium">{preview.totalRows}</span> rows parsed
              from <span className="font-medium">{preview.filename}</span>:{" "}
              <span className="text-green-700 font-medium">
                {preview.validCount} valid
              </span>
              {" · "}
              <span className="text-destructive font-medium">
                {preview.errorCount} with errors
              </span>
            </p>

            {preview.errors.length > 0 && (
              <div className="rounded-md border max-h-80 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-muted/50">
                    <tr>
                      <th className="text-left px-3 py-2 w-20">Row</th>
                      <th className="text-left px-3 py-2">Errors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.errors.map((e) => (
                      <tr key={e.sourceRow} className="border-t">
                        <td className="px-3 py-2 align-top font-mono">
                          {e.sourceRow}
                        </td>
                        <td className="px-3 py-2">{e.messages.join("; ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex gap-2">
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
          <CardHeader>
            <CardTitle>3. Done</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-sm space-y-1">
              <li>
                Inserted:{" "}
                <span className="font-medium text-green-700">
                  {result.inserted}
                </span>
              </li>
              <li>
                Skipped (already in bank):{" "}
                <span className="font-medium">{result.skipped}</span>
              </li>
              <li>
                Failed:{" "}
                <span className="font-medium text-destructive">
                  {result.failed}
                </span>
              </li>
            </ul>
            {result.errors.length > 0 && (
              <details>
                <summary className="cursor-pointer text-sm font-medium">
                  View {result.errors.length} error
                  {result.errors.length === 1 ? "" : "s"}
                </summary>
                <ul className="mt-2 text-sm space-y-1">
                  {result.errors.map((e, i) => (
                    <li key={`${e.sourceRow}-${i}`}>
                      <span className="font-mono">Row {e.sourceRow}:</span>{" "}
                      {e.message}
                    </li>
                  ))}
                </ul>
              </details>
            )}
            <Button onClick={reset}>Upload another file</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
