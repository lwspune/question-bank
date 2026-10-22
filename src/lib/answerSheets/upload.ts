/**
 * Starting an answer-sheet upload (migration 0153). PURE.
 * Spec: tests/answer-sheets-upload.test.ts.
 *
 * The browser uploads straight to private storage through one signed link per
 * file, because a 25-page PDF is far over Vercel's 4.5 MB request limit. The
 * route issues those links only for a request this accepts. The bucket repeats
 * the type and per-file size limits (0153), so a link cannot be used to store
 * anything else.
 */

export const ANSWER_SHEETS_BUCKET = "answer-sheets";
export const MAX_FILES = 40;
export const MAX_FILE_BYTES = 20 * 1024 * 1024;
export const MAX_TOTAL_BYTES = 80 * 1024 * 1024;

/** The grader reads these; HEIC it cannot, and iPhones convert to JPEG on upload. */
export const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

/** The file input's `accept`, from the same list. */
export const ACCEPT = Object.keys(ALLOWED_TYPES).join(",");

/** "Take photo" (2026-10-12): the camera input asks for the photo types only. */
export const CAMERA_ACCEPT = Object.keys(ALLOWED_TYPES)
  .filter((t) => t.startsWith("image/"))
  .join(",");

/**
 * A camera photo's name in the upload list. Phones name every capture
 * image.jpg, so it is named by its page number instead: the list order is the
 * page order the grader reads.
 */
export function cameraPageName(page: number, type: string): string {
  return `Page ${page}.${ALLOWED_TYPES[type] ?? "jpg"}`;
}

export type StartRequest = {
  examSlug: string;
  paperSlug: string;
  files: { type: string; size: number; ext: string }[];
};

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function validateStartRequest(body: unknown): { ok: true; value: StartRequest } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Bad request." };
  const b = body as Record<string, unknown>;
  if (typeof b.examSlug !== "string" || !SLUG.test(b.examSlug) || b.examSlug.length > 80) {
    return { ok: false, error: "Unknown exam." };
  }
  if (typeof b.paperSlug !== "string" || !SLUG.test(b.paperSlug) || b.paperSlug.length > 80) {
    return { ok: false, error: "Unknown paper." };
  }
  if (b.consent !== true) return { ok: false, error: "Please tick the box to agree before uploading." };
  if (!Array.isArray(b.files) || b.files.length === 0) return { ok: false, error: "Add at least one photo or PDF." };
  if (b.files.length > MAX_FILES) return { ok: false, error: `Upload at most ${MAX_FILES} files.` };

  const files: StartRequest["files"] = [];
  let total = 0;
  for (const f of b.files as unknown[]) {
    const file = f as { type?: unknown; size?: unknown };
    const ext = typeof file.type === "string" ? ALLOWED_TYPES[file.type] : undefined;
    if (!ext) return { ok: false, error: "Each file must be a JPG, PNG, WEBP or PDF." };
    if (typeof file.size !== "number" || !Number.isInteger(file.size) || file.size <= 0) {
      return { ok: false, error: "One of the files is empty." };
    }
    if (file.size > MAX_FILE_BYTES) return { ok: false, error: "Each file must be under 20 MB." };
    total += file.size;
    files.push({ type: file.type as string, size: file.size, ext });
  }
  if (total > MAX_TOTAL_BYTES) return { ok: false, error: "The files add up to more than 80 MB. Use smaller photos." };

  return { ok: true, value: { examSlug: b.examSlug, paperSlug: b.paperSlug, files } };
}

/** `<user>/<submission>/01.jpg`: the student's folder, files in upload order. */
export function scanPath(userId: string, submissionId: string, index: number, ext: string): string {
  return `${userId}/${submissionId}/${String(index + 1).padStart(2, "0")}.${ext}`;
}

/** A scan's file name, as listing the student's folder returns it; not the `marked` folder. */
export function isScanFile(name: string): boolean {
  return /^\d{2}\.(jpg|jpeg|png|webp|pdf)$/i.test(name);
}

/**
 * `<user>/<submission>/marked/01.jpg`: a page with the grader's marks drawn on
 * it, exactly as previewed (migration 0175). Purged with the scans.
 */
export function markedPagePath(userId: string, submissionId: string, index: number): string {
  return `${userId}/${submissionId}/marked/${String(index + 1).padStart(2, "0")}.jpg`;
}

/** The report PDF the student downloads, beside the marked pages. */
export function reportPdfPath(userId: string, submissionId: string): string {
  return `${userId}/${submissionId}/marked/report.pdf`;
}
