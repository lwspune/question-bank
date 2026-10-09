/**
 * Pure URL builder usable from client components without pulling in
 * node:crypto (which `images.ts` does for randomUUID). Safe to import
 * from "use client" code.
 */
export const BUCKET = "question-images";

export function publicImageUrl(supabaseUrl: string, path: string): string {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${path}`;
}

const PUBLIC_PREFIX = `/storage/v1/object/public/${BUCKET}/`;

/**
 * The bucket path a stored picture value names. Most rows store the path, but
 * some ingests stored the full public URL, which storage.download() cannot
 * read. A URL outside our bucket gives null, so nothing else is ever fetched.
 */
export function storagePathOf(value: string): string | null {
  if (!/^https?:\/\//i.test(value)) return value;
  let pathname: string;
  try {
    pathname = new URL(value).pathname;
  } catch {
    return null;
  }
  if (!pathname.startsWith(PUBLIC_PREFIX)) return null;
  return decodeURIComponent(pathname.slice(PUBLIC_PREFIX.length));
}
