/**
 * Pure URL builder usable from client components without pulling in
 * node:crypto (which `images.ts` does for randomUUID). Safe to import
 * from "use client" code.
 */
export const BUCKET = "question-images";

export function publicImageUrl(supabaseUrl: string, path: string): string {
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${path}`;
}
