"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Lightbulb,
  NotebookPen,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import KatexRenderer from "@/components/math/KatexRenderer";
import BlockText from "@/components/math/BlockText";
import { cn } from "@/lib/utils";
import { optionMark } from "@/lib/questions/optionMark";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { OptionRow, QuestionRow } from "@/lib/questions/query";
import { sourceTag } from "@/lib/questions/sourceTag";
import { DIFFICULTY_LABEL, DIFFICULTY_PILL } from "@/lib/questions/difficultyPill";
import { trackFunnel, trackFunnelOnce } from "@/lib/analytics/trackFunnel";
import { useCart } from "@/lib/cart/CartProvider";
import type { QuestionResources } from "@/lib/links/questionResources";
import { useCardRevealMeter } from "@/components/reveal/useRevealMeter";
import { gradePick } from "@/lib/questions/bankVerdict";
import type { PracticeSurface } from "@/lib/questions/practiceBatch";
import { useMobilePrompt } from "@/lib/profile/MobilePromptProvider";
import RevealSignInPrompt from "@/components/reveal/RevealSignInPrompt";
import RevealLockedLink from "@/components/reveal/RevealLockedLink";
import FixNudgeLine from "@/components/reveal/FixNudgeLine";
import PresentButton from "@/components/present/PresentButton";
import { fromQuestionRow } from "@/lib/present/viewModel";
import BookmarkButton from "./BookmarkButton";
import { buildBreadcrumb, type BreadcrumbFixed } from "./breadcrumb";
import ReportQuestionDialog from "./ReportQuestionDialog";
import { ItemStatChip, ItemStatDetail } from "./ItemStats";
import CancelledNotice from "@/components/question/CancelledNotice";
import { optionVersions, solutionVersions, stemVersions } from "@/lib/i18n/bilingual";
import { useQuestionLang } from "@/lib/i18n/useQuestionLang";
import type { ItemStatAggregate } from "@/lib/itemStats/types";

type OptionLabel = OptionRow["label"];

/** Which page a chip tap came from, for the "resource-chips" readout. */
function chipPage(pathname: string | null): "browse" | "questions" | "other" {
  if (pathname?.startsWith("/questions")) return "questions";
  if (pathname?.startsWith("/browse")) return "browse";
  return "other";
}

