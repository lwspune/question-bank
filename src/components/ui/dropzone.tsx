"use client";

import { useRef, useState } from "react";
import { FileSpreadsheet, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  accept?: string;
  disabled?: boolean;
  file: File | null;
  onFile: (file: File | null) => void;
  hint?: string;
};

export function Dropzone({
  accept = ".xlsx",
  disabled,
  file,
  onFile,
  hint = "Drop a file here or click to browse",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(false);

  function openPicker() {
    if (!disabled) inputRef.current?.click();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setHover(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFile(dropped);
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={file ? `Selected file: ${file.name}` : hint}
      onClick={openPicker}
      onKeyDown={onKeyDown}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setHover(true);
      }}
      onDragLeave={() => setHover(false)}
      onDrop={onDrop}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        hover
          ? "border-primary bg-primary/5"
          : "border-input bg-background hover:border-primary/50 hover:bg-accent/30",
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        file && "border-primary/40 bg-primary/5"
      )}
    >
      {file ? (
        <>
          <FileSpreadsheet
            className="h-8 w-8 text-primary"
            aria-hidden
          />
          <div>
            <p className="text-sm font-medium">{file.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {fmtBytes(file.size)} · click to replace
            </p>
          </div>
        </>
      ) : (
        <>
          <UploadCloud
            className="h-8 w-8 text-muted-foreground"
            aria-hidden
          />
          <div>
            <p className="text-sm font-medium">{hint}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Excel files only (.xlsx)
            </p>
          </div>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

function fmtBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
