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
import BlockText from "@/components/math/BlockText";
import { cn } from "@/lib/utils";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { OptionRow, QuestionRow } from "@/lib/questions/query";
import { formatProvenance } from "@/lib/questions/formatProvenance";
import { useCart } from "@/lib/cart/CartProvider";
import type { QuestionResources } from "@/lib/links/questionResources";
import { useRevealMeter } from "@/components/reveal/useRevealMeter";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import RevealSignInPrompt from "@/components/reveal/RevealSignInPrompt";
import BookmarkButton from "./BookmarkButton";
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
  // Subjective (free-response) questions have no options — the answer is the
  // model answer in `solution`, shown via the reveal button below.
  const isSubjective = question.questionFormat === "subjective";
  const cart = useCart();
  const inCart = cart.has(question.id);

  // Metered answer reveal: anon viewers get a few free reveals, then a sign-in
  // nudge. A question already revealed is free to re-open (no double-charge).
  const meter = useRevealMeter();
  const mobilePrompt = useMobilePrompt();
  const [revealBlocked, setRevealBlocked] = useState(false);
  function tryReveal(): boolean {
    if (meter.attemptReveal(question.id)) {
      setRevealBlocked(false);
      // Engagement signal for the soft mobile prompt (no-op unless signed-in
      // without a mobile; fires only once, at the reveal threshold).
      mobilePrompt.notifyReveal();
      return true;
    }
    setRevealBlocked(true);
    return false;
  }
  function pickOption(label: OptionLabel) {
    if (tryReveal()) setPicked(label);
  }
  function toggleSolution() {
    if (showSolution) {
      setShowSolution(false);
      return;
    }
    if (tryReveal()) setShowSolution(true);
  }

  const breadcrumb = buildBreadcrumb(question, { includeExam });

  function toggleExpanded() {
    setExpanded((v) => {
      if (v) {
        // Collapsing — reset interactive state so the next expand is a
        // fresh attempt for self-testing.
        setPicked(null);
        setShowSolution(false);
        setRevealBlocked(false);
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
      {/* Two stacked rows: a compact META row (badge + breadcrumb + expand
          chevron + Add), then the question text FULL-WIDTH below it. The old
          single-row `items-start` layout reserved a full-height right column for
          the chevron + Add, leaving a dead gutter beside multi-line questions and
          a gap below short ones; stacking removes both and lets the text wrap
          the full card width. */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center gap-2">
          {/* Desktop / tablet: standalone Q-badge; phone uses the inline #N. */}
          <span className="hidden h-7 w-9 shrink-0 items-center justify-center rounded-full bg-muted px-2 font-mono text-xs text-muted-foreground sm:inline-flex">
            Q{index}
          </span>
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse question" : "Expand question"}
            className="flex min-w-0 flex-1 items-center gap-2 rounded py-1 text-left transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {/* Single non-wrapping line: the breadcrumb truncates (min-w-0 makes
                truncate engage on a flex item); difficulty + separators stay
                pinned (shrink-0) so the difficulty never orphans to a 2nd line. */}
            <div className="flex min-w-0 flex-1 items-center gap-x-2 text-xs text-muted-foreground">
              <span className="shrink-0 font-mono text-muted-foreground/80 sm:hidden">
                #{index}
              </span>
              <span className="min-w-0 truncate">{breadcrumb}</span>
              <span className="shrink-0" aria-hidden>·</span>
              <span className="shrink-0">{DIFFICULTY_LABEL[question.difficulty]}</span>
              {question.imageUrl && (
                <>
                  <span className="shrink-0" aria-hidden>·</span>
                  <span className="inline-flex shrink-0 items-center gap-1">
                    <ImageIcon className="h-3 w-3" aria-hidden />
                    <span className="sr-only">Has image</span>
                  </span>
                </>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                expanded && "rotate-180"
              )}
              aria-hidden
            />
          </button>
          <BookmarkButton questionId={question.id} />
          <CartToggle
            inCart={inCart}
            disabled={cart.isFull && !inCart}
            onClick={onToggleCart}
          />
        </div>

        <button
          type="button"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse question" : "Expand question"}
          className="mt-2 block w-full rounded text-left transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div
            className={cn(
              "font-serif text-[15px] leading-relaxed",
              !expanded ? "line-clamp-2" : "overflow-x-auto [&_.katex]:max-w-full"
            )}
          >
            {expanded ? (
              <BlockText text={question.text} />
            ) : (
              <KatexRenderer text={question.text} />
            )}
          </div>
        </button>
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
          <div
            className={cn(
              "space-y-3 border-t bg-muted/20 px-4 pb-4 font-serif",
              expanded && "animate-fade-in-up"
            )}
          >
            {question.context && !hideContext && (
              <div className="pt-3 text-sm italic text-muted-foreground">
                <BlockText text={question.context} />
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

            {!isSubjective && (
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
                      onClick={() => pickOption(opt.label)}
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
            )}
            {!isSubjective && !revealed && (
              <p className="pt-1 text-center text-xs text-muted-foreground">
                Tap an option to check your answer.
              </p>
            )}

            {revealBlocked && !revealed && <RevealSignInPrompt />}

            {isSubjective && !question.solution && (
              <p className="pt-2 text-xs italic text-muted-foreground">
                Model answer coming soon.
              </p>
            )}

            {question.solution && (
              <div>
                <button
                  type="button"
                  onClick={toggleSolution}
                  className="font-sans text-xs font-medium text-primary hover:underline"
                >
                  {isSubjective
                    ? showSolution
                      ? "Hide model answer"
                      : "Show model answer"
                    : showSolution
                    ? "Hide solution"
                    : "Show solution"}
                </button>
                {showSolution && (
                  <div className="mt-2 rounded-md border border-dashed bg-background p-3 text-sm">
                    {/* BlockText (not KatexRenderer) so a GFM pipe-table in a
                        solution — e.g. a truth table — renders as a real <table>.
                        Fast-paths to KatexRenderer when there's no table. */}
                    <BlockText text={question.solution} />
                    {question.solutionImageUrl && (
                      <div className="pt-3">
                        <ZoomableImage
                          src={publicImageUrl(supabaseUrl, question.solutionImageUrl)}
                          alt="Solution diagram"
                          className="max-h-64 w-auto rounded border"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t pt-2 font-sans">
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
              {(() => {
                const provenance = formatProvenance({
                  examName: question.exam.name,
                  questionNumber: question.questionNumber,
                  pyqYear: question.pyqYear,
                  pyqMonth: question.pyqMonth,
                  pyqNote: question.pyqNote,
                });
                return provenance ? (
                  <span className="font-mono text-[11px] text-muted-foreground/80">
                    [{provenance}]
                  </span>
                ) : null;
              })()}
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
  const label = inCart ? "Remove from paper" : disabled ? "Paper is full" : "Add to paper";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={inCart}
      aria-label={label}
      title={label}
      className={cn(
        // Icon-only on phones (label hidden) so the breadcrumb keeps its width
        // and the card reads content-first; "+ Add" / "✓ Added" returns from sm: up.
        "-mt-0.5 inline-flex h-10 min-w-[44px] shrink-0 select-none items-center justify-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed sm:h-9 sm:px-3",
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
          <span className="hidden sm:inline">Added</span>
        </>
      ) : (
        <>
          <Plus className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Add</span>
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
