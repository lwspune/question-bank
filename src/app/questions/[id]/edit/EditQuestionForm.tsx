"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Globe, ImagePlus, Lock, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import KatexRenderer from "@/components/math/KatexRenderer";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { cn } from "@/lib/utils";
import {
  isQuestionDirty,
  toFormState,
  type Difficulty,
  type ExistingQuestion as DirtyExistingQuestion,
  type OptionLabel,
  type Visibility,
} from "@/lib/questions/dirty";

export type SubjectTree = {
  id: string;
  name: string;
  chapters: {
    id: string;
    name: string;
    subtopics: { id: string; name: string }[];
  }[];
};

export type ExistingQuestion = DirtyExistingQuestion & { id: string };

type Props = {
  question: ExistingQuestion;
  subjects: SubjectTree[];
  orgId: string;
  supabaseUrl: string;
};

const MAX_BYTES = 1024 * 1024;
const ACCEPT = "image/png,image/jpeg";
const LABELS: OptionLabel[] = ["A", "B", "C", "D"];
const NONE = "__NONE__";

export default function EditQuestionForm({
  question,
  subjects,
  orgId,
  supabaseUrl,
}: Props) {
  const router = useRouter();
  const initial = toFormState(question);

  const [text, setText] = useState(initial.text);
  const [context, setContext] = useState(initial.context);
  const [difficulty, setDifficulty] = useState<Difficulty>(initial.difficulty);
  const [solution, setSolution] = useState(initial.solution);
  const [imagePath, setImagePath] = useState<string | null>(initial.imagePath);
  const [subjectId, setSubjectId] = useState(initial.subjectId);
  const [chapterId, setChapterId] = useState(initial.chapterId);
  const [subtopicId, setSubtopicId] = useState<string | null>(
    initial.subtopicId
  );
  const [visibility, setVisibility] = useState<Visibility>(initial.visibility);
  const [correct, setCorrect] = useState<OptionLabel>(initial.correct);
  const [optionTexts, setOptionTexts] = useState(initial.optionTexts);
  const [optionImages, setOptionImages] = useState(initial.optionImages);

  const [error, setError] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const currentSubject = useMemo(
    () => subjects.find((s) => s.id === subjectId),
    [subjects, subjectId]
  );
  const currentChapter = useMemo(
    () => currentSubject?.chapters.find((c) => c.id === chapterId),
    [currentSubject, chapterId]
  );
  const subtopicOptions = currentChapter?.subtopics ?? [];

  const dirty = isQuestionDirty(question, {
    text,
    context,
    difficulty,
    solution,
    imagePath,
    subjectId,
    chapterId,
    subtopicId,
    visibility,
    correct,
    optionTexts,
    optionImages,
  });

  const busy = saving || uploadingSlot !== null;

  function onSubjectChange(next: string) {
    setSubjectId(next);
    const subj = subjects.find((s) => s.id === next);
    setChapterId(subj?.chapters[0]?.id ?? "");
    setSubtopicId(null);
  }
  function onChapterChange(next: string) {
    setChapterId(next);
    setSubtopicId(null);
  }

  async function uploadFile(file: File): Promise<string> {
    if (file.size > MAX_BYTES) throw new Error("Image too large (max 1 MB).");
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      throw new Error("Use PNG or JPEG only.");
    }
    const ext = file.type === "image/png" ? "png" : "jpg";
    const path = `${orgId}/${crypto.randomUUID()}.${ext}`;
    const supabase = createSupabaseBrowserClient();
    const { error: upErr } = await supabase.storage
      .from("question-images")
      .upload(path, file, { contentType: file.type });
    if (upErr) throw new Error(upErr.message);
    return path;
  }

  async function onPickQuestionImage(file: File | null) {
    if (!file) return;
    setUploadingSlot("question");
    setError(null);
    try {
      const path = await uploadFile(file);
      setImagePath(path);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setUploadingSlot(null);
    }
  }

  async function onPickOptionImage(label: OptionLabel, file: File | null) {
    if (!file) return;
    setUploadingSlot(label);
    setError(null);
    try {
      const path = await uploadFile(file);
      setOptionImages((prev) => ({ ...prev, [label]: path }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setUploadingSlot(null);
    }
  }

  async function onDelete() {
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
      setDeleteOpen(false);
      router.back();
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload = {
      text,
      context: context.trim() || null,
      difficulty,
      solution: solution.trim() || null,
      imageUrl: imagePath,
      subjectId,
      chapterId,
      subtopicId: subtopicId ?? null,
      visibility,
      correct,
      options: LABELS.map((label) => ({
        label,
        text: optionTexts[label],
        imageUrl: optionImages[label],
      })),
    };
    try {
      const res = await fetch(`/api/questions/${question.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
          fieldErrors?: string[];
        };
        const msg = body.fieldErrors?.length
          ? body.fieldErrors.join("; ")
          : body.error ?? `Save failed (${res.status})`;
        setError(msg);
        toast.error(msg);
        return;
      }
      toast.success("Question saved");
      router.push("/browse");
      router.refresh();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave}>
      <div className="mb-6 flex items-center justify-between">
        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      {mode === "preview" ? (
        <PreviewPane
          text={text}
          context={context}
          imagePath={imagePath}
          options={LABELS.map((label) => ({
            label,
            text: optionTexts[label],
            imageUrl: optionImages[label],
            isCorrect: correct === label,
          }))}
          solution={solution}
          difficulty={difficulty}
          supabaseUrl={supabaseUrl}
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="min-w-0 space-y-6">
            <Section heading="Question">
              <div className="space-y-4">
                <Field
                  id="text"
                  label="Text (LaTeX in \(…\) renders in Word; paste a screenshot here to attach the diagram)"
                  value={text}
                  onChange={setText}
                  onPasteImage={onPickQuestionImage}
                  rows={3}
                  disabled={busy}
                />
                <Field
                  id="context"
                  label="Context (optional)"
                  value={context}
                  onChange={setContext}
                  rows={2}
                  disabled={busy}
                />
                <div>
                  <Label className="mb-1.5 block text-xs text-muted-foreground">
                    Question diagram (optional)
                  </Label>
                  <ImageSlot
                    label="Question diagram"
                    path={imagePath}
                    supabaseUrl={supabaseUrl}
                    onPick={onPickQuestionImage}
                    onRemove={() => setImagePath(null)}
                    uploading={uploadingSlot === "question"}
                    disabled={busy && uploadingSlot !== "question"}
                    hideLabel
                    compact
                  />
                </div>
              </div>
            </Section>

            <Section heading="Options">
              <div className="space-y-3">
                {LABELS.map((label) => {
                  const isCorrect = correct === label;
                  return (
                    <div
                      key={label}
                      className={cn(
                        "rounded-md border p-3",
                        isCorrect && "border-l-2 border-l-emerald-500"
                      )}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold">
                          ({label})
                        </span>
                        <label className="flex cursor-pointer items-center gap-1.5 text-xs">
                          <input
                            type="radio"
                            name="correct"
                            checked={isCorrect}
                            onChange={() => setCorrect(label)}
                            disabled={busy}
                          />
                          Correct
                        </label>
                      </div>
                      <textarea
                        id={`opt-${label}`}
                        value={optionTexts[label]}
                        onChange={(e) =>
                          setOptionTexts((prev) => ({
                            ...prev,
                            [label]: e.target.value,
                          }))
                        }
                        onPaste={handleImagePaste((f) =>
                          onPickOptionImage(label, f)
                        )}
                        disabled={busy}
                        rows={2}
                        className={textareaClass}
                      />
                      <div className="mt-3">
                        <ImageSlot
                          label={`Option ${label} image`}
                          path={optionImages[label]}
                          supabaseUrl={supabaseUrl}
                          onPick={(f) => onPickOptionImage(label, f)}
                          onRemove={() =>
                            setOptionImages((prev) => ({
                              ...prev,
                              [label]: null,
                            }))
                          }
                          uploading={uploadingSlot === label}
                          disabled={busy && uploadingSlot !== label}
                          compact
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section heading="Solution">
              <Field
                id="solution"
                label="Solution (optional)"
                value={solution}
                onChange={setSolution}
                rows={4}
                disabled={busy}
                hideLabel
              />
            </Section>
          </div>

          <aside>
            <div className="space-y-6 lg:sticky lg:top-20">
              <Section heading="Taxonomy">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={subjectId}
                      onValueChange={onSubjectChange}
                      disabled={busy}
                    >
                      <SelectTrigger id="subject">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="chapter">Chapter</Label>
                    <Select
                      value={chapterId}
                      onValueChange={onChapterChange}
                      disabled={busy || !currentSubject}
                    >
                      <SelectTrigger id="chapter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {(currentSubject?.chapters ?? []).map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="subtopic">Subtopic (optional)</Label>
                    <Select
                      value={subtopicId ?? NONE}
                      onValueChange={(v) =>
                        setSubtopicId(v === NONE ? null : v)
                      }
                      disabled={busy || !currentChapter}
                    >
                      <SelectTrigger id="subtopic">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={NONE}>— none —</SelectItem>
                        {subtopicOptions.map((st) => (
                          <SelectItem key={st.id} value={st.id}>
                            {st.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Section>

              <Section heading="Difficulty">
                <Select
                  value={difficulty}
                  onValueChange={(v) => setDifficulty(v as Difficulty)}
                  disabled={busy}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="MODERATE">Moderate</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </Section>

              <Section heading="Visibility">
                <VisibilityToggle
                  value={visibility}
                  onChange={setVisibility}
                  disabled={busy}
                />
              </Section>
            </div>
          </aside>
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <SaveBar
        dirty={dirty}
        saving={saving}
        busy={busy || deleting}
        onCancel={() => router.back()}
        onDelete={() => setDeleteOpen(true)}
      />

      <Dialog
        open={deleteOpen}
        onOpenChange={(v) => !deleting && setDeleteOpen(v)}
      >
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
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting…" : "Delete question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}

function VisibilityToggle({
  value,
  onChange,
  disabled,
}: {
  value: Visibility;
  onChange: (v: Visibility) => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-2">
      <div
        role="group"
        aria-label="Visibility"
        className="inline-flex w-full rounded-md border border-input bg-background p-0.5"
      >
        <button
          type="button"
          onClick={() => onChange("PUBLIC")}
          disabled={disabled}
          aria-pressed={value === "PUBLIC"}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
            value === "PUBLIC"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Globe className="h-3.5 w-3.5" aria-hidden />
          Public
        </button>
        <button
          type="button"
          onClick={() => onChange("PRIVATE")}
          disabled={disabled}
          aria-pressed={value === "PRIVATE"}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50",
            value === "PRIVATE"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Lock className="h-3.5 w-3.5" aria-hidden />
          Private
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        {value === "PUBLIC"
          ? "Anyone can browse and download this question."
          : "Only your organization can see this question."}
      </p>
    </div>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: "edit" | "preview";
  onChange: (m: "edit" | "preview") => void;
}) {
  return (
    <div
      role="group"
      aria-label="View mode"
      className="inline-flex rounded-md border border-input bg-background p-0.5"
    >
      <button
        type="button"
        onClick={() => onChange("edit")}
        aria-pressed={mode === "edit"}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
          mode === "edit"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Pencil className="h-3.5 w-3.5" aria-hidden />
        Edit
      </button>
      <button
        type="button"
        onClick={() => onChange("preview")}
        aria-pressed={mode === "preview"}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
          mode === "preview"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Eye className="h-3.5 w-3.5" aria-hidden />
        Preview
      </button>
    </div>
  );
}

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-card p-4">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {heading}
      </h2>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  onPasteImage,
  rows,
  disabled,
  hideLabel,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  /** Optional: when the clipboard contains an image, send it here instead of dropping it into the textarea. */
  onPasteImage?: (file: File) => void;
  rows: number;
  disabled?: boolean;
  hideLabel?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className={hideLabel ? "sr-only" : undefined}>
        {label}
      </Label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={onPasteImage ? handleImagePaste(onPasteImage) : undefined}
        disabled={disabled}
        rows={rows}
        className={textareaClass}
      />
    </div>
  );
}

function handleImagePaste(onImage: (file: File) => void) {
  return (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const blob = item.getAsFile();
        if (blob) {
          e.preventDefault();
          onImage(blob);
          return;
        }
      }
    }
    // No image on clipboard — fall through to the browser's text paste.
  };
}

function SaveBar({
  dirty,
  saving,
  busy,
  onCancel,
  onDelete,
}: {
  dirty: boolean;
  saving: boolean;
  busy: boolean;
  onCancel: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="sticky bottom-0 z-30 -mx-6 mt-8 border-t bg-background/95 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDelete}
          disabled={busy}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" aria-hidden />
          Delete
        </Button>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          {dirty ? (
            <>
              <span
                className="inline-block h-2 w-2 rounded-full bg-amber-500"
                aria-hidden
              />
              <span>Unsaved changes</span>
            </>
          ) : (
            <span>No changes</span>
          )}
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!dirty || busy}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PreviewPane({
  text,
  context,
  imagePath,
  options,
  solution,
  difficulty,
  supabaseUrl,
}: {
  text: string;
  context: string;
  imagePath: string | null;
  options: {
    label: OptionLabel;
    text: string;
    imageUrl: string | null;
    isCorrect: boolean;
  }[];
  solution: string;
  difficulty: Difficulty;
  supabaseUrl: string;
}) {
  return (
    <div className="rounded-lg border bg-card p-6 font-serif shadow-sm">
      <p className="mb-3 font-sans text-xs text-muted-foreground">
        Difficulty: {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
      </p>
      {context.trim() && (
        <p className="mb-3 italic text-muted-foreground">
          <KatexRenderer text={context} />
        </p>
      )}
      <div className="mb-4 text-[15px] leading-relaxed">
        <KatexRenderer text={text} />
      </div>
      {imagePath && (
        <div className="mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={publicImageUrl(supabaseUrl, imagePath)}
            alt="Question diagram"
            className="max-h-64 w-auto rounded border"
          />
        </div>
      )}
      <ol className="space-y-2">
        {options.map((opt) => (
          <li
            key={opt.label}
            className={cn(
              "rounded-md border p-3 text-sm",
              opt.isCorrect && "border-l-2 border-l-emerald-500"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-bold text-muted-foreground">
                {opt.label}
              </span>
              <div className="min-w-0 flex-1">
                <KatexRenderer text={opt.text} />
              </div>
            </div>
            {opt.imageUrl && (
              <div className="ml-9 mt-2">
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
      {solution.trim() && (
        <div className="mt-4 rounded-md border border-dashed bg-background p-3 text-sm">
          <p className="mb-1 font-sans text-xs font-medium text-muted-foreground">
            Solution
          </p>
          <KatexRenderer text={solution} />
        </div>
      )}
    </div>
  );
}

function ImageSlot({
  label,
  path,
  supabaseUrl,
  onPick,
  onRemove,
  uploading,
  disabled,
  compact,
  hideLabel,
}: {
  label: string;
  path: string | null;
  supabaseUrl: string;
  onPick: (file: File | null) => void;
  onRemove: () => void;
  uploading: boolean;
  disabled: boolean;
  compact?: boolean;
  hideLabel?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function trigger() {
    if (!disabled && !uploading) inputRef.current?.click();
  }

  return (
    <div className="space-y-1.5">
      {!hideLabel && (
        <Label className="text-xs text-muted-foreground">{label}</Label>
      )}
      {path ? (
        <div className="group relative inline-block overflow-hidden rounded-md border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={publicImageUrl(supabaseUrl, path)}
            alt={label}
            className={cn(
              "block w-auto",
              compact ? "h-20" : "h-32"
            )}
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={trigger}
              disabled={disabled || uploading}
              className="h-7 text-xs"
            >
              <ImagePlus className="h-3.5 w-3.5" aria-hidden />
              Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={onRemove}
              disabled={disabled || uploading}
              className="h-7 text-xs"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={trigger}
          disabled={disabled || uploading}
          className={cn(
            "flex w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-dashed border-input p-4 text-center transition-colors hover:border-primary/50 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            compact && "p-3"
          )}
        >
          <ImagePlus
            className="h-5 w-5 text-muted-foreground"
            aria-hidden
          />
          <span className="text-xs text-muted-foreground">
            {uploading ? "Uploading…" : "Add image"}
          </span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
        disabled={disabled || uploading}
        className="sr-only"
      />
    </div>
  );
}

const textareaClass =
  "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
