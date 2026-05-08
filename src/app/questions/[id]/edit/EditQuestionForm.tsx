"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { publicImageUrl } from "@/lib/storage/imageUrl";
import { cn } from "@/lib/utils";

type Difficulty = "EASY" | "MODERATE" | "HARD";
type OptionLabel = "A" | "B" | "C" | "D";

export type SubjectTree = {
  id: string;
  name: string;
  chapters: {
    id: string;
    name: string;
    subtopics: { id: string; name: string }[];
  }[];
};

export type ExistingOption = {
  label: OptionLabel;
  text: string;
  imageUrl: string | null;
  isCorrect: boolean;
};

export type ExistingQuestion = {
  id: string;
  text: string;
  context: string | null;
  difficulty: Difficulty;
  solution: string | null;
  imageUrl: string | null;
  subjectId: string;
  chapterId: string;
  subtopicId: string | null;
  options: ExistingOption[];
};

type Props = {
  question: ExistingQuestion;
  subjects: SubjectTree[];
  orgId: string;
  supabaseUrl: string;
};

const MAX_BYTES = 1024 * 1024;
const ACCEPT = "image/png,image/jpeg";

export default function EditQuestionForm({
  question,
  subjects,
  orgId,
  supabaseUrl,
}: Props) {
  const router = useRouter();

  const [text, setText] = useState(question.text);
  const [context, setContext] = useState(question.context ?? "");
  const [difficulty, setDifficulty] = useState<Difficulty>(question.difficulty);
  const [solution, setSolution] = useState(question.solution ?? "");
  const [imagePath, setImagePath] = useState<string | null>(question.imageUrl);
  const [subjectId, setSubjectId] = useState(question.subjectId);
  const [chapterId, setChapterId] = useState(question.chapterId);
  const [subtopicId, setSubtopicId] = useState<string | null>(
    question.subtopicId
  );
  const [correct, setCorrect] = useState<OptionLabel>(
    (question.options.find((o) => o.isCorrect)?.label as OptionLabel) ?? "A"
  );
  const [optionTexts, setOptionTexts] = useState<Record<OptionLabel, string>>(
    () => {
      const init = { A: "", B: "", C: "", D: "" } as Record<OptionLabel, string>;
      for (const o of question.options) init[o.label] = o.text;
      return init;
    }
  );
  const [optionImages, setOptionImages] = useState<
    Record<OptionLabel, string | null>
  >(() => {
    const init = { A: null, B: null, C: null, D: null } as Record<
      OptionLabel,
      string | null
    >;
    for (const o of question.options) init[o.label] = o.imageUrl;
    return init;
  });

  const [error, setError] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const currentSubject = useMemo(
    () => subjects.find((s) => s.id === subjectId),
    [subjects, subjectId]
  );
  const currentChapter = useMemo(
    () => currentSubject?.chapters.find((c) => c.id === chapterId),
    [currentSubject, chapterId]
  );
  const subtopicOptions = currentChapter?.subtopics ?? [];

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
      setError(err instanceof Error ? err.message : "Upload failed");
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
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingSlot(null);
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
      correct,
      options: (["A", "B", "C", "D"] as OptionLabel[]).map((label) => ({
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
        return;
      }
      router.push("/browse");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const busy = saving || uploadingSlot !== null;

  return (
    <form onSubmit={onSave} className="space-y-6">
      <section className="rounded-lg border bg-card p-4 space-y-4">
        <h2 className="text-sm font-semibold">Taxonomy</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Select
              id="subject"
              value={subjectId}
              onChange={onSubjectChange}
              disabled={busy}
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="chapter">Chapter</Label>
            <Select
              id="chapter"
              value={chapterId}
              onChange={onChapterChange}
              disabled={busy || !currentSubject}
            >
              {(currentSubject?.chapters ?? []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subtopic">Subtopic (optional)</Label>
            <Select
              id="subtopic"
              value={subtopicId ?? ""}
              onChange={(v) => setSubtopicId(v || null)}
              disabled={busy || !currentChapter}
            >
              <option value="">— none —</option>
              {subtopicOptions.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-4 space-y-4">
        <h2 className="text-sm font-semibold">Question</h2>
        <div className="space-y-1.5">
          <Label htmlFor="text">Text (LaTeX in \(…\) renders in Word)</Label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={busy}
            rows={3}
            className={textareaClass}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="context">Context (optional)</Label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            disabled={busy}
            rows={2}
            className={textareaClass}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            id="difficulty"
            value={difficulty}
            onChange={(v) => setDifficulty(v as Difficulty)}
            disabled={busy}
          >
            <option value="EASY">EASY</option>
            <option value="MODERATE">MODERATE</option>
            <option value="HARD">HARD</option>
          </Select>
        </div>
        <ImageSlot
          label="Question diagram"
          path={imagePath}
          supabaseUrl={supabaseUrl}
          onPick={onPickQuestionImage}
          onRemove={() => setImagePath(null)}
          uploading={uploadingSlot === "question"}
          disabled={busy && uploadingSlot !== "question"}
        />
      </section>

      <section className="rounded-lg border bg-card p-4 space-y-4">
        <h2 className="text-sm font-semibold">Options</h2>
        {(["A", "B", "C", "D"] as OptionLabel[]).map((label) => (
          <div key={label} className="rounded-md border p-3 space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor={`opt-${label}`} className="font-semibold">
                ({label})
              </Label>
              <label className="flex items-center gap-1.5 text-xs">
                <input
                  type="radio"
                  name="correct"
                  checked={correct === label}
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
                setOptionTexts((prev) => ({ ...prev, [label]: e.target.value }))
              }
              disabled={busy}
              rows={2}
              className={textareaClass}
            />
            <ImageSlot
              label={`Option ${label} image`}
              path={optionImages[label]}
              supabaseUrl={supabaseUrl}
              onPick={(f) => onPickOptionImage(label, f)}
              onRemove={() =>
                setOptionImages((prev) => ({ ...prev, [label]: null }))
              }
              uploading={uploadingSlot === label}
              disabled={busy && uploadingSlot !== label}
              compact
            />
          </div>
        ))}
      </section>

      <section className="rounded-lg border bg-card p-4 space-y-2">
        <Label htmlFor="solution">Solution (optional)</Label>
        <textarea
          id="solution"
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          disabled={busy}
          rows={3}
          className={textareaClass}
        />
      </section>

      {error && (
        <div
          role="alert"
          className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={busy}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

const textareaClass =
  "flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

function Select({
  id,
  value,
  onChange,
  disabled,
  children,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </select>
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
}: {
  label: string;
  path: string | null;
  supabaseUrl: string;
  onPick: (file: File | null) => void;
  onRemove: () => void;
  uploading: boolean;
  disabled: boolean;
  compact?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-3 flex-wrap">
        {path && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={publicImageUrl(supabaseUrl, path)}
              alt={label}
              className={cn("rounded border", compact ? "h-10" : "h-16")}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRemove}
              disabled={disabled || uploading}
            >
              Remove
            </Button>
          </>
        )}
        <Input
          type="file"
          accept={ACCEPT}
          onChange={(e) => onPick(e.target.files?.[0] ?? null)}
          disabled={disabled || uploading}
          className="text-xs h-8 flex-1 min-w-40"
        />
        {uploading && <span className="text-xs text-muted-foreground">Uploading…</span>}
      </div>
    </div>
  );
}
