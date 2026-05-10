"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import KatexRenderer from "@/components/math/KatexRenderer";
import type { UploadDetailQuestion } from "@/lib/upload/uploadDetail";

const DIFFICULTY_LABEL: Record<UploadDetailQuestion["difficulty"], string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  HARD: "Hard",
};

type Props = { question: UploadDetailQuestion };

export default function QuestionListItem({ question }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [removed, setRemoved] = useState(false);

  const breadcrumb = `${question.subjectName} → ${question.chapterName}${
    question.subtopicName ? ` → ${question.subtopicName}` : ""
  }`;

  async function onConfirm() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/questions/${question.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        const msg = body.error ?? `Delete failed (${res.status})`;
        toast.error(msg);
        return;
      }
      toast.success("Question deleted");
      setRemoved(true);
      setOpen(false);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  if (removed) return null;

  return (
    <li className="flex items-start gap-3 p-4 sm:gap-4">
      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
          {question.questionNumber ? (
            <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground">
              Q{question.questionNumber}
            </span>
          ) : question.sourceRow != null ? (
            <span className="font-mono">Row {question.sourceRow}</span>
          ) : null}
          <span className="truncate">{breadcrumb}</span>
          <span aria-hidden>·</span>
          <span>{DIFFICULTY_LABEL[question.difficulty]}</span>
          {question.visibility === "PRIVATE" && (
            <>
              <span aria-hidden>·</span>
              <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
                Private
              </Badge>
            </>
          )}
        </div>
        <div className="line-clamp-2 font-serif text-sm leading-relaxed">
          <KatexRenderer text={question.text} />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/questions/${question.id}/edit`}>
            <Pencil className="h-3.5 w-3.5" aria-hidden />
            Edit
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only sm:not-sr-only">Delete</span>
        </Button>
      </div>

      <Dialog open={open} onOpenChange={(v) => !deleting && setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this question?</DialogTitle>
            <DialogDescription>
              The question, its options, images, and edit history will be
              permanently removed. This cannot be undone.
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
              {deleting ? "Deleting…" : "Delete question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}
