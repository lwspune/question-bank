// Load a chapter's committed transcriptions (data/<chapter>/<key>.source.json).
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { DATA, fileIndexOf, type Chapter, type FileEntry } from "./config";
import type { SourceFile, SourceRecord } from "./lib";

export type LoadedFile = { file: FileEntry; fileIndex: number; records: SourceRecord[] };

export const qid = (fileIndex: number, n: number) => `${String(fileIndex).padStart(2, "0")}-${n}`;

/** Every file of the chapter that has been transcribed. `only` limits to some keys. */
export function loadChapter(chapter: Chapter, only?: string[]): LoadedFile[] {
  const out: LoadedFile[] = [];
  for (const file of chapter.files) {
    if (only && !only.includes(file.key)) continue;
    const p = join(DATA, chapter.id, `${file.key}.source.json`);
    if (!existsSync(p)) {
      console.warn(`(not yet transcribed: ${file.key})`);
      continue;
    }
    const src: SourceFile = JSON.parse(readFileSync(p, "utf8"));
    out.push({ file, fileIndex: fileIndexOf(chapter, file), records: src.questions });
  }
  return out;
}

/** `--files=a,b` on the command line. */
export function filesArg(): string[] | undefined {
  const a = process.argv.find((x) => x.startsWith("--files="));
  return a ? a.slice("--files=".length).split(",") : undefined;
}
