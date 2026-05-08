"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import KatexRenderer from "@/components/math/KatexRenderer";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import type { QuestionRow } from "@/lib/questions/query";

const DIFFICULTY_VARIANT: Record<
  QuestionRow["difficulty"],
  "success" | "warning" | "destructive"
> = {
  EASY: "success",
  MODERATE: "warning",
  HARD: "destructive",
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
    <div className="rounded-lg border bg-card shadow-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full text-left p-4 flex items-start gap-3 hover:bg-accent/40 transition-colors rounded-lg"
        aria-expanded={expanded}
      >
        <span className="mt-0.5 inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-mono w-9 h-7 px-2 shrink-0">
          Q{index}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs text-muted-foreground">
              {breadcrumb}
            </span>
            <Badge variant={DIFFICULTY_VARIANT[question.difficulty]}>
              {question.difficulty}
            </Badge>
            {question.imageUrl && (
              <span
                className="text-xs text-muted-foreground"
                title="Has image"
                aria-label="Has image"
              >
                🖼️
              </span>
            )}
          </div>
          <div
            className={cn(
              "text-sm leading-relaxed",
              !expanded && "line-clamp-2"
            )}
          >
            <KatexRenderer text={question.text} />
          </div>
        </div>
        <span className="text-muted-foreground text-sm shrink-0 mt-1">
          {expanded ? "▴" : "▾"}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t bg-muted/20">
          {question.context && (
            <div className="pt-3 text-sm text-muted-foreground italic">
              <KatexRenderer text={question.context} />
            </div>
          )}

          {question.imageUrl && (
            <div className="pt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={publicImageUrl(supabaseUrl, question.imageUrl)}
                alt="Question diagram"
                className="max-h-64 w-auto rounded border"
              />
            </div>
          )}

          <ol className="pt-2 space-y-2">
            {question.options.map((opt) => (
              <li
                key={opt.label}
                className={cn(
                  "rounded-md border p-2.5 text-sm",
                  opt.isCorrect
                    ? "border-green-300 bg-green-50"
                    : "border-border bg-background"
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                      opt.isCorrect
                        ? "bg-green-600 text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {opt.label}
                  </span>
                  <div className="flex-1 min-w-0">
                    <KatexRenderer text={opt.text} />
                  </div>
                  {opt.isCorrect && (
                    <span className="text-xs font-medium text-green-700 shrink-0">
                      Correct
                    </span>
                  )}
                </div>
                {opt.imageUrl && (
                  <div className="mt-2 ml-9">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
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
                className="text-xs font-medium text-primary hover:underline"
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
            <div className="pt-2 border-t">
              <Link
                href={`/questions/${question.id}/edit`}
                className="text-xs font-medium text-primary hover:underline"
              >
                Edit question
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