export default function QuestionCard({
  question,
  index,
  canEdit,
  isLoggedIn,
  supabaseUrl,
  hideContext = false,
  includeExam = false,
  breadcrumbFixed,
  hideCart = false,
  resources,
  itemStats,
  surface = "bank",
  defaultExpanded = false,
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
  /** Levels the page already fixes, left off the path line (see buildBreadcrumb). */
  breadcrumbFixed?: BreadcrumbFixed;
  /**
   * Suppress the cart toggle + its in-cart ring. Set on surfaces where "Add to
   * paper" is meaningless because the question is already committed to a paper
   * (the paper editor) — the cart is a separate, global, localStorage selection
   * for building a DIFFERENT paper, so offering it there misleads.
   */
  hideCart?: boolean;
  /** Optional links to strategy guide + concept notes that explain this question's lever. */
  resources?: QuestionResources;
  /**
   * Pooled student performance. STAFF ONLY — the page does not fetch it for
   * anyone else, and the RLS policy on `question_item_stats` refuses it
   * independently. Undefined means no usable evidence, which is the normal
   * case: ~2% of the bank clears the threshold today.
   */
  itemStats?: ItemStatAggregate;
  /** Which product this card is part of, for the reveal record. Every bank
   *  list is the default; the question of the day on /me passes "daily". */
  surface?: PracticeSurface;
  /** Open on first render: a lone card (the question of the day) has no list
   *  to scan, so a collapsed preview is just one more tap. */
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showSolution, setShowSolution] = useState(false);
  // Click-to-reveal: every viewer (including admin) picks an option to
  // unlock the answer. Admins audit content via the Edit page.
  const [picked, setPicked] = useState<OptionLabel | null>(null);
  const revealed = picked !== null;
  // Subjective (free-response) and numeric (NAT) questions have no options.
  // Subjective's answer is the model answer in `solution`; numeric's answer is
  // the exact value in `numericAnswer`. Both reveal via the button below.
  const isSubjective = question.questionFormat === "subjective";
  const isNumeric = question.questionFormat === "numeric";
  const isOpenFormat = isSubjective || isNumeric;
  const cart = useCart();
  const inCart = !hideCart && cart.has(question.id);

  // Metered answer reveal: anon viewers get a few free reveals, then a sign-in
  // nudge. A question already revealed is free to re-open (no double-charge).
  // Projection view-model for the classroom overlay.
  const presentable = useMemo(() => fromQuestionRow(question), [question]);
  // Card-level: a reveal elsewhere on the page does not redraw this card.
  const meter = useCardRevealMeter(surface, question.exam.name, question.id);
  const mobilePrompt = useMobilePrompt();
  const [revealBlocked, setRevealBlocked] = useState(false);
  // Re-keys the prompt on every refused tap so it visibly replays.
  const [blockedTaps, setBlockedTaps] = useState(0);
  function tryReveal(chose?: OptionLabel): boolean {
    // The page reads the key by the SAME rule the server grades by, for the
    // "right in a row" message only; the recorded verdict is the server's.
    const pick = chose
      ? {
          label: chose,
          correct:
            gradePick(chose, {
              format: question.questionFormat ?? null,
              cancelled,
              options: question.options.map((o) => ({ label: o.label, isCorrect: o.isCorrect })),
            })?.correct ?? null,
        }
      : undefined;
    if (meter.attemptReveal(question.id, pick, question.chapter.name)) {
      setRevealBlocked(false);
      // Engagement signal for the soft mobile prompt (no-op unless signed-in
      // without a mobile; fires only once, at the reveal threshold).
      mobilePrompt.notifyReveal();
      return true;
    }
    setRevealBlocked(true);
    setBlockedTaps((n) => n + 1);
    return false;
  }
  function pickOption(label: OptionLabel) {
    // The tapped option travels with the reveal so the server can grade it.
    // Not for a cancelled question: no option is right, so there is no verdict
    // to record (the server refuses it too; this keeps the request honest).
    if (tryReveal(cancelled ? undefined : label)) setPicked(label);
  }
  const pathname = usePathname();
  const hasChips = Boolean(resources?.guide || resources?.notes);
  function toggleSolution() {
    if (showSolution) {
      setShowSolution(false);
      return;
    }
    if (tryReveal()) {
      setShowSolution(true);
      if (hasChips) trackFunnelOnce("resource_chips_shown", question.id, { page: chipPage(pathname) });
    }
  }

  // Free reveals spent and this answer not yet seen: show the wall up front.
  const locked = meter.locked && !revealed && !showSolution;
  // The locked link stands in for a reveal button; once a refused option tap
  // has shown the prompt (which carries its own Sign in), one link is enough.
  const lockedLink =
    locked && !revealBlocked ? <RevealLockedLink surface={surface} examName={question.exam.name} /> : null;

  const breadcrumb = buildBreadcrumb(question, { includeExam, fixed: breadcrumbFixed });

  // Printed-language choice (MPSC papers carry Marathi). Shared page-wide; an
  // English-only question ignores it and renders exactly as before.
  // The switch itself lives once in the /browse header (QuestionLangSwitch).
  const [langPref] = useQuestionLang();
  const stems = stemVersions(question, langPref);
  const solutions = solutionVersions(question, langPref);
  // Officially cancelled (migration 0119): no option is correct, so a pick is
  // never painted right or wrong — the notice says why instead.
  const cancelled = Boolean(question.cancelledNote);

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

  const tag = sourceTag(question);
  const toggleLabel = isNumeric
    ? showSolution ? "Hide answer" : "Show answer"
    : isSubjective
      ? showSolution ? "Hide model answer" : "Show model answer"
      : showSolution ? "Hide solution" : "Show solution";
  const hasToggle = isNumeric || Boolean(question.solution);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md",
        inCart && "border-primary/60 ring-2 ring-primary/20"
      )}
    >
      {/* Card layout (2026-10-04): a TAG row (where the question is from +
          difficulty), the subject path in full, then the question. The tag is
          sourceTag(): past papers in brand blue with their sitting and number;
          textbook and practice questions in grey, and a practice question
          never shows a number that could pass for a paper's. */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-label={expanded ? "Collapse question" : "Expand question"}
            className="flex min-w-0 flex-1 items-center gap-2 rounded py-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "inline-flex max-w-full items-center rounded-full px-2 py-0.5 text-xs font-semibold sm:px-2.5",
                  tag.kind === "pyq" ? "bg-brand-accent/10 text-brand-accent" : "bg-muted text-muted-foreground"
                )}
              >
                <span className="truncate">{tag.label}</span>
              </span>
              <span className={cn("inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold sm:px-2.5", DIFFICULTY_PILL[question.difficulty])}>
                {DIFFICULTY_LABEL[question.difficulty]}
              </span>
              <ItemStatChip agg={itemStats} />
              {question.imageUrl && (
                <span className="inline-flex shrink-0 items-center text-muted-foreground">
                  <ImageIcon className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">Has image</span>
                </span>
              )}
            </span>
            {/* Hidden on phones: there the tag pills need the width (the
                difficulty pill was wrapping to a line of its own), and the
                question text below is itself the open/close control. */}
            <ChevronDown
              className={cn(
                "hidden h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 sm:block",
                expanded && "rotate-180"
              )}
              aria-hidden
            />
          </button>
          <PresentButton question={presentable} order={index} />
          <BookmarkButton questionId={question.id} />
          {!hideCart && (
            <CartToggle
              inCart={inCart}
              disabled={cart.isFull && !inCart}
              onClick={onToggleCart}
            />
          )}
        </div>

        <p className="mt-1.5 text-xs text-muted-foreground">
          <span className="tabular-nums text-muted-foreground/80">#{index}</span>
          {breadcrumb && (
            <>
              <span aria-hidden> · </span>
              {breadcrumb}
            </>
          )}
        </p>

        <button
          type="button"
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse question" : "Expand question"}
          className="mt-2 block w-full rounded text-left transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <div
            className={cn(
              "font-serif text-base leading-relaxed",
              !expanded ? "line-clamp-2" : "overflow-x-auto [&_.katex]:max-w-full"
            )}
          >
            {expanded ? (
              <div className="space-y-2">
                {stems.map((v, i) => (
                  <div
                    key={v.lang}
                    lang={v.lang}
                    className={cn(i > 0 && "border-t border-dashed pt-2 text-muted-foreground")}
                  >
                    <BlockText text={v.text} />
                  </div>
                ))}
              </div>
            ) : (
              <span lang={stems[0].lang}>
                <KatexRenderer text={stems[0].text} />
              </span>
            )}
          </div>
        </button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className={cn("space-y-3 px-3 pb-3 font-serif sm:px-4 sm:pb-4", expanded && "animate-fade-in-up")}>
            {itemStats && (
              <div className="pt-1">
                <ItemStatDetail
                  agg={itemStats}
                  keyLabel={
                    question.options.filter((o) => o.isCorrect).length === 1
                      ? (question.options.find((o) => o.isCorrect)?.label ?? null)
                      : null
                  }
                />
              </div>
            )}

            {!hideContext &&
              stems
                .filter((v) => v.context)
                .map((v) => (
                  <div key={v.lang} lang={v.lang} className="text-sm italic text-muted-foreground">
                    <BlockText text={v.context!} />
                  </div>
                ))}

            {question.imageUrl && (
              <div>
                <ZoomableImage
                  src={publicImageUrl(supabaseUrl, question.imageUrl)}
                  alt="Question diagram"
                  className="max-h-64 w-auto rounded border"
                />
              </div>
            )}

            {cancelled && <CancelledNotice note={question.cancelledNote!} />}

            {!isOpenFormat && (
            <ol className="space-y-2">
              {question.options.map((opt) => {
                const isPickedByUser = picked === opt.label;
                const mark = optionMark({ revealed, picked: isPickedByUser, isCorrect: opt.isCorrect, cancelled });
                const showCorrect = mark === "correct";
                const showWrong = mark === "wrong";
                // Once answered, the options that are neither the key nor the
                // pick step back, so the eye goes straight to the result.
                const dimmed = revealed && mark === "none";

                const optionContent = (
                  <>
                    <span
                      className={cn(
                        "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-sans text-xs font-bold",
                        showCorrect
                          ? "bg-emerald-600 text-white"
                          : showWrong
                            ? "bg-red-600 text-white"
                            : "bg-brand-accent/10 text-brand-accent"
                      )}
                    >
                      {showCorrect ? <Check className="h-4 w-4" aria-hidden /> : opt.label}
                      {showCorrect && <span className="sr-only">{opt.label}</span>}
                    </span>
                    <div className="min-w-0 flex-1 overflow-x-auto [&_.katex]:max-w-full">
                      {optionVersions(question, opt, langPref).map((v, i) => (
                        <div key={v.lang} lang={v.lang} className={cn(i > 0 && "text-xs text-muted-foreground")}>
                          <KatexRenderer text={v.text} />
                        </div>
                      ))}
                    </div>
                    {showCorrect && (
                      <span className="inline-flex shrink-0 items-center gap-1 font-sans text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Correct
                      </span>
                    )}
                    {showWrong && (
                      <span className="inline-flex shrink-0 items-center gap-1 font-sans text-xs font-semibold text-red-700 dark:text-red-300">
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
                      "overflow-hidden rounded-xl border-[1.5px] bg-card transition-colors",
                      showCorrect && "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10",
                      showWrong && "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-500/10",
                      dimmed && "opacity-60"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => pickOption(opt.label)}
                      aria-pressed={isPickedByUser}
                      className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-[15px] transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      {optionContent}
                    </button>
                    {opt.imageUrl && (
                      <div className="px-3 pb-2.5">
                        <div className="ml-10">
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
            {/* No "tap an option" hint: the options read as buttons. The one
                line that stays is the signed-out wall, because there a tap does
                nothing and, unexplained, earns repeated angry taps. */}
            {!isOpenFormat && !revealed && !cancelled && locked && (
              <p className="text-center font-sans text-xs text-muted-foreground">Sign in free to check answers.</p>
            )}

            {revealBlocked && !revealed && <RevealSignInPrompt key={blockedTaps} surface={surface} />}

            {/* Every fifth wrong bank answer of the day: the misses are saved in
                Fix your mistakes (lib/drill/fixNudge). Nothing on other cards. */}
            {surface === "bank" && revealed && <FixNudgeLine questionId={question.id} />}

            {isSubjective && !question.solution && (
              <p className="text-xs italic text-muted-foreground">Model answer coming soon.</p>
            )}

            {showSolution && (isNumeric || question.solution) && (
              <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-3 text-sm motion-safe:animate-fade-in-up sm:p-4">
                <p className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wide text-brand-accent">
                  <Lightbulb className="h-3.5 w-3.5" aria-hidden />
                  {isNumeric ? "Answer" : isSubjective ? "Model answer" : "Solution"}
                </p>
                {isNumeric && (
                  <p className="mt-1.5 font-sans">
                    <span className="text-lg font-semibold tabular-nums">{question.numericAnswer}</span>
                  </p>
                )}
                {question.solution && (
                  /* BlockText (not KatexRenderer) so a GFM pipe-table in a
                     solution, e.g. a truth table, renders as a real <table>. */
                  <div className="mt-1.5 space-y-2">
                    {isNumeric ? (
                      <BlockText text={question.solution} solution />
                    ) : (
                      solutions.map((v, i) => (
                        <div key={v.lang} lang={v.lang} className={i > 0 ? "border-t border-dashed pt-2" : undefined}>
                          <BlockText text={v.text} solution />
                        </div>
                      ))
                    )}
                  </div>
                )}
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

            {/* Strategy and concept chips: one line, SHOWN only with the
                solution, but always in the HTML. On the crawlable /questions
                pages they are internal links to /notes and /guide (growth
                registry "internal-links"), so hiding them from the markup would
                cut that before "resource-chips" has measured anything. */}
            {hasChips && (
              // The `hidden` CLASS, not the attribute: a `flex` class outranks the
              // [hidden] browser style, so the attribute left the chips showing.
              <div className={cn("min-w-0 flex-nowrap items-center gap-1.5 font-sans text-xs", showSolution ? "flex" : "hidden")}>
                {resources?.guide && (
                  <ResourceChip href={resources.guide.href} label="Strategy" title={resources.guide.label} Icon={BookOpen} chip="guide" page={chipPage(pathname)} fixed />
                )}
                {resources?.notes && (
                  <ResourceChip href={resources.notes.href} label={resources.notes.label.replace(/^Concept:\s*/, "")} title={resources.notes.label} Icon={NotebookPen} chip="notes" page={chipPage(pathname)} />
                )}
              </div>
            )}

            {/* One action row: the solution toggle on the left, Report (and
                Edit, for staff) on the right. The source line that used to sit
                here moved into the tag at the top. */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 font-sans">
              <div className="flex items-center">
                {hasToggle &&
                  (locked ? (
                    lockedLink
                  ) : (
                    <button
                      type="button"
                      onClick={toggleSolution}
                      aria-expanded={showSolution}
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {toggleLabel}
                      {showSolution ? <ChevronUp className="h-4 w-4" aria-hidden /> : <ChevronDown className="h-4 w-4" aria-hidden />}
                    </button>
                  ))}
              </div>
              <div className="flex items-center gap-3">
                {canEdit && (
                  <Link
                    href={`/dashboard/questions/${question.id}/edit`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Pencil className="h-3 w-3" aria-hidden />
                    Edit question
                  </Link>
                )}
                <ReportQuestionDialog questionId={question.id} isLoggedIn={isLoggedIn} />
              </div>
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
  title,
  Icon,
  chip,
  page,
  fixed = false,
}: {
  href: string;
  label: string;
  title: string;
  Icon: typeof BookOpen;
  chip: "guide" | "notes";
  page: "browse" | "questions" | "other";
  /** Never shrink (the short "Strategy" chip); the other shortens with an ellipsis. */
  fixed?: boolean;
}) {
  return (
    <Link
      href={href}
      title={title}
      onClick={() => trackFunnel("resource_chips_click", { chip, page })}
      className={cn(
        "group inline-flex min-w-0 items-center gap-1 rounded-full border border-input bg-card px-2.5 py-1 font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        fixed ? "shrink-0" : "shrink"
      )}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden />
      <span className="truncate">{label}</span>
      <ArrowUpRight
        className="h-3 w-3 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
