"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ImageIcon, Pencil } from "lucide-react";
import KatexRenderer from "@/components/math/KatexRenderer";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { QuestionRow } from "@/lib/questions/query";

const DIFFICULTY_LABEL: Record<QuestionRow["difficulty"], string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  HARD: "Hard",
};

export default function QuestionCard({
  question,
  index,
  isAdmin,
  supabaseUrl,
}: {
  question: QuestionRow;
  index: number;
  isAdmin: boolean;
  supabaseUrl: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const breadcrumb = `${question.subject.name} → ${question.chapter.name}${
    question.subtopic ? ` → ${question.subtopic.name}` : ""
  }`;

  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-3 rounded-lg p-4 text-left transition-colors hover:bg-accent/40"
        aria-expanded={expanded}
      >
        <span className="mt-0.5 inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-full bg-muted px-2 font-mono text-xs text-muted-foreground">
          Q{index}
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="truncate">{breadcrumb}</span>
            <span aria-hidden>·</span>
            <span>{DIFFICULTY_LABEL[question.difficulty]}</span>
            {question.imageUrl && (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" aria-hidden />
                  <span className="sr-only">Has image</span>
                </span>
              </>
            )}
          </div>
          <div
            className={cn(
              "font-serif text-[15px] leading-relaxed",
              !expanded && "line-clamp-2"
            )}
          >
            <KatexRenderer text={question.text} />
          </div>
        </div>
        <ChevronDown
          className={cn(
            "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            expanded && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-t bg-muted/20 px-4 pb-4 font-serif">
            {question.context && (
              <div className="pt-3 text-sm italic text-muted-foreground">
                <KatexRenderer text={question.context} />
              </div>
            )}

            {question.imageUrl && (
              <div className="pt-3">
                <ZoomableImage
                  src={publicImageUrl(supabaseUrl, question.imageUrl)}
                  alt="Question diagram"
                  className="max-h-64 w-auto rounded border"
                />
              </div>
            )}

            <ol className="space-y-2 pt-2">
              {question.options.map((opt) => (
                <li
                  key={opt.label}
                  className={cn(
                    "rounded-md border bg-background p-2.5 text-sm",
                    opt.isCorrect && "border-l-2 border-l-emerald-500"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                      {opt.label}
                    </span>
                    <div className="min-w-0 flex-1">
                      <KatexRenderer text={opt.text} />
                    </div>
                    {opt.isCorrect && (
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-700">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Correct
                      </span>
                    )}
                  </div>
                  {opt.imageUrl && (
                    <div className="ml-9 mt-2">
                      <ZoomableImage
                        src={publicImageUrl(supabaseUrl, opt.imageUrl)}
                        alt={`Option ${opt.label} image`}
                        className="max-h-32 w-auto rounded border bg-background"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>

            {question.solution && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowSolution((v) => !v)}
                  className="font-sans text-xs font-medium text-primary hover:underline"
                >
                  {showSolution ? "Hide solution" : "Show solution"}
                </button>
                {showSolution && (
                  <div className="mt-2 rounded-md border border-dashed bg-background p-3 text-sm">
                    <KatexRenderer text={question.solution} />
                  </div>
                )}
              </div>
            )}

            {isAdmin && (
              <div className="border-t pt-2 font-sans">
                <Link
                  href={`/questions/${question.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <Pencil className="h-3 w-3" aria-hidden />
                  Edit question
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoomableImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="block cursor-zoom-in rounded transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`Zoom: ${alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className={className} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="mx-auto max-h-[85vh] w-auto rounded-lg bg-background"
        />
      </DialogContent>
    </Dialog>
  );
}
