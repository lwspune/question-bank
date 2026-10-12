"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Camera, CheckCircle2, FileText, ImageIcon, Loader2, PenLine, Upload, X } from "lucide-react";
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
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  ACCEPT,
  ANSWER_SHEETS_BUCKET,
  CAMERA_ACCEPT,
  MAX_FILES,
  cameraPageName,
  validateStartRequest,
} from "@/lib/answerSheets/upload";

type Status = { signedIn: boolean; submittedToday: boolean };

function fmtBytes(n: number): string {
  return n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * "Get your answers checked" on a board paper (migration 0153). The student
 * writes the paper on paper, uploads photos or a PDF, and gets a report within
 * 48 hours, graded by hand (scripts/grading/GRADING.md).
 *
 * It sits on a cached page shared by everyone, so it asks /api/answer-sheets/
 * status who is looking when it opens. Files go straight to private storage
 * through signed links: a 25-page PDF is far over the route body limit.
 */
export default function AnswerSheetUpload({
  examSlug,
  paperSlug,
  paperTitle,
}: {
  examSlug: string;
  paperSlug: string;
  paperTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [consent, setConsent] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [sent, setSent] = useState(false);
  const [here, setHere] = useState("/question-papers");
  // "Take photo" only where there is a camera to open: on a computer the
  // capture hint is ignored and it would be a second file picker.
  const [canCamera, setCanCamera] = useState(false);

  const loadStatus = useCallback(async () => {
    setLoadFailed(false);
    try {
      const res = await fetch("/api/answer-sheets/status", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setStatus((await res.json()) as Status);
    } catch {
      setLoadFailed(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    setHere(window.location.pathname);
    setCanCamera(window.matchMedia("(pointer: coarse)").matches);
    void loadStatus();
  }, [open, loadStatus]);

  const busy = progress !== null;
  const check = validateStartRequest({
    examSlug,
    paperSlug,
    consent,
    files: files.map((f) => ({ type: f.type, size: f.size })),
  });
  const fileProblem = files.length > 0 && !check.ok && consent ? check.error : null;

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, MAX_FILES + 1));
  }

  // One page per camera tap, named by its place in the list (phones call every
  // capture image.jpg).
  function addCameraPhotos(list: FileList | null) {
    if (!list) return;
    setFiles((prev) =>
      [
        ...prev,
        ...Array.from(list).map(
          (f, i) => new File([f], cameraPageName(prev.length + i + 1, f.type), { type: f.type, lastModified: f.lastModified })
        ),
      ].slice(0, MAX_FILES + 1)
    );
  }

  async function onSend() {
    if (!check.ok) {
      toast.error(check.error);
      return;
    }
    setProgress({ done: 0, total: files.length });
    try {
      const startRes = await fetch("/api/answer-sheets/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examSlug,
          paperSlug,
          consent,
          files: files.map((f) => ({ type: f.type, size: f.size })),
        }),
      });
      const started = (await startRes.json().catch(() => ({}))) as {
        error?: string;
        submissionId?: string;
        uploads?: { path: string; token: string }[];
      };
      if (!startRes.ok || !started.submissionId || !started.uploads) {
        throw new Error(started.error ?? `Upload could not start (${startRes.status})`);
      }

      const storage = createSupabaseBrowserClient().storage.from(ANSWER_SHEETS_BUCKET);
      for (let i = 0; i < files.length; i++) {
        const { path, token } = started.uploads[i];
        const { error } = await storage.uploadToSignedUrl(path, token, files[i], { contentType: files[i].type });
        if (error) throw new Error(`File ${i + 1} (${files[i].name}) did not upload. Please try again.`);
        setProgress({ done: i + 1, total: files.length });
      }

      const doneRes = await fetch(`/api/answer-sheets/${started.submissionId}/submit`, { method: "POST" });
      const done = (await doneRes.json().catch(() => ({}))) as { error?: string };
      if (!doneRes.ok) throw new Error(done.error ?? `Could not send (${doneRes.status})`);

      setSent(true);
      setFiles([]);
      setConsent(false);
      toast.success("Answer sheet sent. Your report will be ready within 48 hours.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setProgress(null);
    }
  }

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-start gap-3">
        <span className="icon-tile shrink-0" aria-hidden>
          <PenLine className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-foreground">Get your answers checked, free</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Write this paper on paper, timed, then upload photos or a PDF of your answers. You get marks for every
            question, what earned them and what was missing, within 48 hours.
          </p>
          <Dialog
            open={open}
            onOpenChange={(v) => {
              if (busy) return;
              setOpen(v);
              if (!v) setSent(false);
            }}
          >
            <DialogTrigger asChild>
              <Button variant="brandOutline" size="sm" className="mt-3">
                <Upload className="h-4 w-4" aria-hidden />
                Upload your answer sheet
              </Button>
            </DialogTrigger>
            <DialogContent className="flex max-h-[90dvh] flex-col gap-0 p-0 sm:max-w-lg">
              <DialogHeader className="px-6 pt-6">
                <DialogTitle>{sent ? "Answer sheet sent" : "Upload your answer sheet"}</DialogTitle>
                <DialogDescription>{paperTitle}</DialogDescription>
              </DialogHeader>

              {!status ? (
                <div className="flex min-h-[120px] items-center justify-center px-6 py-4 text-sm text-muted-foreground">
                  {loadFailed ? (
                    <div className="space-y-3 text-center">
                      <p>Couldn&apos;t load the upload box.</p>
                      <Button variant="outline" size="sm" onClick={() => void loadStatus()}>
                        Try again
                      </Button>
                    </div>
                  ) : (
                    <Loader2 className="h-5 w-5 animate-spin" aria-label="Loading" />
                  )}
                </div>
              ) : sent ? (
                <div className="space-y-3 px-6 py-4 text-sm">
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
                    Your report will be ready within 48 hours. We will email you when it is, and you can find it under
                    My answer sheets.
                  </p>
                  <Button asChild variant="brand" className="w-full sm:w-auto">
                    <Link href="/me/answer-sheets">My answer sheets</Link>
                  </Button>
                </div>
              ) : !status.signedIn ? (
                <div className="space-y-3 px-6 py-4 text-sm text-muted-foreground">
                  <p>Sign in to upload your answers. Checking is free while we launch: one answer sheet a day.</p>
                  <Button asChild variant="brand" className="w-full sm:w-auto">
                    <Link href={`/login?next=${encodeURIComponent(here)}`}>Sign in</Link>
                  </Button>
                </div>
              ) : status.submittedToday ? (
                <div className="space-y-3 px-6 py-4 text-sm text-muted-foreground">
                  <p>
                    You have sent today&apos;s answer sheet. Checking is free while we launch, one sheet a day, so send
                    the next one tomorrow.
                  </p>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link href="/me/answer-sheets">My answer sheets</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4 text-sm">
                    <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                      <li>One page per photo, in page order, flat and in good light. A scanner app that makes a PDF works best.</li>
                      <li>Up to {MAX_FILES} files, 20 MB each. JPG, PNG or PDF.</li>
                      <li>Free while we launch: one answer sheet a day.</li>
                    </ul>

                    <div>
                      <div className={canCamera ? "grid grid-cols-2 gap-2" : "flex"}>
                        {canCamera && (
                          <label
                            htmlFor={`answer-camera-${paperSlug}`}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 text-center font-medium hover:bg-accent focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                          >
                            <Camera className="h-4 w-4 shrink-0" aria-hidden />
                            {files.length === 0 ? "Take photo" : "Take next page"}
                            <input
                              id={`answer-camera-${paperSlug}`}
                              type="file"
                              accept={CAMERA_ACCEPT}
                              capture="environment"
                              className="sr-only"
                              disabled={busy}
                              onChange={(e) => {
                                addCameraPhotos(e.target.files);
                                e.target.value = "";
                              }}
                            />
                          </label>
                        )}
                        <label
                          htmlFor={`answer-files-${paperSlug}`}
                          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border bg-background px-3 py-2 text-center font-medium hover:bg-accent focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        >
                          <ImageIcon className="h-4 w-4 shrink-0" aria-hidden />
                          {files.length === 0 ? "Choose photos or a PDF" : "Add more files"}
                          <input
                            id={`answer-files-${paperSlug}`}
                            type="file"
                            multiple
                            accept={ACCEPT}
                            className="sr-only"
                            disabled={busy}
                            onChange={(e) => {
                              addFiles(e.target.files);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>
                      {files.length > 0 && (
                        <ol className="mt-3 space-y-1.5" aria-label="Files to send, in page order">
                          {files.map((f, i) => (
                            <li key={`${f.name}-${i}`} className="flex items-center gap-2 rounded-md border px-2.5 py-1.5">
                              <span className="w-6 shrink-0 text-xs text-muted-foreground">{i + 1}.</span>
                              <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                              <span className="min-w-0 flex-1 truncate">{f.name}</span>
                              <span className="shrink-0 text-xs text-muted-foreground">{fmtBytes(f.size)}</span>
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                                aria-label={`Remove ${f.name}`}
                                className="rounded p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                              >
                                <X className="h-3.5 w-3.5" aria-hidden />
                              </button>
                            </li>
                          ))}
                        </ol>
                      )}
                      {fileProblem && (
                        <p role="alert" className="mt-2 text-destructive">
                          {fileProblem}
                        </p>
                      )}
                    </div>

                    <p className="rounded-md border border-brand-accent/30 bg-brand-accent/5 p-3">
                      Write it like the real exam, without the book or the answers. This report only helps if the
                      answers are your own.
                    </p>

                    <label className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={consent}
                        disabled={busy}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[hsl(var(--brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      <span className="text-muted-foreground">
                        I agree that PYQ Vault may check my answer sheet with the help of an AI tool. Scans are deleted
                        30 days after checking. See our{" "}
                        <Link href="/privacy" className="underline">
                          privacy policy
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                  <DialogFooter className="shrink-0 flex-col gap-2 border-t bg-background px-6 py-4 sm:flex-row">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={busy} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                    <Button
                      variant="brand"
                      onClick={() => void onSend()}
                      disabled={busy || files.length === 0 || !consent}
                      className="w-full sm:w-auto"
                    >
                      {busy ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                          {progress && progress.done < progress.total
                            ? `Uploading ${progress.done + 1} of ${progress.total}`
                            : "Sending"}
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" aria-hidden />
                          Send for checking
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
