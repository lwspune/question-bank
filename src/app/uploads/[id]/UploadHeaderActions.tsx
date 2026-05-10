"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  jobId: string;
  filename: string;
  questionCount: number;
};

export default function UploadHeaderActions({
  jobId,
  filename,
  questionCount,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function onConfirm() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/uploads/${jobId}`, { method: "DELETE" });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        const msg = body.error ?? `Delete failed (${res.status})`;
        toast.error(msg);
        return;
      }
      toast.success(
        questionCount > 0
          ? `Deleted ${questionCount} question${
              questionCount === 1 ? "" : "s"
            } and the upload`
          : "Upload deleted"
      );
      setOpen(false);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden />
        Delete upload
      </Button>

      <Dialog open={open} onOpenChange={(v) => !deleting && setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this upload?</DialogTitle>
            <DialogDescription>
              {questionCount > 0 ? (
                <>
                  This will permanently delete{" "}
                  <strong>
                    {questionCount} question{questionCount === 1 ? "" : "s"}
                  </strong>{" "}
                  added by{" "}
                  <span className="font-mono text-foreground">{filename}</span>.
                  Their options, images, and edit history will go with them.
                  This cannot be undone.
                </>
              ) : (
                <>
                  This upload added no questions, so only the upload record
                  itself will be removed from your dashboard.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              disabled={deleting}
            >
              {deleting
                ? "Deleting…"
                : questionCount > 0
                ? `Delete ${questionCount} question${
                    questionCount === 1 ? "" : "s"
                  }`
                : "Delete upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
