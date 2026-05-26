"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ImageIcon,
  NotebookPen,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import KatexRenderer from "@/components/math/KatexRenderer";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { OptionRow, QuestionRow } from "@/lib/questions/query";
import { useCart } from "@/lib/cart/CartProvider";
import type { QuestionResources } from "@/lib/links/questionResources";
import { buildBreadcrumb } from "./breadcrumb";
import ReportQuestionDialog from "./ReportQuestionDialog";

type OptionLabel = OptionRow["label"];

const DIFFICULTY_LABEL: Record<QuestionRow["difficulty"], string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  HARD: "Hard",
};

export default function QuestionCard({
  question,
  index,
  canEdit,
  isLoggedIn,
  supabaseUrl,
  hideContext = false,
  includeExam = false,
  resources,
}: {
  question: QuestionRow;
  index: number;
  /** True when the viewer can edit questions (ADMIN or TEACHER per migration 0025). */
  canEdit: boolean;
  /** True when ANY signed-in user (TEACHER or ADMIN) — drives Report dialog behaviour. */
  isLoggedIn: boolean;
  supabaseUrl: string;
  hideContext?: boolean;
  /** Surface the exam in the breadcrumb (used when no exam filter is active). */
  includeExam?: boolean;
  /** Optional links to strategy guide + concept notes that explain this question's lever. */
  resources?: QuestionResources;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  // Click-to-reveal: every viewer (including admin) picks an option to
  // unlock the answer. Admins audit content via the Edit page.
  const [picked, setPicked] = useState<OptionLabel | null>(null);
  const revealed = picked !== null;
  const cart = useCart();
  const inCart = cart.has(question.id);

  const breadcrumb = buildBreadcrumb(question, { includeExam });

  function toggleExpanded() {
    setExpanded((v) => {
      if (v) {
        // Collapsing — reset interactive state so the next expand is a
        // fresh attempt for self-testing.
        setPicked(null);
        setShowSolution(false);
      }
      return !v;
    });
  }

  function onToggleCart() {
    if (inCart) {
      cart.remove(question.id);
      return;
    }
    if (cart.isFull) {
      toast.error(`Paper is full (${cart.limit} questions max).`);
      return;
    }
    const ok = cart.add(question.id);
    if (ok) toast.success("Added to paper");
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md",
        inCart && "border-primary/60 ring-2 ring-primary/20"
      )}
    >
      <div className="flex w-full items-start gap-2 p-3 sm:gap-3 sm:p-4">
        {/* Desktop / tablet: standalone Q-badge column. Hidden on phone to
            reclaim horizontal space — the index reappears inline in the
            breadcrumb row below as a compact `#N`. */}
        <span className="mt-0.5 hidden h-7 w-9 shrink-0 items-center justify-center rounded-full bg-muted px-2 font-mono text-xs text-muted-foreground sm:inline-flex">
          Q{index}
        </span>
        <button
          type="button"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          className="flex min-w-0 flex-1 items-start gap-2 rounded text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              <span className="font-mono text-muted-foreground/80 sm:hidden">
                #{index}
              </span>
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
                !expanded
                  ? "line-clamp-2"
                  : "overflow-x-auto [&_.katex]:max-w-full"
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
        <CartToggle
          inCart={inCart}
          disabled={cart.isFull && !inCart}
          onClick={onToggleCart}
        />
      </div>

      {(resources?.guide || resources?.notes) && (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-dashed bg-muted/15 px-3 py-1.5 text-xs sm:gap-2 sm:px-4">
          {resources.guide && (
            <ResourceChip
              href={resources.guide.href}
              label={resources.guide.label}
              Icon={BookOpen}
            />
          )}
          {resources.notes && (
            <ResourceChip
              href={resources.notes.href}
              label={resources.notes.label}
              Icon={NotebookPen}
            />
          )}
        </div>
      )}

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-3 border-t bg-muted/20 px-4 pb-4 font-serif">
            {question.context && !hideContext && (
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
              {question.options.map((opt) => {
                const isPickedByUser = picked === opt.label;
                const showCorrect = revealed && opt.isCorrect;
                const showWrong =
                  revealed && isPickedByUser && !opt.isCorrect;

                const optionContent = (
                  <>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-foreground">
                      {opt.label}
                    </span>
                    <div className="min-w-0 flex-1 overflow-x-auto [&_.katex]:max-w-full">
                      <KatexRenderer text={opt.text} />
                    </div>
                    {showCorrect && (
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Correct
                      </span>
                    )}
                    {showWrong && (
                      <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-red-700 dark:text-red-400">
                        <X className="h-3.5 w-3.5" aria-hidden />
                        Your pick
                      </span>
                    )}
                  </>
                );

                return (
                  <li
                    key={opt.label}
                    className={cn(
                      "overflow-hidden rounded-md border bg-background",
                      showCorrect && "border-l-2 border-l-emerald-500",
                      showWrong && "border-l-2 border-l-red-500"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setPicked(opt.label)}
                      aria-pressed={isPickedByUser}
                      className="flex w-full items-start gap-3 p-2.5 text-left text-sm transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      {optionContent}
                    </button>
                    {opt.imageUrl && (
                      <div className="px-2.5 pb-2.5">
                        <div className="ml-9">
                          <ZoomableImage
                            src={publicImageUrl(supabaseUrl, opt.imageUrl)}
                            alt={`Option ${opt.label} image`}
                            className="max-h-32 w-auto rounded border bg-background"
                          />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
            {!revealed && (
              <p className="pt-1 text-center text-xs text-muted-foreground">
                Tap an option to check your answer.
              </p>
            )}

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

            <div className="flex items-center justify-between gap-3 border-t pt-2 font-sans">
              {canEdit ? (
                <Link
                  href={`/questions/${question.id}/edit`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <Pencil className="h-3 w-3" aria-hidden />
                  Edit question
                </Link>
              ) : (
                <span />
              )}
              <ReportQuestionDialog
                questionId={question.id}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartToggle({
  inCart,
  disabled,
  onClick,
}: {
  inCart: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={inCart}
      title={
        inCart
          ? "Remove from paper"
          : disabled
          ? "Paper is full"
          : "Add to paper"
      }
      className={cn(
        "-mt-0.5 inline-flex h-10 min-w-[44px] shrink-0 select-none items-center justify-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed sm:h-9",
        inCart
          ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/15"
          : disabled
          ? "border-input bg-background text-muted-foreground/50"
          : "border-input bg-background text-foreground hover:bg-accent"
      )}
    >
      {inCart ? (
        <>
          <Check className="h-4 w-4" aria-hidden />
          <span>Added</span>
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" aria-hidden />
          <span>Add</span>
        </>
      )}
    </button>
  );
}

function ResourceChip({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: typeof BookOpen;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 rounded-full border border-input bg-background px-2 py-0.5 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
    >
      <Icon className="h-3 w-3" aria-hidden />
      <span>{label}</span>
      <ArrowUpRight
        className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </Link>
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
      <DialogContent
        className="max-w-4xl border-none bg-transparent p-0 shadow-none"
        hideCloseButton
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="mx-auto max-h-[85vh] w-auto rounded-lg bg-background"
          />
          <DialogClose
            className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md ring-1 ring-border transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close image"
          >
            <X className="h-5 w-5" aria-hidden />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
