"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { publicImageUrl } from "@/lib/storage/imageUrl";

type SlotKey = "q_image" | "a_image" | "b_image" | "c_image" | "d_image";

const SLOT_LABELS: Record<SlotKey, string> = {
  q_image: "Question diagram",
  a_image: "Option A image",
  b_image: "Option B image",
  c_image: "Option C image",
  d_image: "Option D image",
};

type Slot = {
  key: SlotKey;
  currentPath: string | null;
};

type Props = {
  questionId: string;
  questionImagePath: string | null;
  optionImagePaths: { A: string | null; B: string | null; C: string | null; D: string | null };
  supabaseUrl: string;
  onClose: () => void;
};

type PendingChange =
  | { kind: "file"; file: File }
  | { kind: "remove" };

export default function EditImagesDialog({
  questionId,
  questionImagePath,
  optionImagePaths,
  supabaseUrl,
  onClose,
}: Props) {
  const router = useRouter();
  const [changes, setChanges] = useState<Record<SlotKey, PendingChange | undefined>>({
    q_image: undefined,
    a_image: undefined,
    b_image: undefined,
    c_image: undefined,
    d_image: undefined,
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const slots: Slot[] = [
    { key: "q_image", currentPath: questionImagePath },
    { key: "a_image", currentPath: optionImagePaths.A },
    { key: "b_image", currentPath: optionImagePaths.B },
    { key: "c_image", currentPath: optionImagePaths.C },
    { key: "d_image", currentPath: optionImagePaths.D },
  ];

  const hasChanges = Object.values(changes).some((c) => c !== undefined);

  function setChange(key: SlotKey, change: PendingChange | undefined) {
    setChanges((prev) => ({ ...prev, [key]: change }));
    setError(null);
  }

  function onFileChange(key: SlotKey, file: File | null) {
    if (!file) {
      setChange(key, undefined);
      return;
    }
    if (file.size > 1024 * 1024) {
      setError(`${SLOT_LABELS[key]}: file is too large (max 1 MB).`);
      return;
    }
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError(`${SLOT_LABELS[key]}: only PNG and JPEG are supported.`);
      return;
    }
    setChange(key, { kind: "file", file });
  }

  async function onSave() {
    if (!hasChanges) return;
    setBusy(true);
    setError(null);
    try {
      const formData = new FormData();
      for (const [key, change] of Object.entries(changes) as [SlotKey, PendingChange | undefined][]) {
        if (!change) continue;
        if (change.kind === "remove") {
          formData.set(key, "remove");
        } else {
          formData.set(key, change.file);
        }
      }
      const res = await fetch(`/api/questions/${questionId}/images`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setError(body.error ?? `Save failed (${res.status})`);
        return;
      }
      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-md border bg-background p-4 mt-3 space-y-4">
      <h4 className="text-sm font-semibold">Edit images</h4>
      <p className="text-xs text-muted-foreground">
        PNG or JPEG, up to 1 MB each. Replacing an image deletes the previous file from storage.
      </p>

      <ul className="space-y-3">
        {slots.map((s) => {
          const change = changes[s.key];
          return (
            <li key={s.key} className="space-y-1.5">
              <Label htmlFor={s.key}>{SLOT_LABELS[s.key]}</Label>

              {s.currentPath && !change && (
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={publicImageUrl(supabaseUrl, s.currentPath)}
                    alt={SLOT_LABELS[s.key]}
                    className="h-16 w-auto rounded border bg-muted"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setChange(s.key, { kind: "remove" })}
                  >
                    Remove
                  </Button>
                </div>
              )}

              {change?.kind === "remove" && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-destructive">Will be removed.</span>
                  <button
                    type="button"
                    onClick={() => setChange(s.key, undefined)}
                    className="underline hover:no-underline"
                  >
                    undo
                  </button>
                </div>
              )}

              {change?.kind === "file" && (
                <div className="flex items-center gap-2 text-xs">
                  <span>New: <span className="font-mono">{change.file.name}</span></span>
                  <button
                    type="button"
                    onClick={() => setChange(s.key, undefined)}
                    className="underline hover:no-underline"
                  >
                    undo
                  </button>
                </div>
              )}

              <input
                id={s.key}
                type="file"
                accept="image/png,image/jpeg"
                onChange={(e) => onFileChange(s.key, e.target.files?.[0] ?? null)}
                disabled={busy}
                className="text-xs"
              />
            </li>
          );
        })}
      </ul>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button onClick={onSave} disabled={busy || !hasChanges} size="sm">
          {busy ? "Saving…" : "Save"}
        </Button>
        <Button variant="outline" size="sm" onClick={onClose} disabled={busy}>
          Close
        </Button>
      </div>
    </div>
  );
}
