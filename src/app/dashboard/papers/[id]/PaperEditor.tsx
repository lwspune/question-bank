"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  History,
  Loader2,
  Lock,
  Pencil,
  Search,
  Settings2,
  Trash2,
  Unlock,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { sectionProgress, buildSnapshot, positionForMove } from "@/lib/papers/sections";
import {
  addSection,
  removeSection,
  renameSection,
  setSectionTarget,
  setSectionAssignees,
  UNASSIGNED_KEY,
} from "@/lib/papers/template";
import type { PaperDetail } from "@/lib/papers/admin";
import { formatUsageLabel, type UsageRef } from "@/lib/papers/usage";
import type { SectionTemplate } from "@/lib/papers/types";
import type { QuestionPreview } from "@/lib/questions/query";
import {
  updateTitleAction,
  finalizeAction,
  reopenAction,
  removeQuestionAction,
  moveQuestionAction,
  reorderQuestionAction,
  updateTemplateAction,
  setPaperBatchAction,
} from "../actions";
import AddQuestionsPanel from "./AddQuestionsPanel";
import PaperDownload from "./PaperDownload";

const SELECT_CLASS =
  "h-8 rounded-md border border-input bg-background px-2 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default function PaperEditor({
  detail,
  previews,
  usage,
  exams,
  orgMembers,
  batches,
}: {
  detail: PaperDetail;
  previews: QuestionPreview[];
  /** question_id → other papers using it (this paper excluded). Soft-warn. */
  usage: Record<string, UsageRef[]>;
  exams: { id: string; name: string }[];
  orgMembers: { id: string; label: string }[];
  /** Active org batches for the paper's batch selector (0054). */
  batches: { id: string; label: string }[];
}) {
  const router = useRouter();
  const finalized = detail.status === "finalized";
  const template = detail.sectionTemplate;

  const memberLabel = useMemo(() => {
    const m = new Map(orgMembers.map((o) => [o.id, o.label] as const));
    return (id: string | null | undefined) => (id ? m.get(id) ?? null : null);
  }, [orgMembers]);

  const previewMap = useMemo(() => {
    const m = new Map<string, QuestionPreview>();
    for (const p of previews) m.set(p.id, p);
    return m;
  }, [previews]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const m of detail.membership) c[m.sectionKey] = (c[m.sectionKey] ?? 0) + 1;
    return c;
  }, [detail.membership]);

  const progress = useMemo(() => sectionProgress(template, counts), [template, counts]);

  // Membership grouped by section, in template order, then an unassigned bucket.
  const grouped = useMemo(() => {
    const templateKeys = new Set(template.map((s) => s.key));
    const bySection = new Map<string, typeof detail.membership>();
    for (const m of detail.membership) {
      const arr = bySection.get(m.sectionKey) ?? [];
      arr.push(m);
      bySection.set(m.sectionKey, arr);
    }
    for (const arr of bySection.values()) arr.sort((a, b) => a.position - b.position);
    const groups = template.map((s) => ({
      key: s.key,
      label: s.label,
      target: s.targetCount,
      rows: bySection.get(s.key) ?? [],
    }));
    const orphanRows = detail.membership
      .filter((m) => !templateKeys.has(m.sectionKey))
      .sort((a, b) => a.position - b.position);
    if (orphanRows.length > 0) {
      groups.push({ key: UNASSIGNED_KEY, label: "Unassigned", target: 0, rows: orphanRows });
    }
    return groups;
  }, [template, detail]);

  const orderedIds = useMemo(() => {
    if (finalized && detail.snapshot) return detail.snapshot.orderedQuestionIds;
    return buildSnapshot(template, detail.membership).orderedQuestionIds;
  }, [finalized, detail.snapshot, template, detail.membership]);

  const existingIds = useMemo(
    () => new Set(detail.membership.map((m) => m.questionId)),
    [detail.membership]
  );

  const [busy, setBusy] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(detail.title);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [confirmFinalize, setConfirmFinalize] = useState(false);

  async function run(fn: () => Promise<{ ok: boolean; error?: string }>, okMsg?: string) {
    setBusy(true);
    const res = await fn();
    setBusy(false);
    if (res.ok) {
      if (okMsg) toast.success(okMsg);
      router.refresh();
    } else {
      toast.error(res.error ?? "Something went wrong");
    }
    return res.ok;
  }

  async function saveTitle() {
    if (!titleDraft.trim()) {
      toast.error("Title can't be empty.");
      return;
    }
    const ok = await run(() => updateTitleAction(detail.id, titleDraft), "Title updated");
    if (ok) setEditingTitle(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {editingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={titleDraft}
                onChange={(e) => setTitleDraft(e.target.value)}
                disabled={busy}
                className="max-w-md text-lg font-semibold"
                autoFocus
              />
              <Button size="sm" variant="brand" onClick={saveTitle} disabled={busy}>
                <Check className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setTitleDraft(detail.title);
                  setEditingTitle(false);
                }}
                disabled={busy}
              >
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          ) : (
            <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
              <span className="truncate">{detail.title}</span>
              {!finalized && (
                <button
                  type="button"
                  onClick={() => setEditingTitle(true)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Rename paper"
                >
                  <Pencil className="h-4 w-4" aria-hidden />
                </button>
              )}
            </h1>
          )}
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            {finalized ? (
              <Badge variant="secondary" className="gap-1 text-[10px]">
                <Lock className="h-2.5 w-2.5" aria-hidden /> Finalized
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px]">
                Draft
              </Badge>
            )}
            <span>
              {progress.total} question{progress.total === 1 ? "" : "s"} · target{" "}
              {progress.targetTotal}
            </span>
          </div>
          {/* Batch link — drives the per-batch repeat warning in the add panel. */}
          <div className="mt-2 flex items-center gap-2 text-sm">
            <Users className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            <span className="text-muted-foreground">Batch:</span>
            {finalized ? (
              <span className="font-medium">{detail.batchLabel ?? "None"}</span>
            ) : (
              <select
                value={detail.batchId ?? ""}
                onChange={(e) =>
                  run(
                    () => setPaperBatchAction(detail.id, e.target.value || null),
                    "Batch updated"
                  )
                }
                disabled={busy}
                className={SELECT_CLASS}
                aria-label="Paper batch"
              >
                <option value="">None (org-wide)</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.label}
                  </option>
                ))}
                {/* Keep an archived/other batch selectable label if it's the current one. */}
                {detail.batchId && !batches.some((b) => b.id === detail.batchId) && (
                  <option value={detail.batchId}>{detail.batchLabel}</option>
                )}
              </select>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!finalized && (
            <Button variant="outline" asChild title="Collect questions in the bank, then use 'Add to paper' in the cart">
              <Link href="/browse">
                <Search className="h-4 w-4" aria-hidden />
                Browse the bank
              </Link>
            </Button>
          )}
          {!finalized && (
            <Button variant="outline" onClick={() => setSectionsOpen(true)} disabled={busy}>
              <Settings2 className="h-4 w-4" aria-hidden />
              Sections
            </Button>
          )}
          <PaperDownload title={detail.title} questionIds={orderedIds} />
          {finalized ? (
            <Button
              variant="outline"
              onClick={() => run(() => reopenAction(detail.id), "Reopened for editing")}
              disabled={busy}
            >
              <Unlock className="h-4 w-4" aria-hidden />
              Reopen
            </Button>
          ) : (
            <Button
              variant="brand"
              onClick={() => setConfirmFinalize(true)}
              disabled={busy || progress.total === 0}
            >
              <Lock className="h-4 w-4" aria-hidden />
              Finalize
            </Button>
          )}
        </div>
      </div>

      {finalized && (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          This paper is finalized — its question set is frozen. Reopen it to add,
          remove, or rearrange questions.
        </div>
      )}

      {/* Section progress bars */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {progress.sections.map((s) => (
          <SectionBar
            key={s.key}
            label={s.label}
            count={s.count}
            target={s.target}
            assignees={s.assignedTo
              .map((id) => memberLabel(id))
              .filter((x): x is string => !!x)}
          />
        ))}
        {progress.unassigned > 0 && (
          <SectionBar label="Unassigned" count={progress.unassigned} target={0} muted />
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* The paper, grouped by section */}
        <div className="space-y-4">
          {grouped.every((g) => g.rows.length === 0) ? (
            <div className="rounded-lg border border-dashed bg-card p-8 text-center text-sm text-muted-foreground">
              No questions yet. {finalized ? "Reopen to add some." : "Search and add from the panel."}
            </div>
          ) : (
            grouped
              .filter((g) => g.rows.length > 0)
              .map((g) => (
                <div key={g.key} className="rounded-lg border bg-card">
                  <div className="flex items-center justify-between border-b px-4 py-2">
                    <h3 className="text-sm font-semibold">{g.label}</h3>
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">
                      {g.rows.length}
                      {g.target > 0 ? ` / ${g.target}` : ""}
                    </span>
                  </div>
                  <ul className="divide-y">
                    {g.rows.map((m, i) => {
                      const p = previewMap.get(m.questionId);
                      return (
                        <li key={m.questionId} className="flex items-start gap-2 p-3">
                          <span className="mt-0.5 w-5 shrink-0 text-right font-mono text-xs text-muted-foreground">
                            {i + 1}.
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="line-clamp-2 text-sm">
                              {p?.text ?? "(question unavailable)"}
                            </p>
                            {(p || memberLabel(m.addedBy)) && (
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {p && (
                                  <>
                                    {p.subject.name} · {p.chapter.name}
                                  </>
                                )}
                                {memberLabel(m.addedBy) && (
                                  <span className="text-muted-foreground/70">
                                    {p ? " · " : ""}added by {memberLabel(m.addedBy)}
                                  </span>
                                )}
                              </p>
                            )}
                            {(usage[m.questionId]?.length ?? 0) > 0 && (
                              <p
                                className="mt-1 inline-flex items-center gap-1 rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                                title={usage[m.questionId].map((u) => u.title).join(", ")}
                              >
                                <History className="h-3 w-3" aria-hidden />
                                {formatUsageLabel(usage[m.questionId])}
                              </p>
                            )}
                          </div>
                          {!finalized && (
                            <div className="flex shrink-0 items-center gap-1">
                              <div className="flex flex-col">
                                <button
                                  type="button"
                                  disabled={busy || i === 0}
                                  onClick={() => {
                                    const pos = positionForMove(
                                      g.rows.map((r) => ({ questionId: r.questionId, position: r.position })),
                                      m.questionId,
                                      "up"
                                    );
                                    if (pos !== null)
                                      run(() => reorderQuestionAction(detail.id, m.questionId, pos), "Reordered");
                                  }}
                                  aria-label="Move up"
                                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                                >
                                  <ChevronUp className="h-3.5 w-3.5" aria-hidden />
                                </button>
                                <button
                                  type="button"
                                  disabled={busy || i === g.rows.length - 1}
                                  onClick={() => {
                                    const pos = positionForMove(
                                      g.rows.map((r) => ({ questionId: r.questionId, position: r.position })),
                                      m.questionId,
                                      "down"
                                    );
                                    if (pos !== null)
                                      run(() => reorderQuestionAction(detail.id, m.questionId, pos), "Reordered");
                                  }}
                                  aria-label="Move down"
                                  className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                                >
                                  <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                                </button>
                              </div>
                              <select
                                value={g.key === UNASSIGNED_KEY ? "" : g.key}
                                onChange={(e) =>
                                  run(
                                    () => moveQuestionAction(detail.id, m.questionId, e.target.value),
                                    "Moved"
                                  )
                                }
                                disabled={busy}
                                className={SELECT_CLASS}
                                aria-label="Move to section"
                              >
                                {g.key === UNASSIGNED_KEY && <option value="">Unassigned</option>}
                                {template.map((s) => (
                                  <option key={s.key} value={s.key}>
                                    {s.label}
                                  </option>
                                ))}
                              </select>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={busy}
                                onClick={() =>
                                  run(() => removeQuestionAction(detail.id, m.questionId))
                                }
                                aria-label="Remove from paper"
                                className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                              </Button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
          )}
        </div>

        {/* Add panel (draft only) */}
        {!finalized && (
          <AddQuestionsPanel
            paperId={detail.id}
            batchId={detail.batchId}
            exams={exams}
            sections={template}
            existingIds={existingIds}
            onChanged={() => router.refresh()}
          />
        )}
      </div>

      {/* Finalize confirm */}
      <Dialog open={confirmFinalize} onOpenChange={(v) => !v && setConfirmFinalize(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalize this paper?</DialogTitle>
            <DialogDescription>
              The current {progress.total} question{progress.total === 1 ? "" : "s"} and
              their order will be frozen. You can still download it; reopen any time to
              make changes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmFinalize(false)} disabled={busy}>
              Cancel
            </Button>
            <Button
              variant="brand"
              disabled={busy}
              onClick={async () => {
                const ok = await run(() => finalizeAction(detail.id), "Paper finalized");
                if (ok) setConfirmFinalize(false);
              }}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
              Finalize
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Section manager */}
      <SectionManager
        open={sectionsOpen}
        onOpenChange={setSectionsOpen}
        initial={template}
        counts={counts}
        orgMembers={orgMembers}
        onSave={async (next) => {
          const ok = await run(
            () => updateTemplateAction(detail.id, next),
            "Sections updated"
          );
          if (ok) setSectionsOpen(false);
        }}
        busy={busy}
      />
    </div>
  );
}

function SectionBar({
  label,
  count,
  target,
  muted,
  assignees = [],
}: {
  label: string;
  count: number;
  target: number;
  muted?: boolean;
  assignees?: string[];
}) {
  const pct = target > 0 ? Math.min(100, (count / target) * 100) : count > 0 ? 100 : 0;
  const done = target > 0 && count >= target;
  return (
    <div className="rounded-md border bg-card p-2.5">
      <div className="flex items-baseline justify-between text-xs">
        <span className={cn("truncate font-medium", muted && "text-muted-foreground")}>
          {label}
        </span>
        <span className="font-mono tabular-nums text-muted-foreground">
          {count}
          {target > 0 ? ` / ${target}` : ""}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full",
            muted ? "bg-muted-foreground/40" : done ? "bg-emerald-500" : "bg-brand"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {assignees.length > 0 && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[10px] text-muted-foreground">
          <Users className="h-3 w-3" aria-hidden />
          {assignees.map((a) => (
            <span key={a} className="rounded bg-muted px-1 py-0.5">
              {a}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionManager({
  open,
  onOpenChange,
  initial,
  counts,
  orgMembers,
  onSave,
  busy,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: SectionTemplate;
  counts: Record<string, number>;
  orgMembers: { id: string; label: string }[];
  onSave: (next: SectionTemplate) => void;
  busy: boolean;
}) {
  const [draft, setDraft] = useState<SectionTemplate>(initial);
  const [newLabel, setNewLabel] = useState("");
  const [newTarget, setNewTarget] = useState("10");

  // Re-sync the working copy whenever the dialog (re)opens.
  function handleOpenChange(v: boolean) {
    if (v) setDraft(initial);
    onOpenChange(v);
  }

  function toggleAssignee(sectionKey: string, current: string[], userId: string) {
    const next = current.includes(userId)
      ? current.filter((u) => u !== userId)
      : [...current, userId];
    setDraft((d) => setSectionAssignees(d, sectionKey, next));
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sections</DialogTitle>
          <DialogDescription>
            Add, rename, retarget, remove, or assign subjects. Assigning is a soft
            hint of who&apos;s working a section — anyone can still edit any section.
            Removing a section keeps its questions — they move to
            &quot;Unassigned&quot; until you re-file them.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-3">
          {draft.map((s) => {
            const n = counts[s.key] ?? 0;
            const assigned = s.assignedTo ?? [];
            return (
              <li key={s.key} className="space-y-1.5 border-b pb-3 last:border-b-0">
                <div className="flex items-center gap-2">
                  <Input
                    value={s.label}
                    onChange={(e) => setDraft((d) => renameSection(d, s.key, e.target.value))}
                    className="flex-1"
                    aria-label={`Rename ${s.label}`}
                  />
                  <Input
                    type="number"
                    min={0}
                    value={s.targetCount}
                    onChange={(e) =>
                      setDraft((d) => setSectionTarget(d, s.key, Math.max(0, Number(e.target.value) || 0)))
                    }
                    className="w-20"
                    aria-label={`${s.label} target`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDraft((d) => removeSection(d, s.key))}
                    aria-label={`Remove ${s.label}`}
                    title={n > 0 ? `${n} question(s) will move to Unassigned` : "Remove"}
                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
                {orgMembers.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 pl-0.5">
                    <Users className="h-3 w-3 text-muted-foreground" aria-hidden />
                    {orgMembers.map((mem) => {
                      const on = assigned.includes(mem.id);
                      return (
                        <button
                          key={mem.id}
                          type="button"
                          onClick={() => toggleAssignee(s.key, assigned, mem.id)}
                          aria-pressed={on}
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[11px] transition-colors",
                            on
                              ? "border-brand-accent/40 bg-brand-accent/10 text-brand-accent"
                              : "border-input text-muted-foreground hover:bg-accent"
                          )}
                        >
                          {mem.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-end gap-2 border-t pt-3">
          <div className="flex-1 space-y-1">
            <Label htmlFor="new-section" className="text-xs">
              New section
            </Label>
            <Input
              id="new-section"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="e.g. Reasoning"
            />
          </div>
          <Input
            type="number"
            min={0}
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            className="w-20"
            aria-label="New section target"
          />
          <Button
            variant="outline"
            onClick={() => {
              if (!newLabel.trim()) return;
              setDraft((d) => addSection(d, { label: newLabel.trim(), targetCount: Number(newTarget) || 0 }));
              setNewLabel("");
              setNewTarget("10");
            }}
          >
            Add
          </Button>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={busy}>
            Cancel
          </Button>
          <Button variant="brand" onClick={() => onSave(draft)} disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
            Save sections
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
